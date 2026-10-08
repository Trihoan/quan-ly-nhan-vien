export const runtime = "nodejs";

const nestApiUrl = process.env.NEST_API_URL || "http://127.0.0.1:5002/api";

export async function POST(request: Request) {
    try {
        const response = await fetch(`${nestApiUrl}/employees/import/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: await request.text(),
            cache: "no-store"
        });

        return new Response(response.body, {
            status: response.status,
            headers: {
                "Content-Type":
                    response.headers.get("content-type") || "application/json"
            }
        });
    } catch (error) {
        console.error("Cannot reach the NestJS import validation API:", error);
        return Response.json(
            { message: "Không kết nối được NestJS để kiểm tra file." },
            { status: 502 }
        );
    }
}
