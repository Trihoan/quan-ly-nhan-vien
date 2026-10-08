import { NextResponse } from "next/server";
import db from "@/models";

export async function GET() {
    try {
        const departments = await db.Department.findAll({ order: [["name", "ASC"]] });
        return NextResponse.json({ success: true, data: departments });
    } catch (error) {
        console.error("Lỗi tải phòng ban:", error);
        return NextResponse.json({ success: false, message: "Không thể tải danh sách phòng ban." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const name = typeof body.name === "string" ? body.name.trim() : "";
        if (!name) {
            return NextResponse.json({ success: false, message: "Tên phòng ban không được để trống." }, { status: 400 });
        }

        const [department, created] = await db.Department.findOrCreate({ where: { name }, defaults: { name } });
        if (!created) {
            return NextResponse.json({ success: false, message: "Phòng ban này đã tồn tại." }, { status: 409 });
        }
        return NextResponse.json({ success: true, data: department }, { status: 201 });
    } catch (error) {
        console.error("Lỗi tạo phòng ban:", error);
        return NextResponse.json({ success: false, message: "Không thể tạo phòng ban." }, { status: 500 });
    }
}
