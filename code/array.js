

// flat
Array.prototype.myFlat = function(level = 1) {
  if (typeof level !== 'number' || level <= 0) {
    return [...this]
  }
  const deal = (arr, cou) => {
    return arr.reduce((pre, now) => {
      return pre.concat(Array.isArray(now) && cou > 0 ? deal(now, cou-1) : [now])
    }, [])
  }
  return deal(this, level)
}
Array.prototype.myFlat2 = function(level = 1) {
  if (typeof level !== 'number' || level <= 0) {
    return [...this]
  }
  let ans = [...this]
  while (level > 0 && ans.some((item) => Array.isArray(item))) {
    ans = [].concat(...ans)
    --level
  }
  return ans
}




Array.myIsArray = function(target) {
  return Object.prototype.toString.call(target).slice(8, 13) === 'Array'
}

var a = [1,2,[3,[4,[5]]],[6,7,[8]]]

console.log(a.myFlat2(Infinity))
// console.log(Array.myIsArray(a))