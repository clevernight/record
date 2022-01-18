
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myBind must be called on a function')
  }
  const targetFun = this
  return function () {
    return targetFun.apply(context, args.concat(...arguments))
  }
}


function isArrayLike(o) {
  if(o &&                                    // o不是null、undefined等
     typeof o === 'object' &&                // o是对象
     isFinite(o.length) &&                   // o.length是有限数值
     o.length >= 0 &&                        // o.length为非负值
     o.length === Math.floor(o.length) &&    // o.length是整数
     o.length < 4294967296)                  // o.length < 2^32
     return true
  else
     return false
}

Function.prototype.myApply = function(context, arg = []) {
  if (typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function')
  }
  if (!isArrayLike(arg)) {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }
  context = context || window
  const symbol = Symbol()
  context[symbol] = this
  const result = context[symbol](...arg)
  delete context[symbol]
  return result
}

Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myCall must be called on a function')
  }
  context = context || window
  const symbol = Symbol()
  context[symbol] = this
  const result = context[symbol](...args)
  delete context[symbol]
  return result
}



var a = {
  name: 'a',
  fun: function(p1, p2, p3) {
    return [p1, p2, p3, this.name]
  }
}

var b = {
  name: 'b'
}

b.fun = a.fun.myBind(a, 1, 2)
console.log(b.fun(3))

console.log(a.fun.myApply(b, [1, 2]))

console.log(a.fun.myCall(b, 1,2,3))