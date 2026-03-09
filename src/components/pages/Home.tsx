import React from 'react';
import { Link } from '../../components/Link';
import { articles, products, esportMatches, videos } from '../../data/mockData';
import { NewsCard } from '../../components/NewsCard';
import { motion } from 'motion/react';
import { TrendingUp, Zap, Star, Hash, Gamepad2, ShoppingBag, Trophy, Play, ChevronRight, Clock, Eye } from 'lucide-react';

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
    <div className="flex items-center justify-center space-x-12 py-8 bg-dark-surface/50 border-y border-dark-border mb-12 overflow-x-auto no-scrollbar">
      {platforms.map((p) => (
        <Link 
          key={p.name} 
          to={`/category/${p.name.toLowerCase()}`}
          className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gold transition-all group min-w-[80px]"
        >
          <div className="p-4 rounded-2xl bg-dark-bg border border-dark-border group-hover:border-gold group-hover:scale-110 transition-all">
            {p.icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">{p.name}</span>
        </Link>
      ))}
    </div>
  );
};

export const Home = () => {
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const recentArticles = articles.filter(a => !a.featured).slice(0, 6);
  const popularTopics = ['Cyberpunk 2077', 'Elden Ring', 'GTA VI', 'RTX 5090', 'PS5 Pro', 'Esport'];
  const hotDeals = products.filter(p => p.originalPrice).slice(0, 4);
  const upcomingMatches = esportMatches.filter(m => m.status !== 'finished').slice(0, 3);
  const videoHighlights = videos.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredArticle.imageUrl} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-2 mb-6">
              <span className="gold-gradient p-1 rounded">
                <Zap size={16} className="text-black" />
              </span>
              <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Najgorętszy News Dnia</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              {featuredArticle.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 line-clamp-3">
              {featuredArticle.excerpt}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={`/article/${featuredArticle.id}`} className="px-8 py-4 gold-gradient text-black font-bold rounded-lg hover:scale-105 transition-transform">
                Czytaj artykuł
              </Link>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                Wszystkie newsy
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platforms List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <PlatformList />
      </div>

      {/* Hot Deals & Esport Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Hot Deals */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold flex items-center space-x-3">
                <ShoppingBag className="text-gold" />
                <span>Gorące Oferty</span>
              </h2>
              <Link to="/store" className="text-gold text-sm font-bold flex items-center space-x-1 hover:underline">
                <span>Sklep</span>
                <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotDeals.map(product => (
                <Link key={product.id} to={`/store/product/${product.id}`} className="group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 border border-dark-border">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                      -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                    </div>
                  </div>
                  <h3 className="text-sm font-bold truncate group-hover:text-gold transition-colors">{product.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gold font-bold">{product.price.toFixed(2)} zł</span>
                    <span className="text-gray-500 text-xs line-through">{product.originalPrice?.toFixed(2)} zł</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Esport Matches */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold flex items-center space-x-3">
                <Trophy className="text-gold" />
                <span>Esport Live</span>
              </h2>
              <Link to="/esports" className="text-gold text-sm font-bold flex items-center space-x-1 hover:underline">
                <span>Więcej</span>
                <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingMatches.map(match => (
                <div key={match.id} className="bg-dark-surface border border-dark-border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{match.game}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${match.status === 'live' ? 'bg-red-600 text-white animate-pulse' : 'bg-gold/10 text-gold'}`}>
                      {match.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{match.teamA}</span>
                    <div className="bg-black/50 px-3 py-1 rounded border border-dark-border font-mono text-sm font-bold text-gold">
                      {match.status === 'upcoming' ? 'vs' : `${match.scoreA} : ${match.scoreB}`}
                    </div>
                    <span className="font-bold text-sm">{match.teamB}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="bg-dark-surface/30 border-y border-dark-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold flex items-center space-x-3">
              <Play className="text-gold" fill="currentColor" />
              <span>Wideo Highlights</span>
            </h2>
            <Link to="/videos" className="px-6 py-2 border border-dark-border rounded-lg text-sm font-bold hover:border-gold hover:text-gold transition-all">
              Zobacz wszystkie
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoHighlights.map(video => (
              <Link key={video.id} to={`/videos/${video.id}`} className="group">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-dark-border shadow-lg">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/90 text-white text-[10px] font-bold rounded font-mono">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center shadow-2xl">
                      <Play size={24} fill="black" className="text-black ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold group-hover:text-gold transition-colors line-clamp-2 mb-2">{video.title}</h3>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                <TrendingUp className="text-gold" />
                <span>Najnowsze Wiadomości</span>
              </h2>
              <div className="h-px flex-grow mx-8 bg-dark-border hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="px-10 py-4 border border-dark-border rounded-xl text-gray-400 hover:text-gold hover:border-gold transition-all">
                Załaduj więcej
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            {/* Popular Topics Widget */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center space-x-2">
                <Hash className="text-gold" size={20} />
                <span>Popularne tematy</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map(topic => (
                  <button key={topic} className="px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-xs font-bold text-gray-400 hover:text-gold hover:border-gold transition-all">
                    #{topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Articles Widget */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center space-x-2">
                <Star className="text-gold" size={20} />
                <span>Popularne teraz</span>
              </h3>
              <div className="space-y-6">
                {articles.slice(0, 4).map((article, idx) => (
                  <div key={article.id} className="flex space-x-4 group cursor-pointer">
                    <span className="text-4xl font-display font-bold text-dark-border group-hover:text-gold transition-colors">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold group-hover:text-gold transition-colors line-clamp-2 text-sm">
                        {article.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{article.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="gold-gradient rounded-2xl p-8 text-black">
              <h3 className="text-2xl font-display font-bold mb-2">Bądź na bieżąco</h3>
              <p className="text-black/70 mb-6 text-sm">Zapisz się do newslettera i otrzymuj najważniejsze newsy prosto na maila.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Twój adres email" 
                  className="w-full px-4 py-3 bg-black/10 border border-black/20 rounded-lg placeholder:text-black/40 focus:outline-none focus:ring-2 ring-black/20"
                />
                <button className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-black/80 transition-colors">
                  Zapisz się
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark-border py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 gold-gradient rounded flex items-center justify-center">
                  <Gamepad2 className="text-black" size={18} />
                </div>
                <span className="text-xl font-bold tracking-tighter gold-text-gradient">GAMERGOLD</span>
              </Link>
              <p className="text-gray-400 max-w-sm">
                Najlepsze źródło informacji o grach wideo, sprzęcie i esporcie. Tworzone przez graczy dla graczy.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Kategorie</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/category/pc" className="hover:text-gold transition-colors">PC Gaming</Link></li>
                <li><Link to="/category/console" className="hover:text-gold transition-colors">Konsole</Link></li>
                <li><Link to="/category/hardware" className="hover:text-gold transition-colors">Sprzęt</Link></li>
                <li><Link to="/category/esports" className="hover:text-gold transition-colors">Esport</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Portal</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="#" className="hover:text-gold transition-colors">O nas</Link></li>
                <li><Link to="#" className="hover:text-gold transition-colors">Redakcja</Link></li>
                <li><Link to="#" className="hover:text-gold transition-colors">Kontakt</Link></li>
                <li><Link to="#" className="hover:text-gold transition-colors">Reklama</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:row justify-between items-center text-gray-500 text-xs">
            <p>© 2024 GamerGold. Wszelkie prawa zastrzeżone.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-gold">Polityka prywatności</Link>
              <Link to="#" className="hover:text-gold">Regulamin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
