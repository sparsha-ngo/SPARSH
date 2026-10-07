"use client";

import { useState } from "react";

export default function Accordion({ items, defaultOpenId, idPrefix = "acc" }) {
  const [openId, setOpenId] = useState(
    defaultOpenId ?? (items.length > 0 ? items[0].id : null),
  );

  return (
    <div className="divide-y divide-brand-pale/80 overflow-hidden rounded-2xl border border-brand-pale/80 bg-white">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${idPrefix}-${item.id}`;
        return (
          <div key={item.id}>
            <h4>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className={`flex w-full items-start justify-between gap-4 px-5 py-4 text-left font-display text-sm font-bold tracking-wide transition-colors sm:px-6 ${
                  open
                    ? "bg-brand-mist text-brand-dark"
                    : "text-slate-600 hover:bg-brand-mist/70 hover:text-brand-dark"
                }`}
              >
                <span>{item.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`mt-0.5 h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </h4>
            <div
              id={panelId}
              role="region"
              aria-label={item.label}
              hidden={!open}
              className="bg-white px-5 pb-6 pt-4 sm:px-6"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
