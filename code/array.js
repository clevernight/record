

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


Array.myIsArray = function(target) {
  return Object.prototype.toString.call(target).slice(8, 13) === 'Array'
}

var a = [1,2,[3,[4,[5]]],[6,7,[8]]]

// console.log(a.myFlat(Infinity))
console.log(Array.myIsArray(a))