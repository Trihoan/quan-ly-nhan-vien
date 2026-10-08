"use client";

import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { EmployeeImportSchema } from "@/app/dto/employee.dto";

interface ImportedEmployee {
    lastname: string;
    firstname: string;
    birthday: string;
    gender: string;
    startDate: string;
    code: string;
    manager: string;
    phone: string;
    address: string;
    department: string;
    ssoEmail: string;
}

interface ValidationRow {
    rowNumber: number;
    displayRow?: string;
    employee: ImportedEmployee;
    errors: string[];
    departmentCreated: boolean;
    processingStatus?: "pending" | "processing" | "processed" | "failed";
}

type ImportBatchStatus = "idle" | "saving" | "ready" | "queued" | "processing" | "completed" | "failed";

interface ImportBatchStatusResponse {
    success: boolean;
    batchId: string;
    status: "queued" | "processing" | "completed" | "failed";
    totalCount: number;
    processedCount: number;
    rows: {
        rowNumber: number;
        status: "pending" | "processing" | "processed" | "failed";
        errors: string[];
    }[];
}

interface ValidationBatchResponse {
    rows: ValidationRow[];
    validCount: number;
    invalidCount: number;
}

interface Props {
    open: boolean;
    onClose: () => void;
}

const BATCH_SIZE = 50;
const COLUMN_NAMES = {
    lastname: "Họ và tên đệm",
    firstname: "Tên",
    birthday: "Ngày sinh",
    gender: "Giới tính",
    startDate: "Ngày bắt đầu làm việc",
    code: "Mã nhân viên",
    manager: "Thuộc cấp",
    phone: "Số điện thoại",
    address: "Địa chỉ",
    department: "Phòng ban",
    ssoEmail: "Email SSO"
} as const;

const REQUIRED_COLUMNS = [
    COLUMN_NAMES.lastname,
    COLUMN_NAMES.firstname,
    COLUMN_NAMES.code,
    COLUMN_NAMES.phone,
    COLUMN_NAMES.department,
    COLUMN_NAMES.ssoEmail
];

function cellText(value: unknown): string {
    if (value === null || value === undefined) return "";
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value.toISOString().slice(0, 10);
    }
    return String(value).trim();
}

