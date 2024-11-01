# js_sys type validation in wasm

js_sys::{Array, JsString, Number, Object} を使って型注釈したときに wasm 側で何が起こるか調べてみよう

- 元ファイル: [src/lib.rs](https://github.com/todays-mitsui/js-sys-type-validation-in-wasm/blob/master/src/lib.rs)
- 生成された型定義: [index.d.ts](https://github.com/todays-mitsui/js-sys-type-validation-in-wasm/blob/master/pkg/index.d.ts)
- 挙動を調べるためのテスト: [tests/index.test.j](https://github.com/todays-mitsui/js-sys-type-validation-in-wasm/blob/master/tests/index.test.js)
