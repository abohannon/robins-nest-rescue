import { describe, it, expect } from "vitest";
import {
  animalFamilies,
  animals,
  getFamily,
  getAnimalsByFamily,
} from "./animals";

describe("animalFamilies", () => {
  it("contains at least 2 families", () => {
    expect(animalFamilies.length).toBeGreaterThanOrEqual(2);
  });

  it("each family has required fields", () => {
    for (const family of animalFamilies) {
      expect(family.name).toBeTruthy();
      expect(family.slug).toBeTruthy();
      expect(family.description).toBeTruthy();
      expect(family.photo).toBeTruthy();
    }
  });

  it("slugs are unique", () => {
    const slugs = animalFamilies.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("animals", () => {
  it("contains at least 4 animals", () => {
    expect(animals.length).toBeGreaterThanOrEqual(4);
  });

  it("each animal has required fields", () => {
    for (const animal of animals) {
      expect(animal.name).toBeTruthy();
      expect(animal.slug).toBeTruthy();
      expect(animal.family).toBeTruthy();
      expect(animal.description).toBeTruthy();
      expect(animal.story).toBeTruthy();
      expect(animal.photo).toBeTruthy();
    }
  });

  it("every animal references a valid family slug", () => {
    const familySlugs = new Set(animalFamilies.map((f) => f.slug));
    for (const animal of animals) {
      expect(familySlugs.has(animal.family)).toBe(true);
    }
  });

  it("slugs are unique within each family", () => {
    const seen = new Map<string, Set<string>>();
    for (const animal of animals) {
      if (!seen.has(animal.family)) seen.set(animal.family, new Set());
      const familySet = seen.get(animal.family)!;
      expect(familySet.has(animal.slug)).toBe(false);
      familySet.add(animal.slug);
    }
  });
});

describe("getFamily", () => {
  it("returns family by slug", () => {
    const family = getFamily("pigs");
    expect(family).toBeDefined();
    expect(family!.slug).toBe("pigs");
  });

  it("returns undefined for unknown slug", () => {
    expect(getFamily("dragons")).toBeUndefined();
  });
});

describe("getAnimalsByFamily", () => {
  it("returns animals belonging to the given family", () => {
    const pigs = getAnimalsByFamily("pigs");
    expect(pigs.length).toBeGreaterThanOrEqual(2);
    for (const pig of pigs) {
      expect(pig.family).toBe("pigs");
    }
  });

  it("returns empty array for unknown family", () => {
    expect(getAnimalsByFamily("dragons")).toEqual([]);
  });
});
