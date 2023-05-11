export class APromise {
  status = 'pending'
  value: any = ''
  private onFulfilled: Function[] = []
  private onRejected: Function[] = []

  constructor(executor: (resolve: Function, reject?: Function) => void) {
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  static all(promiseList: APromise[]) {
    return new APromise((resolve, reject) => {
      const result: any[] = []
      let count = 0
      promiseList.forEach((p, i) => {
        p.then((val: any) => {
          result[i] = val
          count++
          if (count === promiseList.length)
            resolve(result)
        }, (err: any) => {
          if (reject)
            reject(err)
        })
      })
    })
  }

  private resolve(value: any) {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
      this.onFulfilled.forEach(fn => fn(this.value))
    }
  }

  private reject(reason: any) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.onRejected.forEach(fn => fn(reason))
    }
  }

  public then(onFulfilled: Function, onRejected?: Function) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    }
    else if (this.status === 'rejected' && onRejected) {
      onRejected()
    }
    else if (this.status === 'pending') {
      this.onFulfilled.push(onFulfilled)
      if (onRejected)
        this.onRejected.push(onRejected)
    }
    return this
  }
}
