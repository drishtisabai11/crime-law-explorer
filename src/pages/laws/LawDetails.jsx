import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  Scale,
} from "lucide-react";
import laws from "../../data/laws";

function LawDetails() {
  const id = window.location.pathname.split("/").pop();
const law = laws.find((item) => item.id === Number(id));


  if (!law) {
    return (
      <main className="min-h-[70vh] bg-[var(--paper)] px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">404</p>

          <h1 className="font-display text-5xl">
            Law not found.
          </h1>

          <Link
            to="/laws"
            className="mt-8 inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3 text-xs uppercase tracking-[0.12em] transition-colors hover:bg-[var(--ink)] hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to laws
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">
      {/* Hero */}
      <section className="border-b border-[var(--line)] px-6 pb-16 pt-12 md:px-10 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/laws"
            className="mb-14 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--burgundy)]"
          >
            <ArrowLeft size={15} />
            Legal library
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="border border-[var(--burgundy)] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[var(--burgundy)]">
                  {law.section}
                </span>

                <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                  {law.category}
                </span>
              </div>

              <h1 className="font-display max-w-4xl text-6xl leading-[0.92] tracking-[-0.035em] md:text-8xl">
                {law.title}
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
                {law.description}
              </p>
            </div>

            <div className="border-l border-[var(--line)] pl-6 lg:pb-2">
              <p className="eyebrow mb-4">At a glance</p>

              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--taupe)]">
                    Jurisdiction
                  </p>
                  <p className="mt-1 text-sm">{law.jurisdiction}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--taupe)]">
                    Punishment
                  </p>
                  <p className="mt-1 text-sm leading-6">
                    {law.punishment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 py-14 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_300px]">
          <article>
            <div className="mb-14">
              <p className="eyebrow mb-4">01 — Overview</p>

              <h2 className="font-display text-4xl md:text-5xl">
                Understanding the provision
              </h2>

              <div className="mt-7 max-w-3xl space-y-5 text-[15px] leading-7 text-[var(--muted)]">
                <p>
                  This section provides an educational overview of the legal
                  provision, its general purpose, and the type of conduct it
                  addresses.
                </p>

                <p>
                  The exact application of a criminal provision depends on the
                  facts of a particular matter, applicable legislation,
                  judicial interpretation, and procedural circumstances.
                </p>
              </div>
            </div>

            <div className="mb-14 border-y border-[var(--line)] py-10">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--cream)]">
                  <Scale size={20} className="text-[var(--burgundy)]" />
                </div>

                <div>
                  <p className="eyebrow mb-2">Legal principle</p>

                  <p className="font-display text-2xl leading-snug md:text-3xl">
                    Criminal liability generally depends on the specific
                    elements of the offence being established.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-14">
              <p className="eyebrow mb-4">02 — Key elements</p>

              <h2 className="font-display text-4xl md:text-5xl">
                What to understand
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  "Nature of the prohibited conduct",
                  "Required mental element",
                  "Relevant circumstances",
                  "Available legal exceptions",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="border border-[var(--line)] bg-[var(--cream)] p-6"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-xs text-[var(--burgundy)]">
                        0{index + 1}
                      </span>

                      <Check size={16} className="text-[var(--burgundy)]" />
                    </div>

                    <p className="text-sm leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-14">
              <p className="eyebrow mb-4">03 — Punishment</p>

              <h2 className="font-display text-4xl md:text-5xl">
                Potential consequences
              </h2>

              <div className="mt-7 border border-[var(--line)] bg-[var(--charcoal)] p-7 text-white md:p-9">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                  Statutory punishment
                </p>

                <p className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                  {law.punishment}
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60">
                  The actual sentence in a particular case can depend on the
                  applicable law, facts, judicial findings, aggravating or
                  mitigating circumstances, and other relevant factors.
                </p>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4">04 — Further reading</p>

              <h2 className="font-display text-4xl md:text-5xl">
                Sources & context
              </h2>

              <div className="mt-7 space-y-3">
                {[
                  "Relevant statutory provision",
                  "Judicial interpretation",
                  "Procedural context",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-[var(--line)] py-5"
                  >
                    <div className="flex items-center gap-4">
                      <FileText
                        size={18}
                        className="text-[var(--burgundy)]"
                      />

                      <span className="text-sm">{item}</span>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-[var(--muted)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="border border-[var(--line)] bg-[var(--cream)] p-6">
              <BookOpen
                size={21}
                className="mb-7 text-[var(--burgundy)]"
              />

              <p className="eyebrow mb-3">Legal reference</p>

              <h3 className="font-display text-2xl">
                {law.section}
              </h3>

              <div className="mt-6 border-t border-[var(--line)] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--taupe)]">
                  Category
                </p>

                <p className="mt-2 text-sm">{law.category}</p>
              </div>

              <div className="mt-5 border-t border-[var(--line)] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--taupe)]">
                  Keywords
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {law.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="border border-[var(--line)] px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default LawDetails;