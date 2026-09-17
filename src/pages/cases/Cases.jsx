import { useMemo, useState } from "react";
import CaseCard from "../../components/cases/CaseCard";
import { cases } from "../../data/cases";
import { getSavedCases } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

function Cases() {
  const { isAuthenticated } = useAuth();

  const [savedCaseIds, setSavedCaseIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Load saved cases for logged-in user
  useEffect(() => {
    const loadSavedCases = async () => {
      if (!isAuthenticated) {
        setSavedCaseIds([]);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setSavedCaseIds([]);
        return;
      }

      try {
        const data = await getSavedCases(token);

        const ids = (data.savedCases || []).map((savedCase) =>
          Number(savedCase.caseId)
        );

        setSavedCaseIds(ids);
      } catch (error) {
        console.error("Failed to load saved cases:", error);
      }
    };

    loadSavedCases();
  }, [isAuthenticated]);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        cases
          .map((caseItem) => caseItem.category)
          .filter(Boolean)
      ),
    ];
  }, []);

  const filteredCases = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return cases.filter((caseItem) => {
      const title = caseItem.title || "";
      const summary = caseItem.summary || "";
      const category = caseItem.category || "";

      const matchesSearch =
        !normalizedSearch ||
        title.toLowerCase().includes(normalizedSearch) ||
        summary.toLowerCase().includes(normalizedSearch) ||
        category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        activeCategory === "All" ||
        category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <main className="bg-[var(--paper)]">
      {/* HERO */}
      <section className="border-b border-[var(--line)] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-5 text-[var(--burgundy)]">
            Case Archive
          </p>

          <h1 className="font-display max-w-4xl text-5xl leading-[0.95] tracking-tight text-[var(--ink)] md:text-7xl">
            Explore the cases
            <br />
            behind the law.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
            Study landmark criminal cases, their investigations,
            evidence, court proceedings and legal outcomes.
          </p>
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="border-b border-[var(--line)] px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search cases..."
                className="w-full border border-[var(--line)] bg-[var(--cream)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--burgundy)]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
                    activeCategory === category
                      ? "border-[var(--burgundy)] bg-[var(--burgundy)] text-white"
                      : "border-[var(--line)] bg-[var(--cream)] text-[var(--muted)] hover:border-[var(--burgundy)] hover:text-[var(--burgundy)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {filteredCases.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  isSaved={savedCaseIds.includes(
                    Number(caseItem.id)
                  )}
                  setSavedCaseIds={setSavedCaseIds}
                />
              ))}
            </div>
          ) : (
            <div className="border border-[var(--line)] bg-[var(--cream)] p-12 text-center">
              <p className="font-display text-2xl text-[var(--ink)]">
                No cases found
              </p>

              <p className="mt-3 text-sm text-[var(--muted)]">
                Try a different search term or category.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Cases;