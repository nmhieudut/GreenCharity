const fromStatusToString = status => {
  switch (status) {
    case 'pending':
      return 'Đang chờ xác nhận';
    case 'active':
      return 'Đang diễn ra';
    case 'ended':
      return 'Đã kết thúc';
    default:
      return 'Đang chờ xác nhận';
  }
};

const fromResultToString = result => {
  switch (result) {
    case 'failed':
      return 'Thất bại';
    case 'success':
      return 'Thành công';
    default:
      return 'Chưa rõ';
  }
};

export { fromStatusToString, fromResultToString };
