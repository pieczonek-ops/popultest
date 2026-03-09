import React from 'react';
import { Link } from '../../components/Link';
import { useCart } from '../../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const CartPage = () => {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-12">Twój <span className="text-gold">Koszyk</span></h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-dark-surface rounded-3xl border border-dark-border">
            <ShoppingBag size={64} className="mx-auto text-gray-600 mb-6" />
            <p className="text-xl text-gray-400 mb-8">Twój koszyk jest pusty.</p>
            <Link to="/store" className="px-8 py-4 gold-gradient text-black font-bold rounded-xl hover:scale-105 transition-transform inline-block">
              Przejdź do sklepu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:flex-grow space-y-4">
              {cart.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  className="bg-dark-surface border border-dark-border rounded-xl p-4 flex items-center gap-6"
                >
                  <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{item.platform} | {item.region}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">Ilość: {item.quantity}</div>
                      <div className="text-xl font-bold text-gold">{(item.price * item.quantity).toFixed(2)} zł</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <aside className="lg:w-96">
              <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 sticky top-32">
                <h2 className="text-xl font-bold mb-6">Podsumowanie</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400">
                    <span>Produkty ({totalItems})</span>
                    <span>{totalPrice.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Dostawa</span>
                    <span className="text-green-500">Gratis (Cyfrowa)</span>
                  </div>
                  <div className="h-px bg-dark-border my-4" />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Razem</span>
                    <span className="text-gold">{totalPrice.toFixed(2)} zł</span>
                  </div>
                </div>

                <button className="w-full py-4 gold-gradient text-black font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 mb-6">
                  <span>Przejdź do płatności</span>
                  <ArrowRight size={20} />
                </button>

                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <ShieldCheck size={14} className="text-green-500" />
                  <span>Bezpieczna transakcja szyfrowana SSL</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
