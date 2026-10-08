"use client"
import { useEffect, useState , type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Toast from "@/app/components/Toast";
import { graphqlRequest } from "@/app/lib/graphql";
export default function IdEmployees(){
    const params = useParams();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [toast , setToast] = useState<{
        message : string;
        type: "success" | "error"
    } | null >(null)
    const [formData , setFormData] = useState({
        firstname : "",
        lastname : "",
        birthday : "",
        gender : "",
        startDate:"",
        code :"",
        manager : "",
        phone : "",
        address : "",
        departmentIds: [] as number[],
        ssoEmail:"",
        role :"",
        status : ""
    });
    const [departments, setDepartments] = useState<
    { id: number; name: string }[]
    >([]);

    const [showAddDepartment, setShowAddDepartment] = useState(false);
    const [newDepartment, setNewDepartment] = useState("");
    const [isAddingDepartment, setIsAddingDepartment] = useState(false);
        const [errors, setErrors] = useState({
            lastname : false,
            firstname: false, 
            code: false , 
            phone: false, 
            ssoEmail : false
        });

    useEffect(() => {
        const fetchDepartments = async () => {
                try {
                    const data = await graphqlRequest<{
                        allDepartments: { nodes: { id: number; name: string }[] };
                    }>(`query DepartmentOptions {
                        allDepartments(orderBy: [NAME_ASC]) { nodes { id name } }
                    }`);
                    setDepartments(data.allDepartments.nodes.map(({ id, name }) => ({ id, name })));
                    } catch (error) {
                        console.error(
                            "Lỗi khi tải danh sách phòng ban:",
                            error
                        );
                    }
                };

                fetchDepartments();
            }, []);
    useEffect(() => {
            const fetchEmployeeDetail = async () => {
                if (!id) return;

                try {
                    const data = await graphqlRequest<{
                        employeeById: {
                            id: number;
                            firstname: string;
                            lastname: string;
                            birthday: string | null;
                            gender: string | null;
                            startDate: string | null;
                            code: string;
                            manager: string | null;
                            phone: string;
                            address: string | null;
                            department: string | null;
                            ssoEmail: string;
                            role: string | null;
                            status: string;
                        } | null;
                        allEmployeeDepartments: { nodes: {
                            id: number;
                            employeeId: number;
                            departmentId: number;
                            deletedAt: string | null;
                        }[] };
                    }>(`query EmployeeDetail($id: Int!) {
                        employeeById(id: $id) {
                            id firstname lastname birthday gender startDate code
                            manager phone address department ssoEmail role status
                        }
                        allEmployeeDepartments {
                            nodes { id employeeId departmentId deletedAt }
                        }
                    }`, { id: Number(id) });
                    const emp = data.employeeById;
                    if (!emp) throw new Error("Không tìm thấy nhân viên.");
                    const relation = data.allEmployeeDepartments.nodes.find(
                        item => item.employeeId === Number(id) && item.deletedAt === null
                    );

                    if (emp) {
                        setFormData({
                            firstname: emp.firstname || "",
                            lastname: emp.lastname || "",

                            birthday: emp.birthday
                                ? emp.birthday.split("T")[0]
                                : "",

                            gender: emp.gender || "Nam",

                            startDate: emp.startDate
                                ? emp.startDate.split("T")[0]
                                : "",

                            code: emp.code || "",
                            manager: emp.manager || "",
                            phone: emp.phone || "",
                            address: emp.address || "",

                            // Có phòng ban -> chọn phòng ban đó
                            // Không có -> Chưa phân bổ
                            departmentIds: relation ? [relation.departmentId] : [],

                            ssoEmail: emp.ssoEmail || "",
                            role: emp.role || "",
                            status: emp.status || "Đang làm việc"
                        });
                    }
                } catch (error) {
                    console.error(
                        "Lỗi khi tải chi tiết nhân viên:",
                        error
                    );

                    setToast({
                        message: "Không thể tải thông tin nhân viên",
                        type: "error"
                    });
                }
            };

            fetchEmployeeDetail();
        }, [id]);

    const handleAddDepartment = async () => {
    if (!newDepartment.trim()) {
        setToast({
            message: "Vui lòng nhập tên phòng ban",
            type: "error"
        });
        return;
    }

    const normalizedNewDepartment = newDepartment.trim().normalize("NFC").toLocaleLowerCase("vi-VN");
    const existingDepartment = departments.find(
        (department) => department.name.trim().normalize("NFC").toLocaleLowerCase("vi-VN") === normalizedNewDepartment
    );
    if (existingDepartment) {
        setFormData((prev) => ({ ...prev, departmentIds: [Number(existingDepartment.id)] }));
        setNewDepartment("");
        setToast({ message: "Phòng ban này đã tồn tại; đã chọn phòng ban hiện có.", type: "success" });
        return;
    }

    try {
        setIsAddingDepartment(true);

        const data = await graphqlRequest<{
            createDepartment: { department: { id: number; name: string } | null } | null;
        }>(`mutation CreateDepartment($input: CreateDepartmentInput!) {
            createDepartment(input: $input) { department { id name } }
        }`, { input: { department: { name: newDepartment.trim() } } });
        const createdDepartment = data.createDepartment?.department;
        const newDept = createdDepartment
            ? { id: createdDepartment.id, name: createdDepartment.name }
            : null;

        if (!newDept) {
            throw new Error("Không tạo được phòng ban");
        }

        // Thêm phòng ban mới vào danh sách
        setDepartments(prev => [
            ...prev,
            newDept
        ]);

        // Tự động chọn phòng ban vừa tạo
        setFormData(prev => ({
            ...prev,
            departmentIds: [Number(newDept.id)]
        }));

        // Xóa ô nhập
        setNewDepartment("");

        // Đóng form thêm
        setShowAddDepartment(false);

        setToast({
            message: "Thêm phòng ban thành công",
            type: "success"
        });

    } catch (error) {
        console.error(error);

        setToast({
            message:
                error instanceof Error
                    ? error.message
                    : "Không thể thêm phòng ban",
            type: "error"
        });

    } finally {
        setIsAddingDepartment(false);
    }
};

    const handleUpdate = async (
            e: FormEvent<HTMLFormElement>
        ) => {
            e.preventDefault();

            if (
                !formData.firstname.trim() ||
                !formData.lastname.trim() ||
                !formData.code.trim()
            ) {
                setToast({
                    message: "Vui lòng nhập thông tin đầy đủ",
                    type: "error"
                });
                return;
            }

            try {
                setIsLoading(true);

                const response = await fetch(`/api/employees/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...formData,
                        birthday: formData.birthday || null,
                        startDate: formData.startDate || null
                    })
                });
                const result = await response.json();
                if (!response.ok || !result.success) {
                    throw new Error(result.message || "Không thể cập nhật nhân viên.");
                }

                // =====================================================
                // 4. THÀNH CÔNG
                // =====================================================

                setToast({
                    message:
                        "Cập nhật nhân viên thành công",
                    type: "success"
                });

            } catch (error) {

                console.error(
                    "Lỗi cập nhật:",
                    error
                );

                setToast({
                    message:
                        error instanceof Error
                            ? error.message
                            : "Không thể cập nhật nhân viên",
                    type: "error"
                });

            } finally {
                setIsLoading(false);
            }
        };

    return (
        <div className="min-h-screen bg-[#f3f3f3] p-8 text-gray-900 font-sans">
            <div className="max-w-[1200px] mx-auto">

                {/*Nút Back và Tiêu đề */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/employees" className="text-gray-500 hover:text-gray-800 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-bold">Chi tiết nhân viên</h1>
                </div>

                <form onSubmit={handleUpdate}  className="grid grid-cols-3 gap-6">
                    {/* cột trái - Hồ sơ*/}
                    <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h2 className="font-semibold">Hồ sơ nhân viên</h2>

                        <div className="flex items-center gap-3">   
                            <div className="w-16 h-16 rounded-full bg-[#64748b] flex items-center justify-center overflow-hidden text-white shadow-inner">
                                <svg className="w-10 h-10 mt-2 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>                          
                               <div>
                                <input type="file" 
                                id="avatar-upload"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if(file){
                                        console.log("Đã chọn file:" , file.name);
                                    }

                                }}
                                />
                                <label 
                                    htmlFor="avatar-upload"
                                    className="border border-gray-300 rounded-md px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer inline-block"
                                    >
                                    Tải ảnh lên
                                </label>
                                </div>                    
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5">Họ và tên đệm</label>
                                <input 
                                value={formData.lastname} 
                                onChange={(e) => setFormData({...formData , lastname: e.target.value})}
                               className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 transition-colors ${
                                        errors.lastname 
                                            ? "border-red-500 bg-red-50/30 focus:border-red-500" 
                                            : "border-gray-300 focus:border-gray-600"
                                    }`}
                                />
                                {errors.lastname &&(
                                    <p className="text-red-500 text-xs mt-1">Vui lòng nhập thông tin</p>
                                )}

                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5">Tên</label>
                                <input 
                                value={formData.firstname} 
                                onChange={(e) => setFormData({...formData , firstname: e.target.value})}
                                className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 transition-colors ${
                                            errors.firstname 
                                                ? "border-red-500 bg-red-50/30 focus:border-red-500" 
                                                : "border-gray-300 focus:border-gray-600"
                                        }`}
                                />
                                {errors.firstname && (
                                    <p className="text-red-500 text-xs mt-1">Vui lòng nhập thông tin </p>
                                )}
                                
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Ngày sinh</label>
                                <input type="date"
                                value={formData.birthday}
                                onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-gray-400 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Giới tính</label>
                                <select 
                                value={formData.gender}
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors"
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Ngày bắt đầu làm việc</label>
                                <input type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-gray-400 transition-colors"
                                 />               
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Mã nhân viên</label>
                                <input 
                                value={formData.code}
                                onChange={(e) => setFormData({...formData,  code: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                 />               
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Thuộc cấp </label>
                                <select 
                                value={formData.manager}
                                onChange={(e) => setFormData({...formData,  manager: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors text-gray-600"
                                 > 
                                 <option value="">Vui lòng chọn</option>
                                 <option value="THPT">THPT</option>
                                 <option value="Trung học">Trung học</option>
                                 <option value="Tiểu học">Tiểu học</option>
                                 </select>              
                            </div>

                            <div>
                               <label className="block text-sm text-gray-700 mb-1.5">Số điện thoại</label>
                                <input 
                                value={formData.phone} 
                                onChange={(e) => setFormData({...formData , phone: e.target.value})}
                                placeholder="Nhập tối thiểu 10 số"
                               className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 transition-colors ${
                                            errors.phone 
                                                ? "border-red-500 bg-red-50/30 focus:border-red-500" 
                                                : "border-gray-300 focus:border-gray-600"
                                        }`}
                                />
                                {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">Vui lòng nhập số điện thoại hợp lệ</p>) }
                                
                                
                            </div>
                        </div>       
                        <div className="mt-5">
                                <label className="block text-sm text-gray-700 mb-1.5">Địa chỉ</label>
                                <input
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                />
                                </div>

                       <div className="mt-5">
                            <label className="block text-sm text-gray-700 mb-1.5">
                                Phòng ban
                            </label>

                            <select
                                value={
                                    formData.departmentIds.length > 0
                                        ? String(formData.departmentIds[0])
                                        : ""
                                }
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setFormData(prev => ({
                                        ...prev,
                                        departmentIds: value
                                            ? [Number(value)]
                                            : []
                                    }));
                                }}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors"
                            >
                                <option value="">
                                    Chưa phân bổ
                                </option>

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowAddDepartment(prev => !prev)
                                }
                                className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                            >
                                + Thêm phòng ban mới
                            </button>

                            {showAddDepartment && (
                                <div className="flex gap-2 mt-3">
                                    <input
                                        type="text"
                                        value={newDepartment}
                                        onChange={(e) =>
                                            setNewDepartment(e.target.value)
                                        }
                                        placeholder="Nhập tên phòng ban mới"
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                                    />

                                    <button
                                        type="button"
                                        disabled={isAddingDepartment}
                                        onClick={handleAddDepartment}
                                        className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 disabled:opacity-50"
                                    >
                                        {isAddingDepartment
                                            ? "Đang thêm..."
                                            : "Thêm"}
                                    </button>
                                </div>
                            )}
                        </div>            

                        {/* giấy tờ đính kèm*/}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="font-bold text-base mb-1">Giấy tờ đính kèm</h2>
                            <p className="text-sm text-gray-500 mb-4">Tải bản scan giấy tờ</p>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg py-12 flex flex-col items-center justify-center text-xs text-gray-400 bg-gray-50/50">
                                <input type="file"
                                    id="document-upload"
                                    accept=".pdf, .jpg, .jped, .png"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if(file){
                                            console.log("Đã chọn tài liệu" , file.name);
                                            
                                        }
                                    }}
                                />
                                <label htmlFor="document-upload" className="border border-gray-300 rounded-md px-4 py-1.5 mb-2 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer inline-block"
                                >
                                    Tải lên
                                </label>
                                <span>PDF, JPG , JPED, PNG</span>
                            </div>
                        </div>
                    </div>
                    {/*     cỘT PHẢI  */}
                    
                    <div className="col-span-1 flex flex-col gap-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="font-bold text-base mb-4">Trạng thái làm việc</h2>
                            <div>
                                <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors text-gray-600" 
                                >
                                    <option value="Đang làm việc">Đang làm việc</option>
                                    <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                                </select>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="font-bold text-base mb-4">Tài khoản đăng nhập SSO</h2>
                            <div>
                               <label className="block text-sm text-gray-700 mb-1.5">Email</label>
                                <input 
                                value={formData.ssoEmail}
                                onChange={(e) => setFormData({...formData, ssoEmail: e.target.value})}
                                placeholder="example@domain.com"
                               className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 transition-colors ${
                                            errors.ssoEmail 
                                                ? "border-red-500 bg-red-50/30 focus:border-red-500" 
                                                : "border-gray-300 focus:border-gray-600"
                                        }`}
                                    />
                                    {errors.ssoEmail && (
                                        <p className="text-red-500 text-xs mt-1">Email phải chứa ký tự @</p>
                                    )}

                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="font-bold text-base mb-4">Vai trò khác</h2>
                            <div>
                                <label htmlFor="block text-sm text-gray-700 mb-1.5">Vai trò</label>
                                <select 
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors text-gray-600"
                                >
                                    <option value="">Vui lòng chọn</option>
                                    <option value="Quản lý">Quản lý</option>
                                    <option value="Nhân viên">Nhân viên</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Nút Hành động */}
                    <div className="col-span-3 flex justify-end gap-3 mt-6">
                        <Link 
                        href="/employees" 
                        className="border border-gray-300 bg-white text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                        > 
                        Quay lại
                        </Link>
                        <button
                             type="submit" 
                             disabled ={isLoading}
                             className={`bg-[#333333] hover:bg-black text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm ${
                                        isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                                    }`}>
                               {isLoading ? (
                                        <>
                                            <svg
                                                className="w-4 h-4 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />
                                            </svg>

                                            Đang cập nhật...
                                        </>
                                    ) : (
                                        "Cập nhật"
                                    )}
                        </button>
                    </div>
                </form>
            </div>
        
        {toast && (
            <Toast
                message = {toast.message}
                type = {toast.type}
                onClose ={() => setToast(null)}
            />
        )}

        </div>
    );
    
    
}
