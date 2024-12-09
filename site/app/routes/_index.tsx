import type { MetaFunction } from "@remix-run/node";
import type { EventsQueryType, ContactQueryType } from "../sanity";

import { Suspense, useState } from "react";
import { Await, Link } from "@remix-run/react";
import { typeddefer, useTypedLoaderData } from "remix-typedjson";

import { nanoid } from "nanoid";
import { AlignRight, X, MoveDown } from "lucide-react";
import { IKVideo, IKContext } from "imagekitio-react";

import {
  client,
  queries,
  EVENTS_QUERY_SCHEMA,
  CONTACT_QUERY_SCHEMA,
} from "../sanity";

import { useMediaQuery } from "~/hooks/useMediaQuery";

import BlurFade from "~/components/animation/BlurFade";
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
} from "~/components/motion/Carousel";
import UILayoutCarousel from "~/components/uiLayout/Carousel";

export const meta: MetaFunction = () => {
  return [
    { title: "RCN Canada" },
    {
      name: "description",
      content: "Welcome to Remnant Christian Network Canada!",
    },
  ];
};

const imagekitURL = "https://ik.imagekit.io/2rtor9l9w";

const meetingTimes = [
  {
    name: "Sunday Service",
    frequence: "Every Sunday",
    time: "1PM",
  },
  {
    name: "Tuesday Service",
    frequence: "Every Tuesday",
    time: "7PM",
  },
  {
    name: "Tabernacle of David",
    frequence: "4th Friday of every month",
    time: "11:59PM-5AM",
  },
  {
    name: "10 hours prayer stretch",
    frequence: "3rd Saturday of every month",
    time: "7AM-5PM",
  },
];

