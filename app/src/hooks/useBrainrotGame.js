import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { calculateRank } from '../data/characters'
import { playBoing, playTing } from '../lib/audio'

const PARTICLE_COLORS = ['#f59e0b', '#ef4444', '#10b981', '#ec4899', '#38bdf8', '#fbbf24']
const DEFAULT_PARTICLES = ['+1 🤌', 'MAMMA MIA!', '+1 🍕', 'SI! 🍝', '+1 🇮🇹']

function makeInitialUnlocked(characters, unlockAllInitially) {
  if (unlockAllInitially) {
    return new Set(characters.map((_, index) => index))
  }
  return new Set([0])
}

export function useBrainrotGame(characters, { unlockAllInitially = false } = {}) {
  const [count, setCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [unlocked, setUnlocked] = useState(() =>
    makeInitialUnlocked(characters, unlockAllInitially),
  )
  const [clickHistory, setClickHistory] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [dialogue, setDialogue] = useState(() => characters[0].quote)
  const [particles, setParticles] = useState([])
  const [pulse, setPulse] = useState({ counter: 0, stage: 0, bubble: 0 })

  const countRef = useRef(0)
  const historyRef = useRef([])
  const unlockedRef = useRef(makeInitialUnlocked(characters, unlockAllInitially))
  const particleIdRef = useRef(0)
  const timeoutsRef = useRef(new Set())

  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  const bump = useCallback((key) => {
    setPulse((previous) => ({ ...previous, [key]: previous[key] + 1 }))
  }, [])

  const spawnParticle = useCallback((text, event) => {
    const id = particleIdRef.current + 1
    particleIdRef.current = id

    const rect = event?.currentTarget?.getBoundingClientRect?.()
    const x = event?.clientX && event.clientX > 0
      ? event.clientX
      : rect
        ? rect.left + rect.width / 2
        : window.innerWidth / 2
    const y = event?.clientY && event.clientY > 0
      ? event.clientY
      : rect
        ? rect.top + rect.height / 2
        : window.innerHeight / 2

    const particle = {
      id,
      text,
      x,
      y,
      tx: `${(Math.random() - 0.5) * 160}px`,
      ty: `-${90 + Math.floor(Math.random() * 90)}px`,
      tr: `${(Math.random() - 0.5) * 60}deg`,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      fontSize: `${22 + Math.floor(Math.random() * 12)}px`,
    }

    setParticles((previous) => [...previous, particle])

    const timeout = setTimeout(() => {
      setParticles((previous) => previous.filter((item) => item.id !== id))
      timeoutsRef.current.delete(timeout)
    }, 1200)
    timeoutsRef.current.add(timeout)
  }, [])

  const selectCharacter = useCallback(
    (index, { playSound = false } = {}) => {
      const safeIndex = ((index % characters.length) + characters.length) % characters.length
      const character = characters[safeIndex]

      setCurrentIndex(safeIndex)
      unlockedRef.current = new Set(unlockedRef.current).add(safeIndex)
      setUnlocked(unlockedRef.current)
      setDialogue(character.quote)

      bump('stage')
      bump('bubble')

      if (playSound && soundEnabled) playBoing()
    },
    [bump, characters, soundEnabled],
  )

  const addCount = useCallback(
    (amount = 1, event) => {
      const nextCount = countRef.current + amount
      countRef.current = nextCount
      setCount(nextCount)

      const now = Date.now()
      historyRef.current = [
        ...historyRef.current.filter((time) => now - time < 2000),
        now,
      ]
      setClickHistory(historyRef.current)

      bump('counter')

      const characterIndex = (nextCount - 1) % characters.length
      selectCharacter(characterIndex)

      if (soundEnabled) {
        playTing(1 + (nextCount % 8) * 0.1)
      }

      const character = characters[characterIndex]
      const pool = character.particlePool || DEFAULT_PARTICLES
      const particleText = amount === 1
        ? pool[Math.floor(Math.random() * pool.length)]
        : `+${amount} BRAINROT RUSH! 🔥`
      spawnParticle(particleText, event)
    },
    [bump, characters, selectCharacter, soundEnabled, spawnParticle],
  )

  const shoutQuote = useCallback(
    (text) => {
      setDialogue(text)
      bump('bubble')
      if (soundEnabled) playBoing()
      spawnParticle('📢 SHOUT!', null)
    },
    [bump, soundEnabled, spawnParticle],
  )

  const toggleSound = useCallback(() => {
    setSoundEnabled((previous) => {
      const enabled = !previous
      if (enabled) playBoing()
      return enabled
    })
  }, [])

  const reset = useCallback(() => {
    countRef.current = 0
    historyRef.current = []
    unlockedRef.current = makeInitialUnlocked(characters, unlockAllInitially)

    setCount(0)
    setClickHistory([])
    setUnlocked(unlockedRef.current)
    setCurrentIndex(0)
    setDialogue(characters[0].quote)
    setParticles([])
    bump('counter')
    bump('stage')
    bump('bubble')

    if (soundEnabled) playBoing()
  }, [bump, characters, soundEnabled, unlockAllInitially])

  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = event.target?.tagName
      if (['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      if (event.code === 'Space' || event.key === 'Enter') {
        event.preventDefault()
        addCount(1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [addCount])

  const rank = useMemo(() => calculateRank(count), [count])
  const cps = useMemo(() => (clickHistory.length / 2).toFixed(1), [clickHistory])
  const combo = useMemo(
    () => Math.min(10, Math.max(1, Math.floor(clickHistory.length / 1.5))),
    [clickHistory],
  )
  const remaining = rank.nextReq === null ? null : rank.nextReq - count
  const nextRankLabel = remaining === null
    ? 'MAXED OUT!'
    : remaining === rank.nextReq
      ? `${rank.nextReq} Clicks`
      : `${remaining} more`

  return {
    count,
    combo,
    cps,
    rank,
    nextRankLabel,
    unlockedCount: unlocked.size,
    currentIndex,
    currentCharacter: characters[currentIndex],
    dialogue,
    particles,
    pulse,
    soundEnabled,
    addCount,
    selectCharacter,
    shoutQuote,
    toggleSound,
    reset,
  }
}
