import { ArrowRight, BookOpen, FileText, Scale } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="bg-[var(--paper)]">
      {/* Hero */}
      <section className="border-b border-[var(--line)] bg-[var(--charcoal)] px-6 py-20 text-[var(--paper)] md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-6 text-[#b9aea1]">
            About the archive
          </p>

          <h1 className="max-w-5xl font-display text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl lg:text-8xl">
            Understanding crime
            <br />
            <span className="italic text-[#b97879]">
              through the law.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-[#c7c0b6] md:text-lg">
            Crime & Law Explorer is an educational archive designed
            to make criminal cases and the legal principles behind
            them easier to explore, understand and question.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-5 text-[var(--burgundy)]">
              01 / The idea
            </p>

            <h2 className="font-display text-4xl leading-tight text-[var(--ink)] md:text-5xl">
              Cases are more than their verdicts.
            </h2>
          </div>

          <div className="space-y-6 text-sm leading-7 text-[var(--muted)] md:text-base">
            <p>
              Criminal cases involve people, evidence, competing
              arguments, legal provisions and decisions made at
              different stages of the justice process.
            </p>

            <p>
              Crime & Law Explorer brings those elements together
              so that a reader can move beyond headlines and
              understand how a case developed and why particular
              legal questions mattered.
            </p>

            <p>
              The platform is designed for exploration rather than
              replacing professional legal advice. Its purpose is
              to provide accessible context around cases and laws.
            </p>
          </div>
        </div>
      </section>

      {/* Three principles */}
      <section className="border-y border-[var(--line)] bg-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4 text-[var(--burgundy)]">
              02 / Our approach
            </p>

            <h2 className="font-display text-4xl text-[var(--ink)] md:text-5xl">
              Built around context.
            </h2>
          </div>

          <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            <div className="bg-[var(--paper)] p-8 md:p-10">
              <FileText
                size={25}
                strokeWidth={1.3}
                className="mb-8 text-[var(--burgundy)]"
              />

              <p className="eyebrow mb-4 text-[var(--muted)]">
                01
              </p>

              <h3 className="font-display text-2xl text-[var(--ink)]">
                Follow the record
              </h3>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Understand a case through its events, evidence,
                proceedings and outcome rather than a single
                headline.
              </p>
            </div>

            <div className="bg-[var(--paper)] p-8 md:p-10">
              <Scale
                size={25}
                strokeWidth={1.3}
                className="mb-8 text-[var(--burgundy)]"
              />

              <p className="eyebrow mb-4 text-[var(--muted)]">
                02
              </p>

              <h3 className="font-display text-2xl text-[var(--ink)]">
                Connect law to cases
              </h3>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Legal provisions become easier to understand when
                they are considered alongside the cases and
                questions in which they arise.
              </p>
            </div>

            <div className="bg-[var(--paper)] p-8 md:p-10">
              <BookOpen
                size={25}
                strokeWidth={1.3}
                className="mb-8 text-[var(--burgundy)]"
              />

              <p className="eyebrow mb-4 text-[var(--muted)]">
                03
              </p>

              <h3 className="font-display text-2xl text-[var(--ink)]">
                Learn through exploration
              </h3>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Search the archive, examine legal concepts and
                test your understanding through interactive
                challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-5 text-[var(--burgundy)]">
              03 / Methodology
            </p>

            <h2 className="font-display text-4xl leading-tight text-[var(--ink)] md:text-5xl">
              A structured way to read a case.
            </h2>
          </div>

          <div className="space-y-0 border-t border-[var(--line)]">
            {[
              [
                "01",
                "Case background",
                "Establish the people, circumstances and events surrounding the case.",
              ],
              [
                "02",
                "Timeline",
                "Follow the important events from the incident through the legal process.",
              ],
              [
                "03",
                "Evidence",
                "Identify the evidence and understand how it relates to the central questions.",
              ],
              [
                "04",
                "Applicable law",
                "Explore the legal provisions connected with the issues raised by the case.",
              ],
              [
                "05",
                "Proceedings & verdict",
                "Understand the arguments, decisions and final outcome.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="grid gap-4 border-b border-[var(--line)] py-6 sm:grid-cols-[70px_180px_1fr]"
              >
                <span className="text-xs text-[var(--burgundy)]">
                  {number}
                </span>

                <h3 className="font-display text-xl text-[var(--ink)]">
                  {title}
                </h3>

                <p className="text-sm leading-6 text-[var(--muted)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="border-y border-[var(--line)] bg-[var(--charcoal)] px-6 py-16 text-[var(--paper)] md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow mb-5 text-[#b9aea1]">
                04 / Sources
              </p>

              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Research should be traceable.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-[#c7c0b6] md:text-base">
                Case information and legal explanations should be
                understood in relation to reliable legal records,
                legislation, judicial decisions and other
                appropriate sources.
              </p>

              <div className="mt-8 border-l-2 border-[#b97879] pl-5">
                <p className="text-sm leading-7 text-[#c7c0b6]">
                  Where sources are provided, readers should consult
                  the underlying material for the complete legal
                  context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="border border-[var(--line)] bg-[var(--cream)] p-7 md:p-10">
          <p className="eyebrow mb-4 text-[var(--burgundy)]">
            Educational disclaimer
          </p>

          <h2 className="font-display text-3xl text-[var(--ink)]">
            Information, not legal advice.
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Crime & Law Explorer is intended for educational and
            informational purposes. The material presented on the
            platform should not be treated as legal advice or as a
            substitute for advice from a qualified legal
            professional.
          </p>
        </div>

        <div className="mt-10">
          <Link
            to="/cases"
            className="group inline-flex items-center gap-3 bg-[var(--burgundy)] px-6 py-3.5 text-sm text-white transition hover:bg-[var(--burgundy-dark)]"
          >
            Explore the cases
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;