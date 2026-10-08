import { randomUUID } from "node:crypto";
import amqp from "amqplib";
import { node } from "@elysiajs/node";
import { Elysia } from "elysia";

const QUEUE_NAME = "employee.import.scan";
const SCAN_ACTION_KEY = "SCAN_IMPORTED_RAW";
const PORT = Number(process.env.IMPORT_PRODUCER_PORT || 5003);
const BATCH_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function publishScanRequest(batchId: string) {
    const connection = await amqp.connect(
        process.env.RABBITMQ_URL ||
            "amqp://employee_app:dev_only_change_me@127.0.0.1:5672"
    );
    let channel: amqp.ConfirmChannel | undefined;

    try {
        channel = await connection.createConfirmChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify({ key: SCAN_ACTION_KEY, batchId })),
            {
                persistent: true,
                contentType: "application/json",
                messageId: randomUUID(),
                timestamp: Date.now()
            }
        );
        await channel.waitForConfirms();
    } finally {
        await channel?.close().catch(() => undefined);
        await connection.close().catch(() => undefined);
    }
}

const app = new Elysia({ adapter: node() })
    .get("/health", () => ({ success: true, service: "import-scan-producer" }))
    .post("/imports/scan", async ({ body, set }) => {
        const batchId = (body as { batchId?: unknown } | null)?.batchId;
        if (typeof batchId !== "string" || !BATCH_ID_PATTERN.test(batchId)) {
            set.status = 400;
            return { success: false, message: "batchId phải là UUID hợp lệ." };
        }

        try {
            await publishScanRequest(batchId);
            set.status = 202;
            return { success: true, batchId, queued: true };
        } catch (error) {
            console.error("Could not publish import scan request:", error);
            set.status = 503;
            return {
                success: false,
                batchId,
                message: "Không gửi được yêu cầu quét vào RabbitMQ."
            };
        }
    })
    .listen({
        hostname: "127.0.0.1",
        port: PORT
    });

console.log(
    `Elysia import producer listening on http://127.0.0.1:${PORT}`
);
