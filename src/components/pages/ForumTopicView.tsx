import React, { useState, useEffect } from 'react';
import { Link } from '../../components/Link';
import { forumTopics, currentUser, otherUsers } from '../../data/mockData';
import { 
  ChevronRight, 
  ArrowLeft, 
  MessageSquare, 
  ThumbsUp, 
  Flag, 
  Quote, 
  MoreHorizontal,
  Shield,
  Clock,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { db, auth } from '../../lib/firebase';
import { collection, getDocs, query, where, orderBy, addDoc, doc, getDoc } from 'firebase/firestore';

export const ForumTopicView = ({ topicId }: { topicId?: string }) => {
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTopicAndPosts = async () => {
      if (!topicId) return;
      try {
        // Fetch topic
        const topicRef = doc(db, 'forum_topics', topicId);
        const topicSnap = await getDoc(topicRef);
        let currentTopic = null;
        
        if (topicSnap.exists()) {
          currentTopic = { id: topicSnap.id, ...topicSnap.data() };
        } else {
          currentTopic = forumTopics.find(t => t.id === topicId);
        }
        setTopic(currentTopic);

        // Fetch replies
        const q = query(
          collection(db, 'forum_replies'), 
          where('topicId', '==', topicId),
          orderBy('date', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedReplies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Initial post (OP)
        const opPost = {
          id: 'op-' + currentTopic.id,
          author: currentTopic.author,
          date: currentTopic.date,
          content: currentTopic.content || 'Brak treści.',
          likes: 0,
          isOp: true
        };

        setPosts([opPost, ...fetchedReplies]);
      } catch (error) {
        console.error("Error fetching topic/posts:", error);
        const mockTopic = forumTopics.find(t => t.id === topicId);
        if (mockTopic) {
          setTopic(mockTopic);
          setPosts([
            {
              id: 'p1',
              author: mockTopic.author,
              date: mockTopic.date,
              content: `Zastanawiam się, jakie mody są obecnie absolutnym "must-have" dla kogoś, kto wraca do Wiedźmina 3 w 2024 roku. Czy HD Reworked Project wciąż jest najlepszy, czy może nowa wersja Next-Gen już go zastąpiła? Chętnie poznam Wasze listy!`,
              likes: 12,
              isOp: true
            },
            {
              id: 'p2',
              author: 'GamerPro99',
              date: '2024-03-01 14:20',
              content: `Zdecydowanie polecam "Friendly HUD" - kompletnie zmienia immersję. Co do grafiki, Next-Gen ma już sporo wbudowanych modów, ale HD Reworked wciąż ma kilka tekstur, których oficjalny patch nie ruszył.`,
              likes: 5
            }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTopicAndPosts();
  }, [topicId]);

  const handleSendReply = async () => {
    if (!auth.currentUser) {
      alert('Musisz być zalogowany, aby odpowiedzieć.');
      return;
    }
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      const replyData = {
        topicId,
        author: auth.currentUser.displayName || auth.currentUser.email || 'Anonim',
        authorUid: auth.currentUser.uid,
        date: new Date().toISOString(),
        content: replyText,
        likes: 0
      };
      const docRef = await addDoc(collection(db, 'forum_replies'), replyData);
      setPosts([...posts, { id: docRef.id, ...replyData }]);
      setReplyText('');
    } catch (error) {
      console.error("Error sending reply:", error);
      alert('Błąd podczas wysyłania odpowiedzi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="pt-32 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Temat nie znaleziony</h2>
        <Link to="/forum" className="text-gold hover:underline">Powrót do forum</Link>
      </div>
    );
  }

  const getAuthorInfo = (username: string) => {
    if (username === currentUser.username) return currentUser;
    return otherUsers.find(u => u.username === username) || {
      username,
      avatarUrl: `https://picsum.photos/seed/${username}/200/200`,
      rank: 'Użytkownik',
      stats: { forumPosts: 12 }
    };
  };

  return (
    <div className="pt-24 min-h-screen bg-white text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-600 transition-colors">GamerGold</Link>
          <ChevronRight size={12} />
          <Link to="/forum" className="hover:text-blue-600 transition-colors">Forum</Link>
          <ChevronRight size={12} />
          <Link to={`/forum/category/${topic.categoryId}`} className="hover:text-blue-600 transition-colors">Kategoria</Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 truncate max-w-[200px]">{topic.title}</span>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">{topic.title}</h1>
          <button 
            onClick={() => document.getElementById('reply-area')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg"
          >
            <MessageSquare size={18} />
            <span>Odpowiedz</span>
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => {
            const author = getAuthorInfo(post.author);
            return (
              <div key={post.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                {/* Author Sidebar */}
                <div className="w-full md:w-56 bg-gray-50 p-6 flex flex-row md:flex-col items-center md:items-center space-x-4 md:space-x-0 border-b md:border-b-0 md:border-r border-gray-100">
                  <Link to={`/profile/${author.username}`} className="relative group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-200 group-hover:border-blue-600 transition-colors mb-3">
                      <img src={(author as any).avatarUrl} alt={post.author} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1 bg-blue-600 rounded-lg text-white">
                      <Shield size={12} />
                    </div>
                  </Link>
                  <div className="text-center md:text-center">
                    <Link to={`/profile/${author.username}`} className="text-blue-600 font-bold hover:underline block mb-1">
                      {post.author}
                    </Link>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">
                      {(author as any).rank}
                    </span>
                    <div className="hidden md:block pt-3 border-t border-gray-200 text-[10px] text-gray-500 space-y-1">
                      <p>Postów: <span className="text-gray-900 font-bold">{(author as any).stats?.forumPosts || 0}</span></p>
                      <p>Dołączył: <span className="text-gray-900 font-bold">{(author as any).joinDate || '2024'}</span></p>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-[10px] text-gray-400 border-b border-gray-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <Clock size={12} />
                      <span>Napisano: {post.date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="hover:text-blue-600 transition-colors">#{(post as any).id}</button>
                    </div>
                  </div>

                  <div className="flex-1 text-gray-700 text-sm leading-relaxed mb-6">
                    {post.content}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                        <ThumbsUp size={14} />
                        <span>Pomocny ({post.likes})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                        <Quote size={14} />
                        <span>Cytuj</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Flag size={14} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Reply */}
        <div id="reply-area" className="mt-12 bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-display font-bold text-gray-900 mb-6">Szybka odpowiedź</h3>
          <div className="space-y-4">
            <textarea 
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Napisz swoją odpowiedź..."
              className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:border-blue-600 outline-none transition-all min-h-[150px] resize-none text-gray-900"
            />
            <div className="flex justify-end">
              <button 
                disabled={isSubmitting}
                onClick={handleSendReply}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 flex items-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                <span>Wyślij odpowiedź</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link to={`/forum/category/${topic.categoryId}`} className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} />
            <span>Powrót do kategorii</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
