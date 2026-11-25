import { useNavigate } from 'react-router-dom'
import CounterCard from '../components/CounterCard'
import CharacterStage from '../components/CharacterStage'
import PageShell from '../components/PageShell'
import Roster from '../components/Roster'
import { classicCharacters, classicQuotes } from '../data/characters'
import { useBrainrotGame } from '../hooks/useBrainrotGame'

export default function CounterPage({ variant = 'classic' }) {
  const navigate = useNavigate()
  const game = useBrainrotGame(classicCharacters)
  const isPrototype = variant === 'prototype'

  return (
    <PageShell
      version={isPrototype ? 'PROTOTYPE V3.0' : 'V3.0 MAMMA MIA'}
      subtitle={
        isPrototype
          ? 'The Stitch prototype view. Tap to stack the chaos!'
          : 'Tap to accumulate Rizzola & summon authentic Brainrot figures'
      }
      combo={game.combo}
      unlockedLabel={`Unlocked: ${game.unlockedCount}/${classicCharacters.length}`}
      soundEnabled={game.soundEnabled}
      onToggleSound={game.toggleSound}
      particles={game.particles}
    >
      <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
        <CounterCard
          count={game.count}
          rank={game.rank}
          nextRankLabel={game.nextRankLabel}
          cps={game.cps}
          counterPulseKey={game.pulse.counter}
          quotes={classicQuotes}
          onAddCount={game.addCount}
          onReset={game.reset}
          onShout={game.shoutQuote}
          footerLink={{
            label: isPrototype ? 'Back to the classic counter →' : 'See the 3D character edition →',
            onClick: () => navigate(isPrototype ? '/' : '/characters'),
          }}
        />

        {isPrototype && (
          <div className="w-full rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-center text-sm text-amber-200">
            This is the prototype screen saved in Stitch. It plays just like the classic counter.
          </div>
        )}
      </div>

      <div className="lg:col-span-7 flex flex-col items-center">
        <CharacterStage
          character={game.currentCharacter}
          dialogue={game.dialogue}
          edition={false}
          stageKey={game.pulse.stage}
          bubbleKey={game.pulse.bubble}
        />
        <Roster
          characters={classicCharacters}
          currentIndex={game.currentIndex}
          onSelect={game.selectCharacter}
          edition={false}
        />
      </div>
    </PageShell>
  )
}
