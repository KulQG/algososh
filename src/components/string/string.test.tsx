import React from "react";
import { reverseAlg } from "../../constants/reverseString";

describe("stringAlg", () => {
  test("empty string", async () => {
    await reverseAlg([]).then((res) => expect(res).toEqual([]));
  });

  test("one symbol", async () => {
    await reverseAlg(["i"]).then((res) => expect(res).toEqual(["i"]));
  });

  test("odd", async () => {
    await reverseAlg(["h", "e", "l", "l", "o"]).then((res) =>
      expect(res).toEqual(["o", "l", "l", "e", "h"])
    );
  });

  test("even", async () => {
    await reverseAlg(["n", "a", "r", "u", "t", "o"]).then((res) =>
      expect(res).toEqual(["o", "t", "u", "r", "a", "n"])
    );
  });
});
