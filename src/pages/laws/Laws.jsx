import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import laws from "../../data/laws";
import LawCard from "../../components/laws/LawCard";

function Laws() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(laws.map((law) => law.category)),
  ];

  const filteredLaws = useMemo(() => {
    const query = search.toLowerCase().trim();

    return laws.filter((law) => {
      const matchesCategory =
        category === "All" || law.category === category;

      const matchesSearch =
        !query ||
        law.title.toLowerCase().includes(query) ||
        law.section.toLowerCase().includes(query) ||
        law.description.toLowerCase().includes(query) ||
        law.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">
      {/* Header */}
      <section className="border-b border-[var(--line)] px-6 pb-16 pt-20 md:px-10 lg:px-16 lg:pb-20 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-5">Legal Library</p>

          <div className="max-w-4xl">
            <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
              Explore the
              <span className="block text-[var(--burgundy)]">
                law.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
              Understand major criminal law provisions through clear,
              structured explanations of offences, punishments, and legal
              principles.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-[var(--line)] bg-[var(--cream)] px-6 py-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search laws, sections, offences..."
              className="h-12 w-full border border-[var(--line)] bg-[var(--paper)] pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[var(--taupe)] focus:border-[var(--burgundy)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-2 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
              <SlidersHorizontal size={15} />
              Filter
            </div>

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.1em] transition-colors ${
                  category === item
                    ? "border-[var(--burgundy)] bg-[var(--burgundy)] text-white"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:border-[var(--burgundy)] hover:text-[var(--burgundy)]"
                }`}
              >
                {item}
              </button>
            ))}

            {(search || category !== "All") && (
              <button
                onClick={clearFilters}
                className="ml-1 flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--burgundy)]"
              >
                <X size={14} />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 py-14 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between border-b border-[var(--line)] pb-5">
            <div>
              <p className="eyebrow mb-2">Legal archive</p>
              <h2 className="font-display text-3xl">
                Criminal law provisions
              </h2>
            </div>

            <p className="text-sm text-[var(--muted)]">
              {filteredLaws.length}{" "}
              {filteredLaws.length === 1 ? "entry" : "entries"}
            </p>
          </div>

          {filteredLaws.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredLaws.map((law) => (
                <LawCard key={law.id} law={law} />
              ))}
            </div>
          ) : (
            <div className="border border-[var(--line)] bg-[var(--cream)] px-6 py-20 text-center">
              <p className="eyebrow mb-3">No results</p>

              <h3 className="font-display text-3xl">
                Nothing matched your search.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
                Try a different offence, section number, or category.
              </p>

              <button
                onClick={clearFilters}
                className="mt-7 border border-[var(--ink)] px-5 py-3 text-xs uppercase tracking-[0.12em] transition-colors hover:bg-[var(--ink)] hover:text-white"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Laws;