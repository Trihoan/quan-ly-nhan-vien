import { NextResponse } from "next/server";
import db from "@/models";

type RouteContext = { params: Promise<{ id: string }> };
const nestApiUrl = process.env.NEST_API_URL || "http://127.0.0.1:5002/api";

export async function GET(_request: Request, { params }: RouteContext) {
    const id = Number((await params).id);
    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json({ success: false, message: "ID nhân viên không hợp lệ." }, { status: 400 });
    }

    try {
        const employee = await db.Employee.findByPk(id);
        if (!employee) {
            return NextResponse.json({ success: false, message: "Không tìm thấy nhân viên." }, { status: 404 });
        }

        const relation = await db.EmployeeDepartment.findOne({
            where: { employeeId: id, deletedAt: null },
            include: [{ model: db.Department, as: "department" }],
            order: [["createdAt", "DESC"]]
        });

        return NextResponse.json({
            success: true,
            data: {
                ...employee.toJSON(),
                departmentIds: relation ? [Number(relation.departmentId)] : [],
                activeEmployeeDepartmentId: relation ? Number(relation.id) : null
            }
        });
    } catch (error) {
        console.error("Lỗi tải thông tin nhân viên:", error);
        return NextResponse.json({ success: false, message: "Không thể tải thông tin nhân viên." }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: RouteContext) {
    const { id } = await params;
    if (!/^\d+$/.test(id) || Number(id) <= 0) {
        return NextResponse.json({ success: false, message: "ID nhân viên không hợp lệ." }, { status: 400 });
    }

    try {
        const response = await fetch(`${nestApiUrl}/employees/${id}`, {
            method: "PUT",
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
