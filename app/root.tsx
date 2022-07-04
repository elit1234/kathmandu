import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Sidebar from "./Views/Shared/Sidebar";
import Topbar from "./Views/Shared/Topbar";
import Footer from "./Views/Shared/Footer";

import styles from "~/styles/Globals/Globals.css";
import sidebarStyles from "~/styles/Globals/Sidebar.css";
import topbarStyles from "~/styles/Globals/Topbar.css";
import footerStyles from "~/styles/Globals/Footer.css";
import { db } from "./utils/db";
import { authenticator } from "./utils/auth.server";
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: sidebarStyles,
  },
  {
    rel: "stylesheet",
    href: topbarStyles,
  },
  {
    rel: "stylesheet",
    href: footerStyles,
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {});
  let options: MenuOption[] = [];

  const menuOptions = await db.categories.findMany({
    orderBy: [
      {
        position: "asc",
      },
    ],
  });
  menuOptions &&
    menuOptions.map((menuOption) => {
      options.push(menuOption);
    });
  if (user && user.admin)
    options.push({
      extName: "Admin",
      label: "Admin",
      id: 999,
      page: 1,
    });
  return json(options);
};

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Topbar />
        <Sidebar menuOptions={data} />
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
