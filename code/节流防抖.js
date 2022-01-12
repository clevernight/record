
// 节流
const throttle = (fun, wait = 100, type = 'setTimeout') => {
  // 传入等待时间则进行等待，否则通过定时器
  if (typeof wait !== 'number') {
    throw new TypeError('type of wait must be number')
  } 
  if (type === 'timestamp') {
    let last = Date.now()
    return function() {
      const now = Date.now()
      if (now - last > wait) {
        last = now
        fun.apply(this, arguments)
      }
    }
  } else if (type === 'setTimeout') {
    let timer = null
    return function() {
      if (!timer) {
        const args = arguments
        const context = this
        timer = setTimeout(() => {
          timer = null
          fun.apply(context, args)
        }, wait)
      }
    }
  }
  return fun
}

// 防抖
const debounce = (fun, wait = 100, immediate = false, maxWait = Infinity) => {
  let timer = null
  let last = Date.now()
  return function() {
    const args = arguments
    const context = this
    const now = Date.now()
    const run = () => {
      last = now
      clearTimeout(timer)
      timer = null
      fun.apply(context, args)
    }
    if (now - last > maxWait) {
      run()
      return
    }
    if (timer === null && immediate) {
      run()
    } 
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      run()
    }, wait)
  }
}

const onClick = debounce((e) => {console.log(e.x, e.y)}, 1000)
document.addEventListener('click', onClick)