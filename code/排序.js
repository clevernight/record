// 从小到大

// 冒泡
const bubble = (arr) => {
  const len = arr.length

  for (let i = len - 1; i >= 0; --i) {
    for (let j = 1; j <= i; ++j) {
      if (arr[j] < arr[j-1]) {
        [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
      }
    }
  }

  return arr
}

// 选择
const select = (arr) => {
  const len = arr.length
  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      if (arr[j] < arr[i]) {
        [arr[j], arr[i]] = [arr[i], arr[j]]
      }
    }
  }
  return arr
}

// 插入
const insert = (arr) => {
  const ans = [arr[0]]
  const len = arr.length
  for (let i = 1; i < len; ++i) {
    let j = 0;
    while (ans[j] < arr[i]) {
      ++j
    }
    ans.splice(j, 0, arr[i])
  }
  return ans
}

// 归并
const union = (arr) => {
  if (arr.length > 2) {
    const leftLen = Math.floor(arr.length / 2)
    const left = union(arr.slice(0, leftLen))
    const right = union(arr.slice(leftLen))
    const rightLen = right.length
    const ans = []
    let i = 0, j = 0
    while (i < leftLen && j < rightLen) {
      if (left[i] <= right[j]) {
        ans.push(left[i++])
      } else {
        ans.push(right[j++])
      }
    }
    if (i === leftLen) {
      ans.push(...right.slice(j))
    } else {
      ans.push(...left.slice(i))
    }
    return ans
  } else if (arr.length === 2) {
    return arr[0] <= arr[1] ? arr : [arr[1], arr[0]]
  }
  return arr
}

// 快速
const quick = (arr) => {
  const deal = (sl, sr) => {
    let left = sl
    let right = sr
    const num = arr[left]
    while (left < right) {
      if (arr[left] > num) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        --right
      } else if (arr[right] < num) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        ++left
      } else {
        --right
      }
    }
    arr[left] = num
    sl < left - 1 && deal(sl, left - 1)
    sr > left + 1 && deal(left + 1, sr)
  }
  deal(0, arr.length-1)
  return arr
}

// 堆排
const heap = (arr) => {
  const len = arr.length
  let last = len - 1
  while (last > 0) {
    let start = Math.ceil(last / 2) - 1
    while (start >= 0) {
      if (arr[start] < arr[start*2+1]) {
        [arr[start], arr[start*2+1]] = [arr[start*2+1], arr[start]]
      }
      if (start*2+2 < last && arr[start*2+2] !== undefined && arr[start] < arr[start*2+2]) {
        [arr[start], arr[start*2+2]] = [arr[start*2+2], arr[start]]
      }
      --start
    }
    [arr[0], arr[last]] = [arr[last], arr[0]]
    --last
  }
  return arr
}

const array = [2,23,5,12,5,16,-1,1,6,1,4,7,51,43,6,13,6,1]

console.log(heap(array))