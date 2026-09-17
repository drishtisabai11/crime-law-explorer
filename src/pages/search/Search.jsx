import { useMemo, useState } from "react";
import { ArrowUpRight, Search as SearchIcon, X } from "lucide-react";
import SearchResultCard from "../../components/search/SearchResultCard";
import { cases } from "../../data/cases";
import laws from "../../data/laws";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("all");

  const results = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) {
      return [];
    }

    const caseResults =
      activeType === "all" || activeType === "case"
        ? cases
            .filter((caseItem) => {
              const searchableText = [
                caseItem.title,
                caseItem.summary,
                caseItem.category,
                caseItem.location,
                caseItem.court,
                caseItem.year,
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

              return searchableText.includes(query);
            })
            .map((caseItem) => ({
              ...caseItem,
              type: "case",
            }))
        : [];

    const lawResults =
      activeType === "all" || activeType === "law"
        ? laws
            .filter((law) => {
              const searchableText = [
                law.title,
                law.section,
                law.category,
                law.jurisdiction,
                law.punishment,
                law.description,
                ...(law.keywords || []),
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

              return searchableText.includes(query);
            })
            .map((law) => ({
              ...law,
              type: "law",
            }))
        : [];

    return [...caseResults, ...lawResults];
  }, [searchTerm, activeType]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <main className="bg-[var(--paper)]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-20 lg:pt-20">

          <p className="eyebrow text-[var(--burgundy)]">
            Search the archive
          </p>

          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.98] tracking-[-0.035em] text-[var(--ink)] sm:text-6xl lg:text-8xl">
            Find a case.
            <br />
            Find the law.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--muted)]">
            Search across documented cases and legal provisions
            to explore how crime and law intersect.
          </p>

        </div>
      </section>

      {/* =====================================================
          SEARCH AREA
      ===================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">

          {/* Search input */}
          <div className="relative">

            <SearchIcon
              size={22}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search cases, laws, sections, categories..."
              className="w-full border border-[var(--line)] bg-[var(--cream)] py-5 pl-14 pr-14 text-base text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--burgundy)]"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--muted)] transition hover:text-[var(--burgundy)]"
              >
                <X size={20} />
              </button>
            )}

          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            {[
              { label: "All", value: "all" },
              { label: "Cases", value: "case" },
              { label: "Laws", value: "law" },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setActiveType(filter.value)
                }
                className={`border px-5 py-2.5 text-sm transition ${
                  activeType === filter.value
                    ? "border-[var(--burgundy)] bg-[var(--burgundy)] text-white"
                    : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--burgundy)] hover:text-[var(--burgundy)]"
                }`}
              >
                {filter.label}
              </button>
            ))}

          </div>

          {/* =================================================
              RESULTS
          ================================================= */}
          <div className="mt-14">

            {!searchTerm.trim() ? (
              <div className="border-t border-[var(--line)] py-16">

                <p className="eyebrow text-[var(--burgundy)]">
                  Start searching
                </p>

                <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-[var(--ink)] md:text-4xl">
                  Search for a case, law, section, or
                  legal concept.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">
                  Try terms such as murder, theft, cheating,
                  defamation, or a section number.
                </p>

              </div>
            ) : results.length === 0 ? (
              <div className="border-t border-[var(--line)] py-16">

                <p className="eyebrow text-[var(--burgundy)]">
                  No results
                </p>

                <h2 className="mt-4 font-display text-3xl text-[var(--ink)] md:text-4xl">
                  Nothing matched your search.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">
                  Try a different keyword, section number,
                  case name, or legal category.
                </p>

              </div>
            ) : (
              <>
                <div className="mb-7 flex items-end justify-between border-b border-[var(--line)] pb-5">

                  <div>
                    <p className="eyebrow text-[var(--burgundy)]">
                      Search results
                    </p>

                    <h2 className="mt-2 font-display text-3xl text-[var(--ink)]">
                      {results.length}{" "}
                      {results.length === 1
                        ? "result"
                        : "results"}
                    </h2>
                  </div>

                  <span className="hidden text-sm text-[var(--muted)] sm:block">
                    {activeType === "all"
                      ? "Cases + Laws"
                      : activeType === "case"
                      ? "Cases"
                      : "Laws"}
                  </span>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  {results.map((result) => (
                    <SearchResultCard
                      key={`${result.type}-${result.id}`}
                      result={result}
                    />
                  ))}

                </div>
              </>
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <p className="eyebrow text-[var(--muted)]">
                Browse directly
              </p>

              <p className="mt-2 text-sm text-[var(--muted)]">
                Prefer exploring instead of searching?
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <a
                href="/cases"
                className="inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3 text-sm text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                Explore cases
                <ArrowUpRight size={16} />
              </a>

              <a
                href="/laws"
                className="inline-flex items-center gap-2 border border-[var(--line)] px-5 py-3 text-sm text-[var(--ink)] transition hover:border-[var(--burgundy)] hover:text-[var(--burgundy)]"
              >
                Explore laws
                <ArrowUpRight size={16} />
              </a>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Search;