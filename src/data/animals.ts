import type { ImageMetadata } from "astro";
import placeholderImage from "../assets/alpaca-smile.jpg";
import falkorPhoto from "../assets/falkor.png";
import michaelPhoto from "../assets/michael.png";
import megPhoto from "../assets/meg.jpg";
import bubblesPhoto from "../assets/bubbles.jpg";
import aylaPhoto from "../assets/ayla.png";

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
      "The three little black pigs were rescued from an extreme hoarding situation. For these three — plus one — Robin's Nest is their forever home.",
    photo: falkorPhoto,
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
    name: "Falkor",
    slug: "falkor",
    family: "pigs",
    photo: falkorPhoto,
    description:
      "I'm one of the OGs, I have white on my nose and feet, and am known as Top Pig! I'm a proud Vietnamese Potbelly. My name comes from The Neverending Story and means good luck.",
    story: `Our potbelly pigs were the very first rescues at RNR in 2021. These three little black pigs, affectionately known as The Three Little Pigs — Falkor, Michael, and Meg — were rescued from an extreme hoarding situation where reportedly 200 pigs were kept in cramped, unsanitary conditions by our partners at Farm Animal Refuge. Our pigs adore belly rubs, and their favorite treat is ripe bananas!

Falkor is the Top Pig, and he certainly carries himself that way! He's slightly larger than the others, with a belly that is a characteristic feature of his breed — so pronounced that it almost touches the ground! With white markings on his nose and feet, he's easy to identify.

Falkor's name comes from The Neverending Story, symbolizing good luck.

The three black pigs are Vietnamese Potbellies, a breed brought to the US through Canada in 1980 with the intention of supplying zoos. Their primary color is black, though they can be white or white with spotted, collared, or even silver marks. Generally, they are marked by a swayed back, pronounced belly, erect ears, and a short turned-up nose with a straight tail. Although the belly is naturally oversized, it should not touch the ground. As adults they are about 2.5 feet long and weigh between 100 and 150 pounds. Their life expectancy is about 12 to 20 years.

**Did you know…?**

They're very social, intelligent animals and we've taught Falkor & Michael to sit!

Hoarding is one of the most egregious forms of animal cruelty, affecting up to 250,000 animals every year! A single case can involve hundreds of animals, easily bankrupting a local humane society or shelter.`,
  },
  {
    name: "Michael",
    slug: "michael",
    family: "pigs",
    photo: michaelPhoto,
    description:
      "I was Falkor's bestie during our stay at FAR and now we have our own place. I am the smallest but have the biggest tusk. My mom says I have the best eyes!",
    story: `Michael is one of the three potbelly pigs representing the very first rescues at RNR in 2021. These three little black pigs, affectionately known as The Three Little Pigs — Falkor, Michael, and Meg — were rescued from an extreme hoarding situation where reportedly 200 pigs were kept in cramped, unsanitary conditions by our partners at Farm Animal Refuge.

Michael is the smallest of the three and also the most shy. Once you get to know him, though, you can see his sweet nature and hear his little chatter. He often grabs his food and runs away to eat it. We think this behavior may mark his experiences of being bullied and malnourished in the hoarding situation. We often find him a big clump of greens or weeds, which gives him a little boost to take to his hideaway. Like others, Michael adores belly rubs and ripe bananas!

Here at Robin's Nest, we take much time and care to create a healing environment for all, animals and humans. You may see some of our signage that demonstrates our commitment to the well-being of all, emphasizing that we have a no-tolerance policy for aggressive and/or disruptive behavior.

The three black pigs are Vietnamese Potbellies, a breed brought to the US through Canada in 1980 with the intention of supplying zoos. Their primary color is black, though they can be white or white with spotted, collared, or even silver marks. Generally, they are marked by a swayed back, pronounced belly, erect ears, and a short turned-up nose with a straight tail. As adults they are about 2.5 feet long and weigh between 100 and 150 pounds. Their life expectancy is about 12 to 20 years.

**Did you know…?**

They're very social, intelligent animals and we've taught Falkor & Michael to sit!

Hoarding is one of the most egregious forms of animal cruelty, affecting up to 250,000 animals every year! A single case can involve hundreds of animals, easily bankrupting a local humane society or shelter.`,
  },
  {
    name: "Meg",
    slug: "meg",
    family: "pigs",
    photo: megPhoto,
    description:
      "Mom says she came for two pigs and left with three — because I was irresistible! I am a Kunekune mix, which gives me the little wattles under my chin.",
    story: `Our potbelly pigs were RNR's first rescues at the ranch in 2021. The three little black pigs (aka The Three Little Pigs: Falkor, Michael, & Meg) were rescued from an extreme hoarding situation (reportedly 200 kept in close, unsanitary quarters) by our partners at Farm Animal Refuge. Our pigs love belly rubs and their favorite treat is ripe bananas!

When Kimber traveled to Farm Animal Refuge (FAR), her intention was to bring back two little pigs so they would have companionship in their new home. She spent awhile getting acquainted with a few of the rescued piggies (a lot of them!), and soon settled on two boys. And then came along a little girl with "wattles" under her chin. She inched right up to Kimber…

…and in the next few minutes, Meg came right into Kimber's heart. She's been there ever since!

Meg was part of the 200+ rescue at FAR and is a variety of potbelly, a Kunekune mix, which gives her the little wattles under her chin. She occasionally gives Falkor a run at being "The Boss," and loves bananas and carrots.

**How to spot a hoarder:**

- Keeps an abnormally large number of animals
- Fails to provide minimal nutrition, shelter, vet care, or sanitation
- Fails to recognize the devastating impact of neglect and can't stop from repeating this behavior`,
  },
  {
    name: "Bubbles",
    slug: "bubbles",
    family: "pigs",
    photo: bubblesPhoto,
    description:
      "I'm the newest resident at Robin's Nest! You'll know me right away by my white hair, marked by black \"bubbles.\" I'm a great people pig — very intelligent and I love my people!",
    story: `Bubbles was raised in a tiny city yard with a dog; Bubbles needed more room as well as his own "herd." Bubbles sits on command and performs a stupendous "spin."

Kimber gets about 50 calls per month! Some are seeking advice on a specific animal or care issue, but most are inquiries about surrender. In the US, owners surrender 1.6 million small animals (dogs, cats…) per year, making owner surrenders second only to stray shelter intakes. These estimates do not include those who are abandoned by owners. There are no accurate estimates for small farm animals, though we believe the number would be significantly higher. Common reasons for surrender include housing issues, financial constraints, aggressive behavior and having too many animals in the household.

Many factors enter the decision process for acceptance into the Robin's Nest family. Because we are a sanctuary (i.e., a forever home for all who enter), by necessity Kimber bears the responsibility of considering constraints on space, financial resources of RNR, health and other individual needs of the animal in question as well as the other residents. All these factors determine the "fit," which includes a number of complicated situations within the ranch and in our programming. For every intake, Kimber may spend several weeks to assess the fit, and always makes a personal visit before the final decision.

Bubbles was lucky — Kimber said "yes!" Unfortunately, she has to say no most of the time, and those responses are very difficult — part of the "emotional labor" tied to animal welfare work.

Everything is looking up, and we are looking forward to Bubbles being able to enjoy interacting with our guests! You're going to love him!

**Piggy Points:**

- Contrary to stereotypes, pigs are not "dirty" animals. They do not attract flies, and they are virtually odor free. They do, however, enjoy eating with gusto and love a mud bath, which regulates their temperature and protects them from sunburn.
- Pigs are fast runners! They also can be good swimmers in shallow water.
- Pigs love being with other pigs. When sleeping, they like to cuddle close together. They represent some of the most social of animals!
- Potbelly pigs are the fourth smartest animal group on the planet, following only humans, apes/chimps, and whales/dolphins.`,
  },
  {
    name: "Ayla",
    slug: "ayla",
    family: "pigs",
    photo: aylaPhoto,
    description:
      "I'm the \"plus 1,\" which I think is very special! I'm white with spots; look closely for my bluish eyes. My name comes from the book The Clan of the Cave Bear.",
    story: `Sweet Ayla came to us in 2022 with the four OG alpacas, Fern, Woodrow, Gandalf, and Gus. Though she had been raised with them, she was still young and became the "plus 1" with the three little black pigs. Her name comes from the book The Clan of the Cave Bear. True to the story, she conquered adversity with wit and will.

Ayla was a standout — and her blue eyes were only one of the reasons.

Ayla was a potbelly pig; the general term has become a common reference to several types of miniature pigs. She was raised from a baby with the four alpacas we adopted and considered them her family! Ayla was white with beautiful blue eyes. We don't know her exact species, though she — like all miniatures — is the product of many generations of selective breeding. Her blue eyes are likely the result of a disease caused by a porcine rubulavirus, often present in the nursing mother. She was a talker, often with soft sweet mumblings.

The loss of our sweet Ayla has left a deep ache in our hearts. At just five years old, she was full of love and gentle spirit — taken from us far too soon due to complications linked to her breed.

While these miniature pigs may appear ideal for companionship, the reality is far more complex — and often heartbreaking. Selective breeding, especially when driven by appearance, frequently involves inbreeding. This can lead to serious genetic issues: reduced immunity, congenital abnormalities, nutritional deficiencies, and complications with vital organs.

In Ayla's case, a post-mortem examination revealed a small piece of food lodged in a narrowed part of her esophagus — likely stuck for several days. The specialist who worked tirelessly to save her, along with a team of up to ten veterinary professionals, explained that this kind of internal constriction is unfortunately common in animals bred for smaller sizes. Her esophagus was simply too narrow, a result of the very traits she had been bred to display.

Ayla's passing is a devastating reminder of the hidden costs of selective breeding. She brought us joy every single day, and her memory fuels our continued commitment to advocate for responsible breeding practices and better medical care for pigs like her.

We are heartbroken — but we are also determined. In Ayla's name, we will continue to educate, rescue, and fight for animals who need us most.

Rest easy, sweet girl. You will always be a part of our story.

---

*Sweet Ayla*

*Once you saw her blue eyes sparkle, you knew*
*This special girl reached out and grabbed your heart*
*And she always stood apart*
*Somehow you just knew.*
*And that was her magic*
*Sweet Ayla with the big blue eyes.*

*Sweet Ayla was a farm girl day by day*
*Outdoors she could find a little trouble*
*But at night she loved to cuddle*
*But most never knew her heartbreak*
*And that was her secret.*
*Sweet Ayla with the big sad eyes.*

*Her first mama chose her namesake*
*Snatched from the Clan of the Cave Bear*
*Where harm comes everywhere*
*While the rest of us sleep.*
*Her blue eyes saw it all*
*Sweet Ayla with the big blue eyes.*

*She loves company and attention*
*She voices her sweet little chatter*
*With a lilt and a song that matters*
*Just wanting to belong*
*She cast her magic wide*
*Sweet Ayla with the pretty blue eyes.*

*True to the story where good was still*
*Ayla rose to the occasion*
*And bravely took her station*
*Conquering adversity with wit and will.*
*Her eyes were her charm*
*But they came from great harm*
*Sweet Ayla with the strong blue eyes.*

*And in the end it ended*
*Tho she'll never be quite gone*
*She left us all with song*
*To carry with every warm wind.*
*And that remains her magic.*
*Sweet Ayla with heavenly eyes.*

*Sweet Ayla with the clear blue eyes*
*Stands for reaching out*
*Getting and giving second chances*
*Until it's all gone.*

*Like a society that is run by greed*
*She was cast out time and time again*
*But she pursued and persisted*
*And always insisted*
*To stand for what is right and due*
*Her magic lives on at Robin's Nest.*
*Sweet Ayla with the sweet blue eyes.*

*— Dr. Sue Original, April 18, 2025*`,
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
    description: "A determined tortoise who never lets anything slow him down.",
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
