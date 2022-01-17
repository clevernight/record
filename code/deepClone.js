
const isFunction = target => typeof target === 'function'
const isObject = target => typeof target === 'object'
const isArray = target => Object.prototype.toString.call(target).slice(8, 13) === 'Array'

function dfsDeepClone(origin, hasCloned = new WeakMap()) {
  if (hasCloned.has(origin)) {
    return hasCloned.get(origin)
  }
  if (isArray(origin)) {
    const ans = []
    hasCloned.set(origin, ans)
    for (let i = 0, len = origin.length; i < len; ++i) {
      ans[i] = dfsDeepClone(origin[i], hasCloned)
    }
    return ans
  } else if (isObject(origin)) {
    const ans = {}
    hasCloned.set(origin, ans)
    Object.getOwnPropertyNames(origin).concat(Object.getOwnPropertySymbols(item)).forEach(key => {
      ans[key] = dfsDeepClone(origin[key], hasCloned)
    })
    return ans
  }
  return origin
}

function bfsDeepClone(origin) {
  if (!isObject(origin)) {
    return origin
  }
  const hasCloned = new WeakMap()
  const originList = [origin]

  const deal = (_source, _target, key) => {
    if (isObject(_source[key])) {
      if (hasCloned.has(_source[key])) {
        _target[key] = hasCloned.get(_source[key])
        return
      }
      const tmpAns = isArray(_source[key]) ? [] : {}
      hasCloned.set(_source[key], tmpAns)
      originList.push(_source[key])
      _target[key] = tmpAns
    } else {
      _target[key] = _source[key]
    }
  }

  const finalAns = isArray(origin) ? [] : {}
  hasCloned.set(origin, finalAns)
  while (originList.length) {
    const item = originList.shift()
    const copyItem = hasCloned.get(item)
    if (isArray(item)) {
      for (let i = 0, len = item.length; i < len; ++i) {
        deal(item, copyItem, i)
      }
    } else if (isObject(item)) {
      Object.getOwnPropertyNames(item).concat(Object.getOwnPropertySymbols(item)).forEach(key => {
        deal(item, copyItem, key)
      })
    }
  }
  return finalAns
}

function Fun() {
  console.log(1)
}
Fun.prototype.log = () => {
  console.log('fun')
}

var originD = {
  number: 1,
  symbol: Symbol(2),
  fun: Fun,
  object: {subObject: {aa: 'aa', bb: 'bb'}},
  array: [1,2,3,[4,5,6], [{aaa:'aaa'}]]
}
originD.object.origin = originD
Object.defineProperty(originD, 'not', {
  value: 33,
  enumerable: false
})

var ans = bfsDeepClone(originD)