import React, { useState } from 'react';
import { articles, esportEvents, esportMatches } from '../../data/mockData';
import { NewsCard } from '../../components/NewsCard';
import { motion } from 'motion/react';
import { Trophy, Calendar, BarChart3, ChevronRight, MapPin, DollarSign, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Esports = () => {
  const esportNews = articles.filter(a => a.category === 'Esports');
  const [activeTab, setActiveTab] = useState<'calendar' | 'results'>('calendar');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/esports-hero/1920/1080" 
            alt="Esports Hero" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 gold-text-gradient">ESPORT</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Najświeższe wyniki, harmonogramy turniejów i newsy ze świata profesjonalnego gamingu.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: News & Events */}
          <div className="lg:col-span-2 space-y-16">
            {/* News Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display font-bold flex items-center space-x-3">
                  <Trophy className="text-gold" />
                  <span>Esport News</span>
                </h2>
                <div className="h-px flex-grow mx-8 bg-dark-border hidden md:block" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {esportNews.map(article => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Calendar / Results Section */}
            <section>
              <div className="flex items-center space-x-8 mb-8 border-b border-dark-border">
                <button 
                  onClick={() => setActiveTab('calendar')}
                  className={cn(
                    "pb-4 text-xl font-display font-bold transition-all relative",
                    activeTab === 'calendar' ? "text-gold" : "text-gray-500 hover:text-white"
                  )}
                >
                  Kalendarz Imprez
                  {activeTab === 'calendar' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />}
                </button>
                <button 
                  onClick={() => setActiveTab('results')}
                  className={cn(
                    "pb-4 text-xl font-display font-bold transition-all relative",
                    activeTab === 'results' ? "text-gold" : "text-gray-500 hover:text-white"
                  )}
                >
                  Wyniki i Mecze
                  {activeTab === 'results' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />}
                </button>
              </div>

              {activeTab === 'calendar' ? (
                <div className="space-y-6">
                  {esportEvents.map(event => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden flex flex-col md:flex-row group"
                    >
                      <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                        <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gold uppercase tracking-widest">{event.game}</span>
                            <span className="text-xs text-gray-500">{event.startDate} - {event.endDate}</span>
                          </div>
                          <h3 className="text-2xl font-display font-bold mb-4">{event.name}</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                              <MapPin size={16} className="text-gold" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign size={16} className="text-gold" />
                              <span>{event.prizePool}</span>
                            </div>
                          </div>
                        </div>
                        <button className="mt-6 flex items-center space-x-2 text-gold font-bold text-sm hover:translate-x-2 transition-transform">
                          <span>Szczegóły turnieju</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {esportEvents.map(event => {
                    const matches = esportMatches.filter(m => m.eventId === event.id);
                    if (matches.length === 0) return null;
                    return (
                      <div key={event.id}>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gold" />
                          <span>{event.name}</span>
                        </h4>
                        <div className="space-y-3">
                          {matches.map(match => (
                            <div key={match.id} className="bg-dark-surface border border-dark-border rounded-xl p-4 flex items-center gap-4">
                              {/* Status & Time */}
                              <div className="flex flex-col items-center justify-center min-w-[80px] border-r border-dark-border pr-4">
                                <div className={cn(
                                  "px-2 py-0.5 rounded text-[9px] font-bold uppercase mb-1",
                                  match.status === 'live' ? "bg-red-600 text-white animate-pulse" : 
                                  match.status === 'finished' ? "bg-gray-700 text-gray-400" : "bg-gold/20 text-gold"
                                )}>
                                  {match.status}
                                </div>
                                <span className="text-[10px] text-gray-500 font-mono">{match.time.split(' ')[1]}</span>
                              </div>
                              
                              {/* Teams & Score */}
                              <div className="flex-grow flex items-center justify-between px-4">
                                <div className="flex items-center space-x-3 flex-1 justify-end">
                                  <span className={cn("font-bold text-sm md:text-base truncate", match.scoreA! > match.scoreB! ? "text-white" : "text-gray-500")}>
                                    {match.teamA}
                                  </span>
                                  <div className="w-6 h-6 bg-dark-bg rounded-full border border-dark-border" />
                                </div>

                                <div className="mx-6 bg-black/50 px-3 py-1 rounded border border-dark-border font-mono text-lg font-bold text-gold min-w-[70px] text-center">
                                  {match.status === 'upcoming' ? 'vs' : `${match.scoreA} : ${match.scoreB}`}
                                </div>

                                <div className="flex items-center space-x-3 flex-1 justify-start">
                                  <div className="w-6 h-6 bg-dark-bg rounded-full border border-dark-border" />
                                  <span className={cn("font-bold text-sm md:text-base truncate", match.scoreB! > match.scoreA! ? "text-white" : "text-gray-500")}>
                                    {match.teamB}
                                  </span>
                                </div>
                              </div>

                              {/* Game Label */}
                              <div className="hidden md:flex min-w-[60px] justify-end border-l border-dark-border pl-4">
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{match.game}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Right: Sidebar Widgets */}
          <aside className="space-y-12">
            {/* Live Now Widget */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>Na żywo</span>
              </h3>
              <div className="space-y-4">
                {esportMatches.filter(m => m.status === 'live').map(match => (
                  <div key={match.id} className="p-4 bg-black/30 rounded-xl border border-red-600/20">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
                      <span>{match.game}</span>
                      <span className="text-red-500">LIVE</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-sm">{match.teamA}</span>
                      <span className="text-gold font-mono font-bold">{match.scoreA} : {match.scoreB}</span>
                      <span className="font-bold text-sm">{match.teamB}</span>
                    </div>
                    <button className="w-full py-2 bg-red-600/10 text-red-500 text-xs font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all">
                      Oglądaj stream
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking Widget */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center space-x-2">
                <BarChart3 className="text-gold" size={20} />
                <span>Ranking HLTV</span>
              </h3>
              <div className="space-y-4">
                {[
                  { rank: 1, team: 'FaZe Clan', points: 980 },
                  { rank: 2, team: 'Team Vitality', points: 945 },
                  { rank: 3, team: 'Natus Vincere', points: 890 },
                  { rank: 4, team: 'G2 Esports', points: 850 },
                  { rank: 5, team: 'MOUZ', points: 780 },
                ].map(item => (
                  <div key={item.rank} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-display font-bold text-dark-border group-hover:text-gold transition-colors">{item.rank}</span>
                      <span className="font-bold text-sm">{item.team}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.points} pkt</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
