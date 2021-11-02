export const convertToBreadcrumbs = string => {
  switch (string.toLowerCase()) {
    case "home":
      return "Trang chủ";
    case "campaigns":
      return "Các hoạt động";
    case "[slug]":
      return "Chi tiết";
    case "news":
      return "Tin tức";
    case "about":
      return "Về chúng tôi";
    case "new":
      return "Tạo hoạt động";
    case "auth":
      return "Đăng nhập / đăng kí";
    case "account":
      return "Tài khoản";
    case "404":
      return "Không tìm thấy trang";
    default:
      return null;
  }
};
