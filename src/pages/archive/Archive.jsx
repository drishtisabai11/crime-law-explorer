import { useEffect, useState } from "react";
import { ArrowUpRight, Bookmark, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

import { getSavedCases, removeSavedCase } from "../../services/api";
import { cases } from "../../data/cases";

function Archive() {

  const [savedCases, setSavedCases] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const loadArchive = async () => {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      const data = await getSavedCases(currentToken);

      const archiveCases = data.savedCases
        .map((savedCase) =>
          cases.find(
            (caseItem) =>
              Number(caseItem.id) === Number(savedCase.caseId)
          )
        )
        .filter(Boolean);

      setSavedCases(archiveCases);
    } catch (error) {
      console.error("Failed to load archive:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  loadArchive();
}, []);

  const handleRemove = async (caseId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  try {
    await removeSavedCase(token, caseId);

    setSavedCases((previous) =>
      previous.filter(
        (item) => Number(item.id) !== Number(caseId)
      )
    );
  } catch (error) {
    console.error("Failed to remove saved case:", error);
  }
};

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[var(--paper)]">
        <p className="eyebrow text-[var(--burgundy)]">
          Loading archive...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--paper)]">

      {/* Hero */}
      <section className="border-b border-[var(--line)] px-6 pb-16 pt-20 md:px-10 lg:px-16 lg:pb-20 lg:pt-28">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Bookmark
                  size={17}
                  strokeWidth={1.5}
                  className="text-[var(--burgundy)]"
                />

                <p className="eyebrow text-[var(--burgundy)]">
                  Personal Archive
                </p>
              </div>

              <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-[var(--ink)] md:text-6xl lg:text-8xl">
                My Archive
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
                Your saved cases, kept in one private place for
                future reading and research.
              </p>
            </div>

            <div className="hidden items-center gap-2 border border-[var(--line)] bg-[var(--cream)] px-4 py-3 md:flex">
              <LockKeyhole
                size={15}
                strokeWidth={1.5}
                className="text-[var(--burgundy)]"
              />

              <span className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Private
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Archive content */}
      <section className="px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">

          {savedCases.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-5">
                <p className="text-sm text-[var(--muted)]">
                  {savedCases.length}{" "}
                  {savedCases.length === 1 ? "case" : "cases"} saved
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedCases.map((caseItem) => (
                  <article
                    key={caseItem.id}
                    className="group border border-[var(--line)] bg-[var(--cream)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--burgundy)]"
                  >
                    {/* Image */}
                    <Link
                      to={`/cases/${caseItem.id}`}
                      className="block"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-[var(--taupe)]">
                        <img
                          src={caseItem.image}
                          alt={caseItem.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">

                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="eyebrow text-[var(--burgundy)]">
                          {caseItem.category}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(caseItem.id)
                          }
                          className="text-[var(--muted)] transition hover:text-[var(--burgundy)]"
                          aria-label="Remove from archive"
                          title="Remove from archive"
                        >
                          <Bookmark
                            size={18}
                            strokeWidth={1.7}
                            fill="currentColor"
                          />
                        </button>
                      </div>

                      <Link to={`/cases/${caseItem.id}`}>
                        <h2 className="font-display text-2xl leading-tight text-[var(--ink)] transition-colors group-hover:text-[var(--burgundy)]">
                          {caseItem.title}
                        </h2>
                      </Link>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                        {caseItem.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-[var(--taupe)]">
                          <span>{caseItem.year}</span>
                          <span>•</span>
                          <span>{caseItem.location}</span>
                        </div>

                        <Link
                          to={`/cases/${caseItem.id}`}
                          className="text-[var(--muted)] transition hover:text-[var(--burgundy)]"
                        >
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                          />
                        </Link>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="border border-[var(--line)] bg-[var(--cream)] px-6 py-24 text-center">

              <Bookmark
                size={30}
                strokeWidth={1.3}
                className="mx-auto text-[var(--taupe)]"
              />

              <p className="eyebrow mt-6 text-[var(--burgundy)]">
                Your archive is empty
              </p>

              <h2 className="mt-4 font-display text-4xl text-[var(--ink)]">
                Save cases worth returning to.
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
                Explore the case archive and use the bookmark
                icon to keep cases here for later.
              </p>

              <Link
                to="/cases"
                className="mt-8 inline-flex items-center gap-3 bg-[var(--burgundy)] px-6 py-3 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-[var(--burgundy-dark)]"
              >
                Explore cases
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </Link>

            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Archive;