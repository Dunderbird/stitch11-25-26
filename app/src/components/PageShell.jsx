import AppHeader from './AppHeader'
import BackgroundGlows from './BackgroundGlows'
import ParticleLayer from './ParticleLayer'

export default function PageShell({
  version,
  subtitle,
  combo,
  unlockedLabel,
  soundEnabled,
  onToggleSound,
  particles,
  children,
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      <BackgroundGlows />

      <AppHeader
        version={version}
        subtitle={subtitle}
        combo={combo}
        unlockedLabel={unlockedLabel}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
      />

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {children}
      </main>

      <ParticleLayer particles={particles} />
    </div>
  )
}
