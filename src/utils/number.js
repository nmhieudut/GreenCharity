function ignoreZeroBefore(number) {
  if (/^0/.test(number)) {
    return number.replace(/^0/, '');
  }
}

export default ignoreZeroBefore;
