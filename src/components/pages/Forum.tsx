import React from 'react';
import { Link } from '../../components/Link';
import { forumCategories } from '../../data/mockData';
import { MessageSquare, MessageCircle, Clock, User, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Forum = () => {
  return (
    <div className="pt-24 min-h-screen bg-white text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-600 transition-colors">GamerGold</Link>
          <ChevronRight size={12} />
          <span className="text-gray-900">Forum Dyskusyjne</span>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Forum Dyskusyjne</h1>
            <p className="text-gray-500">Miejsce spotkań społeczności GamerGold</p>
          </div>
          <div className="hidden md:block text-right text-xs text-gray-500">
            <p>Wszystkich postów: <span className="text-blue-600 font-bold">24,500</span></p>
            <p>Zarejestrowanych użytkowników: <span className="text-blue-600 font-bold">1,240</span></p>
          </div>
        </div>

        {/* Forum Categories (phpBB style) */}
        <div className="space-y-8">
          {forumCategories.map((category) => (
            <div key={category.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm bg-white">
              {/* Category Header */}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-display font-bold text-blue-600 uppercase tracking-wider">
                  {category.name}
                </h2>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden md:block">
                  {category.description}
                </span>
              </div>

              {/* Subcategories / Forums List */}
              <div className="bg-white">
                {(category.subcategories || [category]).map((sub, idx) => (
                  <div 
                    key={sub.id} 
                    className={`grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center ${
                      idx !== (category.subcategories?.length || 1) - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    {/* Icon & Title */}
                    <div className="col-span-12 md:col-span-6 flex items-start space-x-4">
                      <div className="mt-1 p-2 bg-blue-50 rounded-lg text-blue-600">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <Link to={`/forum/category/${sub.id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors block mb-1">
                          {sub.name}
                        </Link>
                        <p className="text-sm text-gray-500 line-clamp-1">{sub.description}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex col-span-2 flex-col items-center justify-center border-x border-gray-100">
                      <span className="text-gray-900 font-bold">{sub.topicsCount}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Tematów</span>
                    </div>
                    <div className="hidden md:flex col-span-1 flex-col items-center justify-center">
                      <span className="text-gray-900 font-bold">{sub.postsCount}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Postów</span>
                    </div>

                    {/* Last Post */}
                    <div className="hidden md:block col-span-3 text-xs pl-4">
                      {sub.lastPost ? (
                        <div className="space-y-1">
                          <p className="text-gray-700 font-bold truncate hover:text-blue-600 cursor-pointer">
                            {sub.lastPost.topicTitle}
                          </p>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <span>przez</span>
                            <Link to={`/profile/${sub.lastPost.author}`} className="text-blue-600 hover:underline cursor-pointer">
                              {sub.lastPost.author}
                            </Link>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Clock size={10} />
                            <span>{sub.lastPost.date}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Brak postów</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Forum Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <User size={16} className="text-blue-600" />
              <span>Kto jest online</span>
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Obecnie jest <span className="text-gray-900 font-bold">42</span> użytkowników online: 12 zarejestrowanych, 0 ukrytych i 30 gości.
              <br />
              Najwięcej użytkowników online (<span className="text-gray-900 font-bold">156</span>) było 24 Lut 2024.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <MessageCircle size={16} className="text-blue-600" />
              <span>Statystyki</span>
            </h3>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Liczba postów:</span>
                <span className="text-gray-900 font-bold">24,500</span>
              </div>
              <div className="flex justify-between">
                <span>Liczba tematów:</span>
                <span className="text-gray-900 font-bold">1,250</span>
              </div>
              <div className="flex justify-between">
                <span>Liczba użytkowników:</span>
                <span className="text-gray-900 font-bold">1,240</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock size={16} className="text-blue-600" />
              <span>Ostatni użytkownik</span>
            </h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                N
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">NowyGracz_2024</p>
                <p className="text-[10px] text-gray-500">Dołączył dzisiaj, 14:20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
