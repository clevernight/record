
const STATUS = {
  PENDING: 'pending',
  FULFILL: 'fulfill',
  REJECT: 'reject'
}

class MyPromise {

  constructor(cb) {
    this.status = STATUS.PENDING

    this._onfulfilledList = []
    this._onfulfilledData = undefined

    this._onrejectedList = []
    this._onrejectedReason = undefined

    this._resolve = this._resolve.bind(this)
    this._reject = this._reject.bind(this)

    try {
      cb(this._resolve, this._reject)
    } catch(err) {
      this._reject(err)
    }
  }

  _resolve(res) { 
    if(res instanceof MyPromise){
      // 递归解析 
      return res.then(this._resolve, this._reject)
    }
    if (this.status === STATUS.PENDING) {
      this._onfulfilledData = res
      this.status = STATUS.FULFILL
      for (let i = 0, len = this._onfulfilledList.length; i < len; ++i) {
        this._onfulfilledList[i](res)
      }
      this._onfulfilledList = null
    }
  }

  _reject(err) {
    if (this.status === STATUS.PENDING) {
      this._onrejectedReason = err
      this.status = STATUS.REJECT
      for (let i = 0, len = this._onrejectedList.length; i < len; ++i) {
        this._onrejectedList[i](err)
      }
      this._onrejectedList = null
    }
  }

  then(onfulfilled, onrejected) {
    if (typeof onfulfilled !== 'function') {
      onfulfilled = value => value
    }
    if (typeof onrejected !== 'function') {
      onrejected = reason => {throw new Error(reason)}
    }
    const thenPromise = new MyPromise((resolve, reject) => {
      // 为了异步
      const asyncOnfulfilled = () => {
        try {
          const x = onfulfilled(this._onfulfilledData)
          MyPromise.resolvePromise(thenPromise, x, resolve, reject)
        } catch(error) {
          reject(error)
        }
      }
      const asyncOnrejected = () => {
        try {
          const x = onrejected(this._onrejectedReason)
          MyPromise.resolvePromise(thenPromise, x, resolve, reject)
        } catch(error) {
          reject(error)
        }
      }
      if (this.status === STATUS.PENDING) {
        this._onfulfilledList.push(() => setTimeout(asyncOnfulfilled))
        this._onrejectedList.push(() => setTimeout(asyncOnrejected))
      } else if (this.status === STATUS.FULFILL) {
        setTimeout(asyncOnfulfilled)
      } else if (this.status === STATUS.REJECT) {
        setTimeout(asyncOnrejected)
      }
    })

    return thenPromise
  }

  /**
   * thenPromise: 上一个then要返回的新的Promise对象
   * x: 上一个then处理函数的返回值
   * resolve: thenPromise的resolve
   * reject: thenPromise的reject
   */
  static resolvePromise(thenPromise, x, resolve, reject) {
    // 不能返回自身
    if (thenPromise === x) {
      reject(new TypeError('Chaining cycle'))
    }
    if (x !== null && (x instanceof MyPromise)) {
      //函数或对象
      try {
        x.then.call(x, res => MyPromise.resolvePromise(promise2, y, resolve, reject), err => reject(err))
      } catch(err) {
        reject(err)
      }
    } else {
      //普通值
      resolve(x)
    }
  }

  catch(reject) {
    return this.then(null, reject)
  }


  finally(onfinish) {
    return this.then(res => {
      onfinish()
      return res
    }).catch(err => {
      onfinish()
      return err
    })
  }

  static resolve(res) {
    return new MyPromise(_resolve => {
      _resolve(res)
    })
  }

  static reject(err) {
    return new MyPromise((r, _reject) => {
      _reject(err)
    })
  }

  static all(promiseList) {
    // 缺个数组可遍历判断
    let cou = 0
    const len = promiseList.length
    const resList = new Array()
    return new MyPromise((_resolve, _reject) => {
      promiseList.forEach((item, index) => {
        MyPromise.resolve(item).then((res) => {
          ++cou
          resList[index] = res
          if (cou === len) {
            _resolve(resList)
          }
        }).catch(err => {
          _reject(err)
        })
      })
    })
  }

  static race(promiseList) {
    return new MyPromise((_resolve, _reject) => {
      for (let i = 0, len = promiseList.length; i < len; ++i) {
        MyPromise.resolve(promiseList[i]).then(_resolve, _reject)
      }
    })
  }

  static allSettled(promiseList) {
    let cou = 0
    const len = promiseList.length
    const resList = new Array()
    return new MyPromise((_resolve, _reject) => {
      promiseList.forEach((item, index) => {
        MyPromise.resolve(item).then((res) => {
          ++cou
          resList[index] = res
          if (cou === len) {
            _resolve(resList)
          }
        }).catch(err => {
          ++cou
          resList[index] = err
          if (cou === len) {
            _resolve(resList)
          }
        })
      })
    })
  }

  static any(promiseList) {
    let cou = 0
    const len = promiseList.length
    const resList = new Array()
    return new MyPromise((_resolve, _reject) => {
      promiseList.forEach((item, index) => {
        MyPromise.resolve(item).then((res) => {
          _resolve(res)
        }).catch(err => {
          ++cou
          resList[index] = err
          if (cou === len) {
            _resolve(resList)
          }
        })
      })
    })
  }
}


var p1 = new MyPromise((r)=>{r(1)})
var p2 = new MyPromise((r,re)=>{re(2)})
MyPromise.race([p2,p1]).then(res=>console.log(res))