/**
 * Random number generator function. Defaults to Math.random.
 * Injectable so tests can use a deterministic RNG.
 */
export type Rng = () => number;

/**
 * Returns a new array containing the same items as the input, in random order.
 *
 * Uses the Fisher–Yates (Knuth) shuffle. The input array is not mutated.
 */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
