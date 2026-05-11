export type NavItem = {
  href: string;
  label: string;
};

export const mainNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/schools", label: "Schools" },
  { href: "/find", label: "Find" },
  { href: "/review/start", label: "Review" }
];
