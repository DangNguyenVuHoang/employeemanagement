export const validation = {
  // Tài khoản: 4-6 ký số
  isTaiKhoanValid(value) {
    const regex = /^[0-9]{4,6}$/;
    return regex.test(value);
  },

  // Họ tên: chỉ chứa chữ cái và khoảng trắng (không số, không ký tự đặc biệt)
  isAlphabetOnly(value) {
    const regex = /^[A-Za-zÀ-ỹ\s]+$/u;
    return regex.test(value.trim());
  },

  // Email chuẩn
  isEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  },

  // Mật khẩu: 6-10 ký tự, có ít nhất 1 số, 1 chữ in hoa và 1 ký tự đặc biệt
  isPasswordValid(value) {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;
    return regex.test(value);
  },

  // Ngày làm: định dạng mm/dd/yyyy
  isValidDate(value) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    return regex.test(value);
  },

  // Kiểm tra số nằm trong khoảng min-max
  isNumberInRange(value, min, max) {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  }
};
