export default function BackgroundGlows() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-100 rounded-full blur-[160px] opacity-40" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600 rounded-full blur-[150px]" />
    </div>
  )
}
