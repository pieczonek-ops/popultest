import React from 'react';
import { Link } from '../../components/Link';
import { articles } from '../../data/mockData';
import { Calendar, User, Share2, MessageCircle, Bookmark, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const ArticlePage = ({ id }: { id?: string }) => {
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl">Artykuł nie został znaleziony</h1>
        <Link to="/" className="text-gold mt-4 inline-block">Wróć do strony głównej</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link to={`/category/${article.category.toLowerCase()}`} className="px-3 py-1 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              {article.category}
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-gold" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gold" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle size={16} className="text-gold" />
                <span>12 komentarzy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Social Share (Sticky) */}
          <aside className="hidden lg:block w-16">
            <div className="sticky top-32 flex flex-col items-center space-y-6">
              <button className="w-12 h-12 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all">
                <Share2 size={20} />
              </button>
              <button className="w-12 h-12 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all">
                <Bookmark size={20} />
              </button>
              <div className="h-20 w-px bg-dark-border" />
              <span className="text-[10px] uppercase tracking-widest text-gray-500 vertical-text">Share</span>
            </div>
          </aside>

          {/* Center: Article Body */}
          <article className="lg:flex-grow max-w-3xl">
            <div className="prose prose-invert prose-gold max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-medium italic">
                {article.excerpt}
              </p>
              
              <div className="text-gray-400 leading-loose space-y-6 text-lg">
                <p>{article.content}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
                </p>
                
                <div className="my-12 p-8 bg-dark-surface border-l-4 border-gold rounded-r-2xl italic text-xl text-white">
                  "To przełomowy moment dla całej branży. Nikt nie spodziewał się tak radykalnych zmian w tak krótkim czasie."
                </div>

                <p>
                  Mauris egestas at nibh nec finibus. Ghenreri t arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris egestas at nibh nec finibus.
                </p>

                <img 
                  src={`https://picsum.photos/seed/${article.id}2/800/450`} 
                  alt="Article detail" 
                  className="rounded-2xl w-full my-10"
                  referrerPolicy="no-referrer"
                />

                <p>
                  Donec id justo. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Nulla neque. Vivamus consectetuer hendrerit lacus. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-dark-border flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-widest mr-4 self-center">Tagi:</span>
              {['Gaming', 'News', article.category, '2024'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-400 hover:text-gold hover:border-gold cursor-pointer transition-all">
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Right: Related News */}
          <aside className="lg:w-80 space-y-8">
            <h3 className="text-xl font-display font-bold border-b border-gold pb-4">Powiązane newsy</h3>
            <div className="space-y-6">
              {articles.filter(a => a.id !== article.id).slice(0, 3).map(related => (
                <Link key={related.id} to={`/article/${related.id}`} className="group block">
                  <div className="aspect-video rounded-xl overflow-hidden mb-3">
                    <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-bold group-hover:text-gold transition-colors line-clamp-2">{related.title}</h4>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{related.category}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
