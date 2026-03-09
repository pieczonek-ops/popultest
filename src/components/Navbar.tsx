import React, { useState } from 'react';
import { Menu, X, ChevronDown, Search, Gamepad2, Cpu, Monitor, Smartphone, Trophy, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { currentUser } from '../data/mockData';

const categories = [
  { name: 'PC', icon: Monitor, items: ['Newsy', 'Recenzje', 'Poradniki', 'Premiery'] },
  { name: 'Konsole', icon: Gamepad2, items: ['PlayStation', 'Xbox', 'Nintendo', 'Akcesoria'] },
  { name: 'Hardware', icon: Cpu, items: ['Karty Graficzne', 'Procesory', 'Laptopy', 'Testy'] },
  { name: 'Esport', icon: Trophy, items: ['League of Legends', 'CS2', 'Valorant', 'Turnieje'] },
  { name: 'Mobile', icon: Smartphone, items: ['Android', 'iOS', 'Gry Cloud', 'Sprzęt'] },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter gold-text-gradient">GAMERGOLD</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium hover:text-gold transition-colors">Newsy</a>
            <a href="/esports" className="text-sm font-medium hover:text-gold transition-colors">Esport</a>
            <a href="/videos" className="text-sm font-medium hover:text-gold transition-colors">Wideo</a>
            <a href="/forum" className="text-sm font-medium hover:text-gold transition-colors">Dyskusje</a>
            <a href="/store" className="text-sm font-medium text-gold hover:text-gold-light transition-colors flex items-center space-x-1">
              <ShoppingBag size={16} />
              <span>Sklep</span>
            </a>
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setActiveMegaMenu(cat.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-gold transition-colors">
                  <span>{cat.name}</span>
                  <ChevronDown size={14} className={cn("transition-transform", activeMegaMenu === cat.name && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === cat.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-dark-surface border border-dark-border rounded-b-xl p-6 shadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Kategorie</h3>
                          <ul className="space-y-2">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <a href={`/category/${cat.name.toLowerCase()}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-dark-bg/50 rounded-lg p-4 flex flex-col justify-center items-center text-center">
                          <cat.icon size={32} className="text-gold mb-2" />
                          <p className="text-xs text-gray-500">Odkryj najnowsze wieści ze świata {cat.name}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="text-gray-400 hover:text-gold transition-colors">
              <Search size={20} />
            </button>
            <a href="/cart" className="relative text-gray-400 hover:text-gold transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </a>
            <a href={`/profile/${currentUser.id}`} className="flex items-center space-x-3 p-1 pr-4 bg-dark-surface border border-dark-border rounded-full hover:border-gold transition-all group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-dark-border group-hover:border-gold transition-colors">
                <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold text-gray-300 group-hover:text-gold transition-colors">{currentUser.username}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-surface border-b border-dark-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="/forum" onClick={() => setIsOpen(false)} className="block py-2 text-gold font-bold">Dyskusje</a>
              {categories.map((cat) => (
                <div key={cat.name} className="py-2">
                  <div className="flex items-center space-x-2 text-gold font-bold mb-2">
                    <cat.icon size={18} />
                    <span>{cat.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pl-6">
                    {cat.items.map((item) => (
                      <a
                        key={item}
                        href={`/category/${cat.name.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-gray-400 py-1"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-dark-border">
                <a 
                  href={`/profile/${currentUser.id}`} 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-lg gold-gradient text-black font-bold flex items-center justify-center space-x-2"
                >
                  <User size={18} />
                  <span>Mój Profil ({currentUser.username})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
