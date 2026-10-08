import { NextResponse } from "next/server";
import db from "@/models";

const nestApiUrl = process.env.NEST_API_URL || "http://127.0.0.1:5002/api";

export async function GET() {
    try {
        const employees = await db.Employee.findAll({
            order: [["id", "ASC"]],
            include: [
                {
                    model: db.Department,
                    as: "departments",
                    through: {
                        where: { deletedAt: null },
                        attributes: []
                    },
                    required: false
                }
            ]
        });

        return NextResponse.json({
            success: true,
            data: employees.map((employee: any) => {
                const value = employee.toJSON();
                const department = value.departments?.[0]?.name ?? value.department ?? null;
                delete value.departments;
                return { ...value, department };
            })
        });
    } catch (error) {
        console.error("Lỗi tải danh sách nhân viên:", error);
        return NextResponse.json(
            { success: false, message: "Không thể tải danh sách nhân viên." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const response = await fetch(`${nestApiUrl}/employees`, {
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
        console.error("Không kết nối được NestJS API:", error);
        return NextResponse.json(
            { success: false, message: "Không kết nối được NestJS API. Hãy chạy npm run dev:all." },
            { status: 502 }
        );
    }
}
