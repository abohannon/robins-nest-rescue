export interface NavLink {
  label: string;
  href: string;
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
  { label: "About", href: "/about" },
];

export const navActions: NavAction[] = [
  { label: "Book a Tour", href: "/tours", style: "primary" },
];