function dateText(value: unknown): string {
    if (typeof value === "number" && Number.isFinite(value)) {
        const parsed = XLSX.SSF.parse_date_code(value);
        if (parsed) {
            return `${parsed.y}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
        }
    }
    const text = cellText(value);
    const isoMatch = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:T.*)?$/);
    if (isoMatch) {
        return `${isoMatch[1]}-${isoMatch[2].padStart(2, "0")}-${isoMatch[3].padStart(2, "0")}`;
    }

    // Excel files in this project commonly store dates as DD/MM/YYYY text.
    const localMatch = text.match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/);
    if (localMatch) {
        return `${localMatch[3]}-${localMatch[2].padStart(2, "0")}-${localMatch[1].padStart(2, "0")}`;
    }

    return text;
}

function isValidDate(value: string): boolean {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function normalizeCode(value: string): string {
    return value.trim().toLocaleLowerCase("en-US");
}

function localRowErrors(employee: ImportedEmployee): string[] {
    const parsed = EmployeeImportSchema.safeParse(employee);
    const errors = parsed.success
        ? []
        : parsed.error.issues
              .filter((issue) => issue.path[0] !== "ssoEmail")
              .map((issue) => issue.message);
    const phoneDigits = employee.phone.replace(/\D/g, "");
    const ssoEmail = employee.ssoEmail.trim();

    if (employee.phone.trim() && phoneDigits.length < 10) {
        errors.push("Số điện thoại phải có ít nhất 10 chữ số.");
    }

    if (employee.birthday && !isValidDate(employee.birthday)) {
        errors.push("Ngày sinh không hợp lệ; dùng định dạng DD/MM/YYYY hoặc YYYY-MM-DD.");
    }
    if (employee.startDate && !isValidDate(employee.startDate)) {
        errors.push("Ngày bắt đầu làm việc không hợp lệ; dùng định dạng DD/MM/YYYY hoặc YYYY-MM-DD.");
    }

    if (!ssoEmail) {
        errors.push("Thiếu Email SSO.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ssoEmail)) {
        errors.push("Email SSO không đúng định dạng.");
    }

    return errors;
}

export default function UploadEmployeesModal({ open, onClose }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [savedCount, setSavedCount] = useState(0);
    const [batchId, setBatchId] = useState("");
    const [batchStatus, setBatchStatus] = useState<ImportBatchStatus>("idle");
    const [message, setMessage] = useState("");
    const [rows, setRows] = useState<ValidationRow[]>([]);

    useEffect(() => {
        if (!open || !batchId || !["queued", "processing"].includes(batchStatus)) return;
        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const poll = async () => {
            try {
                const response = await fetch(`/api/employees/import/${batchId}`, { cache: "no-store" });
                const result = await response.json() as ImportBatchStatusResponse & { message?: string };
                if (!response.ok) throw new Error(result.message || `HTTP ${response.status}`);
                if (cancelled) return;
                setBatchStatus(result.status);
                setRows((current) => current.map((row) => {
                    const processed = result.rows.find((item) => item.rowNumber === row.rowNumber);
                    return processed ? { ...row, processingStatus: processed.status, errors: processed.errors } : row;
                }));
                if (result.status === "completed" || result.status === "failed") {
                    setMessage(`Batch ${result.status}: ${result.processedCount}/${result.totalCount} dòng đã xử lý.`);
                    return;
                }
            } catch (error) {
                if (!cancelled) setMessage(error instanceof Error ? error.message : "Không lấy được trạng thái batch.");
            }
            if (!cancelled) timer = setTimeout(poll, 1200);
        };
        void poll();
        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, [open, batchId, batchStatus]);

    if (!open) return null;

    const resetState = () => {
        setFileName("");
        setMessage("");
        setRows([]);
        setIsChecking(false);
        setIsImporting(false);
        setSavedCount(0);
        setBatchId("");
        setBatchStatus("idle");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const validateFile = async (file: File) => {
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (extension !== "xls" && extension !== "xlsx") {
            setMessage("Chỉ chấp nhận file Excel .xls hoặc .xlsx.");
            return;
        }
        if (file.size > 100 * 1024 * 1024) {
            setMessage("File vượt quá giới hạn 100 MB.");
            return;
        }

        setFileName(file.name);
        setMessage("");
        setRows([]);
        setSavedCount(0);
        setBatchId(crypto.randomUUID());
        setBatchStatus("idle");
        setIsChecking(true);

        try {
            const workbook = XLSX.read(await file.arrayBuffer(), {
                type: "array",
                cellDates: true
            });
            const sheetName = workbook.SheetNames[0];
            const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
            if (!sheet) throw new Error("Không tìm thấy trang tính trong file.");

            const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
                header: 1,
                defval: "",
                blankrows: true,
                raw: true
            });
            const headers = (matrix[0] ?? []).map((value) => cellText(value).trim());
            const columnIndex = new Map(headers.map((header, index) => [header, index]));
            const sttColumnIndex = headers.findIndex(
                (header) => header.toLocaleLowerCase("vi-VN") === "stt"
            );
            const missingColumns = REQUIRED_COLUMNS.filter((header) => !columnIndex.has(header));
            if (missingColumns.length) {
                throw new Error(`Thiếu cột trong file mẫu: ${missingColumns.join(", ")}.`);
            }

            const getValue = (sourceRow: unknown[], column: string) =>
                sourceRow[columnIndex.get(column)!];

            const parsedRows: ValidationRow[] = matrix
                .slice(1)
                .map((sourceRow, index) => {
                    const employee: ImportedEmployee = {
                        lastname: cellText(getValue(sourceRow, COLUMN_NAMES.lastname)),
                        firstname: cellText(getValue(sourceRow, COLUMN_NAMES.firstname)),
                        birthday: dateText(getValue(sourceRow, COLUMN_NAMES.birthday)),
                        gender: cellText(getValue(sourceRow, COLUMN_NAMES.gender)),
                        startDate: dateText(getValue(sourceRow, COLUMN_NAMES.startDate)),
                        code: cellText(getValue(sourceRow, COLUMN_NAMES.code)),
                        manager: cellText(getValue(sourceRow, COLUMN_NAMES.manager)),
                        phone: cellText(getValue(sourceRow, COLUMN_NAMES.phone)),
                        address: cellText(getValue(sourceRow, COLUMN_NAMES.address)),
                        department: cellText(getValue(sourceRow, COLUMN_NAMES.department)),
                        ssoEmail: cellText(getValue(sourceRow, COLUMN_NAMES.ssoEmail))
                    };

                    return {
                        rowNumber: index + 2,
                        displayRow:
                            sttColumnIndex >= 0
                                ? cellText(sourceRow[sttColumnIndex]) || String(index + 1)
                                : undefined,
                        employee,
                        errors: localRowErrors(employee),
                        departmentCreated: false
                    };
                })
                .filter(({ employee }) =>
                    Object.values(employee).some((value) => value.trim() !== "")
                );

            if (!parsedRows.length) throw new Error("File không có dòng nhân viên nào để kiểm tra.");

            const codeRows = new Map<string, ValidationRow[]>();
            for (const row of parsedRows) {
                const code = normalizeCode(row.employee.code);
                if (!code) continue;
                codeRows.set(code, [...(codeRows.get(code) ?? []), row]);
            }
            for (const duplicates of codeRows.values()) {
                if (duplicates.length > 1) {
                    for (const row of duplicates) {
                        row.errors.push("Mã nhân viên bị trùng trong file.");
                    }
                }
            }

            const emailRows = new Map<string, ValidationRow[]>();
            for (const row of parsedRows) {
                const email = row.employee.ssoEmail.trim().toLocaleLowerCase("en-US");
                if (!email) continue;
                emailRows.set(email, [...(emailRows.get(email) ?? []), row]);
            }
            for (const duplicates of emailRows.values()) {
                if (duplicates.length > 1) {
                    for (const row of duplicates) {
                        row.errors.push("Email SSO bị trùng trong file.");
                    }
                }
            }

            const serverRows: ValidationRow[] = [];

            for (let offset = 0; offset < parsedRows.length; offset += BATCH_SIZE) {
                const batch = parsedRows.slice(offset, offset + BATCH_SIZE);
                const response = await fetch("/api/employees/import/validate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        rows: batch.map(({ rowNumber, employee, errors }) => ({
                            rowNumber,
                            allowDepartmentInsert: errors.length === 0,
                            ...employee
                        }))
                    })
                });
                const result = (await response.json()) as ValidationBatchResponse & {
                    message?: string;
                };
                if (!response.ok) {
                    throw new Error(result.message || `Máy chủ trả về HTTP ${response.status}.`);
                }

                serverRows.push(...result.rows);
            }

            const serverRowsByNumber = new Map(serverRows.map((row) => [row.rowNumber, row]));
            const finalRows = parsedRows.map((row) => {
                const serverRow = serverRowsByNumber.get(row.rowNumber);
                if (!serverRow) return row;
                return {
                    ...serverRow,
                    displayRow: row.displayRow,
                    errors: Array.from(new Set([...row.errors, ...serverRow.errors]))
                };
            });
            setRows(finalRows);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Không thể kiểm tra file.");
        } finally {
            setIsChecking(false);
        }
    };

    const handleImport = async () => {
        if (!rows.length || !batchId || rows.some((row) => row.errors.length > 0)) return;
        setIsImporting(true);
        setMessage("");
        setBatchStatus("saving");
        let totalSaved = 0;
        try {
            for (let offset = 0; offset < rows.length; offset += BATCH_SIZE) {
                const batch = rows.slice(offset, offset + BATCH_SIZE);
                const response = await fetch("/api/employees/import", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        batchId,
                        rows: batch.map(({ rowNumber, employee }) => ({ rowNumber, ...employee }))
                    })
                });
                const result = await response.json() as {
                    savedCount?: number;
                    message?: string | string[];
                    invalidRows?: { rowNumber: number; errors: string[] }[];
                };
                if (!response.ok) {
                    if (result.invalidRows?.length) {
                        const errorsByRow = new Map(result.invalidRows.map((row) => [row.rowNumber, row.errors]));
                        setRows((current) => current.map((row) => {
                            const errors = errorsByRow.get(row.rowNumber);
                            return errors ? { ...row, errors } : row;
                        }));
                    }
                    const errorMessage = Array.isArray(result.message) ? result.message.join(" ") : result.message;
                    throw new Error(errorMessage || `Server returned HTTP ${response.status}.`);
                }
                totalSaved += result.savedCount ?? batch.length;
                setSavedCount(totalSaved);
            }

            const scanResponse = await fetch("/api/employees/import/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ batchId })
            });
            const scanResult = await scanResponse.json() as { message?: string };
            if (!scanResponse.ok) throw new Error(scanResult.message || `Could not enqueue batch (HTTP ${scanResponse.status}).`);
            setBatchStatus("queued");
            setMessage(`Đã lưu ${totalSaved} dòng vào raw và gửi vào hàng đợi. Đang chờ NestJS xử lý...`);
        } catch (error) {
            setBatchStatus("ready");
            setMessage(error instanceof Error ? error.message : "Không thể gửi batch import.");
        } finally {
            setIsImporting(false);
        }
    };
    const canImport = rows.length > 0 && rows.every((row) => row.errors.length === 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className={`w-full rounded-xl bg-white p-6 shadow-2xl ${rows.length > 0 ? "max-h-[90vh] max-w-5xl overflow-y-auto" : "max-w-xl"}`}>
                <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        {rows.length > 0 ? "Kiểm tra file nhân viên" : "Tải lên tệp nhân viên"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="cursor-pointer text-xl font-bold leading-none text-gray-400 transition-colors hover:text-red-500"
                        aria-label="Đóng"
                    >
                        ✕
                    </button>
                </div>

                <div
                    onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(event) => {
                        event.preventDefault();
                        setIsDragging(false);
                        const file = event.dataTransfer.files?.[0];
                        if (file) void validateFile(file);
                    }}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 text-sm transition-all duration-200 ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                >
                    <button
                        type="button"
                        disabled={isChecking || isImporting}
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer mb-3 rounded-md border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                        {isChecking ? "Đang kiểm tra..." : "Tải lên"}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xls,.xlsx"
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) void validateFile(file);
                        }}
                    />
                    <span className={`mb-1 text-sm ${fileName ? "font-semibold text-blue-600" : "text-gray-500"}`}>
                        {fileName || "Chưa có file nào được chọn"}
                    </span>
                    <span className="text-xs text-gray-400">Định dạng hỗ trợ: XLS, XLSX — Tối đa 100MB</span>
                </div>
                {message && (
                    <p className={`mb-4 rounded-lg p-3 text-sm ${savedCount > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {message}
                    </p>
                )}

                {rows.length > 0 && (
                    <>
                        <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                            <span className="font-semibold text-green-700">Hợp lệ: {rows.filter((row) => row.errors.length === 0).length}</span>
                            <span className="font-semibold text-red-700">Cần sửa: {rows.filter((row) => row.errors.length > 0).length}</span>
                        </div>
                        <p className="mb-3 text-xs text-gray-500">
                            {rows.some((row) => row.errors.length > 0)
                                ? "Còn dòng chưa hợp lệ nên chưa lưu dữ liệu. Đóng cửa sổ, sửa các dòng báo lỗi trong file rồi tải lên lại."
                                : "Chỉ lưu vào bảng raw khi tất cả dòng đều hợp lệ. Consumer vẫn kiểm tra lại trước khi ghi vào danh sách nhân viên."}
                        </p>
                        <div className="overflow-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                                <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-600">
                                    <tr>
                                        <th className="px-3 py-2">{rows.some((row) => row.displayRow !== undefined) ? "STT" : "Dòng"}</th>
                                        <th className="px-3 py-2">Nhân viên</th>
                                        <th className="px-3 py-2">Mã</th>
                                        <th className="px-3 py-2">Phòng ban</th>
                                        <th className="px-3 py-2">Kết quả</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {rows.map((row) => (
                                        <tr key={row.rowNumber} className={row.errors.length ? "bg-red-50/60" : "bg-white"}>
                                            <td className="whitespace-nowrap px-3 py-2">{row.displayRow ?? row.rowNumber}</td>
                                            <td className="whitespace-nowrap px-3 py-2">{`${row.employee.lastname} ${row.employee.firstname}`.trim() || "—"}</td>
                                            <td className="whitespace-nowrap px-3 py-2">{row.employee.code || "—"}</td>
                                            <td className="whitespace-nowrap px-3 py-2">{row.employee.department || "—"}</td>
                                            <td className="min-w-64 px-3 py-2">
                                                {row.processingStatus && <div className="mb-1 font-semibold">{row.processingStatus}</div>}
                                                {row.errors.length === 0 ? (
                                                    <span className="font-medium text-green-700">Hợp lệ</span>
                                                ) : (
                                                    <ul className="list-inside list-disc text-red-700">
                                                        {row.errors.map((error) => <li key={error}>{error}</li>)}
                                                    </ul>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <a
                        href="/Mau_File_Nhan_Vien.xlsx"
                        download="Mau_File_Nhan_Vien.xlsx"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Tải xuống file mẫu
                    </a>
                    <button
                       onClick={(batchStatus === "ready" || batchStatus === "idle") && canImport ? handleImport : handleClose}
                        disabled={isChecking || isImporting || batchStatus === "queued" || batchStatus === "processing" || batchStatus === "saving"}
                        className={`cursor-pointer rounded-md px-5 py-2 text-sm font-medium disabled:opacity-50 ${
                                (batchStatus !== "ready" && batchStatus !== "idle") || !canImport
                                    ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" 
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}  
                        >
                        {(batchStatus === "ready" || batchStatus === "idle") && canImport ? (isImporting ? "Đang lưu..." : "Lưu raw và đưa vào hàng đợi") : batchStatus === "queued" || batchStatus === "processing" ? "Đang xử lý..." : "Đóng"}
                    </button>
                </div>
            </div>
        </div>  
    );  
}
