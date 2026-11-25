export default function CounterCard({
  count,
  rank,
  nextRankLabel,
  cps,
  counterPulseKey,
  quotes,
  onAddCount,
  onReset,
  onShout,
  footerLink,
}) {
  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl relative backdrop-blur-sm text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-3">
        <span>🍕 LEVEL:</span>
        <span>{rank.title}</span>
      </div>

      <div className="relative py-2">
        <div
          key={counterPulseKey}
          className="font-meme text-8xl md:text-9xl font-black tracking-tight text-white animate-pop"
        >
          {count.toLocaleString()}
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
          Brainrot Pasta Power
        </div>
      </div>

      <div className="w-full bg-slate-800/80 h-2.5 rounded-full mt-4 overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className="bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${rank.progress}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 font-semibold">
        <span>
          Next Rank: <span className="text-slate-200">{nextRankLabel}</span>
        </span>
        <span>CPS: {cps}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={(event) => onAddCount(1, event)}
          className="group relative w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-red-600 hover:from-emerald-500 hover:via-amber-400 hover:to-red-500 active:scale-95 transition-all duration-150 font-meme text-2xl md:text-3xl font-black text-white shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
        >
          <span className="text-3xl filter drop-shadow group-hover:rotate-12 transition-transform">🤌</span>
          <span>COUNT UP! (+1)</span>
          <span className="text-3xl filter drop-shadow group-hover:-rotate-12 transition-transform">🍝</span>
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </button>

        <div className="grid grid-cols-3 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={(event) => onAddCount(5, event)}
            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/50 text-slate-200 active:scale-95 transition"
          >
            +5 Rush 🏎️
          </button>
          <button
            type="button"
            onClick={(event) => onAddCount(10, event)}
            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-400/50 text-slate-200 active:scale-95 transition"
          >
            +10 Feast 🍕
          </button>
          <button
            type="button"
            onClick={onReset}
            className="py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 active:scale-95 transition"
          >
            Reset 🔄
          </button>
        </div>
      </div>

      <div className="mt-6 w-full bg-slate-900/50 border border-slate-800/60 rounded-2xl p-4 text-left">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
          Instant Brainrot Soundboard 📢
        </span>
        <div className="flex flex-wrap gap-2">
          {quotes.map((quote) => (
            <button
              key={quote.label}
              type="button"
              onClick={() => onShout(quote.text)}
              className={`px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium border border-slate-700 text-slate-300 transition ${quote.hover}`}
            >
              {quote.label}
            </button>
          ))}
        </div>
      </div>

      {footerLink && (
        <div className="mt-4 text-xs text-slate-400">
          <button
            type="button"
            onClick={footerLink.onClick}
            className="font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-500/50 underline-offset-4"
          >
            {footerLink.label}
          </button>
        </div>
      )}
    </div>
  )
}
