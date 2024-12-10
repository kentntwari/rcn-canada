import type { MetaFunction } from "@remix-run/node";
import type { EventsQueryType } from "../sanity";

import { Suspense } from "react";
import { Await } from "@remix-run/react";
import { typeddefer, useTypedLoaderData } from "remix-typedjson";

import { nanoid } from "nanoid";
import { MoveDown } from "lucide-react";
import { IKVideo, IKContext } from "imagekitio-react";

import { client, queries, EVENTS_QUERY_SCHEMA } from "../sanity";

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

  return typeddefer({ events });
}

export default function Index() {
  const isBigScreen = useMediaQuery("(min-width: 1024px)");

  const { events } = useTypedLoaderData<typeof loader>();

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
            delay={0.25 * 2.5}
            className="mb-12 slg:mb-20 px-3 container h-fit col-start-1 col-span-1 row-start-1 self-end flex items-end justify-between"
            inView
          >
            <h1 className="slg:max-w-[860px] lg:max-w-full font-medium text-[40px] md:text-[52px] slg:text-[64px] lg:text-[80px] leading-[52px] md:leading-[60px] slg:leading-[80px] lg:leading-[88px] text-site">
              <span className="inherit hidden slg:block">
                Striving for the rebirth <br /> of apostolic christianity
              </span>
              <span className="inherit slg:hidden text-balance">
                Striving for the rebirth of apostolic christianity
              </span>
            </h1>
            <div className="mb-4 w-12 h-20 bg-[#fff]/40 flex items-center justify-center rounded-full animate-bounce">
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
            <h2 className="col-start-1 col-span-1 lg:col-span-4 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
              Who we are
            </h2>
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
            <h2 className="col-start-1 col-span-1 lg:col-span-4 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
              <span className="inherit hidden lg:block">
                Our <br /> goal
              </span>
              <span className="inherit lg:hidden">Our goal</span>
            </h2>
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
                    <h2 className="col-start-1 col-span-1 lg:col-span-4 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
                      <span className="inherit hidden lg:block">
                        Upcoming <br /> events
                      </span>
                      <span className="block mt-2 inherit lg:hidden">
                        Upcoming events
                      </span>
                    </h2>

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
            <h2 className="mb-6 px-3 lg:px-0 lg:mb-16 uppercase font-bold text-3xl md:text-[64px] lg:text-[96px] md:leading-[80px] lg:leading-[120px] text-[transparent] text-balance lg:-tracking-[1.5px] [-webkit-text-stroke:1px_#0E0907] lg:[-webkit-text-stroke:2px_#0E0907]">
              <span className="inherit hidden lg:block">
                Our <br /> schedule
              </span>
              <span className="inherit lg:hidden">Our schedule</span>
            </h2>
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
      </IKContext>
    </>
  );
}
