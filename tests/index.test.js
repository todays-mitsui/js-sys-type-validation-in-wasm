import { describe, test, expect } from "vitest";
import {
  want_string,
  want_number,
  maybe_want_string,
  maybe_want_number,
  maybe_want_object,
  maybe_want_array,
  really_want_string,
  really_want_number,
  really_want_object,
  really_want_array,
  add,
  unary_negation_for_f64,
  unary_negation_for_js_value,
  unary_negation_for_js_sys_number,
} from "../pkg/index";


describe("want_string()", () => {
  test("string はもちろん受け入れられる", () => {
    expect(() => want_string("hello")).not.toThrow();
    expect(want_string("hello")).toBe("hello");
  });
  test("number を渡すと例外が投げられる", () => {
    expect(() => want_string(42)).toThrow();
  });
  test("object を渡すと例外が投げられる", () => {
    expect(() => want_string({ hello: 42 })).toThrow();
  });
  test("array を渡すと例外が投げられる", () => {
    expect(() => want_string(["hello", 42])).toThrow();
  });
});

describe("want_number()", () => {
  test("number はもちろん受け入れられる", () => {
    expect(() => want_number(42)).not.toThrow();
    expect(want_number(42)).toBe(42);
  });
  test("string をパースして number に解釈してくれるようだ", () => {
    expect(() => want_number("42")).not.toThrow();
    expect(want_number("42")).toBe(42);
  });
  test("string を渡すと NaN 扱いになる", () => {
    expect(() => want_number("hello")).not.toThrow();
    expect(want_number("hello")).toBeNaN();
  });
  test("object を渡すと NaN 扱いになる", () => {
    expect(() => want_number({ hello: 42 })).not.toThrow();
    expect(want_number({ hello: 42 })).toBeNaN();
  });
  test("array を渡すと NaN 扱いになる", () => {
    expect(() => want_number(["hello", 42])).not.toThrow();
    expect(want_number(["hello", 42])).toBeNaN();
  });
});

// ========================================================================== //

describe("maybe_want_string()", () => {
  test("string はもちろん受け入れられる", () => {
    expect(() => maybe_want_string("hello")).not.toThrow();
    expect(maybe_want_string("hello")).toBe("hello");
  });
  test("おっと、number を渡しても例外は投げられない", () => {
    expect(() => maybe_want_string(42)).not.toThrow();
    expect(maybe_want_string(42)).toBe(42);
  });
  test("おっと、object を渡しても例外は投げられない", () => {
    expect(() => maybe_want_string({ hello: 42 })).not.toThrow();
    expect(maybe_want_string({ hello: 42 })).toEqual({ hello: 42 });
  });
  test("おっと、array を渡しても例外は投げられない", () => {
    expect(() => maybe_want_string(["hello", 42])).not.toThrow();
    expect(maybe_want_string(["hello", 42])).toEqual(["hello", 42]);
  });
});

describe("maybe_want_number()", () => {
  test("number はもちろん受け入れられる", () => {
    expect(() => maybe_want_number(42)).not.toThrow();
    expect(maybe_want_number(42)).toBe(42);
  });
  test("string をパースして number に解釈するような挙動は無い", () => {
    expect(() => maybe_want_number("42")).not.toThrow();
    expect(maybe_want_number("42")).toBe("42");
  });
  test("おっと、string を渡しても例外は投げられない", () => {
    expect(() => maybe_want_number("hello")).not.toThrow();
    expect(maybe_want_number("hello")).toBe("hello");
  });
  test("おっと、object を渡しても例外は投げられない", () => {
    expect(() => maybe_want_number({ hello: 42 })).not.toThrow();
    expect(maybe_want_number({ hello: 42 })).toEqual({ hello: 42 });
  });
  test("おっと、array を渡しても例外は投げられない", () => {
    expect(() => maybe_want_number(["hello", 42])).not.toThrow();
    expect(maybe_want_number(["hello", 42])).toEqual(["hello", 42]);
  });
});

describe("maybe_want_object()", () => {
  test("object はもちろん受け入れられる", () => {
    expect(() => maybe_want_object({ hello: 42 })).not.toThrow();
    expect(maybe_want_object({ hello: 42 })).toEqual({ hello: 42 });
  });
  test("おっと、string を渡しても例外は投げられない", () => {
    expect(() => maybe_want_object("hello")).not.toThrow();
    expect(maybe_want_object("hello")).toBe("hello");
  });
  test("おっと、number を渡しても例外は投げられない", () => {
    expect(() => maybe_want_object(42)).not.toThrow();
    expect(maybe_want_object(42)).toBe(42);
  });
  test("おっと、array を渡しても例外は投げられない", () => {
    expect(() => maybe_want_object(["hello", 42])).not.toThrow();
    expect(maybe_want_object(["hello", 42])).toEqual(["hello", 42]);
  });
});

