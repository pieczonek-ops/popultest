import React from 'react';
import { Link } from './Link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Article } from '../data/mockData';
import { motion } from 'motion/react';

interface NewsCardProps {
  article: Article;
  variant?: 'large' | 'medium' | 'small';
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, variant = 'medium' }) => {
  if (variant === 'large') {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm"
      >
        <Link to={`/article/${article.id}`} className="block">
          <div className="aspect-[21/9] overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">
                {article.category}
              </span>
              <div className="flex items-center text-gray-400 text-xs space-x-2">
                <Calendar size={14} />
                <span>{article.date}</span>
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4 group-hover:text-blue-600 transition-colors text-gray-900">
              {article.title}
            </h2>
            <p className="text-gray-500 mb-6 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User size={16} className="text-blue-600" />
                <span>{article.author}</span>
              </div>
              <span className="flex items-center space-x-1 text-blue-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
                <span>Czytaj więcej</span>
                <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col h-full shadow-sm"
    >
      <Link to={`/article/${article.id}`} className="flex flex-col h-full">
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              {article.category}
            </span>
            <span className="text-[10px] text-gray-400">{article.date}</span>
          </div>
          <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-900">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
            {article.excerpt}
          </p>
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <User size={12} />
            <span>{article.author}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
