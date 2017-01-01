# randomwords [![Join the chat at https://gitter.im/ZenyWay/randomwords](https://badges.gitter.im/ZenyWay/randomwords.svg)](https://gitter.im/ZenyWay/randomwords?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM](https://nodei.co/npm/randomwords.png?compact=true)](https://nodei.co/npm/randomwords/)
[![build status](https://travis-ci.org/ZenyWay/randomwords.svg?branch=master)](https://travis-ci.org/ZenyWay/randomwords)
[![coverage status](https://coveralls.io/repos/github/ZenyWay/randomwords/badge.svg?branch=master)](https://coveralls.io/github/ZenyWay/randomwords)
[![Dependency Status](https://gemnasium.com/badges/github.com/ZenyWay/randomwords.svg)](https://gemnasium.com/github.com/ZenyWay/randomwords)

generate Uint16Array with cryptographically-secure random 16-bit integer (word) entries, like randombytes for words.

# <a name="example"></a> example
```ts
import getRandomWords from 'randomwords'
const randomwords = getRandomWords() // optionally inject 'randombytes' replacement with { randombytes: replacement }

import debug = require('debug')
const log = debug('example')

const words = randomwords(8) // Uint16Array with 8 cryptographically-secure random entries
words.forEach(log)
```

a live version of this example can be viewed [here](https://cdn.rawgit.com/ZenyWay/randomwords/v1.0.3/spec/example/index.html)
in the browser console,
or by cloning this repository and running the following commands from a terminal:
```bash
npm install
npm run example
```
the files of this example are available [here](./spec/example).

# <a name="api"></a> API v1.0 stable
`ES5` and [`Typescript`](http://www.typescriptlang.org/) compatible.
coded in `Typescript 2`, transpiled to `ES5`.

for a detailed specification of the API,
run the [unit tests](https://cdn.rawgit.com/ZenyWay/randomwords/v1.0.3/spec/web/index.html)
in your browser.

# <a name="contributing"></a> CONTRIBUTING
see the [contribution guidelines](./CONTRIBUTING.md)

# <a name="license"></a> LICENSE
Copyright 2016 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
