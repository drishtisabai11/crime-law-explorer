import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  FileText,
  Gavel,
  MapPin,
  Scale,
  Share2,
  Users,
} from "lucide-react";

import { caseDetails } from "../../data/caseDetails";
import { useAuth } from "../../context/AuthContext";
import {
  getSavedCases,
  saveCase,
  removeSavedCase,
} from "../../services/api";

function CaseDetails() {
  const { isAuthenticated } = useAuth();

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  /*
   * Static case data
   * S15 dynamic MongoDB case loading has been removed.
   */
  const id = window.location.pathname.split("/").pop();
  const caseItem = caseDetails[id] || caseDetails[1];

  /*
   * Load saved state from the real archive backend.
   * This is still part of S11/S13 and should NOT be removed.
   */
  useEffect(() => {
    const loadSavedState = async () => {
      const token = localStorage.getItem("token");

      if (!token || !caseItem) {
        setSaved(false);
        return;
      }

      try {
        const data = await getSavedCases(token);

        const isCaseSaved = (data.savedCases || []).some(
          (savedCase) =>
            Number(savedCase.caseId) === Number(caseItem.id)
        );

        setSaved(isCaseSaved);
      } catch (error) {
        console.error(
          "Failed to load saved case state:",
          error
        );
      }
    };

    loadSavedState();
  }, [caseItem]);

  /*
   * Save / unsave case
   */
  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    const token = localStorage.getItem("token");

    if (!token || !caseItem) {
      return;
    }

    try {
      setSaving(true);

      if (saved) {
        await removeSavedCase(token, caseItem.id);
        setSaved(false);
      } else {
        await saveCase(token, caseItem.id);
        setSaved(true);
      }
    } catch (error) {
      console.error(
        "Failed to update saved case:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Share case
   */
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  if (!caseItem) {
    return (
      <main className="min-h-[70vh] bg-[var(--paper)] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-[var(--burgundy)]">
            Case not found
          </p>

          <h1 className="mt-4 font-display text-4xl text-[var(--ink)]">
            This case could not be found.
          </h1>

          <Link
            to="/cases"
            className="mt-8 inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            <ArrowLeft size={16} />
            Back to cases
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-16">

          <Link
            to="/cases"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--burgundy)]"
          >
            <ArrowLeft size={16} />
            Back to Explore Cases
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-end">

            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {caseItem.category && (
                  <span className="eyebrow text-[var(--burgundy)]">
                    {caseItem.category}
                  </span>
                )}

                {caseItem.year && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[var(--taupe)]" />
                    <span className="text-sm text-[var(--muted)]">
                      {caseItem.year}
                    </span>
                  </>
                )}
              </div>

              <h1 className="max-w-5xl font-display text-5xl leading-[0.98] tracking-[-0.035em] text-[var(--ink)] sm:text-6xl lg:text-8xl">
                {caseItem.title}
              </h1>

              {caseItem.subtitle && (
                <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                  {caseItem.subtitle}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {caseItem.location && (
                  <span className="inline-flex items-center gap-2 border border-[var(--line)] bg-[var(--cream)] px-4 py-2 text-sm text-[var(--muted)]">
                    <MapPin size={15} />
                    {caseItem.location}
                  </span>
                )}

                {caseItem.court && (
                  <span className="inline-flex items-center gap-2 border border-[var(--line)] bg-[var(--cream)] px-4 py-2 text-sm text-[var(--muted)]">
                    <Gavel size={15} />
                    {caseItem.court}
                  </span>
                )}
              </div>
            </div>

            <div className="border-l border-[var(--line)] pl-6 lg:pl-8">

              <p className="eyebrow text-[var(--muted)]">
                Case reference
              </p>

              <p className="mt-3 font-display text-3xl text-[var(--ink)]">
                {caseItem.caseNumber || `CASE-${caseItem.id}`}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={handleSaveToggle}
                  disabled={saving}
                  className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition ${
                    saved
                      ? "border-[var(--burgundy)] bg-[var(--burgundy)] text-white"
                      : "border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                  }`}
                >
                  {saved ? (
                    <Check size={16} />
                  ) : (
                    <Bookmark size={16} />
                  )}

                  {saving
                    ? "Saving..."
                    : saved
                    ? "Saved"
                    : "Save Case"}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 border border-[var(--line)] px-4 py-2.5 text-sm text-[var(--ink)] transition hover:border-[var(--ink)]"
                >
                  {copied ? (
                    <Check size={16} />
                  ) : (
                    <Share2 size={16} />
                  )}

                  {copied ? "Copied" : "Share"}
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ===================================================== */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

          <div>
            <p className="eyebrow text-[var(--burgundy)]">
              01 — Overview
            </p>
          </div>

          <div className="max-w-4xl">
            {caseItem.overview && (
              <p className="font-display text-3xl leading-tight text-[var(--ink)] md:text-4xl">
                {caseItem.overview}
              </p>
            )}

            {caseItem.summary && (
              <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--muted)]">
                {caseItem.summary}
              </p>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {caseItem.date && (
                <div className="border-t border-[var(--line)] pt-4">
                  <Clock3
                    size={18}
                    className="text-[var(--burgundy)]"
                  />
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    Date
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink)]">
                    {caseItem.date}
                  </p>
                </div>
              )}

              {caseItem.location && (
                <div className="border-t border-[var(--line)] pt-4">
                  <MapPin
                    size={18}
                    className="text-[var(--burgundy)]"
                  />
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink)]">
                    {caseItem.location}
                  </p>
                </div>
              )}

              {caseItem.court && (
                <div className="border-t border-[var(--line)] pt-4">
                  <Scale
                    size={18}
                    className="text-[var(--burgundy)]"
                  />
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    Court
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink)]">
                    {caseItem.court}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PEOPLE
      ===================================================== */}
      {caseItem.people && caseItem.people.length > 0 && (
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                02 — People
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {caseItem.people.map((person, index) => (
                <div
                  key={`${person.name || "person"}-${index}`}
                  className="border border-[var(--line)] bg-[var(--cream)] p-6 transition hover:border-[var(--burgundy)]"
                >
                  <Users
                    size={20}
                    className="text-[var(--burgundy)]"
                  />

                  <p className="mt-5 font-display text-2xl text-[var(--ink)]">
                    {person.name}
                  </p>

                  {person.role && (
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {person.role}
                    </p>
                  )}

                  {person.description && (
                    <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                      {person.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          TIMELINE
      ===================================================== */}
      {caseItem.timeline && caseItem.timeline.length > 0 && (
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                03 — Timeline
              </p>
            </div>

            <div className="max-w-4xl">

              {caseItem.timeline.map((event, index) => (
                <div
                  key={`${event.date || "event"}-${index}`}
                  className="relative grid gap-5 border-l border-[var(--line)] pb-10 pl-7 last:pb-0 md:grid-cols-[150px_1fr]"
                >
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[var(--burgundy)]" />

                  <div>
                    <p className="text-sm font-medium text-[var(--burgundy)]">
                      {event.date}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-[var(--ink)]">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          EVIDENCE
      ===================================================== */}
      {caseItem.evidence && caseItem.evidence.length > 0 && (
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                04 — Evidence
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {caseItem.evidence.map((item, index) => (
                <div
                  key={`${item.title || "evidence"}-${index}`}
                  className="border border-[var(--line)] p-6"
                >
                  <FileText
                    size={20}
                    className="text-[var(--burgundy)]"
                  />

                  <h3 className="mt-5 font-display text-2xl text-[var(--ink)]">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          APPLICABLE LAW / CHARGES
      ===================================================== */}
      {(caseItem.charges || caseItem.applicableLaw) && (
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                05 — Applicable Law
              </p>
            </div>

            <div className="max-w-4xl">

              {caseItem.charges && (
                <div>
                  <h2 className="font-display text-3xl text-[var(--ink)]">
                    Charges
                  </h2>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {caseItem.charges.map((charge, index) => (
                      <span
                        key={`${charge}-${index}`}
                        className="border border-[var(--line)] bg-[var(--cream)] px-4 py-3 text-sm text-[var(--ink)]"
                      >
                        {charge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {caseItem.applicableLaw && (
                <div className="mt-10 border-t border-[var(--line)] pt-8">
                  <h2 className="font-display text-3xl text-[var(--ink)]">
                    Applicable law
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                    {caseItem.applicableLaw}
                  </p>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          COURT PROCEEDINGS
      ===================================================== */}
      {caseItem.proceedings && (
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                06 — Proceedings
              </p>
            </div>

            <div className="max-w-4xl">
              <p className="text-base leading-8 text-[var(--muted)]">
                {caseItem.proceedings}
              </p>
            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          VERDICT
      ===================================================== */}
      {caseItem.verdict && (
        <section className="border-b border-[var(--line)] bg-[var(--charcoal)] text-[var(--paper)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                07 — Verdict
              </p>
            </div>

            <div className="max-w-4xl">

              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                {caseItem.verdict.title ||
                  caseItem.verdict}
              </h2>

              {caseItem.verdict.description && (
                <p className="mt-7 text-base leading-8 text-[var(--paper)]/70">
                  {caseItem.verdict.description}
                </p>
              )}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          SOURCES
      ===================================================== */}
      {caseItem.sources && caseItem.sources.length > 0 && (
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                08 — Sources
              </p>
            </div>

            <div className="max-w-4xl space-y-4">

              {caseItem.sources.map((source, index) => {
                const sourceTitle =
                  typeof source === "string"
                    ? source
                    : source.title;

                const sourceUrl =
                  typeof source === "string"
                    ? null
                    : source.url;

                return (
                  <div
                    key={`${sourceTitle}-${index}`}
                    className="flex items-start justify-between gap-5 border-b border-[var(--line)] pb-4"
                  >
                    <div className="flex items-start gap-3">
                      <FileText
                        size={17}
                        className="mt-1 shrink-0 text-[var(--burgundy)]"
                      />

                      <span className="text-sm leading-6 text-[var(--muted)]">
                        {sourceTitle}
                      </span>
                    </div>

                    {sourceUrl && (
                      <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-[var(--burgundy)] transition hover:text-[var(--burgundy-dark)]"
                        aria-label={`Open ${sourceTitle}`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">

          <div className="flex flex-col justify-between gap-8 border-t border-[var(--line)] pt-8 md:flex-row md:items-end">

            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                Continue exploring
              </p>

              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-[var(--ink)] md:text-5xl">
                Explore more cases through the law.
              </h2>
            </div>

            <Link
              to="/cases"
              className="inline-flex w-fit items-center gap-2 border border-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Explore cases
              <ArrowUpRight size={16} />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

export default CaseDetails;