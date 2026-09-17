import { ArrowUpRight, BookOpen, Gavel } from "lucide-react";
import { Link } from "react-router-dom";

function SearchResultCard({ result }) {
  const isCase = result.type === "case";

  return (
    <Link
      to={isCase ? `/cases/${result.id}` : `/laws/${result.id}`}
      className="group block border border-[var(--line)] bg-[var(--cream)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--burgundy)]"
    >
      <div className="flex items-start justify-between gap-6 p-6">
        <div>
          <div className="mb-4 flex items-center gap-2">
            {isCase ? (
              <Gavel
                size={16}
                strokeWidth={1.5}
                className="text-[var(--burgundy)]"
              />
            ) : (
              <BookOpen
                size={16}
                strokeWidth={1.5}
                className="text-[var(--burgundy)]"
              />
            )}

            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--burgundy)]">
              {isCase ? "Case" : "Law"}
            </span>
          </div>

          <h3 className="font-display text-2xl leading-tight text-[var(--ink)]">
            {result.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {result.description}
          </p>
        </div>

        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className="shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--burgundy)]"
        />
      </div>
    </Link>
  );
}

export default SearchResultCard;