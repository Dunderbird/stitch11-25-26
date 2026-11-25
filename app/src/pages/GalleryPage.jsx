import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import BackgroundGlows from '../components/BackgroundGlows'
import { artCharacters } from '../data/characters'

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      <BackgroundGlows />
      <AppHeader
        version="STITCH ARTWORK"
        subtitle="The four character screens from your design, ready to inspect."
      />

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-meme text-4xl md:text-5xl font-black text-white">
              The Brainrot Art Gallery
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              These are the picture-only screens you made in Stitch.
            </p>
          </div>
          <Link
            to="/characters"
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-meme font-black hover:bg-amber-300 transition"
          >
            Use them in the counter →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {artCharacters.map((character) => (
            <Link
              key={character.slug}
              to={`/gallery/${character.slug}`}
              className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-3 shadow-2xl hover:border-amber-400/50 transition"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-slate-800">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px-2 py-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h2 className="font-meme text-xl font-bold text-white">{character.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${character.rarityClass}`}>
                    {character.rarity}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-2">{character.headline}</p>
                <span className="inline-block mt-4 text-xs font-bold text-amber-300">
                  Inspect character →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
