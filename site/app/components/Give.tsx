import type { ComponentPropsWithoutRef } from "react";

import { Link } from "@remix-run/react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "~/components/acertinity/Modal";

interface GiveModalProps extends ComponentPropsWithoutRef<typeof Modal> {}
export function Give({ children, ...props }: GiveModalProps) {
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
              Send an INTERAC e-transfer from your bank app at{" "}
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
