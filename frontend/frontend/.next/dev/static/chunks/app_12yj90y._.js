(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dto/employee.dto.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmployeeImportSchema",
    ()=>EmployeeImportSchema,
    "validateEmployeeDto",
    ()=>validateEmployeeDto
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const EmployeeImportSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Thiếu mã nhân viên."),
    lastname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Thiếu họ và tên đệm."),
    firstname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Thiếu tên."),
    ssoEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Thiếu Email SSO.").email("Email SSO không đúng định dạng."),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Thiếu số điện thoại."),
    department: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Thiếu phòng ban."),
    gender: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
function validateEmployeeDto(data) {
    if (!data.lastname || !data.lastname.trim()) {
        return "Họ và tên đệm không được để trống!";
    }
    if (!data.firstname || !data.firstname.trim()) {
        return "Tên không được để trống!";
    }
    if (!data.code || !data.code.trim()) {
        return "Mã nhân viên không được để trống!";
    }
    // Validate số điện thoại
    if (!data.phone || !String(data.phone).trim()) {
        return "Số điện thoại không được để trống";
    }
    if (String(data.phone).trim().length < 10) {
        return "Số điện thoại phải có ít nhất 10 số";
    }
    // Validate SSO Email
    if (!data.ssoEmail || !String(data.ssoEmail).trim()) {
        return "ssoEmail không được để trống";
    }
    if (!String(data.ssoEmail).trim().includes("@")) {
        return "ssoEmail phải chứa ký tự @";
    }
    if (data.departmentIds !== undefined && !Array.isArray(data.departmentIds)) {
        return "departmentIds phải là một mảng";
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/employees/components/UploadEmployeesModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadEmployeesModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dto$2f$employee$2e$dto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dto/employee.dto.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
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
};
const REQUIRED_COLUMNS = [
    COLUMN_NAMES.lastname,
    COLUMN_NAMES.firstname,
    COLUMN_NAMES.code,
    COLUMN_NAMES.phone,
    COLUMN_NAMES.department,
    COLUMN_NAMES.ssoEmail
];
function cellText(value) {
    if (value === null || value === undefined) return "";
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value.toISOString().slice(0, 10);
    }
    return String(value).trim();
}
function dateText(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SSF"].parse_date_code(value);
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
function isValidDate(value) {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
function normalizeCode(value) {
    return value.trim().toLocaleLowerCase("en-US");
}
function localRowErrors(employee) {
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dto$2f$employee$2e$dto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmployeeImportSchema"].safeParse(employee);
    const errors = parsed.success ? [] : parsed.error.issues.filter((issue)=>issue.path[0] !== "ssoEmail").map((issue)=>issue.message);
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
function UploadEmployeesModal({ open, onClose }) {
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isChecking, setIsChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isImporting, setIsImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedCount, setSavedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [batchId, setBatchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [batchStatus, setBatchStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadEmployeesModal.useEffect": ()=>{
            if (!open || !batchId || ![
                "queued",
                "processing"
            ].includes(batchStatus)) return;
            let cancelled = false;
            let timer;
            const poll = {
                "UploadEmployeesModal.useEffect.poll": async ()=>{
                    try {
                        const response = await fetch(`/api/employees/import/${batchId}`, {
                            cache: "no-store"
                        });
                        const result = await response.json();
                        if (!response.ok) throw new Error(result.message || `HTTP ${response.status}`);
                        if (cancelled) return;
                        setBatchStatus(result.status);
                        setRows({
                            "UploadEmployeesModal.useEffect.poll": (current)=>current.map({
                                    "UploadEmployeesModal.useEffect.poll": (row)=>{
                                        const processed = result.rows.find({
                                            "UploadEmployeesModal.useEffect.poll.processed": (item)=>item.rowNumber === row.rowNumber
                                        }["UploadEmployeesModal.useEffect.poll.processed"]);
                                        return processed ? {
                                            ...row,
                                            processingStatus: processed.status,
                                            errors: processed.errors
                                        } : row;
                                    }
                                }["UploadEmployeesModal.useEffect.poll"])
                        }["UploadEmployeesModal.useEffect.poll"]);
                        if (result.status === "completed" || result.status === "failed") {
                            setMessage(`Batch ${result.status}: ${result.processedCount}/${result.totalCount} dòng đã xử lý.`);
                            return;
                        }
                    } catch (error) {
                        if (!cancelled) setMessage(error instanceof Error ? error.message : "Không lấy được trạng thái batch.");
                    }
                    if (!cancelled) timer = setTimeout(poll, 1200);
                }
            }["UploadEmployeesModal.useEffect.poll"];
            void poll();
            return ({
                "UploadEmployeesModal.useEffect": ()=>{
                    cancelled = true;
                    if (timer) clearTimeout(timer);
                }
            })["UploadEmployeesModal.useEffect"];
        }
    }["UploadEmployeesModal.useEffect"], [
        open,
        batchId,
        batchStatus
    ]);
    if (!open) return null;
    const resetState = ()=>{
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
    const handleClose = ()=>{
        resetState();
        onClose();
    };
    const validateFile = async (file)=>{
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
            const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["read"](await file.arrayBuffer(), {
                type: "array",
                cellDates: true
            });
            const sheetName = workbook.SheetNames[0];
            const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
            if (!sheet) throw new Error("Không tìm thấy trang tính trong file.");
            const matrix = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(sheet, {
                header: 1,
                defval: "",
                blankrows: true,
                raw: true
            });
            const headers = (matrix[0] ?? []).map((value)=>cellText(value).trim());
            const columnIndex = new Map(headers.map((header, index)=>[
                    header,
                    index
                ]));
            const sttColumnIndex = headers.findIndex((header)=>header.toLocaleLowerCase("vi-VN") === "stt");
            const missingColumns = REQUIRED_COLUMNS.filter((header)=>!columnIndex.has(header));
            if (missingColumns.length) {
                throw new Error(`Thiếu cột trong file mẫu: ${missingColumns.join(", ")}.`);
            }
            const getValue = (sourceRow, column)=>sourceRow[columnIndex.get(column)];
            const parsedRows = matrix.slice(1).map((sourceRow, index)=>{
                const employee = {
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
                    displayRow: sttColumnIndex >= 0 ? cellText(sourceRow[sttColumnIndex]) || String(index + 1) : undefined,
                    employee,
                    errors: localRowErrors(employee),
                    departmentCreated: false
                };
            }).filter(({ employee })=>Object.values(employee).some((value)=>value.trim() !== ""));
            if (!parsedRows.length) throw new Error("File không có dòng nhân viên nào để kiểm tra.");
            const codeRows = new Map();
            for (const row of parsedRows){
                const code = normalizeCode(row.employee.code);
                if (!code) continue;
                codeRows.set(code, [
                    ...codeRows.get(code) ?? [],
                    row
                ]);
            }
            for (const duplicates of codeRows.values()){
                if (duplicates.length > 1) {
                    for (const row of duplicates){
                        row.errors.push("Mã nhân viên bị trùng trong file.");
                    }
                }
            }
            const emailRows = new Map();
            for (const row of parsedRows){
                const email = row.employee.ssoEmail.trim().toLocaleLowerCase("en-US");
                if (!email) continue;
                emailRows.set(email, [
                    ...emailRows.get(email) ?? [],
                    row
                ]);
            }
            for (const duplicates of emailRows.values()){
                if (duplicates.length > 1) {
                    for (const row of duplicates){
                        row.errors.push("Email SSO bị trùng trong file.");
                    }
                }
            }
            const serverRows = [];
            for(let offset = 0; offset < parsedRows.length; offset += BATCH_SIZE){
                const batch = parsedRows.slice(offset, offset + BATCH_SIZE);
                const response = await fetch("/api/employees/import/validate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        rows: batch.map(({ rowNumber, employee, errors })=>({
                                rowNumber,
                                allowDepartmentInsert: errors.length === 0,
                                ...employee
                            }))
                    })
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || `Máy chủ trả về HTTP ${response.status}.`);
                }
                serverRows.push(...result.rows);
            }
            const serverRowsByNumber = new Map(serverRows.map((row)=>[
                    row.rowNumber,
                    row
                ]));
            const finalRows = parsedRows.map((row)=>{
                const serverRow = serverRowsByNumber.get(row.rowNumber);
                if (!serverRow) return row;
                return {
                    ...serverRow,
                    displayRow: row.displayRow,
                    errors: Array.from(new Set([
                        ...row.errors,
                        ...serverRow.errors
                    ]))
                };
            });
            setRows(finalRows);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Không thể kiểm tra file.");
        } finally{
            setIsChecking(false);
        }
    };
    const handleImport = async ()=>{
        if (!rows.length || !batchId || rows.some((row)=>row.errors.length > 0)) return;
        setIsImporting(true);
        setMessage("");
        setBatchStatus("saving");
        let totalSaved = 0;
        try {
            for(let offset = 0; offset < rows.length; offset += BATCH_SIZE){
                const batch = rows.slice(offset, offset + BATCH_SIZE);
                const response = await fetch("/api/employees/import", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        batchId,
                        rows: batch.map(({ rowNumber, employee })=>({
                                rowNumber,
                                ...employee
                            }))
                    })
                });
                const result = await response.json();
                if (!response.ok) {
                    if (result.invalidRows?.length) {
                        const errorsByRow = new Map(result.invalidRows.map((row)=>[
                                row.rowNumber,
                                row.errors
                            ]));
                        setRows((current)=>current.map((row)=>{
                                const errors = errorsByRow.get(row.rowNumber);
                                return errors ? {
                                    ...row,
                                    errors
                                } : row;
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    batchId
                })
            });
            const scanResult = await scanResponse.json();
            if (!scanResponse.ok) throw new Error(scanResult.message || `Could not enqueue batch (HTTP ${scanResponse.status}).`);
            setBatchStatus("queued");
            setMessage(`Đã lưu ${totalSaved} dòng vào raw và gửi vào hàng đợi. Đang chờ NestJS xử lý...`);
        } catch (error) {
            setBatchStatus("ready");
            setMessage(error instanceof Error ? error.message : "Không thể gửi batch import.");
        } finally{
            setIsImporting(false);
        }
    };
    const canImport = rows.length > 0 && rows.every((row)=>row.errors.length === 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full rounded-xl bg-white p-6 shadow-2xl ${rows.length > 0 ? "max-h-[90vh] max-w-5xl overflow-y-auto" : "max-w-xl"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 flex items-center justify-between border-b border-gray-100 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-gray-800",
                            children: rows.length > 0 ? "Kiểm tra file nhân viên" : "Tải lên tệp nhân viên"
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 427,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleClose,
                            className: "cursor-pointer text-xl font-bold leading-none text-gray-400 transition-colors hover:text-red-500",
                            "aria-label": "Đóng",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 430,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                    lineNumber: 426,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onDragOver: (event)=>{
                        event.preventDefault();
                        setIsDragging(true);
                    },
                    onDragLeave: ()=>setIsDragging(false),
                    onDrop: (event)=>{
                        event.preventDefault();
                        setIsDragging(false);
                        const file = event.dataTransfer.files?.[0];
                        if (file) void validateFile(file);
                    },
                    className: `flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 text-sm transition-all duration-200 ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: isChecking || isImporting,
                            onClick: ()=>fileInputRef.current?.click(),
                            className: "cursor-pointer mb-3 rounded-md border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50",
                            children: isChecking ? "Đang kiểm tra..." : "Tải lên"
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 450,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: fileInputRef,
                            type: "file",
                            accept: ".xls,.xlsx",
                            className: "hidden",
                            onChange: (event)=>{
                                const file = event.target.files?.[0];
                                if (file) void validateFile(file);
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 458,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `mb-1 text-sm ${fileName ? "font-semibold text-blue-600" : "text-gray-500"}`,
                            children: fileName || "Chưa có file nào được chọn"
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 468,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-gray-400",
                            children: "Định dạng hỗ trợ: XLS, XLSX — Tối đa 100MB"
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 471,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                    lineNumber: 439,
                    columnNumber: 17
                }, this),
                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `mb-4 rounded-lg p-3 text-sm ${savedCount > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`,
                    children: message
                }, void 0, false, {
                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                    lineNumber: 474,
                    columnNumber: 21
                }, this),
                rows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-green-700",
                                    children: [
                                        "Hợp lệ: ",
                                        rows.filter((row)=>row.errors.length === 0).length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                    lineNumber: 482,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-red-700",
                                    children: [
                                        "Cần sửa: ",
                                        rows.filter((row)=>row.errors.length > 0).length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                    lineNumber: 483,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 481,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-3 text-xs text-gray-500",
                            children: rows.some((row)=>row.errors.length > 0) ? "Còn dòng chưa hợp lệ nên chưa lưu dữ liệu. Đóng cửa sổ, sửa các dòng báo lỗi trong file rồi tải lên lại." : "Chỉ lưu vào bảng raw khi tất cả dòng đều hợp lệ. Consumer vẫn kiểm tra lại trước khi ghi vào danh sách nhân viên."
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 485,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-auto rounded-lg border border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full divide-y divide-gray-200 text-left text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "sticky top-0 bg-gray-50 text-xs uppercase text-gray-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: rows.some((row)=>row.displayRow !== undefined) ? "STT" : "Dòng"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Nhân viên"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Mã"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Phòng ban"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Kết quả"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                            lineNumber: 493,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                        lineNumber: 492,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-gray-100",
                                        children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: row.errors.length ? "bg-red-50/60" : "bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-3 py-2",
                                                        children: row.displayRow ?? row.rowNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-3 py-2",
                                                        children: `${row.employee.lastname} ${row.employee.firstname}`.trim() || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-3 py-2",
                                                        children: row.employee.code || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-3 py-2",
                                                        children: row.employee.department || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "min-w-64 px-3 py-2",
                                                        children: [
                                                            row.processingStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-1 font-semibold",
                                                                children: row.processingStatus
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                                lineNumber: 509,
                                                                columnNumber: 74
                                                            }, this),
                                                            row.errors.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-green-700",
                                                                children: "Hợp lệ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                                lineNumber: 511,
                                                                columnNumber: 53
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "list-inside list-disc text-red-700",
                                                                children: row.errors.map((error)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: error
                                                                    }, error, false, {
                                                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 84
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                                lineNumber: 513,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, row.rowNumber, true, {
                                                fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                                lineNumber: 503,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                        lineNumber: 501,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                                lineNumber: 491,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 490,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                    lineNumber: 480,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex items-center justify-between border-t border-gray-100 pt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/Mau_File_Nhan_Vien.xlsx",
                            download: "Mau_File_Nhan_Vien.xlsx",
                            className: "text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline",
                            children: "Tải xuống file mẫu"
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 527,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (batchStatus === "ready" || batchStatus === "idle") && canImport ? handleImport : handleClose,
                            disabled: isChecking || isImporting || batchStatus === "queued" || batchStatus === "processing" || batchStatus === "saving",
                            className: `cursor-pointer rounded-md px-5 py-2 text-sm font-medium disabled:opacity-50 ${batchStatus !== "ready" && batchStatus !== "idle" || !canImport ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" : "bg-blue-600 text-white hover:bg-blue-700"}`,
                            children: (batchStatus === "ready" || batchStatus === "idle") && canImport ? isImporting ? "Đang lưu..." : "Lưu raw và đưa vào hàng đợi" : batchStatus === "queued" || batchStatus === "processing" ? "Đang xử lý..." : "Đóng"
                        }, void 0, false, {
                            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                            lineNumber: 534,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
                    lineNumber: 526,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
            lineNumber: 425,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/employees/components/UploadEmployeesModal.tsx",
        lineNumber: 424,
        columnNumber: 9
    }, this);
}
_s(UploadEmployeesModal, "UrgnlrDZ58nXHNpCj88BUsglQrc=");
_c = UploadEmployeesModal;
var _c;
__turbopack_context__.k.register(_c, "UploadEmployeesModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/employees/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmployeeManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/graphql.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$employees$2f$components$2f$UploadEmployeesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/employees/components/UploadEmployeesModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function EmployeeManager() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // state luu danh sách nhân viên
    const [employees, setEmployee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDept, setSelectedDept] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Tất cả"); // Lọc phòng ban 
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("newest"); // sắp xếp 
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // Lưu trữ từ khóa TÌm kiếm
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1); // Phân trang và useState(1) là đánh dấu số hiện tại
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10); // Cấu hình số dòng trogn 1 trang
    // KHởi tạo danh sách trống ()
    // const [employees, setEmployee] = useState<Employee[]>()
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadAttempt, setLoadAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [showUploadModal, setShowUploadModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Query danh sách từ schema GraphQL do PostGraphile sinh từ PostgreSQL.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmployeeManager.useEffect": ()=>{
            const fetchEmployees = {
                "EmployeeManager.useEffect.fetchEmployees": async ()=>{
                    setIsLoading(true);
                    setLoadError("");
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphqlRequest"])(`query EmployeeDashboard {
          allEmployees(orderBy: [CODE_ASC]) {
            nodes {
              id
              code
              firstname
              lastname
              department
              ssoEmail
              phone
              gender
              status
            }
          }
        }`);
                        const apiData = data.allEmployees.nodes;
                        // Lắp ráp dữ liệu chuẩn xác 100% từ Database vào Giao diện
                        const formattedData = apiData.map({
                            "EmployeeManager.useEffect.fetchEmployees.formattedData": (emp)=>({
                                    id: emp.id,
                                    name: `${emp.lastname} ${emp.firstname}`,
                                    code: emp.code,
                                    department: emp.department || "",
                                    email: emp.ssoEmail || "---",
                                    phone: emp.phone || "---",
                                    gender: emp.gender || "Chưa xác định",
                                    status: emp.status // Lấy thẳng chữ "Đang làm việc" / "Đã nghỉ việc" từ DB
                                })
                        }["EmployeeManager.useEffect.fetchEmployees.formattedData"]);
                        setEmployee(formattedData);
                    } catch (error) {
                        setLoadError(error instanceof DOMException && error.name === "TimeoutError" ? "Kết nối cơ sở dữ liệu quá lâu. Vui lòng thử lại." : error instanceof Error ? error.message : "Không tải được danh sách nhân viên. Vui lòng thử lại.");
                        console.error("Lỗi khi kéo data từ API:", error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["EmployeeManager.useEffect.fetchEmployees"];
            fetchEmployees();
        }
    }["EmployeeManager.useEffect"], [
        loadAttempt
    ]);
    // tạo danh sách bộ lọc phòng ban
    const department = [
        "Tất cả",
        ...Array.from(new Set(employees.map((e)=>e.department).filter(Boolean)))
    ];
    // Trích xuất số liệu thống kê
    const total = employees.length;
    const activeCount = employees.filter((e)=>e.status === "Đang làm việc").length;
    const inactiveCount = employees.filter((e)=>e.status === "Đã nghỉ việc").length;
    // logic Xóa nhân viên 
    // Lọc + tìm kiếm + Sắp xếp
    let result = employees.filter((emp)=>{
        if (statusFilter === "active") return emp.status === "Đang làm việc";
        if (statusFilter === "inactive") return emp.status === "Đã nghỉ việc";
        return true;
    });
    result = result.filter((emp)=>selectedDept === "Tất cả" || emp.department === selectedDept);
    if (searchTerm) {
        const q = searchTerm.toLowerCase();
        result = result.filter((e)=>e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q) || e.email.toLowerCase().includes(q));
    }
    result = [
        ...result
    ].sort((a, b)=>sortOrder === "newest" ? b.id - a.id : a.id - b.id);
    // Phân trang 
    const totalRecords = result.length;
    const startIdx = (currentPage - 1) * pageSize;
    const paginated = result.slice(startIdx, startIdx + pageSize);
    const totalPages = Math.ceil(totalRecords / pageSize);
    // Danh sách nhân vien 
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#f3f3f3] p-8 text-gray-900 font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1400px] mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold",
                                children: "Danh sách nhân viên"
                            }, void 0, false, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowUploadModal(true),
                                        className: " cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block",
                                        children: "Tải lên"
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/employees/add",
                                        className: "bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block",
                                        children: "Thêm mới"
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/employees/page.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: selectedDept,
                            onChange: (e)=>{
                                setSelectedDept(e.target.value);
                                setCurrentPage(1);
                            },
                            className: "border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm focus:outline-none w-56 cursor-pointer",
                            children: department.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: d,
                                    children: d === "Tất cả" ? "Phòng ban: Tất cả" : d
                                }, d, false, {
                                    fileName: "[project]/app/employees/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/employees/page.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/employees/page.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2 bg-white rounded-2xl border border-gray-200 mb-6 p-2 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>{
                                    setStatusFilter("all");
                                    setCurrentPage(1);
                                },
                                className: `p-4 rounded-xl cursor-pointer transition-all border-r border-gray-100 ${statusFilter === "all" ? "bg-[#f1f3f5] border border-gray-300 shadow-xs" : "bg-white hover:bg-gray-50 border border-transparent"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mb-1 font-medium",
                                        children: "Tất cả"
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-gray-900",
                                        children: total
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 185,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>{
                                    setStatusFilter("active");
                                    setCurrentPage(1);
                                },
                                className: `p-4 rounded-xl cursor-pointer transition-all border-r border-gray-100 ${statusFilter === "active" ? "bg-[#f1f3f5] border border-gray-300 shadow-xs" : "bg-white hover:bg-gray-50 border border-transparent"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mb-1 font-medium",
                                        children: "Đang làm việc"
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-gray-900",
                                        children: activeCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 196,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>{
                                    setStatusFilter("inactive");
                                    setCurrentPage(1);
                                },
                                className: `p-4 rounded-xl cursor-pointer transition-all ${statusFilter === "inactive" ? "bg-[#f1f3f5] border border-gray-300 shadow-xs" : "bg-white hover:bg-gray-50 border border-transparent"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mb-1 font-medium",
                                        children: "Đã nghỉ việc"
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-gray-900",
                                        children: inactiveCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 207,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/employees/page.tsx",
                        lineNumber: 182,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-4 border-b border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1 p-1 bg-gray-100 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSortOrder("newest"),
                                                className: `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${sortOrder === "newest" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"}`,
                                                children: "Mới nhất"
                                            }, void 0, false, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSortOrder("oldest"),
                                                className: `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${sortOrder === "oldest" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"}`,
                                                children: "Cũ nhất"
                                            }, void 0, false, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: searchTerm,
                                                onChange: (e)=>{
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1);
                                                },
                                                placeholder: "Tìm kiếm...",
                                                className: "border border-gray-300 rounded-md pl-3 pr-10 py-1.5 text-sm w-64 focus:outline-none focus:border-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-gray-400 absolute right-3 top-2.5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 249,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm text-left whitespace-nowrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-white text-gray-500 border-b border-gray-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "STT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "Họ tên"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "Mã nhân viên"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "Số điện thoại"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "Giới tính"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "Phòng ban"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 font-medium",
                                                        children: "Trạng thái"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/employees/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: [
                                                paginated.map((emp, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        onClick: ()=>router.push(`/employees/${emp.id}`),
                                                        className: "border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: startIdx + index + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: emp.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: emp.code
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 278,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 text-gray-600",
                                                                children: emp.email || "--"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: emp.phone
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: emp.gender
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 text-gray-600",
                                                                children: emp.department || "--"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 282,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: emp.status === "Đang làm việc" ? "bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200 inline-flex items-center gap-1.5" : "bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium border border-red-200 inline-flex items-center gap-1.5",
                                                                    children: [
                                                                        emp.status === "Đang làm việc" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            className: "w-3.5 h-3.5",
                                                                            fill: "currentColor",
                                                                            viewBox: "0 0 20 20",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                fillRule: "evenodd",
                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                clipRule: "evenodd"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/employees/page.tsx",
                                                                                lineNumber: 290,
                                                                                columnNumber: 96
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/employees/page.tsx",
                                                                            lineNumber: 290,
                                                                            columnNumber: 27
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            className: "w-3.5 h-3.5",
                                                                            fill: "currentColor",
                                                                            viewBox: "0 0 20 20",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                fillRule: "evenodd",
                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                                                                                clipRule: "evenodd"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/employees/page.tsx",
                                                                                lineNumber: 292,
                                                                                columnNumber: 96
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/employees/page.tsx",
                                                                            lineNumber: 292,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        emp.status
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/employees/page.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 283,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, emp.id, true, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, this)),
                                                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 8,
                                                        className: "py-8 text-center text-gray-500",
                                                        children: "Đang tải danh sách nhân viên..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/page.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 19
                                                }, this),
                                                !isLoading && loadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 8,
                                                        className: "py-8 text-center text-red-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: loadError
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setLoadAttempt((attempt)=>attempt + 1),
                                                                className: "mt-3 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50",
                                                                children: "Thử tải lại"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 19
                                                }, this),
                                                !isLoading && !loadError && paginated.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 8,
                                                        className: "py-8 text-center text-gray-500",
                                                        children: "Không có dữ liệu phù hợp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/employees/page.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/employees/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/employees/page.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-600 bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: pageSize,
                                                onChange: (e)=>{
                                                    setPageSize(Number(e.target.value));
                                                    setCurrentPage(1);
                                                },
                                                className: "border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 10,
                                                        children: "10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 20,
                                                        children: "20"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 50,
                                                        children: "50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "bản ghi/trang"
                                            }, void 0, false, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Hiển thị ",
                                                    totalRecords === 0 ? 0 : startIdx + 1,
                                                    " - ",
                                                    Math.min(startIdx + pageSize, totalRecords),
                                                    " trên ",
                                                    totalRecords,
                                                    " bản ghi"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 347,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        disabled: currentPage === 1,
                                                        onClick: ()=>setCurrentPage((p)=>p - 1),
                                                        className: "border border-gray-300 bg-white rounded-md p-1 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M15 19l-7-7 7-7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 98
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/employees/page.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        disabled: currentPage === totalPages,
                                                        onClick: ()=>setCurrentPage((p)=>p + 1),
                                                        className: "border border-gray-300 bg-white rounded-md p-1 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M9 5l7 7-7 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/employees/page.tsx",
                                                                lineNumber: 363,
                                                                columnNumber: 98
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/employees/page.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/employees/page.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/employees/page.tsx",
                                                lineNumber: 350,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/employees/page.tsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/employees/page.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/employees/page.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/employees/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$employees$2f$components$2f$UploadEmployeesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: showUploadModal,
                onClose: ()=>setShowUploadModal(false)
            }, void 0, false, {
                fileName: "[project]/app/employees/page.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/employees/page.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(EmployeeManager, "FFMYHFnIyK+SzNxGBJPPH9hcFrY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EmployeeManager;
var _c;
__turbopack_context__.k.register(_c, "EmployeeManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/graphql.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "graphqlRequest",
    ()=>graphqlRequest
]);
async function graphqlRequest(query, variables) {
    const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query,
            variables
        })
    });
    const result = await response.json();
    const errorMessage = result.errors?.[0]?.message;
    if (!response.ok || errorMessage) {
        throw new Error(errorMessage || `GraphQL trả về HTTP ${response.status}.`);
    }
    if (!result.data) {
        throw new Error("GraphQL không trả về dữ liệu.");
    }
    return result.data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_12yj90y._.js.map