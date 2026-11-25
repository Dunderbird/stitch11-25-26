import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import BackgroundGlows from '../components/BackgroundGlows'

export default function CharacterArtPage({ character }) {
  if (!character) {
    return <Link to="/gallery" className="text-amber-300 underline">Character not found. Back to gallery.</Link>
  }

  const details = [
    { label: 'Origin', value: character.origin },
    { label: 'Signature Move', value: character.move },
    { label: 'Brainrot Factor', value: character.stat },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      <BackgroundGlows />
      <AppHeader
        version="STITCH ARTWORK"
        subtitle={`${character.name} — picture-only screen`}
      />

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl p-2 bg-gradient-to-tr from-slate-800 via-amber-400/60 to-red-600 border-2 border-amber-500/40 shadow-2xl">
          <img
            src={character.image}
            alt={character.name}
            className="w-full aspect-square object-cover rounded-2xl"
          />
        </div>

        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${character.rarityClass}`}>
            {character.rarity}
          </span>
          <h1 className="font-meme text-4xl md:text-5xl font-black text-white mt-4">
            {character.name}
          </h1>
          <p className="font-meme text-xl text-amber-300 mt-2">{character.headline}</p>
          <p className="text-slate-400 mt-5 leading-relaxed">{character.description}</p>

          <dl className="mt-6 grid sm:grid-cols-3 gap-3">
            {details.map((detail) => (
              <div key={detail.label} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <dt className="text-[10px] uppercase font-bold text-slate-400">{detail.label}</dt>
                <dd className="font-meme font-bold text-white mt-1">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <blockquote className="mt-6 bg-amber-400 text-slate-950 font-meme font-extrabold px-5 py-4 rounded-2xl border-2 border-amber-300 shadow-xl -rotate-1">
            “{character.quote}”
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/gallery"
              className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-700 transition"
            >
              ← Back to gallery
            </Link>
            <Link
              to="/characters"
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-meme font-black hover:bg-amber-300 transition"
            >
              See it in the counter →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
