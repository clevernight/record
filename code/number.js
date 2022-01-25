
// 10进制转36进制
function decimalTo36(decimalNumber = 0) {
  let ans = ''
  while (decimalNumber) {
    const tmp = decimalNumber % 36
    if (tmp < 10) {
      ans = tmp + ans
    } else {
      ans = String.fromCharCode(tmp + 55) + ans
    }
    decimalNumber = Math.floor(decimalNumber / 36)
  }
  return ans ? ans : '0'
}

