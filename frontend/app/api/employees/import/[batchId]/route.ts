export const runtime = "nodejs";

const nestApiUrl = process.env.NEST_API_URL || "http://127.0.0.1:5002/api";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ batchId: string }> }
) {
    const { batchId } = await params;
    try {
        const response = await fetch(
            `${nestApiUrl}/employees/import/${encodeURIComponent(batchId)}`,
            { cache: "no-store" }
        );
        return new Response(response.body, {
            status: response.status,
            headers: {
                "Content-Type": response.headers.get("content-type") || "application/json"
            }
        });
    } catch (error) {
        console.error("Cannot reach the NestJS import status API:", error);
        return Response.json(
            { success: false, message: "Không kết nối được NestJS để lấy trạng thái import." },
            { status: 502 }
        );
    }
}
