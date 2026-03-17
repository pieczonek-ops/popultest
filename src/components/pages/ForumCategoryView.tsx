import React from 'react';
import { Link } from '../../components/Link';
import { forumCategories, forumTopics } from '../../data/mockData';
import { 
  MessageSquare, 
  ChevronRight, 
  Pin, 
  Lock, 
  Eye, 
  MessageCircle, 
  Plus,
  ArrowLeft,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

export const ForumCategoryView = ({ categoryId }: { categoryId?: string }) => {
  // Find the category (could be a main category or a subcategory)
  const findCategory = (id: string) => {
    for (const cat of forumCategories) {
      if (cat.id === id) return cat;
      if (cat.subcategories) {
        const sub = cat.subcategories.find(s => s.id === id);
        if (sub) return sub;
      }
    }
    return null;
  };

  const category = findCategory(categoryId || '');
  const topics = forumTopics.filter(t => t.categoryId === categoryId);

  if (!category) {
    return (
      <div className="pt-32 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Kategoria nie znaleziona</h2>
        <Link to="/forum" className="text-gold hover:underline">Powrót do forum</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-600 transition-colors">GamerGold</Link>
          <ChevronRight size={12} />
          <Link to="/forum" className="hover:text-blue-600 transition-colors">Forum</Link>
          <ChevronRight size={12} />
          <span className="text-gray-900">{category.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">{category.name}</h1>
            <p className="text-gray-500">{category.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Szukaj w tej kategorii..." 
                className="bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-blue-600 outline-none transition-all w-64 text-gray-900"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10">
              <Plus size={18} />
              <span>Nowy Temat</span>
            </button>
          </div>
        </div>

        {/* Topics Table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <div className="col-span-7">Temat</div>
            <div className="col-span-2 text-center">Statystyki</div>
            <div className="col-span-3 text-right">Ostatni post</div>
          </div>

          {/* Topics List */}
          <div className="divide-y divide-gray-100">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <div key={topic.id} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center group">
                  {/* Topic Info */}
                  <div className="col-span-12 md:col-span-7 flex items-start space-x-4">
                    <div className={`mt-1 p-2 rounded-lg ${topic.isSticky ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                      {topic.isSticky ? <Pin size={20} /> : <MessageSquare size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {topic.isLocked && <Lock size={12} className="text-red-500" />}
                        <Link to={`/forum/topic/${topic.id}`} className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>przez</span>
                        <Link to={`/profile/${topic.author}`} className="text-blue-600 hover:underline">{topic.author}</Link>
                        <span>•</span>
                        <span>{topic.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex col-span-2 justify-center space-x-6">
                    <div className="flex flex-col items-center">
                      <span className="text-gray-900 font-bold">{topic.replies}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Odpowiedzi</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-gray-900 font-bold">{topic.views}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Wyświetleń</span>
                    </div>
                  </div>

                  {/* Last Post */}
                  <div className="hidden md:block col-span-3 text-right">
                    <p className="text-xs text-gray-700 font-bold hover:text-blue-600 cursor-pointer">
                      Ostatni post
                    </p>
                    <div className="flex items-center justify-end space-x-2 text-[10px] text-gray-500 mt-1">
                      <span>przez</span>
                      <span className="text-blue-600 hover:underline cursor-pointer">{topic.lastPost.author}</span>
                      <span>•</span>
                      <span>{topic.lastPost.date}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-400 italic">
                Brak tematów w tej kategorii. Bądź pierwszym, który go założy!
              </div>
            )}
          </div>
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-8 flex justify-between items-center">
          <Link to="/forum" className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} />
            <span>Powrót do listy kategorii</span>
          </Link>
          <div className="flex space-x-2">
            <button className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">1</button>
            <button className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center">2</button>
            <button className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};
