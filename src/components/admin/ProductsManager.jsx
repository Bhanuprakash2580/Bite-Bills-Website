import { useState } from 'react'
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-hot-toast'
import { formatCurrency } from '../../lib/utils'

export default function ProductsManager({ products }) {
  const [editingId, setEditingId] = useState(null)
  
  // This would ideally open a modal for full CRUD
  const handleToggleAvailability = async (product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_available: !product.is_available })
        .eq('id', product.id)
      
      if (error) throw error
      toast.success(`${product.name} is now ${!product.is_available ? 'In Stock' : 'Out of Stock'}`)
    } catch (error) {
      toast.error('Failed to update availability')
      console.error(error)
    }
  }

  return (
    <div className="bg-darkBg2 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-2xl font-syne font-bold text-cream">Products Manager</h2>
        <button 
          className="bg-gold text-darkBg px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-goldLight transition-colors"
          onClick={() => toast('Full product creation opening soon!', { icon: '🚧' })}
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-darkBg border border-white/5 rounded-xl overflow-hidden flex flex-col">
              {/* Image Header */}
              <div className="h-40 relative bg-black/20 group">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-white/20">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="bg-red-500/20 p-2 rounded-full hover:bg-red-500/40 text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-cream leading-tight">{product.name}</h4>
                </div>
                
                <div className="text-sm text-gold font-bold mb-4">
                  {formatCurrency(product.base_price)}
                </div>

                {/* Quick Toggle */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm text-white/50">Status</span>
                  <button
                    onClick={() => handleToggleAvailability(product)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      product.is_available 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                  >
                    {product.is_available ? 'In Stock' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
