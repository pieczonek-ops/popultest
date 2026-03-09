import React, { useState, useEffect } from 'react';
import { Link } from '../../components/Link';
import { currentUser, otherUsers } from '../../data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Calendar, 
  Award, 
  MessageSquare, 
  Star, 
  Layout, 
  History, 
  Settings, 
  Shield,
  MessageCircle,
  ThumbsUp,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const UserProfilePage = ({ id }: { id?: string }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'achievements' | 'stats'>('history');

  // Find user by ID (either current user or others)
  const user = id === currentUser.id ? currentUser : otherUsers.find(u => u.id === id || u.username === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!user) {
    return (
      <div className="pt-32 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Użytkownik nie znaleziony</h2>
        <Link to="/" className="text-gold hover:underline">Powrót do strony głównej</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'history', label: 'Historia aktywności', icon: History },
    { id: 'achievements', label: 'Osiągnięcia', icon: Award },
    { id: 'stats', label: 'Statystyki', icon: Layout },
  ];

  const isOwnProfile = id === currentUser.id;

  return (
    <div className="pt-24 min-h-screen bg-dark-bg text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button if not own profile */}
        {!isOwnProfile && (
          <Link to="/forum" className="flex items-center space-x-2 text-xs text-gray-500 mb-6 hover:text-gold transition-colors uppercase tracking-widest">
            <ArrowLeft size={14} />
            <span>Powrót do forum</span>
          </Link>
        )}

        {/* Profile Header */}
        <div className="relative mb-12">
          {/* Cover Image Placeholder */}
          <div className="h-48 w-full bg-gradient-to-r from-gold/20 via-dark-surface to-gold/10 rounded-3xl border border-dark-border overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          <div className="absolute -bottom-12 left-8 flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-dark-surface border-4 border-dark-bg overflow-hidden shadow-2xl">
                <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 bg-gold rounded-xl text-black shadow-lg">
                <Shield size={16} />
              </div>
            </div>

            <div className="pb-4">
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-3xl font-display font-bold text-white">{user.username}</h1>
                <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full border border-gold/20">
                  {user.rank}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>Dołączył: {user.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span>ID: #{user.id.replace('u', '12')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-8 hidden md:flex space-x-3">
            {isOwnProfile ? (
              <button className="px-6 py-2 bg-dark-surface border border-dark-border rounded-xl text-sm font-bold hover:bg-white/5 transition-all flex items-center space-x-2">
                <Settings size={16} />
                <span>Edytuj profil</span>
              </button>
            ) : (
              <button className="px-6 py-2 gold-gradient text-black rounded-xl text-sm font-bold hover:scale-105 transition-all flex items-center space-x-2">
                <MessageSquare size={16} />
                <span>Wyślij wiadomość</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20">
          {/* Sidebar Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Szybkie statystyki</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 bg-dark-bg rounded-xl border border-dark-border">
                  <MessageSquare size={20} className="text-gold mb-2" />
                  <span className="text-lg font-bold text-white">{user.stats.comments}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Komentarzy</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-dark-bg rounded-xl border border-dark-border">
                  <Star size={20} className="text-gold mb-2" />
                  <span className="text-lg font-bold text-white">{user.stats.ratings}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Ocen</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-dark-bg rounded-xl border border-dark-border">
                  <MessageCircle size={20} className="text-gold mb-2" />
                  <span className="text-lg font-bold text-white">{user.stats.forumPosts}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Postów</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Osiągnięcia</h3>
              <div className="space-y-3">
                {user.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-4 p-3 bg-white/5 border border-dark-border rounded-xl">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{achievement.name}</h4>
                      <p className="text-[10px] text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab('achievements')}
                className="w-full mt-4 text-xs font-bold text-gold hover:underline"
              >
                Zobacz wszystkie odznaki
              </button>
            </div>
          </div>

          {/* Main Tabs Content */}
          <div className="lg:col-span-8">
            {/* Tabs Navigation */}
            <div className="flex space-x-2 mb-8 bg-dark-surface p-1 rounded-2xl border border-dark-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all",
                    activeTab === tab.id 
                      ? "bg-gold text-black shadow-lg" 
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {user.history.map((item, idx) => (
                      <div key={idx} className="bg-dark-surface border border-dark-border rounded-2xl p-6 hover:border-gold/30 transition-all group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              item.type === 'comment' ? "bg-blue-500/10 text-blue-500" :
                              item.type === 'rating' ? "bg-yellow-500/10 text-yellow-500" :
                              "bg-purple-500/10 text-purple-500"
                            )}>
                              {item.type === 'comment' ? <MessageSquare size={16} /> :
                               item.type === 'rating' ? <Star size={16} /> :
                               <MessageCircle size={16} />}
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                {item.type === 'comment' ? 'Komentarz' : 
                                 item.type === 'rating' ? 'Ocena materiału' : 
                                 'Wpis na forum'}
                              </span>
                              <h4 className="text-white font-bold group-hover:text-gold transition-colors">
                                {item.target}
                              </h4>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-600 font-mono">{item.date}</span>
                        </div>
                        <p className="text-sm text-gray-400 italic border-l-2 border-dark-border pl-4 py-1">
                          "{item.content}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-dark-surface border border-dark-border rounded-2xl p-6 flex items-center space-x-6">
                        <div className="text-5xl bg-dark-bg w-20 h-20 rounded-2xl flex items-center justify-center border border-dark-border shadow-inner">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{achievement.name}</h4>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="bg-dark-surface border border-dark-border rounded-2xl p-8">
                    <h3 className="text-xl font-display font-bold text-white mb-8">Szczegółowe statystyki konta</h3>
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Aktywność w komentarzach</span>
                          <span className="text-gold font-bold">Top 5% społeczności</span>
                        </div>
                        <div className="h-3 w-full bg-dark-bg rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            className="h-full bg-gold"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Wpisy na forum</span>
                          <span className="text-gold font-bold">Poziom 12</span>
                        </div>
                        <div className="h-3 w-full bg-dark-bg rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '45%' }}
                            className="h-full bg-gold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
