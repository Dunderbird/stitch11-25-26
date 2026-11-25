import { useNavigate } from 'react-router-dom'
import CharacterStage from '../components/CharacterStage'
import CounterCard from '../components/CounterCard'
import PageShell from '../components/PageShell'
import Roster from '../components/Roster'
import { editionCharacters, editionQuotes } from '../data/characters'
import { useBrainrotGame } from '../hooks/useBrainrotGame'

export default function CharactersPage() {
  const navigate = useNavigate()
  const game = useBrainrotGame(editionCharacters, { unlockAllInitially: true })

  return (
    <PageShell
      version="V3.5 3D BRAINROT LIVE"
      subtitle="Click to stack Brainrot Power & cycle through 3D ultra-memes!"
      combo={game.combo}
      unlockedLabel={`Cast: ${game.unlockedCount}/${editionCharacters.length} UNLOCKED`}
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
          quotes={editionQuotes}
          onAddCount={game.addCount}
          onReset={game.reset}
          onShout={game.shoutQuote}
          footerLink={{
            label: 'Open the art gallery →',
            onClick: () => navigate('/gallery'),
          }}
        />
      </div>

      <div className="lg:col-span-7 flex flex-col items-center">
        <CharacterStage
          character={game.currentCharacter}
          dialogue={game.dialogue}
          edition
          stageKey={game.pulse.stage}
          bubbleKey={game.pulse.bubble}
        />
        <Roster
          characters={editionCharacters}
          currentIndex={game.currentIndex}
          onSelect={game.selectCharacter}
          edition
        />
      </div>
    </PageShell>
  )
}
