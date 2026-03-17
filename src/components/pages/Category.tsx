import React from 'react';
import { Link } from '../../components/Link';
import { articles } from '../../data/mockData';
import { NewsCard } from '../../components/NewsCard';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export const Category = ({ categoryName }: { categoryName?: string }) => {
  const filteredArticles = articles.filter(
    (a) => a.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={12} />
          <span className="text-blue-600 font-bold">{categoryName}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-display font-bold mb-4 capitalize text-gray-900">
            {categoryName} <span className="text-blue-600">News</span>
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Wszystkie najnowsze informacje, recenzje i zapowiedzi dotyczące kategorii {categoryName}. Bądź na bieżąco z tym, co dzieje się w świecie gier.
          </p>
        </div>

        {/* Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500">Brak artykułów w tej kategorii.</p>
            <Link to="/" className="text-blue-600 mt-4 inline-block hover:underline">Wróć na stronę główną</Link>
          </div>
        )}
      </div>
    </div>
  );
};
