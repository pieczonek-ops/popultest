import React, { useEffect } from 'react';
import { Link } from '../../components/Link';
import { videos } from '../../data/mockData';
import { motion } from 'motion/react';
import { Play, Eye, Clock, ThumbsUp, ThumbsDown, Share2, MessageSquare, MoreHorizontal, ChevronRight, UserPlus } from 'lucide-react';

export const VideoDetail = ({ id }: { id?: string }) => {
  const video = videos.find(v => v.id === id) || videos[0];
  const relatedVideos = videos.filter(v => v.id !== video.id).slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="pt-20 min-h-screen bg-white text-gray-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:flex-grow">
            {/* Video Player Placeholder */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-gray-200 shadow-2xl group">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl"
                >
                  <Play size={40} fill="white" className="text-white ml-1" />
                </motion.button>
              </div>
              {/* Custom Controls Mockup */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="h-1 w-full bg-white/20 rounded-full mb-4 overflow-hidden">
                  <div className="h-full w-1/3 bg-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Play size={20} fill="white" className="text-white" />
                    <span className="text-xs font-mono text-white">03:45 / {video.duration}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-white">
                    <div className="w-24 h-1 bg-white/20 rounded-full" />
                    <MoreHorizontal size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gray-900">{video.title}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${video.channel}/100/100`} alt={video.channel} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight text-gray-900">{video.channel}</h3>
                    <p className="text-xs text-gray-500">1.2M subskrybentów</p>
                  </div>
                  <button className="ml-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm">
                    <UserPlus size={16} />
                    <span>Subskrybuj</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full overflow-hidden">
                    <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors border-r border-gray-100 text-gray-700">
                      <ThumbsUp size={18} />
                      <span className="text-sm font-bold">45K</span>
                    </button>
                    <button className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700">
                      <ThumbsDown size={18} />
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
                    <Share2 size={18} />
                    <span className="text-sm font-bold">Udostępnij</span>
                  </button>
                  <button className="p-2 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              {/* Description Box */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-4 text-sm font-bold mb-2 text-gray-900">
                  <span>{video.views} wyświetleń</span>
                  <span>{video.date}</span>
                  <span className="text-blue-600">#{video.category}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  W dzisiejszym materiale przyglądamy się najnowszym doniesieniom ze świata gamingu. 
                  Zostań z nami do końca, aby dowiedzieć się o ukrytych detalach, których nie zauważyłeś w pierwszym zwiastunie!
                  <br /><br />
                  Wspieraj kanał: patreon.com/gamergold
                  Obserwuj nas na Twitterze: @GamerGoldPortal
                </p>
                <button className="mt-4 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">Pokaż więcej</button>
              </div>

              {/* Comments Section Placeholder */}
              <div className="mt-10">
                <div className="flex items-center space-x-4 mb-8">
                  <h2 className="text-xl font-bold flex items-center space-x-2 text-gray-900">
                    <MessageSquare size={20} className="text-blue-600" />
                    <span>2,450 Komentarzy</span>
                  </h2>
                </div>
                
                <div className="flex space-x-4 mb-10">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    U
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      placeholder="Dodaj komentarz..." 
                      className="w-full bg-transparent border-b border-gray-200 pb-2 focus:outline-none focus:border-blue-600 transition-colors text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-bold text-gray-900">Gracz_{i}42</span>
                          <span className="text-xs text-gray-500">2 godziny temu</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Świetny materiał! Czekałem na to podsumowanie od dawna. Mam nadzieję, że w kolejnym odcinku powiecie coś więcej o wymaganiach sprzętowych.
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600">
                            <ThumbsUp size={14} />
                            <span>124</span>
                          </button>
                          <button className="text-xs text-gray-500 hover:text-blue-600">Odpowiedz</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:w-[400px] flex-shrink-0">
            <h2 className="text-xl font-display font-bold mb-6 flex items-center space-x-2 text-gray-900">
              <Play size={18} className="text-blue-600" fill="currentColor" />
              <span>Polecane filmy</span>
            </h2>
            <div className="space-y-4">
              {relatedVideos.map(v => (
                <Link key={v.id} to={`/videos/${v.id}`} className="flex space-x-3 group">
                  <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                    <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/90 text-white text-[10px] font-bold rounded font-mono">
                      {v.duration}
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-bold leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors mb-1 text-gray-900">
                      {v.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 mb-1">{v.channel}</p>
                    <div className="flex items-center text-[10px] text-gray-500 space-x-2">
                      <span>{v.views} wyświetleń</span>
                      <span>•</span>
                      <span>{v.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all">
              Pokaż więcej
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
