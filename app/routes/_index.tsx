import type { MetaFunction } from "@remix-run/node";

import { Fragment, useState } from "react";
import { Link } from "@remix-run/react";

import { nanoid } from "nanoid";
import { AlignRight } from "lucide-react";

import { useMediaQuery } from "~/hooks/useMediaQuery";

import Carousel from "~/components/Carousel";

export const meta: MetaFunction = () => {
  return [
    { title: "RCN Canada" },
    {
      name: "description",
      content: "Welcome to Remnant Christian Network Canada!",
    },
  ];
};

function placeFooterContent(content: (typeof connectWithUs)[number]) {
  if (content.channel === "location")
    return "col-start-1 row-start-1 md:row-start-2 col-span-2 md:col-span-3";

  if (content.channel === "phone")
    return "col-start-3 md:col-start-6 row-start-1 col-span-2 md:col-span-3 justify-self-end";

  if (content.channel === "socials")
    return "col-start-1 md:col-start-5 row-start-2 col-span-1 md:col-span-2";

  if (content.channel === "email")
    return "col-start-1 row-start-3 md:row-start-1 col-span-8";

  return "";
}

export default function Index() {
  const isBigScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <header className="w-full min-h-screen min-h-[100dvh] lg:min-h-[95vh] lg:min-h-[95dvh] lg:max-h-[99vh] p-3 grid grid-cols-1 grid-rows-[90%_10%] md:grid-rows-[auto] gap-y-3 md:gap-0">
        <div className="relative lg:max-h-[95vh] lg:max-h-[95dvh] col-start-1 col-span-1 row-start-1 row-span-1 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-t before:from-brand before:via-brand/80 before:via-70% before:to-brand/50 ">
          <video
            className="block w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/pastor_ola_at_iec_2024.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <nav className="mt-6 2xl:mt-10 px-3 md:px-10 container h-fit col-start-1 col-span-1 row-start-1 z-10 flex items-start justify-between">
          <img
            className="h-16"
            aria-label="logo"
            src="/img/whitercnlogo.png"
            alt="remnant christian network canada logo"
          />
          <AlignRight size={32} className="lg:hidden text-site" />
          <div className="hidden lg:flex gap-10 uppercase text-site">
            <Link to="#about">About us</Link>
            <Link to="#events">Upcoming events</Link>
            <Link to="#connect">Connect with us</Link>
          </div>
        </nav>
        <footer className="md:px-10 md:pb-4 lg:pb-0 container col-start-1 apply-row-span z-10 flex md:items-end md:justify-between text-site">
          <div className="grid grid-rows-[70%_20%_10%] md:grid-rows-2 lg:grid-rows-[auto] lg:grid-cols-8 xl:grid-cols-12 md:gap-5">
            <div className="md:hidden relative top-6 px-3 h-[288px] grid grid-cols-4 self-end gap-x-5 text-8xl -tracking-[1.5px]">
              <span className="block col-start-1 col-span-4 self-end">
                REVEA
              </span>
              <span className="block col-start-1 col-span-4 row-start-2 justify-self-end">
                LING
              </span>
              <span className="block">JESUS</span>
            </div>
            <div className="row-span-2 relative hidden md:flex lg:hidden justify-between items-end">
              <h1 className="w-fit uppercase font-medium text-[120px] leading-[120px] -tracking-[1.5px] text-site">
                REVEA-
                <br />
                LING
                <br />
                JESUS
              </h1>
              <span className="relative bottom-6 text-[24px] text-balance leading-[32px]">
                Join us every Tuesday at 7pm at 92 Ottawa st N., <br />
                Hamilton ON <br /> L8H 3Z1
              </span>
            </div>
            <h1 className="hidden lg:block mb-2 uppercase font-medium text-site text-[96px] xl:text-[120px] 2xl:text-[144px] leading-[104px] xl:leading-[120px] 2xl:leading-[144px] -tracking-[1.5px]">
              Revealing <br /> Jesus
            </h1>
            <span className="md:hidden lg:block relative -top-8 lg:top-0 lg:max-w-[340px] row-start-2 lg:row-start-1 lg:row-end-2 lg:col-start-3 xl:col-start-5 lg:col-span-4 lg:ml-16 xl:ml-0 2xl:-ml-10 lg:mb-7 2xl:mb-10 px-3 md:px-0 self-end text-[24px] text-balance leading-[32px]">
              Join us every Tuesday at 7pm at 92 Ottawa st N., <br />
              Hamilton ON L8H 3Z1
            </span>

            <div className="relative lg:bottom-9 2xl:bottom-11 h-[243px] md:max-h-48 lg:max-h-[216px] lg:max-w-[418px] lg:justify-self-end xl:self-end lg:col-start-6 xl:col-start-9 lg:col-span-3 xl:col-span-4 row-start-3 lg:row-start-1 bg-brand/10 md:bg-[#ede9d0]/10 backdrop-blur-xl px-6 py-4 mt-2 md:mt-0 rounded-[40px] flex flex-col justify-between">
              <span className="font-bold text-2xl leading-[30px] text-balance text-text md:text-site">
                Register for the upcoming conference with Apostle Arome Osayi on
                November 8th & 9th
              </span>
              <div className="w-full flex justify-between items-center">
                <small className="font-bold text-base text-text md:text-site">
                  *Free registration
                </small>
                <Link
                  to="/"
                  className="bg-[#fff] w-[152px] h-12 flex items-center justify-center uppercase font-bold text-text rounded-full"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </header>

      <section
        id="about"
        className="container px-3 md:px-10 mt-[calc(6rem+169px)] md:mt-40 lg:grid lg:grid-cols-8 xl:grid-cols-12 lg:gap-5"
      >
        <p className="2xl:max-w-5xl 2xl:justify-self-end lg:col-start-4 xl:col-start-4 2xl:col-start-5 lg:col-span-5 xl:col-span-9 font-normal text-text text-balance text-[40px] md:text-[64px] xl:text-[72px] leading-[52px] md:leading-[72px] xl:leading-[90px] -tracking-[1.5px]">
          We are a ministry with a single minded focus on restoring the prayer
          commission of the church in fulfillment of Jesus' proclamation in
          Matthew 21:13 that, My house shall be called the house of prayer
        </p>
      </section>

      <section
        id="events"
        className="mt-[120px] md:mt-[240px] lg:container lg:px-10 space-y-6 md:space-y-24 2xl:space-y-[120px]"
      >
        <h3 className="container lg:max-w-full px-3 md:px-10 lg:px-0 uppercase font-bold text-[56px] md:text-8xl lg:text-[120px] 2xl:text-[150px] leading-[64px] md:leading-[104px] lg:leading-[160px] text-[transparent] text-balance -tracking-[1.5px] [-webkit-text-stroke:1px_#0e0907] md:[-webkit-text-stroke:2px_#0E0907]">
          Upcoming events
        </h3>
        {isBigScreen ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(480px,1fr))] gap-11 items-center">
            {events.map((event, i) => (
              <div
                key={nanoid()}
                className={`${
                  event.isMainEvent ? "lg:col-start-2 lg:row-start-1" : ""
                } flex justify-center`}
              >
                <img
                  src={event.asset}
                  className={`${
                    !event.isMainEvent
                      ? "lg:max-w-[344px] xl:max-w-[360px] 2xl:max-w-[480px]"
                      : "lg:max-w-[400px] xl:max-w-[420px] 2xl:max-w-[600px]"
                  } drop-shadow-md`}
                />
              </div>
            ))}
          </div>
        ) : (
          <Carousel />
        )}
      </section>

      <footer
        id="connect"
        className="mt-[12rem] md:mt-60 lg:mt-[19rem] bg-brand"
      >
        <div className="container px-3 md:px-10 pt-10 2xl:pt-14 pb-4 space-y-[7.5rem]">
          <section className="space-y-5 md:space-y-16">
            <h3 className="font-bold text-[40px] md:text-[4rem] lg:text-7xl leading-[3.25rem] md:leading-[4.5rem] lg:leading-[5rem] text-site text-balance">
              Get in touch with us
            </h3>

            <div className="w-full grid grid-cols-4 md:grid-cols-8 gap-5 lg:flex lg:justify-between lg:items-start">
              {connectWithUs.map((c) => (
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
                            {c.data["vicinity"]},
                          </span>
                          <span className="font-normal md:text-2xl text-balance leading-[30px]">
                            {c.data["postalCode"]}
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

          <footer className="lg:pt-8 w-full grid grid-cols-4 lg:grid-cols-8 gap-5">
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
          </footer>
        </div>
      </footer>
    </>
  );
}

const connectWithUs = [
  {
    channel: "location",
    title: "on site",
    data: {
      street: "92 Ottawa St N.",
      vicinity: "Hamilton ON",
      postalCode: "L8H 3Z1",
    },
  },
  {
    channel: "phone",
    title: "on a call",
    data: ["+1 647 896 2347", "+1 647 773 0670"],
  },
  {
    channel: "socials",
    title: "online",
    data: [
      {
        site: "facebook",
        url: "https://www.facebook.com/rcncanada",
      },
      {
        site: "youtube",
        url: "https://www.youtube.com/@rcncanada",
      },
      {
        site: "twitter",
        url: "https://x.com/rcncanada",
      },
    ],
  },
  {
    channel: "email",
    title: "by email",
    data: ["info@remnantchristiancanada.com"],
  },
] as const;

const events = [
  {
    isMainEvent: false,
    asset: "/img/poster-endued-with-power.jpg",
  },
  {
    isMainEvent: false,
    asset: "/img/poster-monthly-friday-vigil.jpg",
  },
  {
    isMainEvent: true,
    asset: "/img/poster-understanding-spiritual-things.jpg",
  },
  {
    isMainEvent: false,
    asset: "/img/poster-tabernacle-of-david.jpg",
  },
  {
    isMainEvent: false,
    asset: "/img/poster-tuesday-weekly-service.jpg",
  },
] as const;
