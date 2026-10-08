"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { graphqlRequest } from "@/app/lib/graphql";
import UploadEmployeesModal from "./components/UploadEmployeesModal";

interface Employee{
  id : number ,
  name : string, 
  code : string,
  email : string , 
  phone : string, 
  gender : string , 
  department : string,
  status : "Đang làm việc" | "Đã nghỉ việc";
};

interface ApiEmployee {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  department: string | null;
  ssoEmail: string | null;
  phone: string | null;
  gender: string | null;
  status: Employee["status"];
}

// Bắt đầu tuần 2 : là lấy dữ diệu ở datagrib


export default function EmployeeManager(){
  const router = useRouter();

  // state luu danh sách nhân viên
  const [employees , setEmployee] = useState<Employee[]>([]);
  const [selectedDept , setSelectedDept] = useState("Tất cả"); // Lọc phòng ban 
  const [sortOrder , setSortOrder] = useState<"newest"|"oldest"> ("newest");  // sắp xếp 
  const [searchTerm, setSearchTerm] = useState(""); // Lưu trữ từ khóa TÌm kiếm
  const [currentPage , setCurrentPage] = useState(1); // Phân trang và useState(1) là đánh dấu số hiện tại
  const [pageSize, setPageSize] = useState(10); // Cấu hình số dòng trogn 1 trang
  
  // KHởi tạo danh sách trống ()
  // const [employees, setEmployee] = useState<Employee[]>()
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  const [statusFilter, setStatusFilter] = useState<"all"|"active" | "inactive">("all");
  
  const [showUploadModal , setShowUploadModal] = useState(false)
  // Query danh sách từ schema GraphQL do PostGraphile sinh từ PostgreSQL.
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const data = await graphqlRequest<{
          allEmployees: { nodes: ApiEmployee[] };
        }>(`query EmployeeDashboard {
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
        const formattedData: Employee[] = apiData.map((emp) => ({
          id: emp.id,
          name: `${emp.lastname} ${emp.firstname}`, 
          code: emp.code,
          department: emp.department || "",
          email: emp.ssoEmail || "---",  // Database lưu ssoEmail, UI cần tên là email
          phone: emp.phone || "---",
          gender: emp.gender || "Chưa xác định",
          status: emp.status    // Lấy thẳng chữ "Đang làm việc" / "Đã nghỉ việc" từ DB
        }));

        setEmployee(formattedData);
      } catch (error) {
        setLoadError(
          error instanceof DOMException && error.name === "TimeoutError"
            ? "Kết nối cơ sở dữ liệu quá lâu. Vui lòng thử lại."
            : error instanceof Error ? error.message : "Không tải được danh sách nhân viên. Vui lòng thử lại."
        );
        console.error("Lỗi khi kéo data từ API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [loadAttempt]);

  // tạo danh sách bộ lọc phòng ban
  const department = ["Tất cả" , ...Array.from(new Set(employees.map(e => e.department).filter(Boolean))) ]
  // Trích xuất số liệu thống kê
  const total = employees.length;
  const activeCount = employees.filter(e =>e.status === "Đang làm việc").length;
  const inactiveCount = employees.filter(e =>e.status === "Đã nghỉ việc").length; 
  
  // logic Xóa nhân viên 
  // Lọc + tìm kiếm + Sắp xếp
   let result = employees.filter(emp => {
    if (statusFilter === "active") return emp.status === "Đang làm việc";
    if (statusFilter === "inactive") return emp.status ==="Đã nghỉ việc";
    return true
   });


   result = result.filter(emp => selectedDept === "Tất cả" || emp.department === selectedDept);

   if (searchTerm){
    const q = searchTerm.toLowerCase();
    result = result.filter(e => 
      e.name.toLowerCase().includes(q) ||
      e.code.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q)
    );
   }

   result = [...result].sort((a,b) => 
   sortOrder === "newest" ? b.id - a.id : a.id - b.id 
  );

  // Phân trang 
  const totalRecords = result.length;
  const startIdx = (currentPage - 1) *pageSize;
  const paginated = result.slice(startIdx , startIdx + pageSize);
  const totalPages = Math.ceil(totalRecords/pageSize)

  // Danh sách nhân vien 
   return (
    <div className="min-h-screen bg-[#f3f3f3] p-8 text-gray-900 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Danh sách nhân viên</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowUploadModal(true)}
              className=" cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
            >
              Tải lên
            </button>
            <Link 
              href="/employees/add" 
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
              >
                Thêm mới  
            </Link>
          </div>
        </div>

        {/* Lọc phòng ban */}
        <div className="mb-6">
          <select
            value={selectedDept}
            onChange={(e) => { setSelectedDept(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm focus:outline-none w-56 cursor-pointer"
          >
            {department.map(d => (
              <option key={d} value={d}>{d === "Tất cả" ? "Phòng ban: Tất cả" : d}</option>
            ))}
          </select>
        </div>

        {/* Thẻ thống kê */}
            <div className="grid grid-cols-3 gap-2 bg-white rounded-2xl border border-gray-200 mb-6 p-2 shadow-sm">
              
              {/* Thẻ 1: Tất cả */}
                <div
                  onClick={() => { setStatusFilter("all"); setCurrentPage(1); }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-r border-gray-100 ${
                    statusFilter === "all" ? "bg-[#f1f3f5] border border-gray-300 shadow-xs" : "bg-white hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <p className="text-sm text-gray-500 mb-1 font-medium">Tất cả</p>
                  <p className="text-2xl font-bold text-gray-900">{total}</p>
                </div>

                {/* Thẻ 2: Đang làm việc */}
                <div
                  onClick={() => { setStatusFilter("active"); setCurrentPage(1); }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-r border-gray-100 ${
                    statusFilter === "active" ? "bg-[#f1f3f5] border border-gray-300 shadow-xs" : "bg-white hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <p className="text-sm text-gray-500 mb-1 font-medium">Đang làm việc</p>
                  <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                </div>

                {/* Thẻ 3: Đã nghỉ việc */}
                <div
                  onClick={() => { setStatusFilter("inactive"); setCurrentPage(1); }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    statusFilter === "inactive" ? "bg-[#f1f3f5] border border-gray-300 shadow-xs" : "bg-white hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <p className="text-sm text-gray-500 mb-1 font-medium">Đã nghỉ việc</p>
                  <p className="text-2xl font-bold text-gray-900">{inactiveCount}</p>
                </div>
            </div>

        {/* Khối Bảng dữ liệu (Bọc nền trắng chung cho Tab, Search, Table, Pagination) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Thanh công cụ: Sắp xếp & Tìm kiếm */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setSortOrder("newest")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  sortOrder === "newest" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                Mới nhất
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  sortOrder === "oldest" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                Cũ nhất
              </button>
            </div>
            
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Tìm kiếm..."
                className="border border-gray-300 rounded-md pl-3 pr-10 py-1.5 text-sm w-64 focus:outline-none focus:border-gray-400"
              />
              <svg className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Bảng chi tiết */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-white text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 font-medium">STT</th>
                  <th className="py-4 px-6 font-medium">Họ tên</th>
                  <th className="py-4 px-6 font-medium">Mã nhân viên</th>
                  <th className="py-4 px-6 font-medium">Email</th>
                  <th className="py-4 px-6 font-medium">Số điện thoại</th>
                  <th className="py-4 px-6 font-medium">Giới tính</th>
                  <th className="py-4 px-6 font-medium">Phòng ban</th>
                  <th className="py-4 px-6 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((emp, index) => (
                  <tr
                   key={emp.id} 
                   onClick={() => router.push(`/employees/${emp.id}`)}
                   className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="py-4 px-6">{startIdx + index + 1}</td>
                    <td className="py-4 px-6">{emp.name}</td>
                    <td className="py-4 px-6">{emp.code}</td>
                    <td className="py-4 px-6 text-gray-600">{emp.email || "--"}</td>
                    <td className="py-4 px-6">{emp.phone}</td>
                    <td className="py-4 px-6">{emp.gender}</td>
                    <td className="py-4 px-6 text-gray-600">{emp.department || "--"}</td>
                    <td className="py-4 px-6">
                      <span className={
                        emp.status === "Đang làm việc"
                          ? "bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200 inline-flex items-center gap-1.5"
                          : "bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium border border-red-200 inline-flex items-center gap-1.5"
                      }>
                        {emp.status === "Đang làm việc" ? (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                        )}
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {isLoading && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      Đang tải danh sách nhân viên...
                    </td>
                  </tr>
                )}
                {!isLoading && loadError && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-red-600">
                      <p>{loadError}</p>
                      <button
                        type="button"
                        onClick={() => setLoadAttempt((attempt) => attempt + 1)}
                        className="mt-3 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Thử tải lại
                      </button>
                    </td>
                  </tr>
                )}
                {!isLoading && !loadError && paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      Không có dữ liệu phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Điều hướng Phân trang */}
          <div className="flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-600 bg-gray-50">
            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>bản ghi/trang</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span>
                Hiển thị {totalRecords === 0 ? 0 : startIdx + 1} - {Math.min(startIdx + pageSize, totalRecords)} trên {totalRecords} bản ghi
              </span>
              <div className="flex gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="border border-gray-300 bg-white rounded-md p-1 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="border border-gray-300 bg-white rounded-md p-1 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UploadEmployeesModal
          open={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
    </div>
  );
}
    
