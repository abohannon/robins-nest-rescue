import type { ImageMetadata } from "astro";
import placeholderImage from "../assets/alpaca-smile.jpg";
import falkorPhoto from "../assets/falkor.png";
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
    name: "The Grand Huacaya Alpacas",
    slug: "alpacas",
    description:
      "With their soulful eyes, playful curiosity, and cloud-soft fleece, our eight Huacaya alpacas teach us daily about connection, compassion, and joy. Four joined us in 2022, and four seniors found their forever home in 2025.",
    photo: fernPhoto,
  },
  {
    name: "The Tortoises",
    slug: "tortoises",
    description:
      "Slow and steady, our rescue tortoises remind us that healing happens at its own pace.",
    photo: placeholderImage,
  },
  {
    name: "The Equines",
    slug: "equines",
    description:
      "Big horse, little horse, and a donkey too! The equine family at Robin's Nest includes Tivio, our stunning buckskin Quarter Horse, Phinneas the gorgeous mini horse, and Donkey the lovable mini donkey.",
    photo: tivioPhoto,
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
];

export function getFamily(slug: string): AnimalFamily | undefined {
  return animalFamilies.find((f) => f.slug === slug);
}

export function getAnimalsByFamily(familySlug: string): Animal[] {
  return animals.filter((a) => a.family === familySlug);
}
