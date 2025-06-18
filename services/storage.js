// const STORAGE_KEY = "DSNV";

// export const storage = {
//   save(data) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//   },
//   load() {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   }
// };
export const storage = {
  save(data) {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem("danhSachNhanVien", json);
    } catch (err) {
      console.error("Lỗi khi lưu vào localStorage:", err);
    }
  },

  load() {
    try {
      const json = localStorage.getItem("danhSachNhanVien");
      if (!json) return [];
      const rawList = JSON.parse(json);

      // Chuyển đổi lại thành đối tượng NhanVien đúng class
      return rawList.map(obj => {
        const nv = new NhanVien(
          obj.taiKhoan,
          obj.hoTen,
          obj.email,
          obj.matKhau,
          obj.ngayLam,
          obj.luongCB,
          obj.chucVu,
          obj.gioLam
        );
        nv.tongLuong = obj.tongLuong;
        nv.loaiNV = obj.loaiNV;
        return nv;
      });
    } catch (err) {
      console.error("Lỗi khi load từ localStorage:", err);
      return [];
    }
  }
};

import NhanVien from "../models/NhanVien.js";
