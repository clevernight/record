
// instanceof
function myInstanceof(source, constructor = Object) {
  while (source) {
    if (source.__proto__ === constructor.prototype) {
      return true
    }
    source = source.__proto__
  }
  return false
}

myInstanceof([], Array)



// new
function myNew(constructor, ...args) {
  const ans = {}
  ans.__proto__ = constructor.prototype
  const tmp = constructor.apply(ans, args)
  return tmp instanceof Object ? tmp : ans
}

function Person(name, age) {
  this.type = 'person'
  this.name = name
  this.age = age
  // return {}
}

var p = myNew(Person, 'name', 2)



// curry
function addCurry(...args) {
  const allArgs = [...args]
  const fn = function(...fnArgs) {
    allArgs.push(...fnArgs)
    return fn
  }
  fn.toString = function() {
    return allArgs.reduce((pre, now) => pre + now)
  }
  return fn
}

addCurry(2)




// flat
function objectFlatten(obj) {
  const isObject = tar => typeof tar === 'object'
  if (!isObject(obj)) {
    return obj
  }
  const ans = {}
  const deal = (tar, pre) => {
    if (!isObject(tar)) {
      ans[pre] = tar
      return
    }
    if (Array.isArray(tar)) {
      for (let i = 0; i < tar.length; ++i) {
        deal(tar[i], `${pre}[${i}]`)
      }
      return
    }
    Object.getOwnPropertyNames(tar).concat(Object.getOwnPropertySymbols(tar)).forEach((key) => {
      deal(tar[key], pre ? `${pre}.${key}` : `${key}`)
    })
  }
  deal(obj, '')
  return ans
}
const source = {
  a: {
    b: 1,
    c: 2,
    d: {e: 5}
  },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}
console.log(objectFlatten(source))



// is
Object.myIs = function(a, b) {
  if (a === b) {
    return a !== 0 || 1/a === 1/b
  }
  return a !== a && b !== b
}
Object.myIs(1, 1)
Object.myIs(0, -0)
Object.myIs(NaN, NaN)