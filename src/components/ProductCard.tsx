import React from 'react';
import { Link } from './Link';
import { ShoppingCart, Star, Globe } from 'lucide-react';
import { Product } from '../data/mockData';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-dark-surface border border-dark-border rounded-xl overflow-hidden flex flex-col h-full relative"
    >
      <Link to={`/store/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center space-x-1 text-gold">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            {product.platform}
          </span>
          <div className="flex items-center text-[10px] text-gray-500 space-x-1">
            <Globe size={10} />
            <span>{product.region}</span>
          </div>
        </div>
        
        <Link to={`/store/product/${product.id}`} className="hover:text-gold transition-colors">
          <h3 className="text-sm font-bold mb-3 line-clamp-2 h-10">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex items-baseline space-x-2 mb-3">
            <span className="text-xl font-bold text-white">{product.price.toFixed(2)} zł</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">{product.originalPrice.toFixed(2)} zł</span>
            )}
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-2 bg-gold/10 border border-gold/30 text-gold text-xs font-bold rounded-lg hover:bg-gold hover:text-black transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={14} />
            <span>Do koszyka</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
