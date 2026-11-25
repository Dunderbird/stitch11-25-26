import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 text-center px-4">
      <div className="font-meme text-7xl">🤌🍝</div>
      <h1 className="font-meme text-4xl font-black text-white">Mamma Mia! Wrong page.</h1>
      <p className="text-slate-400">That screen is not in this Stitch project.</p>
      <Link
        to="/"
        className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-meme font-black hover:bg-amber-300 transition"
      >
        Back to the counter
      </Link>
    </div>
  )
}
