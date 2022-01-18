
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