export type NavPlacement = "header" | "footer" | "both";

export interface NavLink {
  label: string;
  href: string;
  placement?: NavPlacement;
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
  { label: "About", href: "/about" },
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
