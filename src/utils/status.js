const convertStatusToString = () => {
  switch (this.status) {
    case "pending":
      return "Đang chờ xác nhận";
    case "active":
      return "Đang diễn ra";
    case "ended":
      return "Đã kết thúc";
    default:
      return "Đang chờ xác nhận";
  }
};
export { convertStatusToString };
