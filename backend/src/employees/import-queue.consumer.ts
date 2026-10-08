import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit
} from "@nestjs/common";
import amqp from "amqplib";
import type { Channel, ChannelModel, ConsumeMessage } from "amqplib";
import { EmployeesService } from "./employees.service";

export const EMPLOYEE_IMPORT_QUEUE = "employee.import.scan";
const SCAN_ACTION_KEY = "SCAN_IMPORTED_RAW";
const BATCH_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export class ImportQueueConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(ImportQueueConsumer.name);
    private connection?: ChannelModel;
    private channel?: Channel;
    private stopping = false;
    private connecting = false;

    constructor(private readonly employeesService: EmployeesService) {}

    onModuleInit() {
        void this.connectWithRetry();
    }

    async onModuleDestroy() {
        this.stopping = true;
        await this.channel?.close().catch(() => undefined);
        await this.connection?.close().catch(() => undefined);
    }

    private async connectWithRetry() {
        if (this.connecting || this.stopping) return;
        this.connecting = true;

        try {
            while (!this.stopping && !this.channel) {
                try {
                    const connection = await amqp.connect(
                        process.env.RABBITMQ_URL ||
                            "amqp://employee_app:dev_only_change_me@127.0.0.1:5672"
                    );
                    const channel = await connection.createChannel();
                    await channel.assertQueue(EMPLOYEE_IMPORT_QUEUE, { durable: true });
                    await channel.prefetch(1);
                    channel.on("error", (error) =>
                        this.logger.error(`RabbitMQ channel error: ${error.message}`)
                    );
                    connection.on("error", (error) =>
                        this.logger.error(`RabbitMQ connection error: ${error.message}`)
                    );
                    connection.on("close", () => {
                        this.channel = undefined;
                        this.connection = undefined;
                        if (!this.stopping) void this.connectWithRetry();
                    });

                    this.connection = connection;
                    this.channel = channel;
                    await channel.consume(
                        EMPLOYEE_IMPORT_QUEUE,
                        (message) => {
                            if (message) void this.handleMessage(channel, message);
                        },
                        { noAck: false }
                    );
                    this.logger.log(`Listening on RabbitMQ queue ${EMPLOYEE_IMPORT_QUEUE}`);
                    return;
                } catch (error) {
                    this.logger.warn(
                        `RabbitMQ is unavailable; retrying in 3 seconds: ${this.errorMessage(error)}`
                    );
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                }
            }
        } finally {
            this.connecting = false;
        }
    }

    private async handleMessage(channel: Channel, message: ConsumeMessage) {
        let payload: { key?: string; batchId?: string };
        try {
            payload = JSON.parse(message.content.toString()) as {
                key?: string;
                batchId?: string;
            };
        } catch {
            this.logger.error("Discarding malformed RabbitMQ import message.");
            channel.ack(message);
            return;
        }

        if (payload.key !== SCAN_ACTION_KEY || !payload.batchId || !BATCH_ID_PATTERN.test(payload.batchId)) {
            this.logger.error("Discarding RabbitMQ import message with an invalid action or batchId.");
            channel.ack(message);
            return;
        }

        try {
            const result = await this.employeesService.processRawImportBatch(payload.batchId);
            if ("failed" in result && result.failed) {
                this.logger.error(`Import batch ${payload.batchId} failed: ${result.error}`);
            } else {
                this.logger.log(`Processed import batch ${payload.batchId}.`);
            }
            channel.ack(message);
        } catch (error) {
            this.logger.error(
                `Could not process import batch ${payload.batchId}: ${this.errorMessage(error)}`
            );
            channel.nack(message, false, true);
        }
    }

    private errorMessage(error: unknown) {
        return error instanceof Error ? error.message : String(error);
    }
}
