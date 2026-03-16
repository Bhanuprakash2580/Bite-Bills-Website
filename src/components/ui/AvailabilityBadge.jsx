import { cn } from "../../lib/utils"

export default function AvailabilityBadge({ isAvailable, className }) {
  return (
    <div 
      className={cn(
        "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md z-10 flex items-center gap-1",
        isAvailable 
          ? "bg-green-100 text-green-800 border border-green-200" 
          : "bg-red-100 text-red-800 border border-red-200",
        className
      )}
    >
      {isAvailable ? (
        <>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Available
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Out of Stock
        </>
      )}
    </div>
  )
}