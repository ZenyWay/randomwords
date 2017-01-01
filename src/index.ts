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
export interface RandomWordsFactorySpec {
  randombytes: any
}

export default function getRandomWords (opts?: Partial<RandomWordsFactorySpec>): (length: number) => Uint16Array {
  const randombytes = opts && opts.randombytes || require('randombytes')
  assert(isFunction(randombytes), 'randombytes is not a function')

  return function randomwords (length: number): Uint16Array {
    assert(isValidInteger(length), 'invalid length')

    return randombytes(length << 1)
    .reduce((words: Uint16Array, rnd: number, i: number) => {
      const index = i >>> 1
      words[index] = i % 2 ? (words[index] << 8) + rnd : rnd
      return words
    }, new Uint16Array(length))
  }
}

function isValidInteger (val: any): val is number {
  return Number.isInteger(val) && (val >= 0) && (val < 32768)
}

function isFunction (val: any): val is Function {
  return typeof val === 'function'
}

function assert (truthy: boolean, message: string) {
  if (truthy) { return }
  throw new TypeError(message)
}
