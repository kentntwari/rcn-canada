import type { MetaFunction } from "@remix-run/node";
import type { EventsQueryType, ContactQueryType } from "../sanity";

import { Suspense, useState } from "react";
import { Await, Link } from "@remix-run/react";
import { defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { typeddefer, useTypedLoaderData } from "remix-typedjson";

import { nanoid } from "nanoid";
import { AlignRight, X } from "lucide-react";
import { IKVideo, IKContext } from "imagekitio-react";

import {
  client,
  queries,
  EVENTS_QUERY_SCHEMA,
  CONTACT_QUERY_SCHEMA,
} from "../sanity";

import { useMediaQuery } from "~/hooks/useMediaQuery";

import Carousel from "~/components/Carousel";
import BlurFade from "~/components/animation/BlurFade";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogContainer,
} from "~/components/Dialog";

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

  const address = contact.find((c) => c.channel === "location")?.data;

  return (
    <>
      <IKContext urlEndpoint={imagekitURL}>
        <header className="w-full min-h-screen min-h-[100dvh] lg:min-h-[95vh] lg:min-h-[95dvh] lg:max-h-[99vh] p-3 grid grid-cols-1 grid-rows-[90%_10%] md:grid-rows-[auto] gap-y-3 md:gap-0">
          <BlurFade
            delay={0.25}
            inView
            className="relative lg:max-h-[95vh] lg:max-h-[95dvh] col-start-1 col-span-1 row-start-1 row-span-1 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-t before:from-brand before:via-brand/80 before:via-70% before:to-brand/50 "
          >
            <IKVideo
              path="RCN/pastor-ola-at-iec-2024.mp4"
              transformation={[{ q: "70" }]}
              controls={false}
              className="block w-full h-full object-cover rounded-lg"
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
            className="relative mt-6 2xl:mt-10 px-3 md:px-10 container h-fit col-start-1 col-span-1 row-start-1 z-50"
          >
            <nav className="relative flex items-start justify-between">
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

          <footer className="md:px-10 md:pb-4 lg:pb-0 container col-start-1 apply-row-span z-10 flex md:items-end md:justify-between text-site">
            <div className="grid grid-rows-[70%_20%_10%] md:grid-rows-2 lg:grid-rows-[auto] lg:grid-cols-8 xl:grid-cols-12 md:gap-5">
              <BlurFade
                delay={0.25 * 2.5}
                className="md:hidden relative top-6 px-3 h-[288px] grid grid-cols-4 self-end gap-x-5 text-8xl -tracking-[1.5px]"
                inView
              >
                <span className="block col-start-1 col-span-4 self-end">
                  REVEA
                </span>
                <span className="block col-start-1 col-span-4 row-start-2 justify-self-end">
                  LING
                </span>
                <span className="block">JESUS</span>
              </BlurFade>
              <BlurFade
                delay={0.25 * 2.5}
                className="row-span-2 relative hidden md:flex lg:hidden justify-between items-end"
                inView
              >
                <h1 className="w-fit uppercase font-medium text-[120px] leading-[120px] -tracking-[1.5px] text-site">
                  REVEA-
                  <br />
                  LING
                  <br />
                  JESUS
                </h1>
                <span className="relative bottom-6 text-[24px] text-balance leading-[32px]">
                  Join us every Tuesday at 7pm at {address?.street}, <br />
                  {address?.city} {address?.province} {address?.postcode}
                </span>
              </BlurFade>
              <BlurFade
                delay={0.25 * 2.5}
                className="hidden lg:block mb-2 uppercase font-medium text-site text-[96px] xl:text-[120px] 2xl:text-[144px] leading-[104px] xl:leading-[120px] 2xl:leading-[144px] -tracking-[1.5px]"
                inView
              >
                Revealing <br /> Jesus
              </BlurFade>
              <BlurFade
                delay={0.25 * 2.5}
                className="md:hidden lg:block relative -top-8 lg:top-0 lg:max-w-[340px] row-start-2 lg:row-start-1 lg:row-end-2 lg:col-start-3 xl:col-start-5 lg:col-span-4 lg:ml-16 xl:ml-0 2xl:-ml-10 lg:mb-7 2xl:mb-10 px-3 md:px-0 self-end text-[24px] text-balance leading-[32px]"
                inView
              >
                Join us every Tuesday at 7pm at {address?.street}, <br />
                {address?.city} {address?.province} {address?.postcode}
              </BlurFade>
            </div>
          </footer>
        </header>

        <section
          id="about"
          className="container px-3 md:px-10 mt-[calc(6rem+169px)] md:mt-[40vh] lg:grid lg:grid-cols-8 xl:grid-cols-12 lg:gap-5"
        >
          <BlurFade
            delay={0.25}
            inView
            className="lg:col-start-3 xl:col-start-4 2xl:col-start-4 lg:col-span-6 xl:col-span-9"
          >
            <p className="2xl:justify-self-end font-normal text-text text-balance text-[40px] xl:text-[48px] leading-[52px] xl:leading-[72px] -tracking-[1.5px]">
              We are an interdenominational and non-denominational international
              Ministry to the body of Christ with the mandate of restoring the
              apostolic order and Christianity as was seen in the days of the
              first generation of apostles of Jesus Christ, and thereby
              heralding the coming of the Lord Jesus Christ in this end of the
              age.
            </p>
          </BlurFade>

          <BlurFade
            delay={0.25 * 1.25}
            className="mt-[20vh] lg:col-start-3 xl:col-start-4 2xl:col-start-4 lg:col-span-6 xl:col-span-9"
            inView
          >
            <p className="2xl:justify-self-end font-normal text-text text-balance text-[40px] xl:text-[48px] leading-[52px] xl:leading-[72px] -tracking-[1.5px]">
              We seek only to see the coming of the King and His Kingdom until
              His reality is furnished in the hearts of the sons of men. Our
              major instruments of realizing this vision are Prayers, the Study
              of the Word, and Breaking of Bread with one another.
            </p>
          </BlurFade>
        </section>

        <section
          id="events"
          className="mt-[120px] md:mt-[40vh] lg:container lg:px-10 space-y-6 md:space-y-24 2xl:space-y-[120px]"
        >
          <BlurFade
            delay={0.25 * 1.5}
            className="container lg:max-w-full px-3 md:px-10 lg:px-0 uppercase font-bold text-[56px] md:text-8xl lg:text-[120px] 2xl:text-[150px] leading-[64px] md:leading-[104px] lg:leading-[160px] text-[transparent] text-balance -tracking-[1.5px] [-webkit-text-stroke:1px_#0e0907] md:[-webkit-text-stroke:2px_#0E0907]"
            inView
          >
            <h3>Upcoming events</h3>
          </BlurFade>

          <Suspense fallback={<p>Loading</p>}>
            <Await resolve={events}>
              {(events) => (
                <>
                  {isBigScreen ? (
                    <BlurFade
                      delay={0.25 * 2.5}
                      className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(480px,1fr))] gap-11 items-center"
                      inView
                    >
                      {[events.schedule, ...events.events].map((event, i) => (
                        <div
                          key={nanoid()}
                          className={`${
                            event.isMainEvent
                              ? "lg:col-start-2 lg:row-start-1"
                              : ""
                          } flex justify-center`}
                        >
                          {/* TODO: configure fallback images.
                           There should be a low-quality image blurred for this */}
                          <Dialog
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 24,
                            }}
                          >
                            <DialogTrigger>
                              <img
                                src={`${event.poster.url}?w=400`}
                                loading="lazy"
                                className={`${
                                  !event.isMainEvent
                                    ? "lg:max-w-[344px] xl:max-w-[360px] 2xl:max-w-[480px]"
                                    : "lg:max-w-[400px] xl:max-w-[420px] 2xl:max-w-[600px]"
                                } drop-shadow-md`}
                              />
                            </DialogTrigger>
                            <DialogContainer>
                              <DialogContent>
                                <img
                                  src={event.poster.url}
                                  loading="lazy"
                                  className={`md:w-[400px]`}
                                />
                              </DialogContent>
                            </DialogContainer>
                          </Dialog>
                        </div>
                      ))}
                    </BlurFade>
                  ) : (
                    <BlurFade delay={0.25 & 2.75} inView>
                      <Carousel
                        data={[
                          {
                            ...events.schedule.poster,
                          },
                          ...events.events.map((event) => ({
                            ...event.poster,
                          })),
                        ]}
                      />
                    </BlurFade>
                  )}
                </>
              )}
            </Await>
          </Suspense>
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
