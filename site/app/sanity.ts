import { createClient } from "@sanity/client";

import { z } from "zod";
import groq from "groq";

declare global {
  interface Window {
    ENV: {
      SANITY_STUDIO_PROJECT_ID: string;
      SANITY_STUDIO_DATASET: string;
      SANITY_STUDIO_URL: string;
      SANITY_STUDIO_API_VERSION: string;
      // SANITY_STUDIO_STEGA_ENABLED: string
    };
  }
}

const {
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_URL = "http://localhost:3333",
  SANITY_STUDIO_API_VERSION = "2023-05-03",
  // SANITY_STUDIO_STEGA_ENABLED = false,
} = typeof document === "undefined" ? process.env : window.ENV;

export const projectId = SANITY_STUDIO_PROJECT_ID!;
export const dataset = SANITY_STUDIO_DATASET!;
export const studioUrl = SANITY_STUDIO_URL!;
export const apiVersion = SANITY_STUDIO_API_VERSION!;
//   export const stegaEnabled = SANITY_STUDIO_STEGA_ENABLED === 'true'

if (!projectId) throw new Error("Missing SANITY_STUDIO_PROJECT_ID in .env");
if (!dataset) throw new Error("Missing SANITY_STUDIO_DATASET in .env");
if (!studioUrl) throw new Error("Missing SANITY_STUDIO_URL in .env");
//   if (!stegaEnabled)
//     throw new Error(`Missing SANITY_STUDIO_STEGA_ENABLED in .env`)

export const EVENTS_QUERY_SCHEMA = z.object({
  schedule: z.object({
    poster: z.object({
      url: z.string().url(),
      metadata: z.object({
        lqip: z.string(),
      }),
    }),
    isMainEvent: z.boolean(),
  }),
  events: z.array(
    z.object({
      date: z.coerce.string().date(),
      isMainEvent: z.boolean().nullable(),
      name: z.string(),
      slug: z.string(),
      poster: z.object({
        url: z.string().url(),
        metadata: z.object({
          lqip: z.string(),
        }),
      }),
    })
  ),
});

export const CONTACT_QUERY_SCHEMA = z.tuple([
  z.object({
    channel: z.literal("location"),
    title: z.literal("on site"),
    data: z.object({
      street: z.string(),
      city: z.string(),
      province: z.string(),
      postcode: z.string(),
    }),
  }),
  z.object({
    channel: z.literal("phone"),
    title: z.literal("on a call"),
    data: z.array(z.string()),
  }),
  z.object({
    channel: z.literal("socials"),
    title: z.literal("online"),
    data: z.array(
      z.object({
        site: z.string(),
        url: z.string().url(),
      })
    ),
  }),
  z.object({
    channel: z.literal("email"),
    title: z.literal("by email"),
    data: z.array(z.string().email()),
  }),
]);

export type EventsQueryType = z.infer<typeof EVENTS_QUERY_SCHEMA>;
export type ContactQueryType = z.infer<typeof CONTACT_QUERY_SCHEMA>;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export const queries = {
  EVENTS_QUERY: groq`{
    "schedule": *[_type == "schedule"][0]{
      "poster": poster.asset->{
      url, 
      metadata{
      lqip
    }
    },
    "isMainEvent": false
    },
    "events": *[_type == "event"]{
    date,
      isMainEvent,
      name,
      'slug':slug.current,
       "poster": poster.asset->{
      url,
      metadata{
        lqip,
      }},
  
  }[]
  }`,
  CONTACT_QUERY: groq`[{
    "channel": "location",
      "title":"on site",
      "data": *[_type == "location"][0]{street,city,province,postcode}
  },
    {
      "channel": "phone",
      "title": "on a call",
      "data": *[_type == "socials"][0].phoneNumbers[].number,
    },
    {
      "channel":"socials",
      "title":"online",
      "data": [
        {
          "site":"facebook",
          "url": *[_type == "socials"][0].socialMedia.facebook
        },
        {
          "site":"youtube",
          "url": *[_type == "socials"][0].socialMedia.youtube
        },
        {
          "site":"x(twitter)",
          "url": *[_type == "socials"][0].socialMedia.x
        },
        {
          "site":"instagram",
          "url": *[_type == "socials"][0].socialMedia.instagram
        }
      ]
    },
    {
          "channel": "email",
        "title": "by email",
        "data": [*[_type == "socials"][0].email.address],
    }
  ]
`,
};
