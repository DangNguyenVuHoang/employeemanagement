import { dsnv, themNhanVien, xoaNhanVien, capNhatNhanVien, timTheoLoai } from "./controllers/app.js";

document.getElementById("btnThemNV").addEventListener("click", () => {
  const inputs = layDuLieuForm();
  themNhanVien(inputs);
});

// document.getElementById("btnCapNhat").addEventListener("click", () => {
//   const inputs = layDuLieuForm();
//   capNhatNhanVien(inputs);
// });

document.getElementById("btnCapNhatEdit").addEventListener("click", () => {
  const inputs = layDuLieuForEdit();
  capNhatNhanVien(inputs);
});

document.getElementById("btnTimNV").addEventListener("click", () => {
  const keyword = document.getElementById("searchName").value;
  timTheoLoai(keyword);
});

window.xoaNV = function (tk) {
  xoaNhanVien(tk);
};

window.suaNV = function (tk) {
  // Hiển thị form modal và fill dữ liệu người dùng cần sửa
  const nv = dsnv.find(n => n.taiKhoan === tk);
  console.log(" DỮ liệu định sửa", nv);
  if (!nv) return;
  document.getElementById("tknvEdit").value = nv.taiKhoan;
  document.getElementById("tknvEdit").disabled = true;
  document.getElementById("nameEdit").value = nv.hoTen;
  document.getElementById("emailEdit").value = nv.email;
  document.getElementById("passwordEdit").value = nv.matKhau;
  document.getElementById("datepickerEdit").value = nv.ngayLam;
  document.getElementById("luongCBEdit").value = nv.luongCB;
  document.getElementById("chucvuEdit").value = nv.chucVu;
  document.getElementById("gioLamEdit").value = nv.gioLam;
  $('#myModalEdit').modal('show');
};

function layDuLieuForm() {
  const tk = document.getElementById("tknv").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const date = document.getElementById("datepicker").value;
  const luong = document.getElementById("luongCB").value;
  const chucVu = document.getElementById("chucvu").value;
  const gio = document.getElementById("gioLam").value;
  return [tk, name, email, pass, date, luong, chucVu, gio];
}

// function layDuLieuForEdit() {
//    const nv = dsnv.find(n => n.taiKhoan === tk);
//   console.log(" DỮ liệu định sửa", nv);
//   if (!nv) return;
// //   document.getElementById("tknvEdit").value = nv.taiKhoan;
// //   let tk = document.getElementById("tknvEdit").disabled = true;
//   let name= document.getElementById("nameEdit").value = nv.hoTen;
//   let email= document.getElementById("emailEdit").value = nv.email;
//   let pass= document.getElementById("passwordEdit").value = nv.matKhau;
//   let date= document.getElementById("datepickerEdit").value = nv.ngayLam;
//   let luong= document.getElementById("luongCBEdit").value = nv.luongCB;
//   let chucVu= document.getElementById("chucvuEdit").value = nv.chucVu;
//   let gio= document.getElementById("gioLamEdit").value = nv.gioLam;
//   return [name, email, pass, date, luong, chucVu, gio];
// }
function layDuLieuForEdit() {
  const tk = document.getElementById("tknvEdit").value;       // vẫn có giá trị dù bị disabled
  const name = document.getElementById("nameEdit").value;
  const email = document.getElementById("emailEdit").value;
  const pass = document.getElementById("passwordEdit").value;
  const date = document.getElementById("datepickerEdit").value;
  const luong = document.getElementById("luongCBEdit").value;
  const chucVu = document.getElementById("chucvuEdit").value;
  const gio = document.getElementById("gioLamEdit").value;

  return [tk, name, email, pass, date, luong, chucVu, gio];
}
