import Accordion from "@/components/Accordion";
import SectionHeading from "@/components/SectionHeading";
import { about, aimsAndObjects, getInvolved, hero, whatWeDo } from "@/data/home";
import { annualReports } from "@/data/reports";
import { site } from "@/data/site";

export const metadata = {
  title: "SPARSHA",
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep via-brand-dark to-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-light/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
          <h1 className="font-display text-5xl font-extrabold tracking-[0.28em] sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-3xl font-display text-base font-semibold uppercase tracking-[0.16em] text-cyan-100 sm:text-lg">
            {hero.subtitle}
          </p>
          <p className="mt-8 max-w-3xl border-l-2 border-brand-light/70 pl-5 text-base italic leading-relaxed text-white/85 sm:text-lg">
            {hero.statement}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading title={aimsAndObjects.title} />

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {aimsAndObjects.items.map((item) => (
            <li
              key={item.number}
              className="group relative flex flex-col gap-4 rounded-3xl border border-brand-pale/80 bg-white p-6 shadow-[0_20px_40px_-34px_rgba(3,4,94,0.6)] transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark font-display text-sm font-bold text-white">
                {item.number}
                <span aria-hidden="true">.</span>
              </span>
              <p className="text-sm leading-relaxed text-slate-700">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Accordion
            idPrefix="home-more"
            items={[
              {
                id: "more",
                label: aimsAndObjects.more.label,
                content: (
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {aimsAndObjects.more.items.map((item) => (
                      <li
                        key={item.number}
                        className="flex gap-4 rounded-2xl border border-brand-pale/70 bg-brand-mist/60 p-5"
                      >
                        <span className="font-display text-sm font-bold text-brand">
                          {item.number}.
                        </span>
                        <span className="text-sm leading-relaxed text-slate-700">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading id={whatWeDo.id} title={whatWeDo.title} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {whatWeDo.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="rounded-3xl border border-brand-pale/80 bg-brand-mist/60 p-6 leading-relaxed text-slate-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading id={annualReports.id} title={annualReports.title} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {annualReports.items.map((item) => (
            <li
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-brand-pale/80 bg-white shadow-[0_24px_50px_-46px_rgba(3,4,94,0.7)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex aspect-[3/4] items-center justify-center bg-brand-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.cover}
                  alt={`${item.title} cover`}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <p className="px-5 py-4 font-display text-sm font-bold tracking-wide text-brand-deep">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id={getInvolved.id}
        className="scroll-mt-24 bg-gradient-to-br from-brand-dark via-brand to-brand-light"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading tone="light" title={getInvolved.title} />
          <p className="mt-8 max-w-3xl leading-relaxed text-white/90">
            {getInvolved.intro}
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/90">
            {getInvolved.joining}
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {getInvolved.ways.map((way) => (
              <li
                key={way}
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2 font-display text-sm font-semibold tracking-wide text-white backdrop-blur"
              >
                {way}
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-2xl rounded-3xl bg-white p-7 shadow-[0_30px_60px_-40px_rgba(3,4,94,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              {getInvolved.contactPrompt}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block break-all font-display text-xl font-bold text-brand-deep transition-colors hover:text-brand sm:text-2xl"
            >
              {site.email}
            </a>
            <p className="mt-5 leading-relaxed text-slate-600">
              {getInvolved.closing}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading id={about.id} title={about.title} />
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-6 max-w-3xl leading-relaxed text-slate-700">
            {paragraph}
          </p>
        ))}
      </section>
    </>
  );
}
