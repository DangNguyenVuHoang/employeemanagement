import NhanVien from "../models/NhanVien.js";
import { validation } from "../utils/validation.js";
import { storage } from "../services/storage.js";

// let dsnv = storage.load() || [];
export let dsnv = storage.load() || []; // hoặc mảng ban đầu bạn dùng để lưu danh sách NV


function init() {
    // Lấy dữ liệu từ localStorage
    const dsnv = storage.load() || [];

    // Gán lại biến toàn cục nếu cần
    // window.dsnv = dsnv; // Nếu bạn dùng biến toàn cục

    // Hiển thị lên giao diện
    renderTable(dsnv);
}

// Gọi khi trang load
window.addEventListener("DOMContentLoaded", init);

// Khởi tạo danh sách nhân viên từ localStorage hoặc mảng rỗng


// === THÊM NHÂN VIÊN ===
export function themNhanVien(nvInput) {
    const nv = new NhanVien(...nvInput);
    console.log("👉 Đối tượng nv khởi tạo:", nv);

    // ⚠️ Kiểm tra trùng tài khoản trước khi validate
    const isDuplicate = dsnv.some((item) => item.taiKhoan === nv.taiKhoan);
    if (isDuplicate) {
        document.getElementById("tbTKNV").innerText = "Tài khoản đã tồn tại!";
        console.warn("❌ Tài khoản bị trùng:", nv.taiKhoan);
        return false;
    } else {
        document.getElementById("tbTKNV").innerText = ""; // clear nếu không trùng
    }

    // Validate trước khi thêm
    if (!validateNV(nv)) {
        console.warn("❌ Dữ liệu không hợp lệ:", nv);
        return false;
    }

    nv.tinhTongLuong();
    nv.xepLoai();

    dsnv.push(nv);
    storage.save(dsnv);

    console.log("✅ Đã thêm và lưu NV:", nv);
    renderTable(dsnv);

    // ✅ Hiển thị thông báo thành công
    const alert = document.getElementById("alertSuccess");
    alert.style.display = "block";
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000); // Ẩn sau 2 giây
    // $('#successToast').toast('show');

    return true;
}

// === XÓA NHÂN VIÊN ===
export function xoaNhanVien(taiKhoan) {
    dsnv = dsnv.filter(nv => nv.taiKhoan !== taiKhoan);
    storage.save(dsnv);
    renderTable(dsnv);
    // Hiển thị thông báo thành công
    const alert = document.getElementById("alertSuccess");
    alert.style.display = "block";
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000); // Ẩn sau 2 giây
}

// === CẬP NHẬT NHÂN VIÊN ===
export function capNhatNhanVien(nvInput) {
    console.log(" Du Lieu cao nhat nhan viuen ne", nvInput);
    const index = dsnv.findIndex(nv => nv.taiKhoan === nvInput[0]);
    if (index !== -1) {
        const nv = new NhanVien(...nvInput);
        if (!validateNVEdit(nv)) {
            console.warn("❌ Dữ liệu cập nhật không hợp lệ:", nv);
            return false;
        }

        nv.tinhTongLuong();
        nv.xepLoai();
        dsnv[index] = nv;
        storage.save(dsnv);
        renderTable(dsnv);

        // Hiển thị thông báo thành công
        const alert = document.getElementById("alertSuccess");
        alert.style.display = "block";
        setTimeout(() => {
            alert.style.display = "none";
        }, 2000); // Ẩn sau 2 giây
        return true;
    }
    return false;
}

// export function capNhatNhanVien(nvInput) {
//   const taiKhoanForm = nvInput[0];

//   const index = dsnv.findIndex(nv => nv.taiKhoan === taiKhoanForm);
//   if (index === -1) return false;

//   // Nếu người dùng cố tình sửa ID hoặc sửa từ console, cảnh báo
//   if (taiKhoanForm !== dsnv[index].taiKhoan) {
//     hienThongBaoLoi("Không được phép thay đổi tài khoản!");
//     return false;
//   }

//   // Tạo đối tượng mới
//   const nv = new NhanVien(...nvInput);

//   if (!validateNV(nv)) {
//     console.warn("❌ Dữ liệu cập nhật không hợp lệ:", nv);
//     return false;
//   }

//   nv.tinhTongLuong();
//   nv.xepLoai();
//   dsnv[index] = nv;
//   storage.save(dsnv);
//   renderTable(dsnv);

//   hienThongBaoThanhCong("Cập nhật thành công!");
//   return true;
// }


// === TÌM NHÂN VIÊN THEO LOẠI ===
export function timTheoLoai(loai) {
    const result = dsnv.filter(nv => nv.loaiNV.toLowerCase().includes(loai.toLowerCase()));
    renderTable(result);
    // Hiển thị thông báo thành công
        const alert = document.getElementById("alertSuccess");
        alert.style.display = "block";
        setTimeout(() => {
            alert.style.display = "none";
        }, 2000); // Ẩn sau 2 giây
}

