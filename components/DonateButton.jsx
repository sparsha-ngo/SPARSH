"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";

export default function DonateButton({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    // Lock the page behind the dialog, padding out the scrollbar so the layout
    // does not jump sideways on desktop when it disappears.
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={className}
      >
        {site.donateLabel}
      </button>

      {/* The header sets backdrop-blur, which makes it the containing block for
          `fixed` descendants and would trap the overlay inside the header box.
          Portalling to <body> keeps the dialog anchored to the viewport. */}
      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-brand-deep/80 p-4 backdrop-blur-sm sm:items-center"
              onClick={close}
              role="presentation"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={site.donateLabel}
                onClick={(event) => event.stopPropagation()}
                className="my-auto w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_40px_80px_-40px_rgba(3,4,94,0.9)] sm:max-w-md sm:p-7 lg:max-w-[30rem]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-bold tracking-wide text-brand-deep">
                    {site.donateLabel}
                  </h2>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-pale text-brand-deep transition-colors hover:bg-brand-mist"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12" />
                      <path d="M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/donate-qr.png"
                  alt=""
                  width={1104}
                  height={1104}
                  className="mx-auto mt-5 block aspect-square w-full max-w-[18rem] rounded-2xl ring-1 ring-brand-pale/80 sm:max-w-[21rem] lg:max-w-[24rem]"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
