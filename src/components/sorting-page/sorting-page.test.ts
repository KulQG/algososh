import { bubbleSort } from "../../constants/sorting";

describe("bubble-sort", () => {
  test("empty arr", async () => {
    await bubbleSort("asc", { arr: [] }).then((res) => expect(res).toEqual([]));
  });
  test("one num", async () => {
    await bubbleSort("desc", { arr: [1] }).then((res) =>
      expect(res).toEqual([1])
    );
  });
  test("several nums asc", async () => {
    await bubbleSort("asc", { arr: [1, 4, 2, 3] }).then((res) =>
      expect(res).toEqual([1, 2, 3, 4])
    );
  });
  test("several nums desc", async () => {
    await bubbleSort("desc", { arr: [1, 4, 2, 3] }).then((res) =>
      expect(res).toEqual([4, 3, 2, 1])
    );
  });
});
