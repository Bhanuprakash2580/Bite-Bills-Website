export default function SkeletonCard() {
  return (
    <div className="bg-darkBg2 rounded-xl border border-white/5 overflow-hidden animate-pulse">
      <div className="w-full aspect-[4/3] bg-white/5"></div>
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="h-6 bg-white/10 rounded w-2/3"></div>
          <div className="h-5 bg-white/10 rounded-full w-16"></div>
        </div>
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-4/5"></div>
        <div className="pt-4 flex justify-between items-center border-t border-white/5">
          <div className="h-6 bg-white/10 rounded w-20"></div>
          <div className="h-10 bg-white/10 rounded w-28"></div>
        </div>
      </div>
    </div>
  )
}