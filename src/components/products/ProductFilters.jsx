import { Search, SlidersHorizontal } from 'lucide-react'

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
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
      
      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2.5 rounded-full font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'all' 
              ? 'bg-gold text-darkBg' 
              : 'bg-white/5 text-white/80 hover:bg-white/10'
          }`}
        >
          All Treats
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full font-medium transition-colors whitespace-nowrap capitalize border ${
              activeCategory === category 
                ? 'bg-white text-darkBg border-white shadow-xl' 
                : 'border-white/10 text-white/80 hover:bg-white/5'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search and Sort */}
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-64">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-darkBg2 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        
        <div className="relative group">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-darkBg2 border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-white focus:outline-none focus:border-gold transition-colors cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="bestselling">Bestselling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="new">Newest</option>
          </select>
          <SlidersHorizontal className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
