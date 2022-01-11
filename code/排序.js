// 从小到大

// 冒泡
const bubble = (arr) => {
  const len = arr.length

  for (let i = len - 1; i >= 0; --i) {
    for (let j = 1; j <= i; ++j) {
      if (arr[j] > arr[j-1]) {
        [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
      }
    }
  }

  return arr
}



const array = [2,23,5,12,5,15,1,6,1,4,51,43,6,13,6,1]

console.log(bubble(array))