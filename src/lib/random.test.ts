import { describe, it, expect } from "vitest";
import { shuffle } from "./random";

describe("shuffle", () => {
  it("returns an array of the same length", () => {
    const input = [1, 2, 3, 4, 5];
    expect(shuffle(input)).toHaveLength(input.length);
  });

  it("preserves the original items (set equality)", () => {
    const input = ["a", "b", "c", "d", "e"];
    const result = shuffle(input);
    expect(result.slice().sort()).toEqual(input.slice().sort());
  });

  it("does not mutate the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const snapshot = input.slice();
    shuffle(input);
    expect(input).toEqual(snapshot);
  });

  it("is deterministic with an injected rng", () => {
    // With rng always returning 0, Fisher–Yates swaps each i with index 0,
    // producing a predictable cycle that ends with the original first element
    // at the tail.
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input, () => 0);
    expect(result).toEqual([2, 3, 4, 5, 1]);
  });

  it("returns the same array for a single-element input", () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it("returns an empty array for an empty input", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("produces different orderings across many shuffles", () => {
    // Probabilistic: with 5 items and 50 shuffles, the chance of all 50
    // landing on the identity permutation is (1/120)^50 — effectively zero.
    const input = [1, 2, 3, 4, 5];
    const orderings = new Set<string>();
    for (let i = 0; i < 50; i++) {
      orderings.add(shuffle(input).join(","));
    }
    expect(orderings.size).toBeGreaterThan(1);
  });
});
