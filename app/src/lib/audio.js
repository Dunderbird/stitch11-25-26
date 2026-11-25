// Tiny sound effects made in the browser, so there are no sound files to load.

let audioContext = null

function getAudioContext() {
  const BrowserAudioContext = window.AudioContext || window.webkitAudioContext
  if (!BrowserAudioContext) return null

  if (!audioContext) {
    audioContext = new BrowserAudioContext()
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  return audioContext
}

function playTone({ start, end, type, duration }) {
  const context = getAudioContext()
  if (!context) return

  try {
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(start, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(
      end,
      context.currentTime + duration * 0.6,
    )

    gain.gain.setValueAtTime(0.3, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration)

    oscillator.connect(gain)
    gain.connect(context.destination)

    oscillator.start()
    oscillator.stop(context.currentTime + duration + 0.02)
  } catch {
    // Sound is a bonus. If the browser blocks it, the app still works.
  }
}

export function playTing(multiplier = 1) {
  const base = 480 * multiplier
  playTone({
    start: base,
    end: base * 2.1,
    type: 'triangle',
    duration: 0.28,
  })
}

export function playBoing() {
  playTone({
    start: 220,
    end: 750,
    type: 'sine',
    duration: 0.22,
  })
}
