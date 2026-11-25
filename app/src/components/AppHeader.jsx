import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { to: '/', label: 'Classic Counter', end: true },
  { to: '/characters', label: '3D Edition' },
  { to: '/mamma-mia', label: 'Prototype' },
  { to: '/gallery', label: 'Art Gallery' },
]

function navClass({ isActive }) {
  return [
    'px-3 py-1.5 rounded-lg text-xs font-bold border transition',
    isActive
      ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
      : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-500',
  ].join(' ')
}

export default function AppHeader({
  version,
  subtitle,
  combo,
  unlockedLabel,
  soundEnabled,
  onToggleSound,
}) {
  const showStats = typeof combo === 'number' && typeof onToggleSound === 'function'

  return (
    <header className="relative z-10 w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-amber-200 to-red-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-xl font-bold">
          🤌
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-meme font-black text-xl tracking-wide bg-gradient-to-r from-emerald-400 via-amber-200 to-red-400 bg-clip-text text-transparent">
              ITALIAN BRAINROT
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              {version}
            </span>
          </div>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </Link>

      <nav className="order-3 w-full lg:order-none lg:w-auto flex flex-wrap items-center gap-2">
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {showStats && (
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-amber-400 font-bold text-sm">Combo: x{combo}</span>
            <span className="text-xs text-slate-400">🔥 Pasta Rush</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold text-emerald-300">{unlockedLabel}</span>
          </div>
          <button
            type="button"
            onClick={onToggleSound}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
          >
            <span>{soundEnabled ? '🔊' : '🔇'}</span>
            <span>AUDIO FX: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      )}
    </header>
  )
}
