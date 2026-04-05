export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center z-50">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-2 border-purple-300/30 border-t-purple-300 rounded-full animate-spin" />
        </div>
        <p className="text-sm font-mono text-purple-300 uppercase tracking-widest">
          Initializing Cadabra...
        </p>
      </div>
    </div>
  );
}
