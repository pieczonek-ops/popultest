import React, { useState } from 'react';
import { Link } from '../../components/Link';
import { videos, streams } from '../../data/mockData';
import { motion } from 'motion/react';
import { Play, Eye, Clock, User, Radio, ExternalLink, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Videos = () => {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const categories = ['Wszystkie', 'Zwiastuny', 'Recenzje', 'Rankingi', 'Sprzęt', 'Dokumenty', 'Esport'];

  const filteredVideos = activeCategory === 'Wszystkie' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Video Hero / Featured Stream */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={streams[0].thumbnailUrl} 
            alt="Featured Stream" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                <Radio size={12} />
                <span>NA ŻYWO</span>
              </span>
              <span className="text-gray-300 text-sm font-bold uppercase tracking-widest">{streams[0].platform}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-white">
              {streams[0].title}
            </h1>
            <div className="flex items-center space-x-6 mb-8 text-gray-300">
              <div className="flex items-center space-x-2">
                <User size={18} className="text-blue-400" />
                <span className="font-bold">{streams[0].streamer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye size={18} className="text-blue-400" />
                <span>{streams[0].viewerCount} widzów</span>
              </div>
            </div>
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center space-x-3 shadow-lg">
              <Play size={20} fill="currentColor" />
              <span>Oglądaj teraz</span>
            </button>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Live Streams Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold flex items-center space-x-3 text-gray-900">
              <Radio className="text-red-600" />
              <span>Trwające Streamy</span>
            </h2>
            <div className="h-px flex-grow mx-8 bg-gray-100 hidden md:block" />
            <button className="text-blue-600 text-sm font-bold hover:underline flex items-center space-x-1">
              <span>Zobacz wszystkie</span>
              <ExternalLink size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {streams.map((stream) => (
              <motion.div 
                key={stream.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                  <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded">LIVE</div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded flex items-center space-x-1">
                    <Eye size={10} />
                    <span>{stream.viewerCount}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Play size={24} fill="white" className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-2 text-gray-900">{stream.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold text-gray-400">{stream.streamer}</span>
                  <span>{stream.game}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <h2 className="text-3xl font-display font-bold flex items-center space-x-3 text-gray-900">
              <Play className="text-blue-600" fill="currentColor" />
              <span>Filmy i Materiały</span>
            </h2>
            
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                    activeCategory === cat 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-300"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Link to={`/videos/${video.id}`}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-lg">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/90 text-white text-xs font-bold rounded font-mono">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center shadow-2xl">
                        <Play size={32} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/${video.channel}/100/100`} alt={video.channel} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors mb-2 line-clamp-2 text-gray-900">
                        {video.title}
                      </h3>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-3">
                        <span className="hover:text-gray-900 transition-colors">{video.channel}</span>
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{video.views} wyświetleń</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{video.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-12 py-4 border border-gray-200 rounded-2xl text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all font-bold">
              Załaduj więcej filmów
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
