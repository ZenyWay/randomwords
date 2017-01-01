/*
 * Copyright 2016 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
import getRandomWords from '../src'
import { __assign as assign } from 'tslib'

interface TestResult {
  value?: any
  error?: any
}

const result: TestResult = {}

beforeEach (() => {
  delete result.value
  delete result.error
})

function sum (a: number, b: number) {
  return a + b
}

describe('getRandomWords (opts?: Partial<RandomWordsFactorySpec>): ' +
'(length: number) => Uint16Array', () => {
  describe('when called without argument', () => {
    beforeEach(() => {
      try {
        result.value = getRandomWords()
      } catch (err) {
        result.error = err
      }
    })

    it('returns the default `randomwords (length: number): Uint16Array` function',
    () => {
      expect(result.error).toBeUndefined()
      expect(result.value).toEqual(jasmine.any(Function))
    })
  })
})

describe('randomwords (length: number): Uint16Array', () => {
  let randombytes: jasmine.Spy
  let randomwords: (length: number) => Uint16Array

  beforeEach (() => {
    randombytes = jasmine.createSpy('randombytes')
    .and.callFake((length: number) => // convert (index >>> 1) alternatively to low and high bytes
      new Uint16Array(length).map((v, i) => i % 2 ? (i >>> 1) & 255 : i >>> 9))
    randomwords = getRandomWords({ randombytes: randombytes })
    result.value = []
    result.error = []
  })

  describe('when called with a positive integer smaller than 32768', () => {
    beforeEach(() => {
      ;[ 0, 64, 32767 ]
      .reduce((result, length) => {
        try {
          result.value.push(randomwords(length))
        } catch (err) {
          result.error.push(err)
        }
        return result
      }, result)
    })

    it('returns a Uint16Array of the given length ' +
    'filled with random 16-bit integers (words)', () => {
      expect(result.error.length).toBe(0)
      expect(result.value.map((arr: any) => arr.length)).toEqual([ 0, 64, 32767 ])
      expect(result.value.map((arr: any) => arr.reduce(sum, 0))) // checksum
      .toEqual([ 0, 32 * 63, 16383 * 32767 ]) // sums of positive integer sequences
      expect(randombytes.calls.allArgs()).toEqual([
        [ 0 ], [ 2 * 64 ], [ 2 * 32767 ]
      ])
    })
  })

  describe('when called with anything else than a positive integer ' +
  'smaller than 32768', () => {
    beforeEach(() => {
      ;[ -1, 32768, true, 'foo', () => {}, [ 42 ], { foo: 'foo' } ]
      .reduce((result, arg) => {
        try {
          result.value.push((<any>randomwords)(arg))
        } catch (err) {
          result.error.push(err)
        }
        return result
      }, result)
    })

    it('throws an `invalid length` TypeError', () => {
      expect(result.value.length).toBe(0)
      expect(result.error.length).toBe(7)
      result.error.forEach((error: any) => {
        expect(error).toEqual(jasmine.any(TypeError))
        expect(error.message).toBe('invalid length')
      })
      expect(randombytes).not.toHaveBeenCalled()
    })
  })
})