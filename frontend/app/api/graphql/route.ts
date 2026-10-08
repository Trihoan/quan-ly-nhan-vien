export const runtime = "nodejs";

const postgraphileUrl =
    process.env.POSTGRAPHILE_URL || "http://127.0.0.1:5001/graphql";

export async function POST(request: Request) {
    try {
        const response = await fetch(postgraphileUrl, {
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
        console.error("Không kết nối được PostGraphile:", error);
        return Response.json(
            {
                errors: [
                    {
                        message:
                            "Không kết nối được PostGraphile. Hãy chạy npm run graphql trước."
                    }
                ]
            },
            { status: 502 }
        );
    }
}
