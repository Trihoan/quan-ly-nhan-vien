'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Dữ liệu mặc định cho các trường bắt buộc mà danh sách ban đầu của bạn không có
    const defaultData = { birthday: "1995-01-01", startDate: "2023-01-01", manager: "Chưa phân công", address: "Hà Nội", role: "Nhân viên", createdAt: new Date(), updatedAt: new Date() };
    
    await queryInterface.bulkInsert('Employees', [
      { lastname: "Trần Thị Linh", firstname: "Hương", code: "PSS373", ssoEmail: "huongttl@phx-smartschool.com", phone: "0387652097", gender: "Nữ", department: "Phòng dịch vụ", status: "Đang làm việc", ...defaultData },
      { lastname: "Nguyễn Thị", firstname: "Hiếu", code: "PNKX372", ssoEmail: "hieunt@phenikaa-x.com", phone: "0376253769", gender: "Nữ", department: "Phòng nghiên cứu giải pháp", status: "Đang làm việc", ...defaultData },
      { lastname: "Nguyễn Thị", firstname: "Thuyết", code: "PNKX371", ssoEmail: "thuyetnt@phenikaa-x.com", phone: "0936288144", gender: "Nữ", department: "Phòng xe tự hành", status: "Đang làm việc", ...defaultData },
      { lastname: "Nguyễn Thùy", firstname: "Linh", code: "PNKX370", ssoEmail: "linhnt@phenikaa-x.com", phone: "0948524685", gender: "Nữ", department: "Phòng kinh doanh PNKX", status: "Đã nghỉ việc", ...defaultData },
      { lastname: "Lê Công", firstname: "Nam", code: "CTV03", ssoEmail: "namlc@dummy.com", phone: "0385449711", gender: "Nam", department: "Chưa phân bổ", status: "Đang làm việc", ...defaultData },
      { lastname: "Lê Ngọc", firstname: "Sơn", code: "HĐK213", ssoEmail: "sonln1@phenikaa-x.com", phone: "0966937828", gender: "Nam", department: "Phòng xe tự hành", status: "Đang làm việc", ...defaultData },
      { lastname: "Phạm Hải", firstname: "Long", code: "CTV02", ssoEmail: "phamhailong412@gmail.com", phone: "0819264333", gender: "Nam", department: "Phòng xe tự hành", status: "Đã nghỉ việc", ...defaultData },
      { lastname: "Trần Vân", firstname: "Khanh", code: "CTV01", ssoEmail: "vankhanh.21.06.tn@gmail.com", phone: "0964260353", gender: "Nữ", department: "Phòng xe tự hành", status: "Đang làm việc", ...defaultData },
      { lastname: "Phan Trường Anh", firstname: "Khôi", code: "TTS091", ssoEmail: "phan.ta.khoi@gmail.com", phone: "0961141699", gender: "Nam", department: "Phòng xe tự hành", status: "Đang làm việc", ...defaultData },
      { lastname: "Vũ Văn", firstname: "Đức", code: "PNKX368", ssoEmail: "ducvv@phenikaa-x.com", phone: "0365192203", gender: "Nam", department: "Phòng xe tự hành", status: "Đang làm việc", ...defaultData },
      { lastname: "Đỗ Thị", firstname: "Mai", code: "PNKX375", ssoEmail: "maidt@phenikaa-x.com", phone: "0912345678", gender: "Nữ", department: "Phòng dịch vụ", status: "Đã nghỉ việc", ...defaultData },
      { lastname: "Ngô Văn", firstname: "Kiên", code: "PNKX376", ssoEmail: "kiennv@phenikaa-x.com", phone: "0923456789", gender: "Nam", department: "Phòng kinh doanh PNKX", status: "Đang làm việc", ...defaultData }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};