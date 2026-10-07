import Link from "next/link";
import { site as siteData } from "@/data/site";

export default function SiteFooter({ site = siteData }) {
  return (
    <footer className="mt-24 bg-gradient-to-br from-brand-deep via-brand-dark to-brand text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Logo.ico"
                alt=""
                className="h-10 w-10 rounded-full bg-white/10 p-0.5 ring-1 ring-white/30"
              />
              <h2 className="font-display text-2xl font-extrabold tracking-[0.22em]">
                {site.name}
              </h2>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {site.documents.map((doc) => (
                <li key={doc.href}>
                  <Link
                    href={doc.href}
                    className="inline-flex items-center gap-2 text-cyan-100/90 transition hover:text-white"
                  >
                    <span aria-hidden="true" className="text-brand-light">
                      &rarr;
                    </span>
                    {doc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-cyan-100/80">
              Registered Address
            </h3>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-white/90">
              {site.registeredOffice.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-cyan-100/80">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition hover:text-white hover:underline"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.phone}</li>
            </ul>
          </div>

        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
          <ul className="flex flex-wrap justify-center gap-2">
            {site.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 transition hover:border-white/60 hover:bg-white/15"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-white/75">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
