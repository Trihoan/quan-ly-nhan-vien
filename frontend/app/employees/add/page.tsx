"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";
import { graphqlRequest } from "@/app/lib/graphql";


export default function AddEmployees(){
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);
    const [toast , setToast] = useState<{
            message : string;
            type: "success" | "error"
        } | null >(null)

    const [formData , setFormData] = useState({
        firstname : "",
        lastname : "",
        birthday : "",
        gender : "Nam",
        startDate:"",
        code :"",
        manager : "",
        phone : "",
        address : "",
        departmentIds: [] as number[],
        ssoEmail:"",
        role :""

    });
    const [departments, setDepartments] = useState<
            { id: number; name: string }[]
        >([]);

    const [showAddDepartment, setShowAddDepartment] = useState(false);

    const [newDepartment, setNewDepartment] = useState("");

    const [isAddingDepartment, setIsAddingDepartment] = useState(false);

    {/* State lưu danh sách lỗi cho từng trường */}
    const [errors, setErrors] = useState({
        lastname : false,
        firstname: false, 
        code: false , 
        phone: false, 
        ssoEmail : false,
        department: false
    });
        useEffect(() => {
            const loadDepartments = async () => {
                try {
                    const data = await graphqlRequest<{
                        allDepartments: { nodes: { id: number; name: string }[] };
                    }>(`query DepartmentOptions {
                        allDepartments(orderBy: [NAME_ASC]) {
                            nodes { id name }
                        }
                    }`);
                    setDepartments(data.allDepartments.nodes.map(({ id, name }) => ({ id, name })));

                } catch (error) {
                    console.error(
                        "Không thể lấy danh sách phòng ban:",
                        error
                    );
                }
            };

            loadDepartments();
        }, []);
         const handleAddDepartment = async () => {
            const name = newDepartment.trim();

            if (!name) {
                setToast({
                    message: "Vui lòng nhập tên phòng ban",
                    type: "error"
                });
                return;
            }

            // Kiểm tra trùng ngay trên danh sách hiện tại
            const exists = departments.some(
                department =>
                    department.name.trim().normalize("NFC").toLocaleLowerCase("vi-VN") ===
                    name.trim().normalize("NFC").toLocaleLowerCase("vi-VN")
            );

            if (exists) {
                setToast({
                    message: "Phòng ban này đã tồn tại",
                    type: "error"
                });
                return;
            }

            setIsAddingDepartment(true);

            try {
                const data = await graphqlRequest<{
                    createDepartment: { department: { id: number; name: string } | null } | null;
                }>(`mutation CreateDepartment($input: CreateDepartmentInput!) {
                    createDepartment(input: $input) {
                        department { id name }
                    }
                }`, { input: { department: { name } } });
                const createdDepartment = data.createDepartment?.department;
                const department = createdDepartment
                    ? { id: createdDepartment.id, name: createdDepartment.name }
                    : null;

                if (!department) {
                    setToast({
                        message: "Không nhận được dữ liệu phòng ban",
                        type: "error"
                    });

                    return;
                }

                // Thêm phòng ban mới vào danh sách
                setDepartments(prev => [
                    ...prev,
                    department
                ]);

                // Tự động chọn phòng ban vừa tạo
                setFormData(prev => ({
                    ...prev,
                    departmentIds: [
                        ...prev.departmentIds,
                        Number(department.id)
                    ]
                }));

                // Reset form thêm phòng ban
                setNewDepartment("");
                setShowAddDepartment(false);

                setToast({
                    message: "Thêm phòng ban thành công",
                    type: "success"
                });

            } catch (error) {
                console.error(
                    "Lỗi khi thêm phòng ban:",
                    error
                );

                setToast({
                    message: error instanceof Error ? error.message : "Không thể kết nối tới Server!",
                    type: "error"
                });

            } finally {
                setIsAddingDepartment(false);
            }
        };

    const handleSubmit = async (e : React.FormEvent) =>{

       e.preventDefault();

       const newErrors = {
        lastname : !formData.lastname.trim(),
        firstname : !formData.firstname.trim(),
        code: !formData.code.trim(),
        phone:
                !formData.phone.trim() ||
                formData.phone.trim().length < 10,

        ssoEmail:
                !formData.ssoEmail.trim() ||
                !formData.ssoEmail.trim().includes("@"),
         department:  formData.departmentIds.length === 0
       };
       setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) {
                setToast({
                    message: "Vui lòng điền đầy đủ và đúng định dạng các trường bắt buộc",
                    type: "error"
                });
                return;
            }
       
       setIsLoading(true);
       
            try {
                const res = await fetch("/api/employees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...formData,
                        birthday: formData.birthday || null,
                        startDate: formData.startDate || null,
                        status: "Đang làm việc"
                    })
                });
                const result = await res.json();
                if (!res.ok || !result.success) {
                    throw new Error(result.message || "Thêm nhân viên thất bại.");
                }
                const newId = result.data?.id;

                if(newId){
                    setToast({
                        message: "Thêm mới nhân viên thành công",
                        type: "success",
                    });
                    setTimeout(() => {
                        router.push (`/employees/${newId}`);
                    }, 2000);
                    
                }
                else {
                    setToast({
                        message: "Thêm nhân viên thành công nhưng không lấy ID được",
                        type: "error",
                    });
                    
                    }
            
                
            } catch (error) {
                console.error("Lỗi khi kéo data từ API:", error);
                setToast({
                    message: error instanceof Error ? error.message : "Không thể kết nối tới Server!",
                    type : "error",
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
                    <h1 className="text-xl font-bold">Thêm mới nhân viên</h1>
                </div>

                <form onSubmit={handleSubmit}  className="grid grid-cols-3 gap-6">
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
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Giới tính</label>
                                <select 
                                value={formData.gender}
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors"
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
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors"
                                 />               
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Mã nhân viên</label>
                                <input 
                                value={formData.code}
                                onChange={(e) => setFormData({...formData,  code: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors"
                                 />               
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5"  >Thuộc cấp </label>
                                <select 
                                value={formData.manager}
                                onChange={(e) => setFormData({...formData,  manager: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors"
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
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors"
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
                                        departmentIds: value ? [Number(value)] : []
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
                                        onClick={handleAddDepartment}
                                        disabled={isAddingDepartment}
                                        className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                                    >
                                        {isAddingDepartment ? "Đang thêm..." : "Thêm"}
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
                               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-colors text-gray-600"
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
                        <Link href="/employees" className="border border-gray-300 bg-white text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"> 
                        Hủy thay đổi
                        </Link>
                        <button type="submit" className="bg-[#333333] hover:bg-black text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                           {isLoading ? "Đang xử lý..." : "Thêm mới"}
                            </button>
                    </div>
                </form>
            </div>
             {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}

        </div>


    );


}
