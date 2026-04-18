import { ExternalLink, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AcademyVideoAsset } from '../data/curriculumData';

interface VideoPlayerProps {
  video: AcademyVideoAsset;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const isInternal = Boolean(video.href?.startsWith('/'));

  return (
    <section className="glow-panel relative overflow-hidden rounded-2xl border border-cyan-300/25 bg-slate-950/75 p-5 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_top_right,rgba(153,69,255,0.24),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0),rgba(34,211,238,0.08))]" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-300/65">Video Briefing</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{video.title}</h3>
          </div>
          <PlayCircle className="text-cyan-300" size={20} />
        </div>

        {video.embedUrl ? (
          <div className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900/80">
            <div className="aspect-video w-full">
              <iframe
                title={video.title}
                src={video.embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.9))] p-6">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:repeating-linear-gradient(90deg,rgba(148,163,184,0.05)_0px,rgba(148,163,184,0.05)_1px,transparent_2px,transparent_18px)]" />
            <div className="relative flex items-center gap-4">
              <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 p-4 text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.2)]">
                <PlayCircle size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-cyan-100">Transmission ready</p>
                <p className="text-sm text-slate-300/80">{video.description}</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm leading-6 text-slate-300/80">{video.description}</p>

        {video.href ? (
          isInternal ? (
            <Link
              to={video.href}
              className="ui-action inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
            >
              <span>{video.ctaLabel}</span>
              <ExternalLink size={14} />
            </Link>
          ) : (
            <a
              href={video.href}
              target="_blank"
              rel="noreferrer"
              className="ui-action inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
            >
              <span>{video.ctaLabel}</span>
              <ExternalLink size={14} />
            </a>
          )
        ) : null}
      </div>
    </section>
  );
}