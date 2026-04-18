import { BookOpen, Sparkles } from 'lucide-react';
import type { AcademyLesson, ModuleAccent } from '../data/curriculumData';

const accentClasses: Record<ModuleAccent, string> = {
  purple: 'border-purple-400/30 bg-purple-500/10 text-purple-200 shadow-[0_0_28px_rgba(153,69,255,0.12)]',
  cyan: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]',
  fuchsia: 'border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100 shadow-[0_0_28px_rgba(217,70,239,0.12)]',
  emerald: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100 shadow-[0_0_28px_rgba(16,185,129,0.12)]',
  amber: 'border-amber-400/30 bg-amber-500/10 text-amber-100 shadow-[0_0_28px_rgba(251,191,36,0.12)]',
};

interface LessonCardProps {
  lesson: AcademyLesson;
  index: number;
  accent: ModuleAccent;
}

export function LessonCard({ lesson, index, accent }: LessonCardProps) {
  return (
    <article
      className={`glow-panel relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl ${accentClasses[accent]}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:linear-gradient(135deg,rgba(153,69,255,0.16),transparent_45%,rgba(34,211,238,0.12))]" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-300/70">{lesson.eyebrow}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{index}. {lesson.title}</h3>
          </div>
          <div className="rounded-full border border-white/10 bg-slate-950/60 p-2 text-slate-100">
            {index === 1 ? <BookOpen size={16} /> : <Sparkles size={16} />}
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-200/85">{lesson.description}</p>

        <ul className="space-y-2 text-sm text-slate-300/85">
          {lesson.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}