export async function loader() {
  const events = client
    .fetch<EventsQueryType>(queries.EVENTS_QUERY)
    .then((res) => EVENTS_QUERY_SCHEMA.parse(res));

  const contact = await client
    .fetch<ContactQueryType>(queries.CONTACT_QUERY)
    .then((res) => CONTACT_QUERY_SCHEMA.parse(res));

  return typeddefer({ contact, events });
}

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  const isBigScreen = useMediaQuery("(min-width: 1024px)");

  const { contact, events } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <IKContext urlEndpoint={imagekitURL}>
        <header className="w-full min-h-screen min-h-[100dvh] lg:p-3 grid grid-cols-1">
          <BlurFade
            delay={0.25}
            inView
            className="relative lg:max-h-[95vh] lg:max-h-[95dvh] col-start-1 col-span-1 row-start-1 row-span-1 before:absolute before:inset-0 lg:before:rounded-lg before:bg-gradient-to-t before:from-brand before:via-brand/80 before:via-70% before:to-brand/50 "
          >
            <IKVideo
              path="RCN/pastor-ola-at-iec-2024.mp4"
              transformation={[{ q: "70" }]}
              controls={false}
              className="block w-full h-full object-cover lg:rounded-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="/video/pastor_ola_at_iec_2024.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </IKVideo>
          </BlurFade>
          <BlurFade
            delay={0.25 * 2}
            inView
            className="relative mt-10 container h-fit col-start-1 col-span-1 row-start-1 z-50"
          >
            <nav className="px-3 relative flex items-start justify-between">
              <img
                className="h-16"
                aria-label="logo"
                src="/img/whitercnlogo.png"
                alt="remnant christian network canada logo"
              />
              <button
                aria-label="toggle menu"
                onClick={() => setIsOpen((prev) => !prev)}
                className="lg:hidden text-site"
              >
                {isOpen ? (
                  <X size={32} className="text-site" />
                ) : (
                  <AlignRight size={32} className="text-site" />
                )}
              </button>

              <div
                className={`absolute left-0 top-20 lg:static py-4 lg:py-0 w-full lg:w-fit bg-site lg:bg-[transparent] ${
                  isOpen ? "flex" : "hidden"
                } lg:flex flex-col lg:flex-row items-center lg:items-start gap-10 uppercase text-text lg:text-site rounded-lg lg:rounded-none`}
              >
                <Link to="#about">About us</Link>
                <Link to="#events">Upcoming events</Link>
                <Link to="#connect">Connect with us</Link>
              </div>
            </nav>
          </BlurFade>

          <BlurFade
            delay={0.25 * 2.5}
            className="relative mb-12 px-3 container h-fit col-start-1 col-span-1 row-start-1 self-end z-50 flex items-end justify-between"
            inView
          >
            <h1 className="slg:max-w-[860px] lg:max-w-full uppercase font-medium text-[40px] md:text-[52px] slg:text-[64px] leading-[52px] md:leading-[60px] slg:leading-[80px] text-site">
              <span className="inherit hidden slg:block">
                Striving for the rebirth <br /> of apostolic christianity
              </span>
              <span className="inherit slg:hidden text-balance">
                Striving for the rebirth of apostolic christianity
              </span>
            </h1>
            <div className="mb-4 w-12 h-20 bg-[#fff]/40 hidden md:flex items-center justify-center rounded-full">
              <MoveDown size={40} className="text-[#000]" />
            </div>
          </BlurFade>
        </header>

        <section
          id="about"
          className="container px-3 mt-40 lg:mt-60 w-full space-y-20 md:space-y-28 lg:space-y-60"
        >
          <BlurFade
            delay={0.25 * 1.5}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-5 gap-y-6 lg:gap-y-0"
            inView
          >
            <h3 className="col-start-1 col-span-1 lg:col-span-4 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
              Who we are
            </h3>
            <p className="lg:col-start-7 lg:col-end-13 font-regular text-2xl md:text-3xl lg:text-[40px] lg:leading-[52px] lg:-tracking-[1.5px] text-text text-balance">
              We are an interdenominational and non-denominational international
              Ministry to the body of Christ with the mandate of restoring the
              apostolic order and Christianity as was seen in the days of the
              first generation of apostles of Jesus Christ, and thereby
              heralding the coming of the Lord Jesus Christ in this end of the
              age.
            </p>
          </BlurFade>
          <BlurFade
            delay={0.25 * 1.5}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-5 gap-y-6 lg:gap-y-0"
            inView
          >
            <h3 className="col-start-1 col-span-1 lg:col-span-4 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
              <span className="inherit hidden lg:block">
                Our <br /> goal
              </span>
              <span className="inherit lg:hidden">Our goal</span>
            </h3>
            <p className="lg:col-start-7 lg:col-end-13 font-regular text-2xl md:text-3xl lg:text-[40px] lg:leading-[52px] lg:-tracking-[1.5px] text-text text-balance">
              We seek only to see the coming of the King and His Kingdom until
              His reality is furnished in the hearts of the sons of men. Our
              major instruments of realizing this vision are Prayers, the Study
              of the Word, and Breaking of Bread with one another.
            </p>
          </BlurFade>
        </section>

        <section id="events" className="mt-20 md:mt-28 lg:mt-60 container px-3">
          <Suspense fallback={<p>Loading</p>}>
            <Await resolve={events}>
              {(events) => (
                <Carousel>
                  <BlurFade
                    className="grid grid-cols-1 lg:grid-cols-12 gap-x-5 gap-y-6 lg:gap-y-16"
                    delay={0.25 & 2.75}
                    inView
                  >
                    <h3 className="col-start-1 col-span-1 lg:col-span-4 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
                      <span className="inherit hidden lg:block">
                        Upcoming <br /> events
                      </span>
                      <span className="block mt-2 inherit lg:hidden">
                        Upcoming events
                      </span>
                    </h3>

                    {isBigScreen ? (
                      <>
                        <CarouselNavigation
                          className="mb-5 col-start-11 col-span-3 self-end justify-self-end gap-4"
                          classNameButton="bg-transparent border border-[#000]"
                          alwaysShow
                        />
                        <CarouselContent className="col-start-1 col-span-12 space-x-3">
                          {[events.schedule, ...events.events].map((event) => (
                            <CarouselItem
                              key={nanoid()}
                              className="min-w-[400px]"
                            >
                              <img
                                src={event.poster.url}
                                loading="lazy"
                                className={`md:w-[400px]`}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </>
                    ) : (
                      <UILayoutCarousel
                        data={[
                          {
                            ...events.schedule.poster,
                          },
                          ...events.events.map((event) => ({
                            ...event.poster,
                          })),
                        ]}
                      />
                    )}
                  </BlurFade>
                </Carousel>
              )}
            </Await>
          </Suspense>
        </section>

        <section
          id="schedule"
          className="container lg:px-3 mt-20 lg:mt-60 w-full space-y-60"
        >
          <BlurFade delay={0.25 * 1.5} className="w-full" inView>
            <h3 className="mb-6 px-3 lg:px-0 lg:mb-16 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
              <span className="inherit hidden lg:block">
                Our <br /> schedule
              </span>
              <span className="inherit lg:hidden">Our schedule</span>
            </h3>
            {meetingTimes.map((m, index) => (
              <div
                key={m.name}
                className={`w-full h-fit p-3 lg:h-20 grid grid-cols-3 slg:grid-cols-12 gap-x-5 items-center text-sm md:text-2xl ${
                  index === meetingTimes.length - 1
                    ? "border border-[#000]"
                    : "border-r border-t border-l border-[#000]"
                }`}
              >
                <span className="block lg:ml-3 col-start-1 row-start-2 slg:row-start-1 col-span-2 slg:col-span-3">
                  {m.frequence}
                </span>
                <span className="block col-start-1 slg:col-start-6 col-span-3 self-start font-extrabold slg:font-normal text-balance">
                  {m.name}
                </span>
                <span className="block slg:col-start-11 slg:col-span-2 justify-self-end self-start text-right slg:text-left slg:justify-self-start text-balance">
                  @{m.time} EST
                </span>
              </div>
            ))}
          </BlurFade>
        </section>

        <footer
          id="connect"
          className="mt-[12rem] md:mt-60 lg:mt-[19rem] bg-brand"
        >
          <BlurFade
            delay={0.25}
            className="container px-3 md:px-10 pt-10 2xl:pt-14 pb-4 space-y-[7.5rem]"
            inView
          >
            <section className="space-y-5 md:space-y-16">
              <h3 className="font-bold text-[40px] md:text-[4rem] lg:text-7xl leading-[3.25rem] md:leading-[4.5rem] lg:leading-[5rem] text-site text-balance">
                Get in touch with us
              </h3>

              <div className="w-full grid grid-cols-4 md:grid-cols-8 gap-5 lg:flex lg:justify-between lg:items-start">
                {contact.map((c) => (
                  <div
                    key={c.channel}
                    className={`${placeFooterContent(
                      c
                    )} flex flex-col gap-3 text-site`}
                  >
                    <span className="font-normal md:text-2xl leading-[30px]">
                      ({c.title})
                    </span>

                    {c.channel !== "socials" && c.channel !== "location" ? (
                      <div className="flex flex-col gap-4">
                        {c.data.map((d) => (
                          <span
                            key={nanoid()}
                            className="font-normal md:text-2xl text-balance leading-[30px]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <>
                        {c.channel !== "socials" ? (
                          <div className="flex flex-col">
                            <span className="font-normal md:text-2xl text-balance leading-[30px]">
                              {c.data["street"]},
                            </span>
                            <span className="font-normal md:text-2xl text-balance leading-[30px]">
                              {c.data["city"]} {c.data["province"]},
                            </span>
                            <span className="font-normal md:text-2xl text-balance leading-[30px]">
                              {c.data["postcode"]}
                            </span>
                          </div>
                        ) : (
                          <div className="flex md:flex-col gap-4">
                            {c.data.map((d) => (
                              <Link
                                key={nanoid()}
                                to={d.url}
                                className="font-normal capitalize md:text-2xl text-balance leading-[30px]"
                              >
                                {d.site}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <BlurFade
              delay={0.25 * 1.25}
              className="lg:pt-8 w-full grid grid-cols-4 lg:grid-cols-8 gap-5"
              inView
            >
              <Link
                to="/"
                className="block col-start-1 col-span-4 md:col-span-1 md:row-start-1 mx-auto md:mx-0 mt-5"
              >
                <img
                  className="max-h-[120px] md:h-16"
                  aria-label="logo"
                  src="/img/whitercnlogo.png"
                  alt="remnant christian network canada logo"
                />
              </Link>
              <small className="block mt-5 col-start-1 lg:col-start-2 col-span-4 row-start-3 lg:row-start-1 justify-self-center md:justify-self-start lg:self-end font-normal text-xs text-site">
                Copyright 2024. Remnant Christian Network Canada
              </small>
              <div className="col-start-1 md:col-start-2 lg:col-start-6 col-span-4 row-start-1 md:col-span-3 flex flex-row justify-between md:justify-end items-end gap-6 md:gap-10 *:uppercase *:text-sm">
                <Link to="#about" className="font-normal text-site">
                  About us
                </Link>
                <Link to="#events" className="font-normal text-site">
                  Our events
                </Link>
                <Link to="#connect" className="font-regular text-site">
                  Contact us
                </Link>
              </div>
            </BlurFade>
          </BlurFade>
        </footer>
      </IKContext>
    </>
  );
}

function placeFooterContent(content: ContactQueryType[number]) {
  if (content.channel === "location")
    return "col-start-1 row-start-1 md:row-start-2 col-span-2 md:col-span-3";

  if (content.channel === "phone")
    return "col-start-3 md:col-start-6 row-start-1 col-span-2 md:col-span-3 justify-self-end md:justify-self-start";

  if (content.channel === "socials")
    return "col-start-1 md:col-start-6 row-start-2 col-span-1 md:col-span-3";

  if (content.channel === "email")
    return "col-start-1 row-start-3 md:row-start-1 col-span-8";

  return "";
}
