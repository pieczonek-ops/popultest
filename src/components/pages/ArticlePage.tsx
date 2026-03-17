import React, { useState, useEffect } from 'react';
import { Link } from '../../components/Link';
import { articles as mockArticles } from '../../data/mockData';
import { Calendar, User, Share2, MessageCircle, Bookmark, Loader2, Send } from 'lucide-react';
import { db, auth } from '../../lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';

export const ArticlePage = ({ id }: { id?: string }) => {
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      if (!id) return;
      try {
        // Fetch article
        const articleRef = doc(db, 'articles', id);
        const articleSnap = await getDoc(articleRef);
        let currentArticle = null;

        if (articleSnap.exists()) {
          currentArticle = { id: articleSnap.id, ...articleSnap.data() };
        } else {
          currentArticle = mockArticles.find((a) => a.id === id);
        }
        setArticle(currentArticle);

        // Fetch comments
        const q = query(
          collection(db, 'comments'),
          where('targetId', '==', id),
          orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching article/comments:", error);
        setArticle(mockArticles.find((a) => a.id === id));
      } finally {
        setLoading(false);
      }
    };
    fetchArticleAndComments();
  }, [id]);

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('Musisz być zalogowany, aby dodać komentarz.');
      return;
    }
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const commentData = {
        targetId: id,
        targetType: 'article',
        author: auth.currentUser.displayName || auth.currentUser.email || 'Anonim',
        authorUid: auth.currentUser.uid,
        content: commentText,
        date: new Date().toISOString(),
        likes: 0
      };
      const docRef = await addDoc(collection(db, 'comments'), commentData);
      setComments([{ id: docRef.id, ...commentData }, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error("Error sending comment:", error);
      alert('Błąd podczas wysyłania komentarza.');
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

  if (!article) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl">Artykuł nie został znaleziony</h1>
        <Link to="/" className="text-gold mt-4 inline-block">Wróć do strony głównej</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link to={`/category/${article.category.toLowerCase()}`} className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              {article.category}
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-gray-900">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-blue-600" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-blue-600" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle size={16} className="text-blue-600" />
                <span>{comments.length} komentarzy</span>
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
              <button className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm">
                <Share2 size={20} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm">
                <Bookmark size={20} />
              </button>
              <div className="h-20 w-px bg-gray-100" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 vertical-text">Share</span>
            </div>
          </aside>

          {/* Center: Article Body */}
          <article className="lg:flex-grow max-w-3xl">
            <div className="prose prose-blue max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium italic">
                {article.excerpt}
              </p>
              
              <div className="text-gray-600 leading-loose space-y-6 text-lg">
                <p>{article.content}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
                </p>
                
                <div className="my-12 p-8 bg-gray-50 border-l-4 border-blue-600 rounded-r-2xl italic text-xl text-gray-900">
                  "To przełomowy moment dla całej branży. Nikt nie spodziewał się tak radykalnych zmian w tak krótkim czasie."
                </div>

                <p>
                  Mauris egestas at nibh nec finibus. Ghenreri t arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris egestas at nibh nec finibus.
                </p>

                <img 
                  src={`https://picsum.photos/seed/${article.id}2/800/450`} 
                  alt="Article detail" 
                  className="rounded-2xl w-full my-10 shadow-lg"
                  referrerPolicy="no-referrer"
                />

                <p>
                  Donec id justo. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Nulla neque. Vivamus consectetuer hendrerit lacus. Phasellus et lorem id felis nonummy placerat. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest mr-4 self-center">Tagi:</span>
              {['Gaming', 'News', article.category, '2024'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-500 hover:text-blue-600 hover:border-blue-600 cursor-pointer transition-all">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Comments Section */}
            <section className="mt-16 pt-16 border-t border-gray-100">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-8 flex items-center space-x-3">
                <MessageCircle className="text-blue-600" />
                <span>Komentarze ({comments.length})</span>
              </h3>

              {/* Comment Form */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-12">
                <form onSubmit={handleSendComment}>
                  <textarea 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Co o tym sądzisz?"
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:border-blue-600 outline-none transition-all min-h-[120px] resize-none text-gray-900 mb-4"
                  />
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                      <span>Dodaj komentarz</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={`https://picsum.photos/seed/${comment.author}/100/100`} alt={comment.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 italic py-8">Brak komentarzy. Bądź pierwszy!</p>
                )}
              </div>
            </section>
          </article>

          {/* Right: Related News */}
          <aside className="lg:w-80 space-y-8">
            <h3 className="text-xl font-display font-bold border-b border-blue-600 pb-4 text-gray-900">Powiązane newsy</h3>
            <div className="space-y-6">
              {mockArticles.filter(a => a.id !== article.id).slice(0, 3).map(related => (
                <Link key={related.id} to={`/article/${related.id}`} className="group block">
                  <div className="aspect-video rounded-xl overflow-hidden mb-3 shadow-sm">
                    <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-bold group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-900">{related.title}</h4>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{related.category}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
