import React, { useState, useEffect } from 'react';
import { Link } from '../../components/Link';
import { articles as mockArticles, products, esportMatches, videos } from '../../data/mockData';
import { NewsCard } from '../../components/NewsCard';
import { motion } from 'motion/react';
import { TrendingUp, Zap, Star, Hash, Gamepad2, ShoppingBag, Trophy, Play, ChevronRight, Clock, Eye, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'PC' | 'Console' | 'Mobile' | 'Esports' | 'Hardware';
  author: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

const PlatformList = () => {
  const platforms = [
    { name: 'PC', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 17.1L9.75 21.9V12.3H0V20.549zM10.5 1.95L24 0V11.7H10.5V1.95zm0 20.1L24 24V12.3H10.5V22.05z" />
      </svg>
    )},
    { name: 'PlayStation', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-15h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4z" />
      </svg>
    )},
    { name: 'Xbox', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
      </svg>
    )},
    { name: 'Switch', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-15h2v10h-2V7zm-4 0h2v10H7V7zm8 0h2v10h-2V7z" />
      </svg>
    )},
  ];

  return (
    <div className="flex items-center justify-center space-x-12 py-8 bg-white border-y border-gray-100 mb-12 overflow-x-auto no-scrollbar">
      {platforms.map((p) => (
        <Link 
          key={p.name} 
          to={`/category/${p.name.toLowerCase()}`}
          className="flex flex-col items-center space-y-2 text-gray-400 hover:text-blue-600 transition-all group min-w-[80px]"
        >
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:border-blue-600 group-hover:scale-110 transition-all">
            {p.icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">{p.name}</span>
        </Link>
      ))}
    </div>
  );
};

