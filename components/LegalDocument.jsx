import { Blocks } from "@/components/Blocks";

export default function LegalDocument({ document }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep via-brand-dark to-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            {document.title}
          </h1>
          {document.intro ? (
            <p className="mt-6 max-w-3xl border-l-2 border-brand-light/70 pl-4 text-sm italic leading-relaxed text-white/85 sm:text-base">
              {document.intro}
            </p>
          ) : null}
        </div>
      </section>

      <nav
        aria-label="Sections"
        className="border-b border-brand-pale/80 bg-white/80 backdrop-blur lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto px-5 py-3">
          {document.sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#section-${section.id}`}
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-brand-pale bg-white px-3 font-display text-xs font-bold text-brand-dark"
              >
                {section.id}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          <nav aria-label="Sections" className="hidden lg:block">
            <div className="sticky top-28 max-h-[70vh] overflow-y-auto rounded-3xl border border-brand-pale/80 bg-white p-5">
              <ol className="space-y-1 text-sm">
                {document.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#section-${section.id}`}
                      className="flex gap-2 rounded-xl px-3 py-2 leading-snug text-slate-600 transition-colors hover:bg-brand-mist hover:text-brand-dark"
                    >
                      <span className="font-display text-xs font-bold text-brand">
                        {section.id}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="mt-10 space-y-8 lg:mt-0">
            {document.sections.map((section) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className="scroll-mt-28 rounded-3xl border border-brand-pale/80 bg-white p-6 shadow-[0_24px_50px_-46px_rgba(3,4,94,0.7)] sm:p-8"
              >
                <header className="flex items-start gap-4">
                  <span className="inline-flex h-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark px-3 font-display text-sm font-bold text-white">
                    {section.id}
                  </span>
                  <h2 className="pt-2 font-display text-lg font-bold tracking-wide text-brand-deep sm:text-xl">
                    {section.heading}
                  </h2>
                </header>
                <div className="mt-6">
                  <Blocks blocks={section.blocks} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
