export default function FeatureStrip() {
  const features = [
    { icon: "🧈", text: "100% Real Butter" },
    { icon: "🍫", text: "Premium Belgian Chocolate" },
    { icon: "🚫", text: "Zero Preservatives" },
    { icon: "🛵", text: "Fresh Doorstep Delivery" },
  ]

  return (
    <div className="bg-darkBg2 border-y border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center text-center">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-4xl drop-shadow-sm">{feature.icon}</span>
              <span className="text-sm font-medium text-cream">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}