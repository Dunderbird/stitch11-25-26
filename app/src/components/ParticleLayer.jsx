export default function ParticleLayer({ particles }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle font-meme"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            color: particle.color,
            fontSize: particle.fontSize,
            textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 0 10px rgba(245, 158, 11, 0.5)',
            '--tx': particle.tx,
            '--ty': particle.ty,
            '--tr': particle.tr,
          }}
        >
          {particle.text}
        </div>
      ))}
    </div>
  )
}
