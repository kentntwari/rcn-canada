import type { ContactQueryType } from "~/sanity";

import { useEffect, useRef } from "react";

import { nanoid } from "nanoid";
import { useAtom } from "jotai";
import { Link } from "@remix-run/react";

import { useElementVisibility } from "@reactuses/core";

import BlurFade from "./animation/BlurFade";

import { isFooterVisible } from "~/utils/atoms";

function placeFooterContent(content: ContactQueryType[number]) {
  if (content.channel === "location")
    return "col-start-1 row-start-1 col-span-2";

  if (content.channel === "phone") return "col-start-3 col-span-2";

  if (content.channel === "socials")
    return "col-start-1 lg:col-start-5 col-span-2";

  if (content.channel === "email") return "lg:col-start-7 col-span-2";

  return "";
}

export default function Footer({ data }: { data: ContactQueryType }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, stop] = useElementVisibility(ref);

  const [value, setValue] = useAtom(isFooterVisible);

  useEffect(() => {
    if (visible) setValue(true);
    else setValue(false);
  }, [visible]);

  return (
    <footer id="connect" className="mt-[12rem] md:mt-60 lg:mt-[19rem] bg-brand">
      <BlurFade
        delay={0.25}
        className="container px-3 md:px-10 pt-10 2xl:pt-14 pb-4 space-y-8 md:space-y-[7.5rem]"
        inView
      >
        <section className="space-y-5 md:space-y-16">
          <h2 className="font-bold text-[40px] md:text-[4rem] lg:text-7xl leading-[3.25rem] md:leading-[4.5rem] lg:leading-[5rem] text-site text-balance">
            Get in touch with us
          </h2>

          <div className="w-full flex flex-col md:grid md:grid-cols-4 lg:grid-cols-8 lg:justify-between lg:items-start gap-8">
            {data.map((c) => (
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
                  <div className="flex flex-col gap-2">
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
          className="lg:pt-8 w-full grid grid-cols-4 lg:grid-cols-8 gap-10 lg:gap-5"
          inView
        >
          <Link
            to="/"
            className="block col-start-1 col-span-4 md:row-start-1 lg:mx-0 md:mx-auto mt-5"
          >
            <img
              className="max-h-[120px] md:h-16"
              aria-label="logo"
              src="/img/whitercnlogo.png"
              alt="remnant christian network canada logo"
            />
          </Link>
          <small className="block mt-5 col-start-1 lg:col-start-2 col-span-4 row-start-3 lg:row-start-1 justify-self-center lg:justify-self-start lg:self-end font-normal text-xs text-site">
            Copyright 2024. Remnant Christian Network Canada
          </small>
          <div
            ref={ref}
            className="col-start-1 lg:col-start-4 col-span-4 lg:col-span-5 md:row-start-2 lg:row-start-1 flex flex-wrap justify-between md:justify-center items-end gap-6 md:gap-10 *:uppercase *:text-sm"
          >
            <Link to="#about" className="font-normal text-site">
              About us
            </Link>
            <Link to="#events" className="font-normal text-site">
              Our events
            </Link>
            <Link to="#events" className="font-normal text-site">
              Giving
            </Link>
            <Link to="#events" className="font-normal text-site">
              First-timers
            </Link>
            <Link to="#events" className="font-normal text-site">
              Partners
            </Link>
            <Link to="#connect" className="font-regular text-site">
              Contact us
            </Link>
          </div>
        </BlurFade>
      </BlurFade>
    </footer>
  );
}
