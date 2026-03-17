import React, { useState, useEffect } from 'react';
import { products as mockProducts, type Product } from '../../data/mockData';
import { ProductCard } from '../../components/ProductCard';
import { motion } from 'motion/react';
import { Search, Filter, Tag, Zap, ShieldCheck, Headphones, RefreshCcw, TrendingUp, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const StoreHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'store'));
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        
        // Merge with mock products, avoiding duplicates by ID
        const merged = [...fetched];
        mockProducts.forEach(mp => {
          if (!merged.find(p => p.id === mp.id)) {
            merged.push(mp);
          }
        });
        setProducts(merged);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }
  
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredProducts = products.slice(0, 4);
  const bestSellers = filteredProducts.slice(0, 8);
  const popularGames = [...products].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 5);

  return (
    <div className="pt-20">
      {/* Store Hero */}
      <section className="bg-dark-surface border-b border-dark-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Graj więcej, <span className="text-gold">płać mniej.</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Tysiące kluczy do gier w najlepszych cenach. Steam, Origin, Epic Games i wiele więcej. Błyskawiczna dostawa 24/7.
              </p>
              <div className="relative max-w-md">
                <input 
                  type="text" 
                  placeholder="Szukaj gier, DLC, kart podarunkowych..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:border-gold transition-colors pr-12"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {featuredProducts.map((p) => (
                <div key={p.id} className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-bold text-gold mb-1">{p.price.toFixed(2)} zł</p>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{p.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b border-dark-border bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-gold" size={24} />
              <div>
                <p className="text-sm font-bold">Bezpieczne płatności</p>
                <p className="text-xs text-gray-500">100% ochrony kupującego</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="text-gold" size={24} />
              <div>
                <p className="text-sm font-bold">Natychmiastowa dostawa</p>
                <p className="text-xs text-gray-500">Klucz w kilka sekund</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Headphones className="text-gold" size={24} />
              <div>
                <p className="text-sm font-bold">Wsparcie 24/7</p>
                <p className="text-xs text-gray-500">Zawsze gotowi do pomocy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCcw className="text-gold" size={24} />
              <div>
                <p className="text-sm font-bold">Najlepsze ceny</p>
                <p className="text-xs text-gray-500">Gwarancja najniższej ceny</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Store Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-8">
            {/* Most Popular Games Widget */}
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <TrendingUp size={18} className="text-gold" />
                <span>Najpopularniejsze</span>
              </h3>
              <div className="space-y-4">
                {popularGames.map((game, idx) => (
                  <div key={game.id} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-gold transition-colors">{game.title}</h4>
                      <p className="text-[10px] text-gold">{game.price.toFixed(2)} zł</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Filter size={18} className="text-gold" />
                <span>Filtry</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Platforma</p>
                  <div className="space-y-2">
                    {['Steam', 'Epic Games', 'PSN', 'Xbox', 'Nintendo'].map(p => (
                      <label key={p} className="flex items-center space-x-2 cursor-pointer group">
                        <div className="w-4 h-4 border border-dark-border rounded group-hover:border-gold transition-colors" />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Gatunek</p>
                  <div className="space-y-2">
                    {['RPG', 'Akcja', 'FPS', 'Strategiczne', 'Sportowe'].map(g => (
                      <label key={g} className="flex items-center space-x-2 cursor-pointer group">
                        <div className="w-4 h-4 border border-dark-border rounded group-hover:border-gold transition-colors" />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
              <Tag className="text-gold mb-4" size={24} />
              <h4 className="font-bold mb-2">Masz kod rabatowy?</h4>
              <p className="text-xs text-gray-500 mb-4">Użyj go w koszyku, aby obniżyć cenę swojego zamówienia.</p>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:flex-grow">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold">
                {searchQuery ? `Wyniki dla: "${searchQuery}"` : 'Bestsellery'}
              </h2>
              <select className="bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold">
                <option>Najpopularniejsze</option>
                <option>Cena: od najniższej</option>
                <option>Cena: od najwyższej</option>
                <option>Najnowsze</option>
              </select>
            </div>

            {bestSellers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-dark-surface rounded-2xl border border-dark-border">
                <p className="text-gray-500">Nie znaleziono gier pasujących do Twojego wyszukiwania.</p>
              </div>
            )}

            <div className="mt-12 p-8 bg-dark-surface border border-dark-border rounded-2xl text-center">
              <h3 className="text-xl font-bold mb-4">Nie znalazłeś tego, czego szukasz?</h3>
              <p className="text-gray-400 mb-6">Nasza oferta powiększa się każdego dnia. Sprawdź ponownie jutro!</p>
              <button className="px-8 py-3 gold-gradient text-black font-bold rounded-lg">
                Zobacz wszystkie gry
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
