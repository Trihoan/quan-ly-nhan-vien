import { NextResponse } from "next/server";
import db from "@/models";

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const employeeId = Number(body.employeeId);

        const departmentId =
            body.departmentId === null ||
            body.departmentId === undefined ||
            body.departmentId === ""
                ? null
                : Number(body.departmentId);

        // ==============================
        // KIỂM TRA EMPLOYEE ID
        // ==============================
        if (
            !Number.isInteger(employeeId) ||
            employeeId <= 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "employeeId không hợp lệ"
                },
                { status: 400 }
            );
        }

        // ==============================
        // KIỂM TRA DEPARTMENT ID
        // ==============================
        if (
            departmentId !== null &&
            (
                !Number.isInteger(departmentId) ||
                departmentId <= 0
            )
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "departmentId không hợp lệ"
                },
                { status: 400 }
            );
        }

        // ==============================
        // LẤY MODEL
        // ==============================
        const Employee = db.Employee;
        const Department = db.Department;
        const EmployeeDepartment =
            db.EmployeeDepartment;

        const sequelize = db.sequelize;

        // ==============================
        // KIỂM TRA EMPLOYEE
        // ==============================
        const employee =
            await Employee.findByPk(employeeId);

        if (!employee) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Không tìm thấy nhân viên"
                },
                { status: 404 }
            );
        }

        // ==============================
        // KIỂM TRA DEPARTMENT
        // ==============================
        if (departmentId !== null) {
            const department =
                await Department.findByPk(
                    departmentId
                );

            if (!department) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Không tìm thấy phòng ban"
                    },
                    { status: 404 }
                );
            }
        }

        // ==============================
        // TRANSACTION
        // ==============================
        const transaction =
            await sequelize.transaction();

        try {
            // Tìm phòng ban hiện tại
            const currentRelation =
                await EmployeeDepartment.findOne({
                    where: {
                        employeeId: employeeId,
                        deletedAt: null
                    },
                    transaction
                });

            // ==============================
            // KHÔNG THAY ĐỔI
            // ==============================
            if (
                currentRelation &&
                departmentId !== null &&
                Number(
                    currentRelation.departmentId
                ) === departmentId
            ) {
                await transaction.commit();

                return NextResponse.json({
                    success: true,
                    message: "Phòng ban không thay đổi"
                });
            }

            // ==============================
            // ĐÓNG QUAN HỆ CŨ
            // ==============================
            if (currentRelation) {
                await currentRelation.update(
                    {
                        deletedAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        transaction
                    }
                );
            }

            // ==============================
            // CHƯA PHÂN BỔ
            // ==============================
            if (departmentId === null) {
                await transaction.commit();

                return NextResponse.json({
                    success: true,
                    message:
                        "Đã bỏ phân bổ phòng ban"
                });
            }

            // ==============================
            // TẠO QUAN HỆ MỚI
            // ==============================
            const newRelation =
                await EmployeeDepartment.create(
                    {
                        employeeId: employeeId,
                        departmentId: departmentId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        deletedAt: null
                    },
                    {
                        transaction
                    }
                );

            await transaction.commit();

            return NextResponse.json({
                success: true,
                message:
                    "Cập nhật phòng ban thành công",
                data: newRelation
            });

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    } catch (error) {
        console.error(
            "Lỗi cập nhật phòng ban:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Lỗi server"
            },
            {
                status: 500
            }
        );
    }
}