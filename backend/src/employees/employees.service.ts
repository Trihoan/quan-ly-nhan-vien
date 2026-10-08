import {
    BadRequestException,
    ConflictException,
    Injectable,
    Inject,
    NotFoundException
} from "@nestjs/common";
import type { Pool, PoolClient } from "pg";
import { POSTGRES_POOL } from "../database/database.module";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { ImportEmployeeRowDto } from "./dto/validate-import.dto";

const UPDATE_COLUMNS: Record<string, string> = {
    lastname: "lastname",
    firstname: "firstname",
    birthday: "birthday",
    gender: "gender",
    startDate: "startDate",
    code: "code",
    manager: "manager",
    phone: "phone",
    address: "address",
    ssoEmail: "ssoEmail",
    role: "role",
    status: "status"
};

function isValidIsoDate(value: string): boolean {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

@Injectable()
export class EmployeesService {
    constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

    async validateImport(rows: ImportEmployeeRowDto[]) {
        const client = await this.pool.connect();

        try {
            await client.query("BEGIN");

            const codeKeys = rows
                .map((row) => row.code.trim().toLocaleLowerCase("en-US"))
                .filter(Boolean);
            const emailKeys = rows
                .map((row) => row.ssoEmail.trim().toLocaleLowerCase("en-US"))
                .filter(Boolean);
            const existingCodesResult = codeKeys.length
                ? await client.query(
                      `SELECT lower(btrim("code")) AS normalized
                       FROM "Employees"
                       WHERE lower(btrim("code")) = ANY($1::text[])`,
                      [codeKeys]
                  )
                : { rows: [] };
            const existingEmailsResult = emailKeys.length
                ? await client.query(
                      `SELECT lower(btrim("ssoEmail")) AS normalized
                       FROM "Employees"
                       WHERE lower(btrim("ssoEmail")) = ANY($1::text[])`,
                      [emailKeys]
                  )
                : { rows: [] };
            const departmentsResult = await client.query(
                `SELECT "id", "name", lower(btrim("name")) AS normalized
                 FROM "Departments"`
            );

            const existingCodes = new Set<string>(
                existingCodesResult.rows.map((row: { normalized: string }) => row.normalized)
            );
            const existingEmails = new Set<string>(
                existingEmailsResult.rows.map((row: { normalized: string }) => row.normalized)
            );
            const departmentByKey = new Map<string, { id: number; name: string }>(
                departmentsResult.rows.map(
                    (row: { id: number; name: string; normalized: string }) => [
                        row.normalized,
                        { id: Number(row.id), name: row.name.trim() }
                    ]
                )
            );

            const codeCounts = new Map<string, number>();
            const emailCounts = new Map<string, number>();
            for (const row of rows) {
                const code = row.code.trim().toLocaleLowerCase("en-US");
                const email = row.ssoEmail.trim().toLocaleLowerCase("en-US");
                if (code) codeCounts.set(code, (codeCounts.get(code) ?? 0) + 1);
                if (email) emailCounts.set(email, (emailCounts.get(email) ?? 0) + 1);
            }

            const results = rows.map((row) => {
                const errors: string[] = [];
                const code = row.code.trim().toLocaleLowerCase("en-US");
                const email = row.ssoEmail.trim().toLocaleLowerCase("en-US");
                const phoneDigits = row.phone.replace(/\D/g, "");

                if (row.birthday.trim() && !isValidIsoDate(row.birthday.trim())) {
                    errors.push("Ngày sinh không hợp lệ; dùng định dạng YYYY-MM-DD.");
                }
                if (row.startDate.trim() && !isValidIsoDate(row.startDate.trim())) {
                    errors.push("Ngày bắt đầu làm việc không hợp lệ; dùng định dạng YYYY-MM-DD.");
                }
                if (!row.lastname.trim()) errors.push("Thiếu họ và tên đệm.");
                if (!row.firstname.trim()) errors.push("Thiếu tên.");
                if (!code) errors.push("Thiếu mã nhân viên.");
                else {
                    if ((codeCounts.get(code) ?? 0) > 1) {
                        errors.push("Mã nhân viên bị trùng trong file.");
                    }
                    if (existingCodes.has(code)) {
                        errors.push("Mã nhân viên đã tồn tại trong database.");
                    }
                }
                if (!row.department.trim()) errors.push("Thiếu phòng ban.");
                if (!phoneDigits) errors.push("Thiếu số điện thoại.");
                else if (phoneDigits.length < 10) {
                    errors.push("Số điện thoại phải có ít nhất 10 chữ số.");
                }
                if (!email) errors.push("Thiếu Email SSO.");
                else {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.ssoEmail.trim())) {
                        errors.push("Email SSO không đúng định dạng.");
                    }
                    if ((emailCounts.get(email) ?? 0) > 1) {
                        errors.push("Email SSO bị trùng trong file.");
                    }
                    if (existingEmails.has(email)) {
                        errors.push("Email SSO đã tồn tại trong database.");
                    }
                }

                return {
                    rowNumber: row.rowNumber,
                    employee: {
                        lastname: row.lastname.trim(),
                        firstname: row.firstname.trim(),
                        birthday: row.birthday.trim(),
                        gender: row.gender.trim(),
                        startDate: row.startDate.trim(),
                        code: row.code.trim(),
                        manager: row.manager.trim(),
                        phone: row.phone.trim(),
                        address: row.address.trim(),
                        department: row.department.trim(),
                        ssoEmail: row.ssoEmail.trim()
                    },
                    errors,
                    departmentCreated: false,
                    allowDepartmentInsert: row.allowDepartmentInsert !== false
                };
            });

            for (const result of results) {
                if (result.errors.length > 0) continue;

                const requestedName = result.employee.department.trim();
                const key = requestedName.toLocaleLowerCase("vi-VN");
                const department = departmentByKey.get(key);
                if (department) result.employee.department = department.name;
            }
            await client.query("COMMIT");
            return {
                rows: results.map(({ allowDepartmentInsert: _allowDepartmentInsert, ...row }) => row),
                validCount: results.filter((row) => row.errors.length === 0).length,
                invalidCount: results.filter((row) => row.errors.length > 0).length
            };
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    async saveImportRowsToRaw(batchId: string, rows: ImportEmployeeRowDto[]) {
        const validation = await this.validateImport(rows);
        const invalidRows = validation.rows.filter((row) => row.errors.length > 0);
        if (invalidRows.length > 0) {
            throw new BadRequestException({
                message: `Có ${invalidRows.length} dòng chưa hợp lệ. Không lưu batch vào bảng raw.`,
                invalidRows: invalidRows.map(({ rowNumber, errors }) => ({ rowNumber, errors }))
            });
        }

        const client = await this.pool.connect();
        try {
            await client.query("BEGIN");
            for (const row of rows) {
                await client.query(
                    `INSERT INTO user_import_raw (
                        batch_id, row_number, lastname, firstname, birthday, gender, "startDate",
                        code, manager, phone, address, department, "ssoEmail",
                        is_scanned, processing_status, validation_errors
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, FALSE, 'pending', '[]'::jsonb)
                    ON CONFLICT (batch_id, row_number) DO NOTHING`,
                    [
                        batchId,
                        row.rowNumber,
                        row.lastname,
                        row.firstname,
                        row.birthday,
                        row.gender,
                        row.startDate,
                        row.code,
                        row.manager,
                        row.phone,
                        row.address,
                        row.department,
                        row.ssoEmail
                    ]
                );
            }
            await client.query("COMMIT");
            return { success: true, batchId, savedCount: rows.length };
        } catch (error) {
            await client.query("ROLLBACK");
            this.handleDatabaseError(error);
        } finally {
            client.release();
        }
    }

    async getRawImportBatchStatus(batchId: string) {
        const result = await this.pool.query(
            `SELECT id, row_number, lastname, firstname, code, is_scanned,
                    processing_status, validation_errors
             FROM user_import_raw
             WHERE batch_id = $1
             ORDER BY row_number ASC`,
            [batchId]
        );
        if (result.rowCount === 0) {
            throw new NotFoundException("KhÃ´ng tÃ¬m tháº¥y lÃ´ import.");
        }

        const rows = result.rows.map((row) => ({
            id: Number(row.id),
            rowNumber: Number(row.row_number),
            lastname: row.lastname as string,
            firstname: row.firstname as string,
            code: row.code as string,
            isScanned: row.is_scanned as boolean,
            status: row.processing_status as string,
            errors: Array.isArray(row.validation_errors)
                ? row.validation_errors.map(String)
                : []
        }));
        const pendingCount = rows.filter((row) => row.status === "pending").length;
        const processingCount = rows.filter((row) => row.status === "processing").length;
        const processedCount = rows.filter((row) => row.status === "processed").length;
        const failedCount = rows.filter((row) => row.status === "failed").length;
        const status = pendingCount > 0
            ? "queued"
            : processingCount > 0
                ? "processing"
                : failedCount > 0
                    ? "failed"
                    : "completed";

        return {
            success: true,
            batchId,
            status,
            totalCount: rows.length,
            pendingCount,
            processingCount,
            processedCount,
            failedCount,
            rows
        };
    }

    async processRawImportBatch(batchId: string) {
        const claimClient = await this.pool.connect();
        let rawRows: Array<Record<string, unknown>> = [];
        try {
            await claimClient.query("BEGIN");
            await claimClient.query(
                "SELECT pg_advisory_xact_lock(hashtextextended($1, 0))",
                [batchId]
            );
            const pendingResult = await claimClient.query(
                `SELECT * FROM user_import_raw
                 WHERE batch_id = $1 AND processing_status = 'pending'
                 ORDER BY row_number ASC
                 FOR UPDATE`,
                [batchId]
            );
            rawRows = pendingResult.rows as Array<Record<string, unknown>>;
            if (rawRows.length === 0) {
                await claimClient.query("COMMIT");
                return { batchId, processedCount: 0 };
            }
            const ids = rawRows.map((row) => Number(row.id));
            await claimClient.query(
                `UPDATE user_import_raw
                 SET processing_status = 'processing', updated_at = CURRENT_TIMESTAMP
                 WHERE id = ANY($1::int[])`,
                [ids]
            );
            await claimClient.query("COMMIT");
        } catch (error) {
            await claimClient.query("ROLLBACK");
            throw error;
        } finally {
            claimClient.release();
        }

        try {
            const importRows: ImportEmployeeRowDto[] = rawRows.map((row) => ({
                rowNumber: Number(row.row_number),
                lastname: String(row.lastname ?? ""),
                firstname: String(row.firstname ?? ""),
                birthday: String(row.birthday ?? ""),
                gender: String(row.gender ?? ""),
                startDate: String(row.startDate ?? ""),
                code: String(row.code ?? ""),
                manager: String(row.manager ?? ""),
                phone: String(row.phone ?? ""),
                address: String(row.address ?? ""),
                department: String(row.department ?? ""),
                ssoEmail: String(row.ssoEmail ?? "")
            }));
            const validation = await this.validateImport(importRows);
            const rowIdByNumber = new Map(
                rawRows.map((row) => [Number(row.row_number), Number(row.id)])
            );
            const client = await this.pool.connect();
            let processedCount = 0;
            let validCount = 0;
            try {
                await client.query("BEGIN");
                for (const result of validation.rows) {
                    const rawId = rowIdByNumber.get(result.rowNumber);
                    if (rawId === undefined) continue;

                    if (result.errors.length === 0) {
                        const departmentName = result.employee.department.trim();
                        const departmentKey = departmentName.toLocaleLowerCase("vi-VN");
                        await client.query(
                            "SELECT pg_advisory_xact_lock(hashtextextended($1, 0))",
                            [departmentKey]
                        );
                        let departmentResult = await client.query(
                            `SELECT "id", "name" FROM "Departments"
                             WHERE lower(btrim("name")) = lower(btrim($1))
                             LIMIT 1`,
                            [departmentName]
                        );
                        if (!departmentResult.rowCount) {
                            await client.query(
                                `INSERT INTO "Departments" ("name")
                                 VALUES (btrim($1)) ON CONFLICT DO NOTHING`,
                                [departmentName]
                            );
                            departmentResult = await client.query(
                                `SELECT "id", "name" FROM "Departments"
                                 WHERE lower(btrim("name")) = lower(btrim($1))
                                 LIMIT 1`,
                                [departmentName]
                            );
                        }
                        if (!departmentResult.rowCount) {
                            throw new Error(`KhÃ´ng táº¡o Ä‘Æ°á»£c phÃ²ng ban: ${departmentName}`);
                        }

                        const departmentId = Number(departmentResult.rows[0].id);
                        const canonicalDepartment = String(departmentResult.rows[0].name).trim();
                        const employee = result.employee;
                        const now = new Date();
                        const employeeResult = await client.query(
                            `INSERT INTO "Employees" (
                                "lastname", "firstname", "birthday", "gender", "startDate",
                                "code", "manager", "phone", "address", "department",
                                "ssoEmail", "role", "status", "createdAt", "updatedAt"
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NULL, $12, $13, $13)
                            RETURNING "id"`,
                            [
                                employee.lastname,
                                employee.firstname,
                                employee.birthday || null,
                                employee.gender || null,
                                employee.startDate || null,
                                employee.code,
                                employee.manager || null,
                                employee.phone,
                                employee.address || null,
                                canonicalDepartment,
                                employee.ssoEmail,
                                "Äang lÃ m viá»‡c",
                                now
                            ]
                        );
                        await client.query(
                            `INSERT INTO "EmployeeDepartments"
                                ("employeeId", "departmentId", "createdAt", "updatedAt", "deletedAt")
                             VALUES ($1, $2, $3, $3, NULL)`,
                            [employeeResult.rows[0].id, departmentId, now]
                        );
                        validCount++;
                    }

                    await client.query(
                        `UPDATE user_import_raw
                         SET is_scanned = TRUE, processing_status = 'processed',
                             validation_errors = $1::jsonb, updated_at = CURRENT_TIMESTAMP
                         WHERE id = $2`,
                        [JSON.stringify(result.errors), rawId]
                    );
                    processedCount++;
                }
                await client.query("COMMIT");
                return { batchId, processedCount, validCount };
            } catch (error) {
                await client.query("ROLLBACK");
                throw error;
            } finally {
                client.release();
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Lá»—i xá»­ lÃ½ lÃ´ import.";
            await this.pool.query(
                `UPDATE user_import_raw
                 SET processing_status = 'failed', validation_errors = $1::jsonb,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE batch_id = $2 AND processing_status = 'processing'`,
                [JSON.stringify([message]), batchId]
            );
            return { batchId, failed: true, error: message };
        }
    }
    async create(input: CreateEmployeeDto) {
        const client = await this.pool.connect();
        try {
            await client.query("BEGIN");
            const departmentId = input.departmentIds?.[0] ?? null;
            const departmentName = await this.getDepartmentName(client, departmentId);
            const now = new Date();
            const result = await client.query(
                `INSERT INTO "Employees" (
                    "lastname", "firstname", "birthday", "gender", "startDate",
                    "code", "manager", "phone", "address", "department",
                    "ssoEmail", "role", "status", "createdAt", "updatedAt"
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $14
                ) RETURNING *`,
                [
                    input.lastname.trim(),
                    input.firstname.trim(),
                    input.birthday || null,
                    input.gender || null,
                    input.startDate || null,
                    input.code.trim(),
                    input.manager || null,
                    input.phone.trim(),
                    input.address || null,
                    departmentName,
                    input.ssoEmail.trim(),
                    input.role || null,
                    input.status || "Đang làm việc",
                    now
                ]
            );
            const employee = result.rows[0];

            if (departmentId !== null) {
                await client.query(
                    `INSERT INTO "EmployeeDepartments"
                        ("employeeId", "departmentId", "createdAt", "updatedAt", "deletedAt")
                     VALUES ($1, $2, $3, $3, NULL)`,
                    [employee.id, departmentId, now]
                );
            }

            await client.query("COMMIT");
            return { success: true, data: employee };
        } catch (error) {
            await client.query("ROLLBACK");
            this.handleDatabaseError(error);
        } finally {
            client.release();
        }
    }

    async update(id: number, input: UpdateEmployeeDto) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new NotFoundException("ID nhân viên không hợp lệ.");
        }

        const client = await this.pool.connect();
        try {
            await client.query("BEGIN");
            const existing = await client.query(
                `SELECT "id" FROM "Employees" WHERE "id" = $1 FOR UPDATE`,
                [id]
            );
            if (existing.rowCount === 0) {
                throw new NotFoundException("Không tìm thấy nhân viên.");
            }

            const hasDepartmentUpdate = input.departmentIds !== undefined;
            const requestedDepartmentId = hasDepartmentUpdate
                ? input.departmentIds?.[0] ?? null
                : undefined;
            const departmentName = hasDepartmentUpdate
                ? await this.getDepartmentName(client, requestedDepartmentId ?? null)
                : undefined;

            const assignments: string[] = [];
            const values: unknown[] = [];
            for (const [key, column] of Object.entries(UPDATE_COLUMNS)) {
                if (input[key as keyof UpdateEmployeeDto] === undefined) continue;
                const value = input[key as keyof UpdateEmployeeDto];
                values.push(
                    key === "birthday" || key === "startDate" || key === "gender" ||
                    key === "manager" || key === "address" || key === "role"
                        ? value || null
                        : typeof value === "string" ? value.trim() : value
                );
                assignments.push(`"${column}" = $${values.length}`);
            }

            if (hasDepartmentUpdate) {
                values.push(departmentName);
                assignments.push(`"department" = $${values.length}`);
            }

            values.push(new Date());
            assignments.push(`"updatedAt" = $${values.length}`);
            values.push(id);
            const employeeResult = await client.query(
                `UPDATE "Employees" SET ${assignments.join(", ")} WHERE "id" = $${values.length} RETURNING *`,
                values
            );

            if (hasDepartmentUpdate) {
                const current = await client.query(
                    `SELECT "id", "departmentId" FROM "EmployeeDepartments"
                     WHERE "employeeId" = $1 AND "deletedAt" IS NULL
                     ORDER BY "createdAt" DESC LIMIT 1 FOR UPDATE`,
                    [id]
                );
                const currentRelation = current.rows[0];
                const currentDepartmentId = currentRelation
                    ? Number(currentRelation.departmentId)
                    : null;

                if (currentDepartmentId !== requestedDepartmentId) {
                    const now = new Date();
                    await client.query(
                        `UPDATE "EmployeeDepartments"
                         SET "deletedAt" = $2, "updatedAt" = $2
                         WHERE "employeeId" = $1 AND "deletedAt" IS NULL`,
                        [id, now]
                    );
                    if (requestedDepartmentId !== null) {
                        await client.query(
                            `INSERT INTO "EmployeeDepartments"
                                ("employeeId", "departmentId", "createdAt", "updatedAt", "deletedAt")
                             VALUES ($1, $2, $3, $3, NULL)`,
                            [id, requestedDepartmentId, now]
                        );
                    }
                }
            }

            await client.query("COMMIT");
            return { success: true, data: employeeResult.rows[0] };
        } catch (error) {
            await client.query("ROLLBACK");
            this.handleDatabaseError(error);
        } finally {
            client.release();
        }
    }

    private async getDepartmentName(client: PoolClient, departmentId: number | null) {
        if (departmentId === null) return null;
        const result = await client.query(
            `SELECT "name" FROM "Departments" WHERE "id" = $1`,
            [departmentId]
        );
        if (result.rowCount === 0) {
            throw new NotFoundException("Không tìm thấy phòng ban.");
        }
        return result.rows[0].name as string;
    }

    private handleDatabaseError(error: unknown): never {
        const databaseError = error as { code?: string };
        if (databaseError.code === "23505") {
            throw new ConflictException("Mã nhân viên hoặc email đã tồn tại.");
        }
        throw error;
    }
}
