import { ComponentPropsWithoutRef, useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";

import { useAtomValue } from "jotai";
import { useElementVisibility } from "@reactuses/core";

import { useMediaQuery } from "~/hooks/useMediaQuery";

import { AlignRight, X } from "lucide-react";

import { cn } from "~/lib/utils";
import { isFooterVisible } from "~/utils/atoms";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "~/components/acertinity/Modal";
import BlurFade from "./animation/BlurFade";

interface NavbarProps extends ComponentPropsWithoutRef<"nav"> {}

export function Navbar({ className }: NavbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, stop] = useElementVisibility(ref);

  const isFooterVisibleValue = useAtomValue(isFooterVisible);
  const isBigScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <nav ref={ref} className={cn("px-3 relative", className)}>
        {!visible ? (
          <FloatingNavbar
            className={`${
              isFooterVisibleValue ? "invisible pointer-events-none" : ""
            } ${isBigScreen ? "flex-col-reverse" : ""}`}
          />
        ) : (
          <BlurFade
            delay={0.25 * 2}
            inView
            className="flex items-start justify-between"
          >
            <DefaultNavbarContent />
          </BlurFade>
        )}
      </nav>
    </>
  );
}

function FloatingNavbar({ className }: ComponentPropsWithoutRef<"div">) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  let mounted = false;

  useEffect(() => {
    mounted = true;
    setMounted(true);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className={cn(
        `fixed w-[350px] lg:bottom-10 left-1/2 right-1/2 -translate-x-1/2 ${
          !isMounted ? "invisible pointer-events-none" : ""
        } flex flex-col gap-2`,
        className
      )}
    >
      <ul className="w-full h-16 px-3 bg-text flex items-center text-site rounded-full justify-between *:uppercase">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={"#about"}>About us</Link>
        </li>
        <li>
          <Give>Give</Give>
        </li>
        <button
          type="button"
          className="mb-2"
          onClick={(prev) => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="text-site" />
          ) : (
            <AlignRight className="text-site" />
          )}
        </button>
      </ul>

      <div
        className={`w-full h-80 slg:h-48 bg-text rounded-lg ${
          !isOpen ? "invisible pointer-events-none" : ""
        } flex flex-col justify-center items-center gap-10 slg:gap-4 uppercase text-site`}
        onClick={() => setIsOpen(false)}
      >
        <Link to="#events">Upcoming events</Link>
        <Link to="#connect">Connect with us</Link>
        <Link to="/">first timers</Link>
        <Link to="/">partnership</Link>
      </div>
    </div>
  );
}

function DefaultNavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  function closeMenu() {
    if (isOpen) setIsOpen(false);
  }
  return (
    <>
      <img
        className="h-16"
        aria-label="logo"
        src="/img/whitercnlogo.png"
        alt="remnant christian network canada logo"
      />
      <button
        aria-label="toggle menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className="slg:hidden text-site"
      >
        {isOpen ? (
          <X size={32} className="text-site" />
        ) : (
          <AlignRight size={32} className="text-site" />
        )}
      </button>

      <div
        className={`absolute left-0 top-20 slg:static py-4 slg:py-0 w-full slg:w-fit bg-site slg:bg-[transparent] ${
          isOpen ? "flex" : "hidden"
        } slg:flex flex-col items-center slg:items-start gap-10 slg:gap-4 uppercase text-text slg:text-site rounded-lg slg:rounded-none`}
      >
        <Link to="#about" onClick={closeMenu}>
          About us
        </Link>
        <Link to="#events" onClick={closeMenu}>
          Upcoming events
        </Link>
        <Give>Ways to give</Give>

        <Link to="#connect" onClick={closeMenu}>
          Connect with us
        </Link>
        <div className="contents" onClick={closeMenu}>
          <Link
            to={{
              pathname: "/",
            }}
            target="_blank"
          >
            First timers
          </Link>
          <Link
            to={{
              pathname: "/",
            }}
            target="_blank"
          >
            Partnership
          </Link>
        </div>
      </div>
    </>
  );
}

interface GiveModalProps extends ComponentPropsWithoutRef<typeof Modal> {}
function Give({ children, ...props }: GiveModalProps) {
  return (
    <Modal>
      <ModalTrigger className="p-0 uppercase">{children}</ModalTrigger>
      <ModalBody>
        <ModalContent className="bg-site space-y-10 text-text overflow-y-auto">
          <h2 className="uppercase font-bold text-4xl">GIVING</h2>
          <div className="space-y-2">
            <span className="block font-bold text-2xl">
              *For Canada residents only
            </span>
            <span className="block text-xl">
              Send an INTERAC e-transfer fron your bank app at{" "}
              <span className="underline font-bold">give@rcncanada.com</span>
            </span>
          </div>
          <div className="space-y-2">
            <span className="block font-bold text-2xl">
              *For US & Other international residents
            </span>
            <span className="block text-xl">
              Send using this{" "}
              <Link
                to={{
                  pathname: "www.paypal.com/paypalme/rcncanada",
                }}
                target="_blank"
                className="text-[#313185] underline"
              >
                paypal link
              </Link>
            </span>
          </div>
          <div className="space-y-2">
            <span className="block font-bold text-2xl">
              *Bank account details
            </span>
            <div className="space-y-2 *:text-xl">
              <span className="block">
                ACCOUNT NAME: REMNANT CHRISTIAN NETWORK CANADA
              </span>

              <span className="block">ACCOUNT NUMBER: 2845717</span>

              <span className="block">BANK CODE: 010</span>

              <span className="block">BRANCH: 01042</span>
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
