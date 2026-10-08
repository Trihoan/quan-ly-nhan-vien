import { z } from "zod";
    export interface CreateEmployeeDto{

        lastname : string ;
        firstname : string;
        code: string;
        ssoEmail?: string;
        phone?: string;
        departmentIds?: number[];
        status?: string;

    }
    export const EmployeeImportSchema = z.object({
        code: z.string().trim().min(1, "Thiếu mã nhân viên."),
        lastname: z.string().trim().min(1, "Thiếu họ và tên đệm."),
        firstname: z.string().trim().min(1, "Thiếu tên."),
        ssoEmail: z.string().trim().min(1, "Thiếu Email SSO.").email("Email SSO không đúng định dạng."),
        phone: z.string().trim().min(1, "Thiếu số điện thoại."),
        department: z.string().trim().min(1, "Thiếu phòng ban."),
        gender: z.string().optional(),
        });
    // hàm hợp lệ 
    export function validateEmployeeDto(data : any): string | null {
        if( !data.lastname || !data.lastname.trim()){
            return "Họ và tên đệm không được để trống!";
        }
        if(!data.firstname || !data.firstname.trim()){
            return "Tên không được để trống!";
        }
        if (!data.code || !data.code.trim()){
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
        if (
            data.departmentIds !== undefined &&
            !Array.isArray(data.departmentIds)
        ) {
            return "departmentIds phải là một mảng";
        }


        return null;
    }
