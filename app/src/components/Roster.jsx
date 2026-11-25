export default function Roster({ characters, currentIndex, onSelect, edition }) {
  return (
    <div className="w-full mt-4 bg-slate-900/60 border border-slate-800/70 rounded-2xl p-3">
      <div className="flex items-center justify-between mb-2 px-1 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {edition ? 'Brainrot 3D Gallery' : 'Brainrot Cast Showcase'}
          </span>
          {edition && (
            <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-bold">
              CLICK TO INSPECT
            </span>
          )}
        </div>
        <span className="text-[11px] text-amber-400 font-semibold">Cycles every count-up!</span>
      </div>

      <div className={`grid gap-3 ${edition ? 'grid-cols-4' : 'grid-cols-8 gap-2'}`}>
        {characters.map((character, index) => {
          const active = index === currentIndex

          if (!edition) {
            return (
              <button
                type="button"
                key={character.id}
                title={character.name}
                aria-label={`Show ${character.name}`}
                onClick={() => onSelect(index, { playSound: true })}
                className={`h-10 rounded-xl flex items-center justify-center text-lg border transition-all duration-200 ${
                  active
                    ? 'bg-amber-400/30 border-amber-400 scale-110 shadow-lg shadow-amber-400/30 ring-2 ring-amber-300/50 opacity-100'
                    : 'bg-slate-800/50 border-slate-700/50 opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                {character.emoji.split(' ')[0]}
              </button>
            )
          }

          return (
            <button
              type="button"
              key={character.id}
              title={character.name}
              aria-label={`Show ${character.name}`}
              onClick={() => onSelect(index, { playSound: true })}
              className={`group relative h-16 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex items-center justify-center ${
                active
                  ? 'border-amber-400 scale-105 ring-2 ring-amber-400/50 shadow-lg shadow-amber-400/30 opacity-100'
                  : 'border-slate-700 opacity-70 hover:opacity-100 hover:border-slate-500'
              }`}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-1 left-1 right-1 text-[10px] font-meme font-bold text-white truncate text-center drop-shadow">
                {character.name.split(' ')[0]} {character.iconEmoji}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
