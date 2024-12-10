import type { ContactQueryType } from "~/sanity";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { typeddefer, useTypedLoaderData } from "remix-typedjson";

import { useEffect } from "react";

import "./tailwind.css";

import { client, queries, CONTACT_QUERY_SCHEMA } from "~/sanity";

import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import BlurFade from "./components/animation/BlurFade";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/mersad-regular.woff2",
  },
  {
    rel: "preload",
    href: "/fonts/mersad-medium.woff2",
  },
  {
    rel: "preload",
    href: "/fonts/mersad-bold.woff2",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-body font-medium text-[16px] leading-[24px]">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader() {
  const contact = await client
    .fetch<ContactQueryType>(queries.CONTACT_QUERY)
    .then((res) => CONTACT_QUERY_SCHEMA.parse(res));

  return typeddefer({ contact });
}

export default function App() {
  const { contact } = useTypedLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-1">
      <Navbar className="mt-10 container h-fit col-start-1 col-span-1 row-start-1 z-50" />

      <div className="col-start-1 col-span-1 row-start-1">
        <Outlet />
        <Footer data={contact} />
      </div>
    </div>
  );
}
