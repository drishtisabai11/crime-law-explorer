import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import challenges from "../../data/challenges";
import ChallengeQuestion from "../../components/challenge/ChallengeQuestion";

function Challenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentChallenge = challenges[currentIndex];

  const handleSelect = (index) => {
    if (!submitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setSubmitted(true);

    if (selectedAnswer === currentChallenge.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <main className="bg-[var(--paper)]">
        <section className="mx-auto flex min-h-[75vh] max-w-4xl items-center px-6 py-20 lg:px-10">
          <div className="w-full border border-[var(--line)] bg-[var(--cream)] p-8 text-center md:p-14">
            <p className="eyebrow mb-5 text-[var(--burgundy)]">
              Challenge complete
            </p>

            <h1 className="font-display text-5xl leading-tight text-[var(--ink)] md:text-7xl">
              Your score
            </h1>

            <div className="my-10 font-display text-7xl text-[var(--burgundy)] md:text-8xl">
              {score}
              <span className="text-3xl text-[var(--muted)]">
                /{challenges.length}
              </span>
            </div>

            <p className="mx-auto max-w-xl text-sm leading-7 text-[var(--muted)]">
              You have completed the case challenge. Review the
              reasoning behind each answer and continue exploring
              the archive to deepen your understanding.
            </p>

            <button
              type="button"
              onClick={restart}
              className="mt-9 inline-flex items-center gap-3 bg-[var(--burgundy)] px-6 py-3.5 text-sm text-white transition hover:bg-[var(--burgundy-dark)]"
            >
              <RotateCcw size={16} />
              Try again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--paper)]">
      {/* Header */}
      <section className="border-b border-[var(--line)] bg-[var(--charcoal)] px-6 py-16 text-[var(--paper)] md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-5 text-[#b9aea1]">
            Interactive case challenge
          </p>

          <h1 className="font-display max-w-4xl text-5xl leading-[0.95] md:text-7xl">
            Think like an
            <br />
            <span className="italic text-[#b97879]">
              investigator.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[#c7c0b6]">
            Read the scenario, examine the facts and choose the
            answer that best reflects the legal reasoning involved.
          </p>
        </div>
      </section>

      {/* Challenge */}
      <section className="px-6 py-12 md:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-5xl">
          {/* Progress */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="eyebrow text-[var(--burgundy)]">
                Question {currentIndex + 1} of {challenges.length}
              </p>
            </div>

            <p className="text-sm text-[var(--muted)]">
              Score: {score}
            </p>
          </div>

          <div className="h-1 bg-[var(--line)]">
            <div
              className="h-full bg-[var(--burgundy)] transition-all duration-500"
              style={{
                width: `${
                  ((currentIndex + 1) / challenges.length) * 100
                }%`,
              }}
            />
          </div>

          {/* Scenario */}
          <div className="mt-10 border border-[var(--line)] bg-[var(--cream)] p-7 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow mb-2 text-[var(--burgundy)]">
                  {currentChallenge.category}
                </p>

                <h3 className="font-display text-2xl text-[var(--ink)]">
                  {currentChallenge.caseTitle}
                </h3>
              </div>

              <span className="border border-[var(--line)] px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                {currentChallenge.difficulty}
              </span>
            </div>

            <div className="mt-7 border-t border-[var(--line)] pt-7">
              <p className="eyebrow mb-3 text-[var(--muted)]">
                Case file
              </p>

              <p className="text-sm leading-7 text-[var(--muted)] md:text-base">
                {currentChallenge.scenario}
              </p>
            </div>
          </div>

          {/* Question */}
          <div className="mt-8 border border-[var(--line)] bg-[var(--cream)] p-7 md:p-10">
            <ChallengeQuestion
              question={currentChallenge}
              selectedAnswer={selectedAnswer}
              onSelect={handleSelect}
              submitted={submitted}
            />

            <div className="mt-9 flex justify-end border-t border-[var(--line)] pt-7">
              {!submitted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="inline-flex items-center gap-3 bg-[var(--burgundy)] px-6 py-3.5 text-sm text-white transition hover:bg-[var(--burgundy-dark)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit answer
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-3 bg-[var(--burgundy)] px-6 py-3.5 text-sm text-white transition hover:bg-[var(--burgundy-dark)]"
                >
                  {currentIndex < challenges.length - 1
                    ? "Next question"
                    : "See results"}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Challenge;