describe("maybe_want_array()", () => {
  test("array はもちろん受け入れられる", () => {
    expect(() => maybe_want_array(["hello", 42])).not.toThrow();
    expect(maybe_want_array(["hello", 42])).toEqual(["hello", 42]);
  });
  test("おっと、string を渡しても例外は投げられない", () => {
    expect(() => maybe_want_array("hello")).not.toThrow();
    expect(maybe_want_array("hello")).toBe("hello");
  });
  test("おっと、number を渡しても例外は投げられない", () => {
    expect(() => maybe_want_array(42)).not.toThrow();
    expect(maybe_want_array(42)).toBe(42);
  });
  test("おっと、object を渡しても例外は投げられない", () => {
    expect(() => maybe_want_array({ hello: 42 })).not.toThrow();
    expect(maybe_want_array({ hello: 42 })).toEqual({ hello: 42 });
  });
});

// ========================================================================== //

describe("really_want_string()", () => {
  test("string はもちろん受け入れられる", () => {
    expect(() => really_want_string("hello")).not.toThrow();
    expect(really_want_string("hello")).toBe("hello");
  });
  test("number を渡すと例外が投げられる", () => {
    expect(() => really_want_string(42)).toThrow();
  });
  test("object を渡すと例外が投げられる", () => {
    expect(() => really_want_string({ hello: 42 })).toThrow();
  });
  test("array を渡すと例外が投げられる", () => {
    expect(() => really_want_string(["hello", 42])).toThrow();
  });
});

describe("really_want_number()", () => {
  test("number はもちろん受け入れられる", () => {
    expect(() => really_want_number(42)).not.toThrow();
    expect(really_want_number(42)).toBe(42);
  });
  test("number に解釈可能な string を渡しても例外が投げられる", () => {
    expect(() => really_want_number("42")).toThrow();
  });
  test("string を渡すと例外が投げられる", () => {
    expect(() => really_want_number("foo")).toThrow();
  });
  test("object を渡すと例外が投げられる", () => {
    expect(() => really_want_number({ hello: 42 })).toThrow();
  });
  test("array を渡すと例外が投げられる", () => {
    expect(() => really_want_number(["hello", 42])).toThrow();
  });
});

describe("really_want_object()", () => {
  test("object はもちろん受け入れられる", () => {
    expect(() => really_want_object({ hello: 42 })).not.toThrow();
    expect(really_want_object({ hello: 42 })).toEqual({ hello: 42 });
  });
  test("string を渡すと例外が投げられる", () => {
    expect(() => really_want_object("foo")).toThrow();
  });
  test("number を渡すと例外が投げられる", () => {
    expect(() => really_want_object(42)).toThrow();
  });
  test("array を渡すと...例外は投げられない。まぁ JavaScript において array は object でもあるからね", () => {
    expect(() => really_want_object(["hello", 42])).not.toThrow();
    expect(really_want_object(["hello", 42])).toEqual(["hello", 42]);
  });
});

describe("really_want_array()", () => {
  test("array はもちろん受け入れられる", () => {
    expect(() => really_want_array(["hello", 42])).not.toThrow();
    expect(really_want_array(["hello", 42])).toEqual(["hello", 42]);
  });
  test("string を渡すと例外が投げられる", () => {
    expect(() => really_want_array("foo")).toThrow();
  });
  test("number を渡すと例外が投げられる", () => {
    expect(() => really_want_array(42)).toThrow();
  });
  test("object を渡すと例外が投げられる", () => {
    expect(() => really_want_array({ hello: 42 })).toThrow();
  });
});

// ========================================================================== //

describe("javascript_add()", () => {
  test("2 つの数値を加算する", () => {
    expect(add(3, 4)).toBe(7);
  });
  test("3 + 4 は34?そんなバカな", () => {
    expect(add(3, "4")).toBe("34");
  });
  test("文字列を渡しても例外は投げられない、文字列結合だってできちゃうよ", () => {
    expect(add("foo", "bar")).toBe("foobar");
  });
});

// ========================================================================== //

describe('数として解釈できる文字列', () => {
  test('unary_negation_for_f64', () => {
    expect(unary_negation_for_f64('42')).toBe(-42);
  });

  test('unary_negation_for_js_value', () => {
    expect(unary_negation_for_js_value('42')).toBeNaN();
  });

  test('unary_negation_for_js_sys_number', () => {
    expect(unary_negation_for_js_sys_number('42')).toBe(-42);
  });
})