export const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, 'articles'), orderBy('date', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
        
        if (fetched.length > 0) {
          setArticles(fetched);
        } else {
          // Fallback to mock data if Firestore is empty
          setArticles(mockArticles as Article[]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles(mockArticles as Article[]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const heroGridArticles = articles.filter(a => a.id !== featuredArticle.id).slice(0, 4);
  const recentArticles = articles.filter(a => a.id !== featuredArticle.id && !heroGridArticles.find(h => h.id === a.id)).slice(0, 6);
  
  const popularTopics = ['Cyberpunk 2077', 'Elden Ring', 'GTA VI', 'RTX 5090', 'PS5 Pro', 'Esport'];
  const hotDeals = products.filter(p => p.originalPrice).slice(0, 4);
  const upcomingMatches = esportMatches.filter(m => m.status !== 'finished').slice(0, 3);
  const videoHighlights = videos.slice(0, 3);

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Main Hero News */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <Link to={`/article/${featuredArticle.id}`} className="block h-full">
              <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-widest">
                    {featuredArticle.category}
                  </span>
                  <span className="text-white/80 text-xs font-medium">{featuredArticle.date}</span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 leading-tight">
                  {featuredArticle.title}
                </h1>
                <p className="text-white/70 text-sm md:text-base line-clamp-2 max-w-lg">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Hero Grid News (4 Tiles) */}
          <div className="grid grid-cols-2 gap-4 aspect-square lg:aspect-auto lg:h-[600px]">
            {heroGridArticles.map((article, idx) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative group rounded-2xl overflow-hidden shadow-lg h-full"
              >
                <Link to={`/article/${article.id}`} className="block h-full">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="text-blue-400 text-[9px] font-bold uppercase tracking-widest mb-1 block">
                      {article.category}
                    </span>
                    <h3 className="text-white font-bold text-xs md:text-sm lg:text-base line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <PlatformList />
      </div>

      {/* Hot Deals & Esport Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Hot Deals */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold flex items-center space-x-3">
                <ShoppingBag className="text-blue-600" />
                <span>Gorące Oferty</span>
              </h2>
              <Link to="/store" className="text-blue-600 text-sm font-bold flex items-center space-x-1 hover:underline">
                <span>Sklep</span>
                <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotDeals.map(product => (
                <Link key={product.id} to={`/store/product/${product.id}`} className="group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 border border-gray-100">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                      -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                    </div>
                  </div>
                  <h3 className="text-sm font-bold truncate group-hover:text-blue-600 transition-colors text-gray-900">{product.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-600 font-bold">{product.price.toFixed(2)} zł</span>
                    <span className="text-gray-400 text-xs line-through">{product.originalPrice?.toFixed(2)} zł</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Esport Matches */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold flex items-center space-x-3">
                <Trophy className="text-blue-600" />
                <span>Esport Live</span>
              </h2>
              <Link to="/esports" className="text-blue-600 text-sm font-bold flex items-center space-x-1 hover:underline">
                <span>Więcej</span>
                <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingMatches.map(match => (
                <div key={match.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{match.game}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${match.status === 'live' ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
                      {match.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-900">{match.teamA}</span>
                    <div className="bg-white px-3 py-1 rounded border border-gray-100 font-mono text-sm font-bold text-blue-600">
                      {match.status === 'upcoming' ? 'vs' : `${match.scoreA} : ${match.scoreB}`}
                    </div>
                    <span className="font-bold text-sm text-gray-900">{match.teamB}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold flex items-center space-x-3">
              <Play className="text-blue-600" fill="currentColor" />
              <span>Wideo Highlights</span>
            </h2>
            <Link to="/videos" className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:border-blue-600 hover:text-blue-600 transition-all text-gray-600">
              Zobacz wszystkie
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoHighlights.map(video => (
              <Link key={video.id} to={`/videos/${video.id}`} className="group">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-lg">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/90 text-white text-[10px] font-bold rounded font-mono">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-blue-600/90 flex items-center justify-center shadow-2xl">
                      <Play size={24} fill="white" className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 text-gray-900">{video.title}</h3>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{video.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content (News) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* News Grid */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-display font-bold flex items-center space-x-3">
                <TrendingUp className="text-blue-600" />
                <span>Najnowsze Wiadomości</span>
              </h2>
              <div className="h-px flex-grow mx-8 bg-gray-100 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="px-10 py-4 border border-gray-200 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all font-bold">
                Załaduj więcej
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            {/* Popular Topics Widget */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center space-x-2 text-gray-900">
                <Hash className="text-blue-600" size={20} />
                <span>Popularne tematy</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map(topic => (
                  <button key={topic} className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-all">
                    #{topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Articles Widget */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center space-x-2 text-gray-900">
                <Star className="text-blue-600" size={20} />
                <span>Popularne teraz</span>
              </h3>
              <div className="space-y-6">
                {articles.slice(0, 4).map((article, idx) => (
                  <div key={article.id} className="flex space-x-4 group cursor-pointer">
                    <span className="text-4xl font-display font-bold text-gray-200 group-hover:text-blue-600 transition-colors">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold group-hover:text-blue-600 transition-colors line-clamp-2 text-sm text-gray-900">
                        {article.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{article.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-display font-bold mb-2">Bądź na bieżąco</h3>
              <p className="text-white/70 mb-6 text-sm">Zapisz się do newslettera i otrzymuj najważniejsze newsy prosto na maila.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Twój adres email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder:text-white/40 focus:outline-none focus:ring-2 ring-white/20"
                />
                <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-white/90 transition-colors">
                  Zapisz się
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <Gamepad2 className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold tracking-tighter text-blue-600">GAMERGOLD</span>
              </Link>
              <p className="text-gray-500 max-w-sm">
                Najlepsze źródło informacji o grach wideo, sprzęcie i esporcie. Tworzone przez graczy dla graczy.
              </p>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Kategorie</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><Link to="/category/pc" className="hover:text-blue-600 transition-colors">PC Gaming</Link></li>
                <li><Link to="/category/console" className="hover:text-blue-600 transition-colors">Konsole</Link></li>
                <li><Link to="/category/hardware" className="hover:text-blue-600 transition-colors">Sprzęt</Link></li>
                <li><Link to="/category/esports" className="hover:text-blue-600 transition-colors">Esport</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Portal</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><Link to="#" className="hover:text-blue-600 transition-colors">O nas</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Redakcja</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Kontakt</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Reklama</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:row justify-between items-center text-gray-400 text-xs">
            <p>© 2024 GamerGold. Wszelkie prawa zastrzeżone.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-blue-600">Polityka prywatności</Link>
              <Link to="#" className="hover:text-blue-600">Regulamin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
