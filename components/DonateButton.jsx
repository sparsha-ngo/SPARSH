"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

export default function DonateButton({ className = "" }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
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

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-deep/70 p-4 backdrop-blur-sm"
          onClick={close}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={site.donateLabel}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_40px_80px_-40px_rgba(3,4,94,0.9)]"
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
              width={641}
              height={641}
              className="mt-5 w-full rounded-2xl ring-1 ring-brand-pale/80"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
