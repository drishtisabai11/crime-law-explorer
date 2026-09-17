import { ArrowUpRight, BookOpen, Scale } from "lucide-react";
import { Link } from "react-router-dom";

function LawCard({ law }) {
  return (
    <Link
      to={`/laws/${law.id}`}
      className="group block border border-[var(--line)] bg-[var(--cream)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--burgundy)]"
    >
      <div className="border-b border-[var(--line)] p-6">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[var(--paper)]">
            <Scale
              size={20}
              strokeWidth={1.5}
              className="text-[var(--burgundy)]"
            />
          </div>

          <ArrowUpRight
            size={20}
            strokeWidth={1.5}
            className="text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--burgundy)]"
          />
        </div>

        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--burgundy)]">
          {law.section}
        </p>

        <h3 className="font-display text-2xl leading-tight text-[var(--ink)]">
          {law.title}
        </h3>
      </div>

      <div className="p-6">
        <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
          <BookOpen size={14} />
          {law.category}
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-[var(--muted)]">
          {law.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
          <span className="text-xs uppercase tracking-[0.12em] text-[var(--taupe)]">
            {law.jurisdiction}
          </span>

          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink)] transition-colors group-hover:text-[var(--burgundy)]">
            Read law
          </span>
        </div>
      </div>
    </Link>
  );
}

export default LawCard;