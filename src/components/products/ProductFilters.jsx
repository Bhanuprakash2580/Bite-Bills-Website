import { Search, SlidersHorizontal } from 'lucide-react'
import { CATEGORY_LABELS } from '../../constants/products'

export default function ProductFilters({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery,
  sortBy,
  setSortBy
}) {
  return (
    <div className="flex flex-col gap-5 mb-12">

      {/* ── Category Pills ── */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-gold text-darkBg shadow-lg shadow-gold/20'
              : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
          }`}
        >
          🌟 All Treats
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap border ${
              activeCategory === category
                ? 'bg-white text-darkBg border-white shadow-xl'
                : 'border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {CATEGORY_LABELS[category] || category}
          </button>
        ))}
      </div>

      {/* ── Search + Sort ── */}
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-darkBg2 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-gold/50 transition"
          />
        </div>
        
        <div className="relative">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-darkBg2 border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-white text-sm focus:outline-none focus:border-gold/50 transition cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="bestselling">Bestselling</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="new">Newest</option>
          </select>
          <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
