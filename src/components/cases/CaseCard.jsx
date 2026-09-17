import { useState } from "react";
import { ArrowUpRight, Bookmark, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  saveCase,
  removeSavedCase,
} from "../../services/api";

function CaseCard({
  caseItem,
  isSaved,
  setSavedCaseIds,
}) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);

      if (isSaved) {
        await removeSavedCase(token, caseItem.id);

        setSavedCaseIds((previous) =>
          previous.filter(
            (id) => Number(id) !== Number(caseItem.id)
          )
        );
      } else {
        await saveCase(token, caseItem.id);

        setSavedCaseIds((previous) => {
          const caseId = Number(caseItem.id);

          if (previous.includes(caseId)) {
            return previous;
          }

          return [...previous, caseId];
        });
      }
    } catch (error) {
      console.error(
        "Failed to update saved case:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`/cases/${caseItem.id}`}
      className="group block"
    >
      <article className="relative overflow-hidden border border-[var(--line)] bg-[var(--cream)] transition duration-300 hover:-translate-y-1 hover:border-[var(--burgundy)]">

        <div className="flex items-start justify-between gap-5 p-6">

          <div className="min-w-0">

            <div className="mb-4 flex flex-wrap items-center gap-3">
              {caseItem.category && (
                <span className="eyebrow text-[var(--burgundy)]">
                  {caseItem.category}
                </span>
              )}

              {caseItem.year && (
                <>
                  <span className="h-1 w-1 rounded-full bg-[var(--taupe)]" />

                  <span className="text-xs text-[var(--muted)]">
                    {caseItem.year}
                  </span>
                </>
              )}
            </div>

            <h3 className="font-display text-2xl leading-tight text-[var(--ink)] transition group-hover:text-[var(--burgundy)]">
              {caseItem.title}
            </h3>

            {caseItem.summary && (
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--muted)]">
                {caseItem.summary}
              </p>
            )}

          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            aria-label={
              isSaved
                ? "Remove saved case"
                : "Save case"
            }
            className={`flex h-10 w-10 shrink-0 items-center justify-center border transition ${
              isSaved
                ? "border-[var(--burgundy)] bg-[var(--burgundy)] text-white"
                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--burgundy)] hover:text-[var(--burgundy)]"
            }`}
          >
            {isSaved ? (
              <Check size={17} />
            ) : (
              <Bookmark size={17} />
            )}
          </button>

        </div>

        <div className="flex items-center justify-between border-t border-[var(--line)] px-6 py-4">

          <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            View case
          </span>

          <ArrowUpRight
            size={18}
            className="text-[var(--burgundy)] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />

        </div>

      </article>
    </Link>
  );
}

export default CaseCard;