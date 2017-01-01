(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
;
var src_1 = require("../src");
var result = {};
beforeEach(function () {
    delete result.value;
    delete result.error;
});
function sum(a, b) {
    return a + b;
}
describe('getRandomWords (opts?: Partial<RandomWordsFactorySpec>): ' +
    '(length: number) => Uint16Array', function () {
    describe('when called without argument', function () {
        beforeEach(function () {
            try {
                result.value = src_1.default();
            }
            catch (err) {
                result.error = err;
            }
        });
        it('returns the default `randomwords (length: number): Uint16Array` function', function () {
            expect(result.error).toBeUndefined();
            expect(result.value).toEqual(jasmine.any(Function));
        });
    });
});
describe('randomwords (length: number): Uint16Array', function () {
    var randombytes;
    var randomwords;
    beforeEach(function () {
        randombytes = jasmine.createSpy('randombytes')
            .and.callFake(function (length) {
            return new Uint16Array(length).map(function (v, i) { return i % 2 ? (i >>> 1) & 255 : i >>> 9; });
        });
        randomwords = src_1.default({ randombytes: randombytes });
        result.value = [];
        result.error = [];
    });
    describe('when called with a positive integer smaller than 32768', function () {
        beforeEach(function () {
            ;
            [0, 64, 32767]
                .reduce(function (result, length) {
                try {
                    result.value.push(randomwords(length));
                }
                catch (err) {
                    result.error.push(err);
                }
                return result;
            }, result);
        });
        it('returns a Uint16Array of the given length ' +
            'filled with random 16-bit integers (words)', function () {
            expect(result.error.length).toBe(0);
            expect(result.value.map(function (arr) { return arr.length; })).toEqual([0, 64, 32767]);
            expect(result.value.map(function (arr) { return arr.reduce(sum, 0); }))
                .toEqual([0, 32 * 63, 16383 * 32767]);
            expect(randombytes.calls.allArgs()).toEqual([
                [0], [2 * 64], [2 * 32767]
            ]);
        });
    });
    describe('when called with anything else than a positive integer ' +
        'smaller than 32768', function () {
        beforeEach(function () {
            ;
            [-1, 32768, true, 'foo', function () { }, [42], { foo: 'foo' }]
                .reduce(function (result, arg) {
                try {
                    result.value.push(randomwords(arg));
                }
                catch (err) {
                    result.error.push(err);
                }
                return result;
            }, result);
        });
        it('throws an `invalid length` TypeError', function () {
            expect(result.value.length).toBe(0);
            expect(result.error.length).toBe(7);
            result.error.forEach(function (error) {
                expect(error).toEqual(jasmine.any(TypeError));
                expect(error.message).toBe('invalid length');
            });
            expect(randombytes).not.toHaveBeenCalled();
        });
    });
});

},{"../src":2}],2:[function(require,module,exports){
"use strict";
;
function getRandomWords(opts) {
    var randombytes = opts && opts.randombytes || require('randombytes');
    assert(isFunction(randombytes), 'randombytes is not a function');
    return function randomwords(length) {
        assert(isValidInteger(length), 'invalid length');
        return randombytes(length << 1)
            .reduce(function (words, rnd, i) {
            var index = i >>> 1;
            words[index] = i % 2 ? (words[index] << 8) + rnd : rnd;
            return words;
        }, new Uint16Array(length));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getRandomWords;
function isValidInteger(val) {
    return Number.isInteger(val) && (val >= 0) && (val < 32768);
}
function isFunction(val) {
    return typeof val === 'function';
}
function assert(truthy, message) {
    if (truthy) {
        return;
    }
    throw new TypeError(message);
}

},{"randombytes":undefined}]},{},[1]);
