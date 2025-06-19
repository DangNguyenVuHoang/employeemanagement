// export default class NhanVien {
//   constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
//     this.taiKhoan = taiKhoan;
//     this.hoTen = hoTen;
//     this.email = email;
//     this.matKhau = matKhau;
//     this.ngayLam = ngayLam;
//     this.luongCB = Number(luongCB); // ép kiểu nếu cần
//     this.chucVu = chucVu;
//     this.gioLam = Number(gioLam);
//     this.tongLuong = 0;
//     this.loaiNV = "";
//   }

//   tinhTongLuong() {
//     if (this.chucVu === "Giám đốc") this.tongLuong = this.luongCB * 3;
//     else if (this.chucVu === "Trưởng Phòng") this.tongLuong = this.luongCB * 2;
//     else this.tongLuong = this.luongCB;
//   }

//   xepLoai() {
//     if (this.gioLam >= 192) this.loaiNV = "Xuất sắc";
//     else if (this.gioLam >= 176) this.loaiNV = "Giỏi";
//     else if (this.gioLam >= 160) this.loaiNV = "Khá";
//     else this.loaiNV = "Trung bình";
//   }
// }
export default class NhanVien {
  constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = Number(luongCB);
    this.chucVu = chucVu;
    this.gioLam = Number(gioLam);
    this.tongLuong = 0;
    this.loaiNV = "";
  }

  tinhTongLuong() {
    switch (this.chucVu) {
      case "Giám đốc":
        this.tongLuong = this.luongCB * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = this.luongCB * 2;
        break;
      case "Nhân viên":
        this.tongLuong = this.luongCB;
        break;
      default:
        this.tongLuong = 0;
    }
  }

  xepLoai() {
    const gio = this.gioLam;
    if (gio >= 192) {
      this.loaiNV = "Xuất sắc";
    } else if (gio >= 176) {
      this.loaiNV = "Giỏi";
    } else if (gio >= 160) {
      this.loaiNV = "Khá";
    } else {
      this.loaiNV = "Trung bình";
    }
  }
}
