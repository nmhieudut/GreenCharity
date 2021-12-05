import * as n from 'numeral';
function ignoreZeroBefore(number) {
  if (/^0/.test(number)) {
    return number.replace(/^0/, '');
  }
}

function VNDFormatter(amount) {
  return n(amount).format('0,0');
}

export { ignoreZeroBefore, VNDFormatter };
