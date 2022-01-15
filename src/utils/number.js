import * as n from 'numeral';
function ignoreZeroBefore(number) {
  if (/^0/.test(number)) {
    return number.replace(/^0/, '');
  }
}

function toVND(amount) {
  return n(amount).format('0,0');
}

export { ignoreZeroBefore, toVND };
