

// EventEmitter
class EventEmitter {
  constructor() {
    this._eventMap = new Map()
  }

  on(name, cb) {
    if (!this._eventMap.has(name)) {
      this._eventMap.set(name, [])
    }
    this._eventMap.get(name).push(cb)
  }

  emit(name, data) {
    if (this._eventMap.has(name)) {
      this._eventMap.get(name).forEach(item => {
        item(data)
      })
    }
  }

  remove(name, cb) {
    if (this._eventMap.has(name)) {
      const list = this._eventMap.get(name)
      if (list.includes(cb)) {
        list.splice(list.indexOf(cb), 1)
      }
    }
  }
}
const eventEmitter = new EventEmitter()
function cb(p) {
  console.log(p)
}
eventEmitter.on('e', cb)
eventEmitter.emit('e')



// setInterval
function mySetInterval(cb, delay = 0) {
  if (typeof cb !== 'function') {
    throw new TypeError('param 1 must be function')
  }
  let timer = {
    handler: null,
    cancel: function() {
      timer.handler && clearTimeout(timer.handler)
    }
  }
  const reset = () => {
    timer.handler = setTimeout(() => {
      cb()
      reset()
    }, delay)
  }
  reset()
  return timer
}
const mt = mySetInterval(() => {console.log(1)}, 3000)



// redux compose
function compose(...funs) {
  if (funs.length === 0) {
    return p => p
  }
  if (funs.length === 1) {
    return funs[0]
  }
  return funs.reduce((pre, cur) => (...args) => pre(cur(...args)))
}
const fn1 = (n) => n + 1
const fn2 = (n) => n + 2
const fn3 = (n) => n + 3
const fn4 = (a, b) => a + '' + b
const fn = compose(fn1, fn2, fn3, fn4)
console.log(fn('s', 'e'))




// LRU (利用map是按照第一次写入时排序)
function LRU(max) {
  this.map = new Map()
  this.max = max
}
LRU.prototype.get = function(key) {
  if (this.map.has(key)) {
    const ans = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, ans)
    return ans
  }
  return -1
}
LRU.prototype.put = function(key, value) {
  if (this.map.has(key)) {
    this.map.delete(key)
  } else if (this.map.size >= this.max) {
    this.map.delete(this.map.keys().next().value)
  }
  this.map.set(key, value)
}
const lru = new LRU(2)
lru.put(1, 1)
lru.put(2, 2)
console.log(lru.get(1))
lru.put(3, 3)
console.log(lru.get(2))
lru.put(4, 4)
console.log(lru.get(1))
console.log(lru.get(3))
console.log(lru.get(4))






// ajax
function ajax({ url, type = 'get', data, dataType }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = xhr.responseText
          if (dataType && dataType === 'json') {
            res = JSON.parse(res)
          }
          resolve(res)
        } else {
          reject()
        }
      }
    }
    if (type.toLocaleLowerCase() === 'get' && data) {
      url += '?' + data
    }
    xhr.open(type, url, true)
    if (type.toLocaleLowerCase() === 'post' && data) {
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
      xhr.send(data)
    } else {
      xhr.send()
    }
  })
}
ajax({url:'https://www.baidu.com'}).then((res) => {console.log(res)}, (err)=>{console.log('e:', err)})