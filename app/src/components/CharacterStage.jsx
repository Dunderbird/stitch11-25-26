export default function CharacterStage({
  character,
  dialogue,
  edition,
  stageKey,
  bubbleKey,
}) {
  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden glow-box">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
            {character.origin}
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${character.rarityClass}`}
        >
          {character.rarity}
        </span>
      </div>

      <div className="relative w-full py-6 flex flex-col items-center justify-center min-h-[390px]">
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-500 pointer-events-none"
          style={{ backgroundColor: character.glowColor }}
        />

        <div
          key={stageKey}
          className="relative z-10 w-72 h-72 md:w-80 md:h-80 rounded-3xl p-2.5 bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800 border-2 border-amber-500/40 shadow-2xl flex items-center justify-center overflow-hidden animate-pop"
        >
          <div className="w-full h-full rounded-2xl relative overflow-hidden bg-slate-950 flex items-center justify-center group">
            {edition ? (
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover object-center transform animate-float transition-transform duration-300 group-hover:scale-105 select-none"
              />
            ) : (
              <div className="text-8xl md:text-9xl animate-float filter drop-shadow-2xl select-none">
                {character.emoji}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 text-center w-full px-2 pointer-events-none">
              <span className="text-[11px] font-bold text-amber-200 bg-slate-900/90 px-3 py-1 rounded-full border border-amber-400/40 backdrop-blur-sm shadow-md">
                {character.subtag}
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-20 mt-4 max-w-lg w-full bg-amber-400 text-slate-950 font-meme font-extrabold px-5 py-3 rounded-2xl shadow-xl transform -rotate-1 border-2 border-amber-300 text-center text-base md:text-lg">
          <span key={bubbleKey} className="inline-block animate-pop">
            {dialogue}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="text-[10px] uppercase font-bold text-slate-400">Character Name</div>
          <div className="font-meme font-bold text-base text-white truncate">{character.name}</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="text-[10px] uppercase font-bold text-slate-400">Signature Move</div>
          <div className="font-meme font-bold text-base text-amber-300 truncate">{character.move}</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="text-[10px] uppercase font-bold text-slate-400">Brainrot Factor</div>
          <div className="font-meme font-bold text-base text-red-400 truncate">{character.stat}</div>
        </div>
      </div>
    </div>
  )
}
