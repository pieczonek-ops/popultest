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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 blue-gradient rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter blue-text-gradient">GAMERGOLD</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-600">Newsy</a>
            <a href="/esports" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-600">Esport</a>
            <a href="/videos" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-600">Wideo</a>
            <a href="/forum" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-600">Dyskusje</a>
            <a href="/store" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1">
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
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-blue-600 transition-colors text-gray-600">
                  <span>{cat.name}</span>
                  <ChevronDown size={14} className={cn("transition-transform", activeMegaMenu === cat.name && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === cat.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-white border border-gray-100 rounded-b-xl p-6 shadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">Kategorie</h3>
                          <ul className="space-y-2">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <a href={`/category/${cat.name.toLowerCase()}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center items-center text-center">
                          <cat.icon size={32} className="text-blue-600 mb-2" />
                          <p className="text-xs text-gray-400">Odkryj najnowsze wieści ze świata {cat.name}</p>
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
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            <a href="/cart" className="relative text-gray-400 hover:text-blue-600 transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </a>
            <a href={`/profile/${currentUser.id}`} className="flex items-center space-x-3 p-1 pr-4 bg-gray-50 border border-gray-100 rounded-full hover:border-blue-600 transition-all group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 group-hover:border-blue-600 transition-colors">
                <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600 transition-colors">{currentUser.username}</span>
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
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="/forum" onClick={() => setIsOpen(false)} className="block py-2 text-blue-600 font-bold">Dyskusje</a>
              {categories.map((cat) => (
                <div key={cat.name} className="py-2">
                  <div className="flex items-center space-x-2 text-blue-600 font-bold mb-2">
                    <cat.icon size={18} />
                    <span>{cat.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pl-6">
                    {cat.items.map((item) => (
                      <a
                        key={item}
                        href={`/category/${cat.name.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-gray-500 py-1 hover:text-blue-600 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <a 
                  href={`/profile/${currentUser.id}`} 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-lg blue-gradient text-white font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-200"
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
