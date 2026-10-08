export const runtime = "nodejs";

const producerUrl = process.env.IMPORT_PRODUCER_URL || "http://127.0.0.1:5003";

export async function POST(request: Request) {
    try {
        const response = await fetch(`${producerUrl}/imports/scan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: await request.text(),
            cache: "no-store"
        });
        return new Response(response.body, {
            status: response.status,
            headers: {
                "Content-Type": response.headers.get("content-type") || "application/json"
            }
        });
    } catch (error) {
        console.error("Cannot reach the Elysia import producer:", error);
        return Response.json(
            { success: false, message: "Không kết nối được Elysia producer để gửi yêu cầu quét." },
            { status: 502 }
        );
    }
}
