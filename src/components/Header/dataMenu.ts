export type MenuItem = {
  id: number;
  label: string;
  path: string;
};

export const dataMenu: MenuItem[] = [
  { id: 1, label: "menu.home", path: "/" },
  { id: 2, label: "menu.ebikes", path: "/product-list" },
  { id: 3, label: "menu.blog", path: "/blog-list" },
  { id: 4, label: "menu.about", path: "/about-us" },
];
