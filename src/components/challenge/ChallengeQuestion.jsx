import { Check, X } from "lucide-react";

function ChallengeQuestion({
  question,
  selectedAnswer,
  onSelect,
  submitted,
}) {
  return (
    <div>
      <h2 className="font-display text-2xl leading-tight text-[var(--ink)] md:text-3xl">
        {question.question}
      </h2>

      <div className="mt-8 space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.answer === index;

          let stateClasses =
            "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--burgundy)]";

          if (submitted && isCorrect) {
            stateClasses =
              "border-green-700 bg-green-50";
          } else if (submitted && isSelected && !isCorrect) {
            stateClasses =
              "border-red-700 bg-red-50";
          } else if (isSelected) {
            stateClasses =
              "border-[var(--burgundy)] bg-[var(--cream)]";
          }

          return (
            <button
              key={option}
              type="button"
              disabled={submitted}
              onClick={() => onSelect(index)}
              className={`flex w-full items-center justify-between gap-5 border p-5 text-left transition-all ${stateClasses}`}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-current text-xs">
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="text-sm leading-6 text-[var(--ink)]">
                  {option}
                </span>
              </div>

              {submitted && isCorrect && (
                <Check size={19} strokeWidth={1.7} />
              )}

              {submitted && isSelected && !isCorrect && (
                <X size={19} strokeWidth={1.7} />
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="mt-7 border-l-2 border-[var(--burgundy)] bg-[var(--cream)] p-5">
          <p className="eyebrow mb-2 text-[var(--burgundy)]">
            Legal reasoning
          </p>

          <p className="text-sm leading-7 text-[var(--muted)]">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default ChallengeQuestion;