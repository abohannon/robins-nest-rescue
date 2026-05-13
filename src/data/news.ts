import type { ImageMetadata } from "astro";
import sdMagazinePhoto from "../assets/news/sd-magazine.webp";
import sdVoyagerPhoto from "../assets/news/sd-voyager.jpg";
import rockinRobinPhoto from "../assets/news/rockin-robin.png";
import coronadoTimesPhoto from "../assets/news/coronado-times.jpg";
import coronadoNewsPhoto from "../assets/news/coronado-news.jpg";
import sdReaderPhoto from "../assets/news/sd-reader.png";
import unionTribunePhoto from "../assets/news/union-tribune.webp";
import nbcSdPhoto from "../assets/news/nbc-sd.webp";
import fox5Photo from "../assets/news/fox5.png";
import cbs8Photo from "../assets/news/cbs8.png";
import youtubePigsPhoto from "../assets/news/youtube-pigs.png";

export interface NewsItem {
  title: string;
  source: string;
  /** ISO `YYYY-MM-DD`. Used for sorting. */
  date: string;
  description?: string;
  url: string;
  image: ImageMetadata;
}

export const newsItems: NewsItem[] = [
  {
    title: "Robin's Nest Rescue Gives Farm Animals a Second Chance",
    source: "San Diego Magazine",
    date: "2025-11-26",
    description:
      "The Ramona rescue focuses on therapeutic interactions with vulnerable populations.",
    url: "https://sandiegomagazine.com/everything-sd/robins-nest-animrescue-nonprofit-ramona/",
    image: sdMagazinePhoto,
  },
  {
    title:
      "Inspiring Conversations with Kimber Williams of Robin's Nest Rescue",
    source: "SD Voyager",
    date: "2025-09-22",
    url: "https://sdvoyager.com/interview/inspiring-conversations-with-kimber-williams-of-robins-nest-rescue/",
    image: sdVoyagerPhoto,
  },
  {
    title:
      "A Dozen Bands Take Center Stage at Third Annual Rockin' Robin Music Festival & Fundraiser",
    source: "Press Release",
    date: "2025-09-02",
    description:
      "Family-friendly event will feature live music, food trucks, local vendors, and auctions to benefit animal rescue.",
    url: "https://7326ecbe-904e-41ac-aa09-15068d5bd293.usrfiles.com/ugd/7326ec_4549b4f37b55461fa0694f8c4875b3cb.pdf",
    image: rockinRobinPhoto,
  },
  {
    title:
      "Adorable Huacaya Alpacas Make Surprise Appearance at Coronado Rotary",
    source: "Coronado Times",
    date: "2025-06-16",
    description:
      "Two alpacas from the rescue visited a Coronado Rotary meeting to demonstrate the sanctuary's work with abandoned animals.",
    url: "https://coronadotimes.com/news/2025/06/16/adorable-huacaya-alpacas-make-surprise-appearance-at-coronado-rotary/",
    image: coronadoTimesPhoto,
  },
  {
    title:
      "Huacaya Alpacas Make A Surprise Appearance At Coronado Rotary Club Meeting",
    source: "Coronado News CA",
    date: "2025-06-13",
    description:
      'Two alpacas entertained Rotary Club members and shared "their beloved animal kisses with those wishing the opportunity."',
    url: "https://www.coronadonewsca.com/news/coronado_island_news/huacaya-alpacas-make-a-surprise-appearance-at-coronado-rotary-club-meeting/article_413b022c-5578-4d35-ad1e-0d469bed5582.html",
    image: coronadoNewsPhoto,
  },
  {
    title: "Kimber Williams brings alpacas into her nest",
    source: "San Diego Reader",
    date: "2025-04-17",
    description: "Robin's Nest Rescue manages a diverse collection of animals.",
    url: "https://www.sandiegoreader.com/news/2025/apr/17/kimber-williams-brings-alpacas-into-her-nest/",
    image: sdReaderPhoto,
  },
  {
    title: "Ramona's Robin's Nest Rescue Ranch takes in 20 senior alpacas",
    source: "San Diego Union-Tribune",
    date: "2025-03-17",
    description:
      "Four alpacas will remain at the rescue while others are placed at additional facilities.",
    url: "https://www.sandiegouniontribune.com/2025/03/11/ramonas-robins-nest-rescue-ranch-takes-in-20-senior-alpacas/",
    image: unionTribunePhoto,
  },
  {
    title:
      "Ramona's Robin's Nest Rescue goes on 400-mile mission to re-home 20 alpacas",
    source: "NBC San Diego",
    date: "2025-03-11",
    description:
      "One alpaca named Hope symbolized the animals' journey seeking a better future.",
    url: "https://www.nbcsandiego.com/news/local/ramonas-robins-nest-rescue-goes-on-400-mile-mission-to-re-home-20-alpacas/3775660/",
    image: nbcSdPhoto,
  },
  {
    title: "Alpacas rescued by San Diego sanctuary after their owner dies",
    source: "Fox 5 San Diego",
    date: "2025-03-06",
    description:
      "Senior alpacas from Central California now have permanent homes in San Diego County following an owner's passing.",
    url: "https://fox5sandiego.com/news/local-news/alpacas-san-diego-county/",
    image: fox5Photo,
  },
  {
    title: "21 alpacas rescued by local animal sanctuaries",
    source: "CBS 8",
    date: "2025-03-06",
    description:
      "One alpaca named Neptune was attacked by a mountain lion and requires specialized care.",
    url: "https://www.cbs8.com/article/news/local/alpacas-rescued-from-farm-now-living-in-san-diego/509-80a49cf2-0c4f-4315-93e4-4672ea92da13",
    image: cbs8Photo,
  },
  {
    title: "MASSIVE Animal Rescue: Saving Over 100 Pigs!",
    source: "YouTube",
    date: "2021-01-05",
    description:
      '"121 pigs were saved thanks to a national effort from dozens of animal advocates" in a two-week rescue operation.',
    url: "https://www.youtube.com/watch?v=ZDr07M2Ca-4",
    image: youtubePigsPhoto,
  },
];

export function getSortedNewsItems(): NewsItem[] {
  return [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
}
