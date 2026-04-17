import type { ImageMetadata } from "astro";
import falkorPhoto from "../assets/falkor.png";
import marcoPhoto from "../assets/marco.jpg";
import poloPhoto from "../assets/polo.jpg";
import michaelPhoto from "../assets/michael.png";
import megPhoto from "../assets/meg.jpg";
import bubblesPhoto from "../assets/bubbles.jpg";
import aylaPhoto from "../assets/ayla.png";
import tivioPhoto from "../assets/tivio.png";
import donkeyPhoto from "../assets/donkey.png";
import phinneasPhoto from "../assets/phinneas.png";
import cowboyPhoto from "../assets/cowboy.jpg";
import woodrowPhoto from "../assets/woodrow.jpg";
import fernPhoto from "../assets/fern.jpg";
import gusPhoto from "../assets/gus.jpg";
import gandalfPhoto from "../assets/gandalf.jpg";
import neptunePhoto from "../assets/neptune.jpg";
import jollaPhoto from "../assets/jolla.jpg";
import poppyBellePhoto from "../assets/poppy-belle.jpg";
import hopePhoto from "../assets/hope.jpg";
import dollyPhoto from "../assets/dolly.jpg";
import rebaPhoto from "../assets/reba.jpg";
import oakleyPhoto from "../assets/oakley.jpg";
import edisonPhoto from "../assets/edison.jpg";
import lilyPhoto from "../assets/lily.jpg";
import julioPhoto from "../assets/julio.jpg";
import albertoPhoto from "../assets/alberto.jpg";
import banditoPhoto from "../assets/bandito.jpg";
import smokeyPhoto from "../assets/smokey.jpg";
import banditPhoto from "../assets/bandit.jpg";

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
  inMemoriam?: boolean;
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
    name: "The Grand Huacaya Alpacas",
    slug: "alpacas",
    description:
      "With their soulful eyes, playful curiosity, and cloud-soft fleece, our eight Huacaya alpacas teach us daily about connection, compassion, and joy. Four joined us in 2022, and four seniors found their forever home in 2025.",
    photo: fernPhoto,
  },
  {
    name: "The Sulcata Tortoises",
    slug: "tortoises",
    description:
      "AKA African Spurred Tortoises. With an extraordinary lifespan of 80 to 120 years, our two Sulcata brothers Marco and Polo often outlived their caretakers. Thankfully, Robin's Nest is their forever home.",
    photo: marcoPhoto,
  },
  {
    name: "The Equines",
    slug: "equines",
    description:
      "Big horse, little horse, and a donkey too! The equine family at Robin's Nest includes Tivio, our stunning buckskin Quarter Horse, Phinneas the gorgeous mini horse, and Donkey the lovable mini donkey.",
    photo: tivioPhoto,
  },
  {
    name: "The Little Lambs",
    slug: "lambs",
    description:
      "If Mary truly had a little lamb, it would be very happy here at Robin's Nest! Our twin Dorper Katahdin crossbreed lambs help maintain the ranch grounds and make sure everyone knows when it's time to go outside.",
    photo: dollyPhoto,
  },
  {
    name: "The Ranch Dogs",
    slug: "ranch-dogs",
    description:
      "Meet the Robin's Nest ranch dogs! Oakley and Edison are Blue Heelers — clever, devoted, and full of energy. Together they bring joy, protection, and companionship to the sanctuary.",
    photo: oakleyPhoto,
  },
  {
    name: "The Three Chimigos",
    slug: "chimigos",
    description:
      "The heart of Robin's Nest traces back to three Chihuahuas — Lily, Alberto, and Julio. Their legendary bond inspired songs, stories, a children's book series, and the founding of Robin's Nest Rescue.",
    photo: lilyPhoto,
  },
  {
    name: "Cat Tales",
    slug: "cats",
    description:
      "Our ranch cats keep watch over the property, patrol for pesky varmints, and never miss a golf cart ride. They remind us that every creature has a role to play.",
    photo: banditoPhoto,
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
    inMemoriam: true,
  },
  {
    name: "Woodrow",
    slug: "woodrow",
    family: "alpacas",
    photo: woodrowPhoto,
    description:
      "Typically, Woodrow will be second only to Fern in walking right up to say hi. He is approachable, friendly, and also will offer a kiss if he trusts you.",
    story: `You will love Woodrow, and he will love you right back!

Fern and Woodrow are cousins who joined RNR with Gus and Gandalf in 2022. Being a bit younger and more curious, they arrived at the ranch as two-year-olds. While they often stick together, they're also more adventurous than the older Huacaya alpacas, happily exploring The Acres, their spacious home.

Woodrow is named after the character from Lonesome Dove, based on a famous rancher and Texas Ranger portrayed by Tommy Lee Jones. He's a close second to Fern in terms of friendliness and is quickly gaining fans with his own version of "kisses." He's quite the handsome fellow, resembling Fern, though their distinct features make it easy for those who know them to tell them apart! Like Fern, Woodrow is curious and enjoys watching people. At night, they make excellent guardians, keeping an eye out for any intruders, such as coyotes. Woodrow's favorite treat is bite-sized carrots, and he'll warm up to you immediately if you have some on hand.

Just a tip: they're not fans of being patted on the head. And don't worry — alpacas can't bite your fingers since they don't have upper teeth! They both adore water and are not fond of late dinners!

**Alpaca Fun Fact:** They have three stomachs, eat grass, and chew cud. They have no upper teeth. Yes, alpacas spit, but usually at other alpacas who might want their food!`,
  },
  {
    name: "Fern",
    slug: "fern",
    family: "alpacas",
    photo: fernPhoto,
    description:
      "Fern is the star of the show, and she knows it! She is always curious and generously gives the best kisses. She is more than a pretty face, though, and has become the perfect emotional support animal at Robin's Nest.",
    story: `Famous Fern is a doll! She loves to give kisses to kids, and also to kids-at-heart!

Fern and Woodrow are cousins who joined RNR alongside Gus and Gandalf in 2022. Being a bit younger and more curious, they came to the ranch as two-year-olds.

Let's focus on Fern — she would definitely want us to! First and foremost, she's stunning, with her soft white fleece and expressive, curious face. Fern knows she's the star of the show. Alpacas have distinct personalities, and Fern's is unmistakable — she's curious, confident, and our #1 ambassador at RNR! When guests arrive, she's always the first to greet them and investigate. During ranch projects, you can count on her to be right there "helping." One of her greatest joys is giving kisses, and we even have a Fern Kissing Booth at some of our events!

Fern is named after the female deer in Bambi, and we've even created a cartoon version of her for RNR. Her favorite treat? Butterscotch horse treats! She also loves water, especially when she gets to enjoy a refreshing spray on hot days. On the flip side, her biggest pet peeve is when dinner is late!

**Alpaca Fun Fact:** Alpacas are generally very clean; all poop in the same spot, known as a communal dung pile. Some have been house trained.`,
  },
  {
    name: "Gus",
    slug: "gus",
    family: "alpacas",
    photo: gusPhoto,
    description:
      "You will know Gus right away by his beautiful brown coat. His fleece will make someone a gorgeous sweater! More important, Gus is slowly joining the comfort animal crew.",
    story: `Gus, always a standout, has beautiful cinnamon color fleece and a heart of gold.

It's hard to mention Gus without also talking about Gandalf. These two have been inseparable best friends for many years, having spent a long time as practice animals at a San Diego vet school. We assisted a neighbor in adopting these two beautiful Huacaya alpacas, and when the neighbor moved and couldn't take them, we knew Robin's Nest would be their perfect sanctuary.

You can't miss Gus with his stunning cinnamon-colored fleece, which makes him stand out among the three white alpacas. He's named after Augustus, the main character from Lonesome Dove, a role famously portrayed by Robert Duvall.

Gus and Gandalf stick together closely, enjoying their Orchard hay and sharing loving gazes. When Gus had a sore eye that required medical attention, Gandalf let out a soulful cry, clearly showing his love and concern for his friend. Though they prefer to keep a little distance from their human family, they do enjoy snacking from a handheld treat bowl! Gus is a bit more adventurous than Gandalf and is gradually becoming more comfortable with their human companions. Regardless, they always look out for each other and have quickly settled into their new retirement home!

**Alpaca Fun Fact:** Alpacas are much smaller than their llama cousins, weighing between 120-200 pounds. Life expectancy is 15-20 years.`,
  },
  {
    name: "Gandalf",
    slug: "gandalf",
    family: "alpacas",
    photo: gandalfPhoto,
    description:
      "Gandalf, despite his trials as a vet school practice animal for eight years, maintains a beautiful pose, even at a distance. Our alpacas bring perfect serenity to our healing environment.",
    story: `Gandalf, always regal, is a great place to start with a RNR comfort animal!

Gandalf, along with his buddy Gus, joined Robin's Nest in July 2022 and has finally found his forever home! RNR helped a neighbor adopt these charming Huacaya alpacas after their retirement from a vet tech school in San Diego, where they spent many years as practice animals. When their neighbor moved and couldn't take them along, we knew RNR would be their final sanctuary.

Gandalf is named after the wizard from The Lord of the Rings, and the name suits him perfectly. If you catch a glimpse of Gandalf, you'll notice his distinctive head tilt, giving him a regal and knowing appearance, even from afar.

Gandalf tends to stick close to Gus — unless Gus gets too adventurous, that is. While he usually prefers to keep a safe distance from humans, he's gradually becoming more comfortable joining in on the action. It's clear that both Gandalf and Gus are thriving in their spacious, forever home — free from any more practice procedures!

Newsflash! Gandalf's current favorite activity is hanging out with Tivio, the Quarter Horse! According to Gandalf, they are besties now!!

**Alpaca Fun Fact:** Alpacas have been in the U.S. only since 1984. They are one of six animals that are part of the camel family known as Camelidae. Their ancestors evolved in North America nine to eleven million years ago, although distant relatives go back as far back as 35 million years. Peru accounts for the world's largest alpaca population, with about 3.8 million. The U.S. has about 192,000.`,
  },
  {
    name: "Neptune",
    slug: "neptune",
    family: "alpacas",
    photo: neptunePhoto,
    description:
      "Neptune is a Huacaya alpaca of true black coloring, the purest black fleece imaginable. He has a great spirit and needs lots of love and care after his tragic experience.",
    story: `Neptune epitomizes resilience and the Robin's Nest philosophy of second chances. He is one of our Quiddish Mission alpacas.

In a moment, Neptune was caught without the protection of his herd and became the victim of a vicious attack by a mountain lion. The smallest of the herd, being on the edge — both socially and physically — sometimes happens. Somehow, Neptune survived the attack, but remains scarred and traumatized.

When Kimber and Thelma began coordinating the re-homing of her 22 beloved alpacas, Thelma said, there are two I don't expect you to take. One (Ziggy) is in critical condition medically and cannot survive such a trip. And Neptune, unfortunately, is too difficult for me to ask you to take him. He is aggressive, is the target of other males in the herd, and has to be isolated.

Less than 24 hours later, Kimber voiced her decision, which was based on Robin's Nest philosophy of second chances. She came in and announced, Neptune will find his final home here at Robin's Nest.

Today, Neptune is thriving. He's healthy, eating well, and is easy to manage by his handlers. He has been gelded, which means he has the opportunity at least to join the herd in the future. In the meantime, he is in a spacious pen where he can interact with other alpacas through the open fencing and is showing great promise of advancing socially. Inclusion is a beautiful thing.`,
  },
  {
    name: "Jolla",
    slug: "jolla",
    family: "alpacas",
    photo: jollaPhoto,
    description:
      "Jolla is recognizable by her silver gray coat and her small, almost dainty features. At 23, she is the oldest of the herd and deserves lots of love and attention.",
    story: `Jolla, like all our senior alpacas, is enjoying her golden years here at Robin's Nest! She is one of our Quiddish Mission alpacas.

Jolla, Jolla, Jolla. She is so pretty you can't say her name just once! At 23, Jolla is the oldest in the pack but you'd never know it by looks. She is stunning... we call her our "regal rose" because she has "that" look, plus her official color is rose gray; her fleece has variations of light, medium, and dark rose gray.

Jolla's face, head, and body seems more slim than our original herd, and also as compared to her own pack, though that may be a product of her last shearing. Regardless, she does earn the "regal" reference and will doubtless be the subject of many photography pursuits. True to the stereotype of royalty (and she IS a purebred registered alpaca!) she also seems a bit more "standoffish" or aloof than others. We LOVE the diversity she adds to our group!`,
  },
  {
    name: "Poppy Belle",
    slug: "poppy-belle",
    family: "alpacas",
    photo: poppyBellePhoto,
    description:
      "Poppy Belle is the most outgoing of the senior alpacas. She is a beautiful medium brown, sometimes referred to as chestnut. We can't wait for you to see her charming, inviting smile!",
    story: `Poppy Belle would LOVE to give you a big "toothy" smile. She gives more than she gets, every time! She is one of our Quiddish Mission alpacas.

Here at Robin's Nest, we proudly stand by our philosophy of inclusion, acceptance, and appreciation for our unique contributions to the world. Poppy Belle envelops each of those enduring traits: She is a proud purebred registered alpaca yet does not have the conventional perfect teeth and "smile" that others may display. But she has plenty of personality, pep, and positivity!

We knew immediately that Poppy would be different and charming all at once. Though she had not been handled a lot as a so-called "pet," she fit right in to the RNR family at once, coming right in for a treat or a friendly hello.

As ever, Poppy Belle and all of our Robin's Nest ambassadors have love and lessons to offer, if only we are willing to listen, learn, and love unconditionally. They do.`,
  },
  {
    name: "Hope",
    slug: "hope",
    family: "alpacas",
    photo: hopePhoto,
    description:
      "Hope is white, which accounts for 25% of alpacas. She seems like a born leader too, often bossing the others around. Her name alone is reason enough to love her!",
    story: `We HOPE you'll find it in your heart to support our HOPE here at Robin's Nest! She is one of our Quiddish Mission alpacas.

Hope, one of our Quiddish Queens, is pure white and pure of heart. But that doesn't keep her from her "boss" duties, which usually means being the first to get the first meal dish down, being the first in line to get out, or just generally asserting her alpha character.

All of these characteristics are part of her behavior for alpacas. As with most herd animals, they need the companionship of other alpacas to survive. For alpacas, they rely not only on the physical safety of numbers but also the assurance of social connection. Three basic needs of the alpaca include:

- **Social Structure**, which includes a command hierarchy. Hope seems to embrace this role. However, she is not yet fully integrated into our existing herd, so time will tell how that designation endures!

- **Communication**, which provides necessary messages to one another, as well as others. Alpacas communicate through body posture, tail and ear movements, and a variety of sounds, including humming, clucking, and alarm calls. Generally, alpacas make a humming noise.

- **Alarm Calls:** Alpacas are herd-loyal to the core and will warn of impending danger. Recently, Hope (and others) sounded an immediate and loud series of "squeaks" (sounds like a dog's squeaky toy!) when our "lambies" were allowed to pass by the Quiddish alpaca pens. We had never heard that before. And more interesting, when Tivio the big Quarter Horse was allowed the same pass-by, the alpacas were quiet and seemed unaffected! But then, of course, Tivio is a pretty calm, cool dude!

In total, Hope represents so much of the Robin's Nest mission — hope and home. We are so glad she is here with us for the rest of her life.`,
  },
  {
    name: "Marco",
    slug: "marco",
    family: "tortoises",
    photo: marcoPhoto,
    description:
      "Marco, the older and larger of the brothers, is the leader and more active of the two. If you're lucky, you may see Marco meandering around his yard — though they can move surprisingly fast!",
    story: `Marco is the perfect big brother; he comes out first and checks the food!

Marco and Polo are African Sulcata Tortoises who joined the ranch in 2023. We partnered with a fantastic local rescue, Country Tortoise Rescue and Farm, to provide these two 22-year-old brothers their final home. They had been kept for years as "backyard pets," which is not how their nature is intended. Their previous owner was elderly and had recently passed; the family had no resources to continue their care and surrendered them. Because tortoises are insular by nature, it is highly unusual for them, especially males, to form a family unit.

Marco is the larger of the two, eating the lion's share! You're more likely to see him out meandering through their yard, and he might even come right up to you! They are friendly, but you should also watch out for those jaws!

**The Sulcata**

Unfortunately, the scenario just described happens a lot. Sulcata tortoises can live more than 100 years, so it is common for them to outlive their owners, with no arrangements for their continued care. Further, most people are not prepared for the needs of these large reptiles, including a proper diet and temperature controlled environment. Marco and Polo were significantly malnourished when they came to us and still need special diet and care.

The Sulcata African Spurred Tortoise is an endangered species, typically inhabiting the southern edge of the African Sahara Desert. It is the largest mainland species of tortoise in the world. It is the only living species of its genus, Centrachelys, with the five other species in the family already extinct.

**Did you know?**

- Tortoises have existed for around 220 to 300 million years, making them older than dinosaurs! One theory of survival is the tortoise's ability to hibernate, allowing the tortoise to survive the dark winter after a meteor strike.
- Charles Darwin and Steve Irwin took care of the same tortoise! Yes! It was Harriet (c. 1830-2006), a Galapagos tortoise who was approximately 175 years at the time of her death in Australia.
- Tortoises have two skeletons! The exoskeleton is external and supports and protects the body. The endoskeleton, internal, made up of carapace and plastron (bony plates), gives the inside structure and support. A "bridge" fuses the pieces together.
- Tortoises can feel. Yes! They have nerve endings in their shell so they can feel when touched there. If you touch a tortoise, start slow and always be easy. Never knock or hit its shell.
- Tortoises can't swim. Unlike aquatic turtles, tortoises adapted to live on land. With short legs and heavy shells, they simply aren't designed to glide through the water.`,
  },
  {
    name: "Polo",
    slug: "polo",
    family: "tortoises",
    photo: poloPhoto,
    description:
      "Polo, the smaller of the two brothers, has distinctive and permanent signs of mistreatment. He is very slowly improving, as he learns to trust again. A great example of survivorship.",
    story: `Polo, the little brother, has become a great example of survivorship: Just keep moving!

Marco and Polo are African Sulcata Tortoises who joined the ranch in 2023. We partnered with a fantastic local rescue, Country Tortoise Rescue and Farm, to provide these two 22-year-old brothers their final home. They had been kept for years as "backyard pets," which is not how their nature is intended. Their previous owner was elderly and had recently passed; the family had no resources to continue their care and surrendered them. Because tortoises are insular by nature, it is highly unusual for them, especially males, to form a family unit.

Polo is a bit more shy and prefers the warmth of the heat lamps in their enclosure. It must be maintained at 80 degrees, so imagine that electric bill! His favorite foods are leafy green lettuces and Hibiscus blooms from Dr. Sue's garden! Their dislikes are cold, cloudy weather and running out of romaine.

You may also notice sharp spikes in Polo's shell. These are obvious marks of severe malnourishment over many years. Unfortunately, this scenario happens a lot. Sulcata tortoises can live more than 100 years, so it is common for them to outlive their owners, with no arrangements for their continued care. Further, most people are not prepared for the needs of these large reptiles, including a proper diet and temperature controlled environment. Marco and Polo were significantly malnourished when they came to us and still need special diet and care.

The Sulcata African Spurred Tortoise is an endangered species, typically inhabiting the southern edge of the African Sahara Desert. It is the largest mainland species of tortoise in the world. It is the only living species of its genus, Centrachelys, with the five other species in the family already extinct.`,
  },
  {
    name: "Tivio",
    slug: "tivio",
    family: "equines",
    photo: tivioPhoto,
    description:
      "Like all our animals, Tivio has special gifts and pays them forward. Though an active working Quarter Horse, he knows just when to stand still, how to offer a nudge, and when a soulful gaze may help.",
    story: `Tivio, our beautiful buckskin Quarter Horse, loves to accompany you on your journey of healing.

Tivio is a registered American Quarter Horse whose full name is Eds Lil Tivio Jess. He was born in 2012 on a ranch in Montana, came to California in 2018, and was loved by the Goodwins (owners of Goodwins Market in Crestline, CA). He worked the ranch, herded and sorted cows, and played with Friesian friends near Reno. Tivio came to Robin's Nest in December 2021 as Kimber's personal horse — he is not a rescue. He and Kimber ride Western, and he works with cowboy/trainer Pete Spates. The property has a solid oak round pen and arena.

Although not officially part of the rescue mission, Tivio contributes valuably to Robin's Nest and became the go-to program animal in the "Side by Side" therapeutic program.

**The American Quarter Horse**

The American Quarter Horse is a breed renowned for its speed, agility, and "cow sense" — an almost instinctive ability to work with cattle. It traces its lineage back to the 1600s, when colonists crossed English Thoroughbreds with native horses of Spanish descent. One famous sire, Pete McCue, is considered the foundation of the modern Quarter Horse.

**Seven Quarter Horse facts you might not know:**

- The breed's earliest origins trace back to the 1600s when English Thoroughbreds were crossed with native horses of Spanish descent
- They got their name from being the fastest breed over a quarter-mile distance
- The American Quarter Horse Association (AQHA) has over 2 million registered horses worldwide, with over 420,000 in Texas alone
- Easy Jet, one of the most famous racing Quarter Horses, won 27 of 38 races and earned over $445,000 in the 1960s
- Quarter Horses are known for their "cow sense" — an almost instinctive ability to work with cattle
- They are one of the most versatile breeds, excelling in Western riding, racing, ranch work, and therapeutic programs
- The breed is known for its calm temperament, making them excellent therapy animals

**The Buckskin**

Buckskin is not a breed but a color pattern — a tan or gold coat with a black mane, tail, and lower legs. This coloring traces back to the Sorraia horse of the Iberian Peninsula and is the result of the creme dilution gene acting on a bay base coat. The gene lightens the body color while leaving the dark points intact, creating the distinctive buckskin look.`,
  },
  {
    name: "Donkey",
    slug: "donkey",
    family: "equines",
    photo: donkeyPhoto,
    description:
      "Donkey is proud, and he knows it! Always a cute photo op and everyone's favorite, Donkey has come a long way. He was rescued from a kill pen in Oklahoma, known for its abusive conditions.",
    story: `Donkey braved his journey from kill pen to service.

Donkey is a charming miniature donkey who joined Robin's Nest in 2021. He was rescued from a "kill pen" in Oklahoma via collaboration with Little Hooves Rescue, another San Diego organization. He was about 2-3 years old at arrival. He loves to frolic in the open area alongside his buddy Phinneas.

Thankfully, we were able to find him at Little Hooves and bring him with Phinneas to Robin's Nest. He's a keeper!

Donkey is strong yet gentle, intelligent yet curious, loving but cautious, and undeniably handsome. He has demonstrated protector skills and dislikes apples and being told what to do.

**The exploitation of miniature farm animals**

The intentional breeding of miniature farm animals has become a troubling trend. Breeders charge $15,000–$20,000 for these animals, often bred for smaller and smaller size at the expense of their health. This leads to serious genetic issues including reduced immunity, congenital abnormalities, and complications with vital organs. Hoarding situations are common, with animals kept in cramped, unsanitary conditions.

**Mini Myths**

- **Carrying capacity:** Mini equines can safely carry only about 20% of their body weight — not 50% as commonly believed. Overloading causes serious spinal and joint damage.
- **Guardian donkeys:** While donkeys can be protective, the "guardian donkey" myth has led to miniature donkeys being placed in dangerous situations with predators they cannot realistically fend off.`,
  },
  {
    name: "Phinneas",
    slug: "phinneas",
    family: "equines",
    photo: phinneasPhoto,
    description:
      "Phinneas always seems to say, 'I'm so pretty,' even when he just rolled in the mud! He's a cutie, a crowd favorite, and gives the best little nose cuddles.",
    story: `Every day Phinneas grows to overcome his kill pen experience.

Phinneas is a delightful miniature horse who joined Robin's Nest in 2021 as a recently gelded two-year-old. Like Donkey, he was rescued via Little Hooves Rescue from a "kill pen" in Louisiana. He still has a hint of stallion spirit. Phinneas is an adventurous eater, incredibly curious, with the sweetest face and stylish mane. Always a crowd favorite.

Watch your fingers though when giving treats — he's very quick!

Phinneas dislikes baths and going anywhere without Donkey. Kimber adopted both Phinneas and Donkey with the help of friend and supporter Stephanie.

**About Little Hooves Rescue**

Little Hooves Rescue was a San Diego organization that worked to save miniature equines from kill pens — holding facilities where unwanted animals are sold cheaply, often for slaughter. Animals in kill pens endure crowded, stressful, and sometimes abusive conditions. "Bail" payments are made to pull animals from these pens before their fate is sealed. Little Hooves has since disbanded/relocated, but their work helped save both Phinneas and Donkey.

**Mini Myths**

- **Not all small horses are Shetland ponies.** Miniature horses have longer, thinner legs compared to the stocky build of ponies. They are distinct breeds with different characteristics.
- Miniature horses serve as guide assistants and therapy animals. The LA County Sheriff's Department even uses them in school programs to build trust with children.`,
  },
  {
    name: "Cowboy",
    slug: "cowboy",
    family: "equines",
    photo: cowboyPhoto,
    description:
      "Meet Cowboy, a sweet 23-year-old Quarter Horse who came to us in urgent need of a safe place to land. Once facing euthanasia within days, he is now comfortable, cared for, and already charming everyone he meets.",
    story: `Cowboy is a 23-year-old American Quarter Horse with a gentle spirit.

He was purchased by a local riding program for lessons, but after light work he would limp due to an unrecoverable old injury. The buyer was refunded, but the horse couldn't return to his former home and couldn't work lessons. He was going to be euthanized, with funds already set aside.

Robin's Nest received the call, consulted their vet urgently, and stepped in immediately. The euthanasia funds were redirected to support his new beginning.

Today Cowboy is settling in, gentle and affectionate. With joint and gastric support he is expected to remain comfortable. He will play a special role in therapeutic and educational programs — teaching beginners horsemanship, grooming, handling, and the art of connecting with a horse.`,
  },
  {
    name: "Dolly",
    slug: "dolly",
    family: "lambs",
    photo: dollyPhoto,
    description:
      "Like her namesake Dolly Parton, Dolly is quite vocal and a real charmer. And she's also known for her hair! She is slightly larger than Reba and definitely the more outgoing of the two.",
    story: `Just like her namesake, Dolly is quite vocal and a real charmer. And she's also known for her hair!

"The Lambies" came to us from a local farm in Ramona. These twin girls are named after music legends Dolly Parton and Reba McEntire! Dolly is slightly larger than Reba and definitely the more outgoing of the two. They serve as our "lawn mowers," helping to manage some of the overgrowth. While they still need a bit of assistance with that task, they're very eager to start their workday each morning! True to their namesakes, they are quite vocal, with Dolly's voice having a deeper tone than Reba's.

The lambs are a cross between the Dorper and Katahdin breeds, commonly known as "hair sheep." Instead of wool, they produce hair and typically don't require shearing. While their crossbreed is prized for meat, that's not the case for these two! We are committed to farm animal welfare, and they play a crucial role in helping the alpacas manage the vegetation. Like all the residents at Robin's Nest, this is their forever home.

At Robin's Nest, we also value diversity, and their unique mix is fascinating. The Dorper breed, hailing from South Africa, is known for its adaptability, hardiness, reproductive rates, and growth. In fact, Dorper skin is the most sought-after sheepskin in the world. The Katahdin breed was developed in the U.S. from a combination of three "African Hair Sheep" brought to Maine from St. Croix. Our goal here is to educate, promote responsible breeding, reduce livestock raised for slaughter, and strengthen the bond with our animal partners.

**Did you know?** Sheep are very clever. Like dogs, sheep can learn their own name and even do tricks!`,
  },
  {
    name: "Reba",
    slug: "reba",
    family: "lambs",
    photo: rebaPhoto,
    description:
      "Reba, just like her namesake Reba McEntire, is always a hard worker and is known for her voice. She is slightly smaller than Dolly and a bit shyer, but a true treasure at RNR!",
    story: `Reba, just like her namesake, is always a hard worker and is known for her voice. Let's keep Reba going!

Reba is one half of our beloved "Lambies" duo, along with her twin sister Dolly. We're big country music fans, and they're named after music legends Dolly Parton and Reba McEntire! Reba is slightly smaller than Dolly, and her voice isn't as deep. She tends to be shyer, so it takes a bit of time for her to warm up to new friends. Both of them are true treasures at RNR!

The Lambies help us manage some of the overgrowth as our "lawn mowers." While they still need a little assistance with that job, they are always eager to start their workday each morning! True to their namesakes, they are quite vocal and make sure to let us know when it's time to go outside!

These lambs are a cross between the Dorper and Katahdin breeds, often referred to as "hair sheep." Instead of wool, they produce hair and typically don't need shearing. Although this crossbreed is prized for meat, that's not the case for these two! We are committed to farm animal welfare, and they play an essential role in helping the alpacas manage the vegetation. Like all the residents at Robin's Nest, this is their forever home.

At Robin's Nest, we also appreciate diversity, and their unique combination is truly fascinating. The Dorper breed, which comes from South Africa, is known for its adaptability, hardiness, and excellent reproductive rates. In fact, Dorper skin is among the most sought-after sheepskin in the world. The Katahdin breed was developed in the U.S. from a mix of three "African Hair Sheep" brought to Maine from St. Croix. Our mission here is to educate, promote responsible breeding, reduce livestock raised for slaughter, and strengthen the bond with our animal partners.

**Did you know?** Life expectancy is 10-12 years. However, if used for production, they are usually sold or "put down" around 5. :-(`,
  },
  {
    name: "Oakley",
    slug: "oakley",
    family: "ranch-dogs",
    photo: oakleyPhoto,
    description:
      "Annie Oakley (or just Oakley), our Blue Heeler girl, is a blue ribbon helper! She is clever and quick, at once a sweet people person while also a devoted protector. She is Eddie's constant companion.",
    story: `Oakley is a sweetheart and is also Eddie's guide dog. We all need a little help now and then!

While Oakley isn't officially part of our nonprofit rescue mission, she is an invaluable member of the Robin's Nest Rescue family! Named after the strong women in our lives, Oakley embodies the spirit of her namesake, the legendary sharpshooter from the 19th century. She is fiercely strong, spirited, opinionated, enterprising, curious, and exceptionally intelligent — and full of energy! To keep her mind engaged, she thrives on having constant "jobs" to do.

A stocky Australian Cattle Dog, she's related to Australia's famous wild dog, the Dingo, and is known for her cleverness, often outsmarting her owners. Kimber is always on her toes with Oakley; they are best friends, both developing an impressive array of skills together. Oakley's favorite pastime is enthusiastically working her herding ball, and she has a distinctive "voice" that she uses to mark the occasion.

One of Oakley's main roles is to be a companion to Eddie, our born-deaf Blue Heeler. They are a perfect match — Oakley's energy is the yang to Eddie's calm yin. His easygoing nature provides a soothing balance to her rambunctiousness. While Oakley jumps and leaps around, Eddie often collapses in a heap, though he's quick to defend his toys. Oakley helps Eddie navigate the world, guiding him and fetching him on command — an invaluable skill on our expansive 5-acre yard. Together, they bring delightful joy to Robin's Nest!

Our slogan, "We rescue them. They save us," reflects the deep, ancient bond between dogs and humans. Archaeologists discovered 12,000-year-old skeletal remains of a woman cradling a puppy, and cave drawings from 32,000 years ago depict animals alongside humans. Remarkably, all dogs share a common ancestor: the gray wolf, Canis lupus. Today, dogs are the most popular animal companions worldwide, with an estimated population of around one billion.

**Common Myths About Rescue Dogs**

- **"Dogs end up in shelters because they have behavioral issues."** Not all have issues, and if so, many reasons exist, including financial or lifestyle changes.
- **"Previously abused dogs won't make good pets."** Most crave love and attention and make excellent pets.
- **"There are no purebreds in shelters."** A variety of purebreds come to shelters; some shelters specialize in a specific breed.`,
  },
  {
    name: "Edison",
    slug: "edison",
    family: "ranch-dogs",
    photo: edisonPhoto,
    description:
      'Edison (Eddie) was born deaf, close to euthanization because he would be "inconvenient." Named after Thomas Edison, who attributed much of his genius to his own deafness.',
    story: `Eddie is deaf and loves to help children who are hard of hearing. He's our "cuddle bug!"

Eddie is an Australian Cattle Dog, also known as a Blue Heeler, who was born deaf. When his breeder discovered his condition, they planned to euthanize him as a puppy. Thankfully, he was rescued by another breeder who fostered him until he joined RNR in 2022. He's named after Thomas Edison, the renowned inventor who credited much of his brilliance to his deafness.

Our goal is to prepare Eddie for our Side by Side animal-assisted therapy program, and he's making great progress! He's already been on a few outings and has proven to be a crowd favorite. Friendly and calm, he recently handled a visit to a large music venue like a pro. Next, we'll take him on more local trips, culminating in participation in our new program for veterans dealing with PTSD. We also envision him forming a special bond with deaf and hard-of-hearing children, showcasing that being "different" can be both charming and exciting.

Eddie loves napping and patrolling the ranch with his companion and fellow Blue Heeler, Oakley, who serves as his guide. His dislikes include the Amazon delivery man and baths! We are grateful every day to the local breeder who rescued Eddie from a situation where another breeder deemed a deaf dog "inconvenient" and unworthy of a loving home.

**Common Myths About Rescue Dogs**

- **"Dogs end up in shelters because they have behavioral issues."** Not all have issues, and if so, many reasons exist, including financial or lifestyle changes.
- **"Previously abused dogs won't make good pets."** Most crave love and attention and make excellent pets.
- **"There are no purebreds in shelters."** A variety of purebreds come to shelters; some shelters specialize in a specific breed.
- **"Rescue dogs are unhealthy and sick."** The majority of rescue dogs don't have illnesses and most that do surface are very minor ones. Approximately one million healthy shelter animals are euthanized every year.
- **"Getting an older dog means they can't be trained."** Actually, older dogs are usually already trained to some extent. And certainly, old dogs CAN learn new tricks!`,
  },
  {
    name: "Lily",
    slug: "lily",
    family: "chimigos",
    photo: lilyPhoto,
    inMemoriam: true,
    description:
      "Lily was the Matriarch. Larger in spirit and size than her brothers, she was the original greeter, caretaker, and center of the pack. (c. 2008 – April 21, 2025)",
    story: `Meet Lily — the heart and soul of the Three Chimigos. (c. 2008 – April 21, 2025)

Lily was the beginning. The first rescue, the first heartbeat that started it all, even before Robin's Nest had a name, and the soul of what would become a sanctuary for so many. Kimber met her in 2010 at the San Diego Humane Society — a young Chihuahua mix who had already known the hardship of motherhood too soon. It was clear she had recently given birth, though her puppies were gone.

That quiet loss became her secret, carried silently but lived out in the way she poured her heart into caring for everyone who came after. From that moment on, Lily became not only Kimber's steadfast companion, but also the spark that started it all.

Known affectionately as the Matriarch, Lily carried herself with dignity and purpose. She was the original greeter, caretaker, and center of the pack. Larger in spirit (and in size) than her brothers Alberto and Julio, she lovingly kept them in line, groomed them, and guided them with a maternal devotion that never wavered. Together they were legendary: The Three Chimigos.

Lily was a communicator, her gaze and expressions speaking volumes. Kimber could read her eyes as though they were a language all their own — every wish, every insistence, every bit of wisdom. She was also deeply social, forming bonds that endured across time and distance.

When her brothers passed before her, Lily grieved in a way that reminded us just how deep her heart ran. She called for them on the deck, lifting her voice into the distance as though she could still reach them.

Though she was the oldest, she held on and was the last to go. Her passing was sudden and unexpected, and Kimber was with her at the very end — a tender moment that remains both a gift and a lifelong reminder.

Through nearly two decades of life, surgeries, medications, triumphs, and loss, Lily remained our constant — resilient, tender, insistent, and fiercely loving. She was not just the matriarch of The Three Chimigos; she was the heart of Robin's Nest itself.

**Grieving the Loss of a Beloved Companion**

With the loss of these precious, innocent and giving souls, we've come to understand more deeply the reality of disenfranchised grief — the kind that comes from losing an animal companion but isn't often recognized or supported by society. When a pet passes, there are no casseroles. No days off work. No flowers or formal condolences. Yet for many of us, that loss is profound — and lasting.

*We are all just walking each other home. — Ram Dass*`,
  },
  {
    name: "Julio",
    slug: "julio",
    family: "chimigos",
    photo: julioPhoto,
    inMemoriam: true,
    description:
      "Julio was a little gimpy-legged black Chihuahua, reportedly hard to adopt out. To us, it was simple — he completed us. The third of The Three Chimigos. (c. 2012 – March 23, 2023)",
    story: `Julio — The Playful Heart of the Chimigos. (c. 2012 – March 23, 2023)

Julio was our explorer and charmer. His long tongue made him instantly unforgettable, and his curious spirit made him everyone's favorite. Always ready for adventure, always ready to answer our call.

We consider ourselves incredibly fortunate to have found Alberto through OC Pound Hounds — and equally blessed to have crossed paths with Michele, whose compassion and philosophy resonated so deeply with us. So when Kimber later spotted a tiny black Chihuahua on their website, it felt like fate calling again. In that moment, The Three Chimigos were born.

Julio had been discovered by Michele in an Orange County shelter. Barely a year old, pure black, underweight at only three pounds, and walking with a noticeable limp, he was one of the most vulnerable little souls she had seen. She couldn't leave him behind. Once he was strong enough, surgery restored much of his mobility — and when she learned we had already adopted his "brother" Alberto, she knew where Julio belonged.

Julio quickly became everyone's favorite. Always cheerful, bouncing from room to room with his signature hop, he radiated joy. As the youngest of the Chimigos, he was our "baby" — playful, mischievous, and full of light.

That's why his sudden illness was so devastating. When Julio was diagnosed with kidney disease, we held on with hope, doing everything possible. But after only a few short months, we faced the unthinkable. His passing left us shattered.

Michele — now leading One Good Last Home Dog Sanctuary & Hospice — often reminds us that sudden goodbyes are the hardest. She is right. And yet, Julio's legacy is joy, resilience, and unconditional love.`,
  },
  {
    name: "Alberto",
    slug: "alberto",
    family: "chimigos",
    photo: albertoPhoto,
    inMemoriam: true,
    description:
      "To some, Alberto could be a puzzle: shy yet fierce, tiny yet strong, cautious yet deeply tender. But to those in his inner circle, he was unforgettable. (c. 2011 – August 4, 2024)",
    story: `Alberto — The Steadfast Soul. (c. 2011 – August 4, 2024)

Our sweet, quirky boy. Sensitive and sometimes shy, he had his own routines, like only eating from a square Chinet plate. He danced like popcorn when he was happy — and stole our hearts completely.

In 2012, while living in Orange County, Kimber set out to find a friend for Lily, who had joined the family two years earlier. On the OC Pound Hounds website, she spotted a small blonde Chihuahua named Alberto — lovingly called "Bertie" by his first rescuer, Michele. When Lily came along for the meet-and-greet, the choice was clear: they left as a family of three.

Alberto's story began with hardship. He had been found on the streets, half-starved and terrified, then mistreated in the shelter with high-pressure hoses. Michele, with extraordinary patience, helped him heal — feeding him, reassuring him, and waiting for the right family to come along. That family turned out to be us, and from the start we knew he was special.

Alberto had his own code of living, and he made his preferences known. He was not an "outdoor dog." He had refined food tastes, though he never turned down a meal. He had signature moves — his joyful "popcorn" dance and the proud "Hello Kitty" stance that always made us laugh. Behind his sometimes-serious exterior was a dog of remarkable intelligence and deep affection.

On August 4, 2024, we said goodbye to Alberto with love, gratitude, and gentleness. He was the steady anchor of the Three Chimigos, the quiet strength at the center of their bond. Not a day passes that we don't miss him.

Alberto's legacy is devotion and love, lived out every single day. He will always be the best boy, our steadfast companion, and the truest reminder that healing is possible when trust is met with love.`,
  },
  {
    name: "Bandito",
    slug: "bandito",
    family: "cats",
    photo: banditoPhoto,
    description:
      "Bandito is a stray we took in — maybe because he reminded us so much of Bandit. He loves to ride the golf cart and stay at Nana's house, uninvited but very happy!",
    story: `Bandito can often be seen around the ranch, a purr-fect opportunity for loving.

Not long after we lost Bandit — who sadly went missing one night and never returned — Kimber spotted a stray on the side of the road with markings strikingly similar to his. She quickly called home, asking for photos of Bandit... could it really be him? While the unique markings were incredibly close, it wasn't our original Bandit. Still, the resemblance was uncanny — like a little nudge from the universe.

And just like that, Bandito joined the family.

Though he showed signs of neglect when we found him, with some care and love, he's now thriving and clearly loving his new life. Bandito has taken on the role of ranch cat and unofficial guest escort. He's especially fond of golf cart rides — he'll hop on with anyone, anytime! These days, he often lounges at Nana's house (completely uninvited, but always content).

With his white coat and bold black markings, Bandito is hard to miss — and with his friendly nature, even harder not to love. If you see a cat cruising around the property on a random golf cart, chances are it's him. He and Smokey continue to be our loyal ranch cats, and we wouldn't have it any other way.

**Fun Cat Facts:**

- Humans have 206 bones while cats average 244
- A house cat is genetically 95.6% tiger
- Cats can run around 30 mph over short distances
- Cats can jump 5 times their height
- Cats walk like camels and giraffes, both right feet then both left feet
- Each cat's nose is unique, much like human fingerprints
- Cats can dream`,
  },
  {
    name: "Smokey",
    slug: "smokey",
    family: "cats",
    photo: smokeyPhoto,
    description:
      "Smokey came to us as a kitten from the Humane Society. Though we don't know Smokey's circumstance, we do know that only 25% of cats born outdoors survive. We're glad Smokey is here!",
    story: `Smokey is the quintessential black cat. A good ranch cat, Smokey is always on patrol!

Smokey and Bandit were brought to Robin's Nest as kittens, adopted through the San Diego Humane Society in 2023. Smokey is solid black; Bandit was white with black markings. After several months, the pair were let out to wander the ranch and "do their thing" as ranch hands — looking after pesky varmints that cause trouble with the animals' feed. Unfortunately, Bandit didn't come in one night. We don't like to think of what might have happened, but must accept the realities of ranch life.

Smokey, a beautiful black cat with bright green eyes, is still with us and, like a good ranch cat, patrols the ranch daily!

**Common Myths About Cats**

- **Black cats are unlucky.** This folklore varies by culture. In Japan, for example, it is considered good luck. Sadly, abandoned black cats are difficult to rehome.
- **All cats hate water.** Cats are not big fans of water, probably because their coats don't dry very quickly. But some adapt quite well and are able to swim.
- **Cats always land on their feet.** Cats do have a "righting reflex" but that's not always the case. It's not worth the chance!`,
  },
  {
    name: "Bandit",
    slug: "bandit",
    family: "cats",
    photo: banditPhoto,
    inMemoriam: true,
    description:
      "Smokey and Bandit came to us as kittens from the Humane Society. Unfortunately, Bandit stayed outdoors one night and never came home. We miss him a lot. (c. 2022 – 2022)",
    story: `In Memoriam: Bandit (c. 2022 – 2022)

Smokey and Bandit were our original ranch hands. They came to Robin's Nest as tiny kittens, adopted through the San Diego Humane Society in 2023. Smokey, a sleek and solid black boy, and Bandit, striking with his white coat and black markings, quickly became part of the family.

After several months of growing, exploring, and bonding, the duo graduated to full ranch duty — roaming the property and taking on their natural role as guardians of the feed sheds, keeping pesky varmints in check.

Smokey was steady and cautious. Bandit, ever the adventurer, had a bold spirit and a habit of pushing boundaries. One evening, Bandit didn't come home. Despite our hopes, he never returned. We try not to dwell on what might have happened, but we must also face the harder truths of ranch life — where wild things still roam and the balance of nature isn't always kind.

Bandit was beautiful, brave, and deeply loved. Not long after his disappearance, we reviewed outdoor camera footage and noticed something unusual: our alpacas, known protectors in their own right, were standing watch in a way we'd never seen before. We believe they sensed danger that night, and did their best to protect both Bandit and the land he called home.

Though his time with us was too short, Bandit left a lasting impression. His memory lives on through Bandito, his spirited successor.`,
  },
];

export function getFamily(slug: string): AnimalFamily | undefined {
  return animalFamilies.find((f) => f.slug === slug);
}

export function getAnimalsByFamily(familySlug: string): Animal[] {
  return animals.filter((a) => a.family === familySlug);
}

export function getMemorialAnimals(): Animal[] {
  return animals.filter((a) => a.inMemoriam);
}
