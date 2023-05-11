import { describe, expect, it } from 'vitest'
import { APromise } from '../src'

describe('promise', () => {
  it('normal', () => {
    const apromise = new APromise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 1000)
    })

    apromise.then((val: number) => {
      expect(val).toEqual(1)
    })
  })

  it('all', async () => {
    const apromise1 = new APromise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 1000)
    })

    const apromise2 = new APromise((resolve, reject) => {
      setTimeout(() => {
        resolve(2)
      }, 2000)
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const res = await APromise.all([apromise1, apromise2])

    expect(res).toEqual([1, 2])
  })
})
