import { useMemo, useState } from 'react';
import { CheckCircle2, CircleHelp, RotateCcw } from 'lucide-react';
import type { AcademyQuizQuestion } from '../data/curriculumData';

export interface QuizResult {
  score: number;
  total: number;
  passed: boolean;
}

interface QuizProps {
  questions: AcademyQuizQuestion[];
  passRatio?: number;
  onComplete?: (result: QuizResult) => void;
}

export function Quiz({ questions, passRatio = 0.67, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<number[]>(() => Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo<QuizResult>(() => {
    const score = questions.reduce((sum, question, index) => {
      return sum + (answers[index] === question.answerIndex ? 1 : 0);
    }, 0);

    return {
      score,
      total: questions.length,
      passed: score / questions.length >= passRatio,
    };
  }, [answers, passRatio, questions]);

  const allAnswered = answers.every((answer) => answer >= 0);

  const handleSubmit = () => {
    if (!allAnswered) {
      return;
    }

    setSubmitted(true);
    onComplete?.(result);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(-1));
    setSubmitted(false);
  };

  return (
    <section className="glow-panel rounded-2xl border border-purple-300/25 bg-slate-950/75 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-purple-300/60">Knowledge Check</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Short quiz</h3>
        </div>
        <CircleHelp className="text-purple-300" size={18} />
      </div>

      <div className="mt-4 space-y-5">
        {questions.map((question, questionIndex) => (
          <div key={question.prompt} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-100">{questionIndex + 1}. {question.prompt}</p>
            <div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[questionIndex] === optionIndex;
                const isCorrect = question.answerIndex === optionIndex;
                const showCorrect = submitted && isCorrect;
                const showIncorrect = submitted && isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((current) => current.map((answer, index) => index === questionIndex ? optionIndex : answer))}
                    className={[
                      'w-full rounded-xl border px-4 py-3 text-left text-sm transition',
                      isSelected ? 'border-cyan-300/60 bg-cyan-400/10 text-cyan-50' : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700',
                      showCorrect ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-50' : '',
                      showIncorrect ? 'border-rose-400/50 bg-rose-500/10 text-rose-50' : '',
                    ].join(' ')}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {submitted ? (
              <p className="mt-3 text-xs leading-5 text-slate-400">{question.explanation}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="ui-action inline-flex items-center gap-2 rounded-xl border border-purple-300/45 bg-purple-500/15 px-4 py-2 text-sm font-semibold text-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 size={16} />
          <span>Submit Quiz</span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="ui-action inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
        {submitted ? (
          <p className={`text-sm font-semibold ${result.passed ? 'text-emerald-300' : 'text-amber-300'}`}>
            Score: {result.score}/{result.total} {result.passed ? '• Pass' : '• Review and retry'}
          </p>
        ) : null}
      </div>
    </section>
  );
}