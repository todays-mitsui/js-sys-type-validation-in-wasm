use js_sys::{Array, JsString, Number, Object};
use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn want_string(x: String) -> String {
    console::log_1(&JsValue::from(&x).into());
    return x;
}

#[wasm_bindgen]
pub fn want_number(x: f64) -> f64 {
    console::log_1(&JsValue::from(x).into());
    return x;
}

#[wasm_bindgen]
pub fn want_array(x: Vec<JsValue>) -> Vec<JsValue> {
    console::log_1(&x.clone().into());
    return x;
}

// ========================================================================== //

#[wasm_bindgen]
pub fn maybe_want_string(x: JsString) -> JsString {
    console::log_1(&x.clone().into());
    return x;
}

#[wasm_bindgen]
pub fn maybe_want_number(x: Number) -> Number {
    console::log_1(&x.clone().into());
    return x;
}

#[wasm_bindgen]
pub fn maybe_want_object(x: Object) -> Object {
    console::log_1(&x.clone().into());
    return x;
}

#[wasm_bindgen]
pub fn maybe_want_array(x: Array) -> Array {
    console::log_1(&x.clone().into());
    return x;
}

// ========================================================================== //

#[wasm_bindgen]
pub fn really_want_string(x: JsString) -> Result<JsString, JsError> {
    match x.as_string() {
        Some(_) => {
            console::log_1(&x.clone().into());
            Ok(x)
        }
        None => Err(JsError::new("Expected a string")),
    }
}

#[wasm_bindgen]
pub fn really_want_number(x: Number) -> Result<Number, JsError> {
    match x.as_f64() {
        Some(_) => {
            console::log_1(&x.clone().into());
            Ok(x)
        }
        None => Err(JsError::new("Expected a number")),
    }
}

#[wasm_bindgen]
pub fn really_want_object(x: Object) -> Result<Object, JsError> {
    if x.is_object() {
        console::log_1(&x.clone().into());
        Ok(x)
    } else {
        Err(JsError::new("Expected an object"))
    }
}

#[wasm_bindgen]
pub fn really_want_array(x: Array) -> Result<Array, JsError> {
    if x.is_array() {
        console::log_1(&x.clone().into());
        Ok(x)
    } else {
        Err(JsError::new("Expected an array"))
    }
}

// ========================================================================== //

#[wasm_bindgen]
pub fn add(x: Number, y: Number) -> Number {
    x + y
}

// ========================================================================== //

#[wasm_bindgen]
pub fn unary_negation_for_f64(x: f64) -> f64 {
    -x
}

#[wasm_bindgen]
pub fn unary_negation_for_js_value(x: JsValue) -> f64 {
    match x.as_f64() {
        Some(x) => -x,
        None => Number::NAN,
    }
}

#[wasm_bindgen]
pub fn unary_negation_for_js_sys_number(x: Number) -> Number {
    -x
}
