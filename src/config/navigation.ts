export type NavPlacement = "header" | "footer" | "both";

export interface NavChild {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  placement?: NavPlacement;
  children?: NavChild[];
}

export interface NavAction {
  label: string;
  href: string;
  style: "primary" | "accent";
}

export const navLinks: NavLink[] = [
  { label: "Meet the Animals", href: "/animals" },
  { label: "The Sanctuary", href: "/sanctuary" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Founder's Story", href: "/about/founders-story" },
      { label: "Mission and Vision", href: "/about/mission-and-vision" },
      { label: "Team", href: "/about/team" },
      {
        label: "Board & Advisory Council",
        href: "/about/board-and-advisory-council",
      },
      { label: "In the News", href: "/in-the-news" },
      { label: "FAQ", href: "/about/faq" },
    ],
  },
  {
    label: "Visit The Retreat",
    href: "https://robinsnestramona.com",
    placement: "footer",
  },
  {
    label: "In the News",
    href: "/in-the-news",
    placement: "footer",
  },
];

/**
 * Returns true if the current path matches the link's href exactly,
 * or is a child route of the link (e.g. /about/team matches /about).
 * External links (http) only match exactly.
 */
export function isActiveLink(href: string, currentPath: string): boolean {
  if (href.startsWith("http")) return currentPath === href;
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(href + "/");
}

export function isInHeader(link: NavLink): boolean {
  const placement = link.placement ?? "both";
  return placement === "header" || placement === "both";
}

export function isInFooter(link: NavLink): boolean {
  const placement = link.placement ?? "both";
  return placement === "footer" || placement === "both";
}

export const navActions: NavAction[] = [
  { label: "Book a Tour", href: "/tours", style: "primary" },
];
