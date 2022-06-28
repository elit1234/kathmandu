import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Sidebar from "./Views/Shared/Sidebar";
import Topbar from "./Views/Shared/Topbar";

import styles from "~/styles/Globals/Globals.css";
import sidebarStyles from "~/styles/Globals/Sidebar.css";
import topbarStyles from "~/styles/Globals/Topbar.css";
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
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Topbar />
        <Sidebar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