// === RENDER DANH SÁCH RA TABLE HTML ===
function renderTable(arr) {
    const tbody = document.getElementById("tableDanhSach");
    if (!tbody) return;
    tbody.innerHTML = arr.map(nv => `
    <tr>
      <td>${nv.taiKhoan}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngayLam}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.tongLuong.toLocaleString()}</td>
      <td>${nv.loaiNV}</td>
      <td>
        <button onclick="suaNV('${nv.taiKhoan}')" class="btn btn-info">Sửa</button>
        <button onclick="xoaNV('${nv.taiKhoan}')" class="btn btn-danger">Xóa</button>
      </td>
    </tr>
  `).join("");
}


// === VALIDATION TOÀN BỘ THÔNG TIN NHÂN VIÊN ===
function showError(id, message) {
    document.getElementById(id).innerText = message;
}

function clearError(id) {
    document.getElementById(id).innerText = "";
}

function validateNV(nv) {
    let valid = true;

    if (!validation.isTaiKhoanValid(nv.taiKhoan)) {
        showError("tbTKNV", "Tài khoản từ 4-6 ký số");
        valid = false;
    } else {
        clearError("tbTKNV");
    }

    if (!validation.isAlphabetOnly(nv.hoTen)) {
        showError("tbTen", "Họ tên chỉ chứa chữ và không để trống");
        valid = false;
    } else {
        clearError("tbTen");
    }

    if (!validation.isEmail(nv.email)) {
        showError("tbEmail", "Email không đúng định dạng");
        valid = false;
    } else {
        clearError("tbEmail");
    }

    if (!validation.isPasswordValid(nv.matKhau)) {
        showError("tbMatKhau", "Mật khẩu 6-10 ký tự, gồm số, chữ hoa, ký tự đặc biệt");
        valid = false;
    } else {
        clearError("tbMatKhau");
    }

    if (!validation.isValidDate(nv.ngayLam)) {
        showError("tbNgay", "Ngày làm không đúng định dạng mm/dd/yyyy");
        valid = false;
    } else {
        clearError("tbNgay");
    }

    if (!validation.isNumberInRange(nv.luongCB, 1000000, 20000000)) {
        showError("tbLuongCB", "Lương cơ bản từ 1.000.000 đến 20.000.000");
        valid = false;
    } else {
        clearError("tbLuongCB");
    }

    const validChucVu = ["Giám đốc", "Trưởng phòng", "Nhân viên"];
    if (!validChucVu.includes(nv.chucVu)) {
        showError("tbChucVu", "Vui lòng chọn chức vụ hợp lệ");
        valid = false;
    } else {
        clearError("tbChucVu");
    }

    if (!validation.isNumberInRange(nv.gioLam, 80, 200)) {
        showError("tbGiolam", "Giờ làm từ 80 đến 200 giờ");
        valid = false;
    } else {
        clearError("tbGiolam");
    }

    return valid;
}

function validateNVEdit(nv) {
    let valid = true;

    if (!validation.isTaiKhoanValid(nv.taiKhoan)) {
        showError("tbTKNVEdit", "Tài khoản từ 4-6 ký số");
        valid = false;
    } else {
        clearError("tbTKNVEdit");
    }

    if (!validation.isAlphabetOnly(nv.hoTen)) {
        showError("tbTenEdit", "Họ tên chỉ chứa chữ và không để trống");
        valid = false;
    } else {
        clearError("tbTenEdit");
    }

    if (!validation.isEmail(nv.email)) {
        showError("tbEmailEdit", "Email không đúng định dạng");
        valid = false;
    } else {
        clearError("tbEmailEdit");
    }

    if (!validation.isPasswordValid(nv.matKhau)) {
        showError("tbMatKhauEdit", "Mật khẩu 6-10 ký tự, gồm số, chữ hoa, ký tự đặc biệt");
        valid = false;
    } else {
        clearError("tbMatKhauEdit");
    }

    if (!validation.isValidDate(nv.ngayLam)) {
        showError("tbNgayEdit", "Ngày làm không đúng định dạng mm/dd/yyyy");
        valid = false;
    } else {
        clearError("tbNgayEdit");
    }

    if (!validation.isNumberInRange(nv.luongCB, 1000000, 20000000)) {
        showError("tbLuongCBEdit", "Lương cơ bản từ 1.000.000 đến 20.000.000");
        valid = false;
    } else {
        clearError("tbLuongCBEdit");
    }

    const validChucVu = ["Giám đốc", "Trưởng phòng", "Nhân viên"];
    if (!validChucVu.includes(nv.chucVu)) {
        showError("tbChucVuEdit", "Vui lòng chọn chức vụ hợp lệ");
        valid = false;
    } else {
        clearError("tbChucVuEdit");
    }

    if (!validation.isNumberInRange(nv.gioLam, 80, 200)) {
        showError("tbGiolamEdit", "Giờ làm từ 80 đến 200 giờ");
        valid = false;
    } else {
        clearError("tbGiolamEdit");
    }

    return valid;
}

// function hienThongBaoThanhCong(message) {
//   const alert = document.getElementById("alertSuccess");
//   alert.textContent = message;
//   alert.classList.remove("d-none");
//   setTimeout(() => alert.classList.add("d-none"), 2000);
// }

// function hienThongBaoLoi(message) {
//   const alert = document.getElementById("alertError");
//   alert.textContent = message;
//   alert.classList.remove("d-none");
//   setTimeout(() => alert.classList.add("d-none"), 3000);
// }


