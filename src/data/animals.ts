import type { ImageMetadata } from "astro";
import placeholderImage from "../assets/alpaca-smile.jpg";

export interface AnimalFamily {
  name: string;
  slug: string;
  description: string;
  photo: ImageMetadata;
}

export interface Animal {
  name: string;
  slug: string;
  family: string;
  photo: ImageMetadata;
  description: string;
  story: string;
}

export const animalFamilies: AnimalFamily[] = [
  {
    name: "The Three Little Pigs",
    slug: "pigs",
    description:
      "Our three rescue pigs are full of personality and always ready to greet visitors with a snort and a nudge.",
    photo: placeholderImage,
  },
  {
    name: "The Alpacas",
    slug: "alpacas",
    description:
      "Gentle and curious, our alpacas bring a calming presence to the sanctuary and love meeting new friends.",
    photo: placeholderImage,
  },
  {
    name: "The Tortoises",
    slug: "tortoises",
    description:
      "Slow and steady, our rescue tortoises remind us that healing happens at its own pace.",
    photo: placeholderImage,
  },
];

export const animals: Animal[] = [
  {
    name: "Wilbur",
    slug: "wilbur",
    family: "pigs",
    photo: placeholderImage,
    description: "A gentle giant with a love for belly rubs and mud baths.",
    story: `Wilbur arrived at Robin's Nest in the spring of 2022 after being rescued from a neglect situation. Underweight and wary of people, he spent his first weeks keeping to himself.

**Today, Wilbur is one of the friendliest residents on the farm.** He greets every visitor with a happy snort and has never met a belly rub he didn't like.

His favorite things include rolling in fresh mud, napping in the sun, and stealing snacks from the alpacas when no one is looking.`,
  },
  {
    name: "Babe",
    slug: "babe",
    family: "pigs",
    photo: placeholderImage,
    description:
      "The smallest pig with the biggest personality — always leading the group.",
    story: `Babe was the runt of a litter surrendered to a local shelter. Too small and too spirited for most adopters, she found her forever home at Robin's Nest.

**Don't let her size fool you — Babe runs the show.** She's always first to the feed trough, first to investigate new visitors, and first to demand attention.

She has a special bond with Wilbur and can often be found napping right beside him.`,
  },
  {
    name: "Hamlet",
    slug: "hamlet",
    family: "pigs",
    photo: placeholderImage,
    description:
      "A thoughtful, quiet pig who loves to observe the world from his favorite spot.",
    story: `Hamlet came to us from a farm that could no longer care for him. He was shy at first, preferring to watch from a distance rather than approach.

**Over time, Hamlet has come out of his shell.** He's still the quietest of the three pigs, but he's found his confidence — and his favorite sunny spot by the fence.

Staff say Hamlet is the best listener on the farm. He'll sit with you for as long as you need.`,
  },
  {
    name: "Luna",
    slug: "luna",
    family: "alpacas",
    photo: placeholderImage,
    description:
      "A curious alpaca who loves to investigate anything new on the farm.",
    story: `Luna was rescued from a fiber farm where conditions had deteriorated. She arrived thin and skittish, flinching at sudden movements.

**Months of patient care transformed Luna.** She's now the most curious alpaca on the farm, always the first to approach something (or someone) new.

Luna has become a favorite in our animal-assisted therapy sessions. Her gentle curiosity puts even the most anxious visitors at ease.`,
  },
  {
    name: "Dusty",
    slug: "dusty",
    family: "alpacas",
    photo: placeholderImage,
    description:
      "The calmest presence on the farm — Dusty brings peace wherever he goes.",
    story: `Dusty was surrendered by an owner who could no longer afford his care. Unlike many rescues, he arrived in good health — just in need of a home.

**Dusty's calm demeanor makes him a natural healer.** He stands quietly beside visitors during therapy sessions, his steady presence a grounding force.

He's especially gentle with children and has an uncanny ability to sense when someone needs a little extra comfort.`,
  },
  {
    name: "Shelly",
    slug: "shelly",
    family: "tortoises",
    photo: placeholderImage,
    description:
      "Our oldest resident — Shelly has been teaching patience since before the sanctuary opened.",
    story: `Shelly was found wandering a neighborhood, likely an abandoned pet who had outgrown her owner's expectations. She was dehydrated and her shell showed signs of improper care.

**After months of rehabilitation, Shelly thrived.** She became the sanctuary's unofficial mascot and a reminder that every animal deserves a second chance.

At an estimated 45 years old, Shelly is our oldest resident. She moves at her own pace — and the farm is better for it.`,
  },
  {
    name: "Tank",
    slug: "tank",
    family: "tortoises",
    photo: placeholderImage,
    description:
      "A determined tortoise who never lets anything slow him down.",
    story: `Tank earned his name on day one. Rescued from a hoarding situation, he arrived with a chipped shell and a stubborn streak a mile wide.

**Nothing stops Tank.** He's been known to push through obstacles, climb over barriers, and generally go wherever he pleases.

Despite his tough exterior, Tank is surprisingly social. He'll follow familiar staff members around the enclosure and has been known to "sprint" (tortoise sprint) toward his favorite treats.`,
  },
];

export function getFamily(slug: string): AnimalFamily | undefined {
  return animalFamilies.find((f) => f.slug === slug);
}

export function getAnimalsByFamily(familySlug: string): Animal[] {
  return animals.filter((a) => a.family === familySlug);
}
