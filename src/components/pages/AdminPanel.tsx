import React, { useState, useEffect } from 'react';
import { auth, db, signInWithGoogle, logout } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  getDocFromServer
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  LogOut, 
  LogIn, 
  Shield, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Play, 
  ShoppingBag, 
  Trophy, 
  MessageSquare, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const ADMIN_EMAIL = "pieczonek@gmail.com";

type Tab = 'articles' | 'videos' | 'store' | 'esport' | 'forum' | 'comments' | 'config';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  date: string;
  category: string;
  channel: string;
  description: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  platform: string;
  rating: number;
  description: string;
  features: string[];
}

interface EsportMatch {
  id: string;
  game: string;
  status: 'live' | 'upcoming' | 'finished';
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  date: string;
  time: string;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  date: string;
  likes: number;
  targetId: string;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topicsCount: number;
  postsCount: number;
}

interface SiteConfig {
  id: string;
  type: string;
  data: any;
}

export const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading', message: string } | null>(null);
  
  // Data states
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [matches, setMatches] = useState<EsportMatch[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [forumCats, setForumCats] = useState<ForumCategory[]>([]);
  const [configs, setConfigs] = useState<SiteConfig[]>([]);

  // Form states
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u && u.email === ADMIN_EMAIL) {
        fetchAllData();
      }
    });

    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    return () => unsubscribe();
  }, []);

  const fetchAllData = async () => {
    fetchArticles();
    fetchVideos();
    fetchProducts();
    fetchMatches();
    fetchComments();
    fetchForumCats();
    fetchConfigs();
  };

  const fetchArticles = async () => {
    const q = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    setArticles(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Article[]);
  };

  const fetchVideos = async () => {
    const q = query(collection(db, 'videos'), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    setVideos(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Video[]);
  };

  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, 'products'));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Product[]);
  };

  const fetchMatches = async () => {
    const snap = await getDocs(collection(db, 'esportMatches'));
    setMatches(snap.docs.map(d => ({ id: d.id, ...d.data() })) as EsportMatch[]);
  };

  const fetchComments = async () => {
    const snap = await getDocs(collection(db, 'comments'));
    setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Comment[]);
  };

  const fetchForumCats = async () => {
    const snap = await getDocs(collection(db, 'forumCategories'));
    setForumCats(snap.docs.map(d => ({ id: d.id, ...d.data() })) as ForumCategory[]);
  };

  const fetchConfigs = async () => {
    const snap = await getDocs(collection(db, 'siteConfig'));
    setConfigs(snap.docs.map(d => ({ id: d.id, ...d.data() })) as SiteConfig[]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                type === 'number' ? parseFloat(value) : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;

    setStatus({ type: 'loading', message: 'Zapisywanie...' });

    const collectionMap: Record<Tab, string> = {
      articles: 'articles',
      videos: 'videos',
      store: 'products',
      esport: 'esportMatches',
      forum: 'forumCategories',
      comments: 'comments',
      config: 'siteConfig'
    };

    const collName = collectionMap[activeTab];

    try {
      if (isEditing) {
        const docRef = doc(db, collName, isEditing);
        await updateDoc(docRef, formData);
        setStatus({ type: 'success', message: 'Zaktualizowano pomyślnie!' });
      } else {
        await addDoc(collection(db, collName), formData);
        setStatus({ type: 'success', message: 'Dodano pomyślnie!' });
      }
      
      setFormData({});
      setIsEditing(null);
      fetchAllData();
      
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      setStatus({ type: 'error', message: 'Błąd podczas zapisywania.' });
    }
  };

  const handleDelete = async (id: string, coll: string) => {
    if (!window.confirm('Czy na pewno chcesz to usunąć?')) return;
    try {
      await deleteDoc(doc(db, coll, id));
      fetchAllData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="text-blue-600" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dostęp Zastrzeżony</h1>
          <p className="text-gray-500 mb-8">Zaloguj się jako administrator, aby zarządzać treścią.</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-blue-200"
          >
            <LogIn size={20} />
            <span>Zaloguj przez Google</span>
          </button>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'articles', label: 'Artykuły', icon: FileText },
    { id: 'videos', label: 'Wideo', icon: Play },
    { id: 'store', label: 'Sklep', icon: ShoppingBag },
    { id: 'esport', label: 'E-sport', icon: Trophy },
    { id: 'forum', label: 'Forum', icon: MessageSquare },
    { id: 'comments', label: 'Komentarze', icon: MessageSquare },
    { id: 'config', label: 'Konfiguracja', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel <span className="text-blue-600">Admina</span></h1>
            <p className="text-gray-500 flex items-center gap-2">
              <Shield size={16} className="text-blue-600" />
              Zalogowano jako {user.email}
            </p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:text-red-600 hover:border-red-100 transition-all shadow-sm"
          >
            <LogOut size={18} />
            <span className="font-bold">Wyloguj</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsEditing(null);
                setFormData({});
              }}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            {isEditing ? <Edit2 className="text-blue-600" size={24} /> : <Plus className="text-blue-600" size={24} />}
            {isEditing ? `Edytuj: ${activeTab}` : `Dodaj: ${activeTab}`}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'articles' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Tytuł</label>
                    <input required name="title" value={formData.title || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Kategoria</label>
                    <select name="category" value={formData.category || 'PC'} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <option value="PC">PC</option>
                      <option value="Console">Console</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Esports">Esports</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Krótki opis</label>
                  <textarea required name="excerpt" value={formData.excerpt || ''} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Treść</label>
                  <textarea required name="content" value={formData.content || ''} onChange={handleInputChange} rows={6} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input required name="imageUrl" value={formData.imageUrl || ''} onChange={handleInputChange} placeholder="URL Obrazka" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input required name="author" value={formData.author || ''} onChange={handleInputChange} placeholder="Autor" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input required type="date" name="date" value={formData.date || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <input type="checkbox" name="featured" id="featured" checked={formData.featured || false} onChange={handleInputChange} className="w-5 h-5 text-blue-600 rounded" />
                  <label htmlFor="featured" className="text-sm font-bold text-gray-700">Wyróżnij (Hero)</label>
                </div>
              </>
            )}

            {activeTab === 'videos' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Tytuł wideo" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input required name="category" value={formData.category || ''} onChange={handleInputChange} placeholder="Kategoria" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input required name="thumbnailUrl" value={formData.thumbnailUrl || ''} onChange={handleInputChange} placeholder="URL Miniatury" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input required name="duration" value={formData.duration || ''} onChange={handleInputChange} placeholder="Czas trwania (np. 12:45)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input required name="channel" value={formData.channel || ''} onChange={handleInputChange} placeholder="Kanał" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Opis wideo" rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </>
            )}

            {activeTab === 'store' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Nazwa produktu" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input required name="platform" value={formData.platform || ''} onChange={handleInputChange} placeholder="Platforma (np. Steam, PS5)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input required type="number" name="price" value={formData.price || ''} onChange={handleInputChange} placeholder="Cena" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input type="number" name="originalPrice" value={formData.originalPrice || ''} onChange={handleInputChange} placeholder="Cena oryginalna" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input required name="imageUrl" value={formData.imageUrl || ''} onChange={handleInputChange} placeholder="URL Obrazka" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
                <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Opis produktu" rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </>
            )}

            {activeTab === 'esport' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required name="game" value={formData.game || ''} onChange={handleInputChange} placeholder="Gra (np. CS2, LoL)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <select name="status" value={formData.status || 'upcoming'} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <option value="live">Na żywo</option>
                    <option value="upcoming">Nadchodzące</option>
                    <option value="finished">Zakończone</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <input required name="teamA" value={formData.teamA || ''} onChange={handleInputChange} placeholder="Drużyna A" className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                    <input type="number" name="scoreA" value={formData.scoreA || 0} onChange={handleInputChange} placeholder="Wynik A" className="w-20 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div className="flex items-center gap-4">
                    <input required name="teamB" value={formData.teamB || ''} onChange={handleInputChange} placeholder="Drużyna B" className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                    <input type="number" name="scoreB" value={formData.scoreB || 0} onChange={handleInputChange} placeholder="Wynik B" className="w-20 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="date" name="date" value={formData.date || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  <input type="time" name="time" value={formData.time || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                </div>
              </>
            )}

            {activeTab === 'forum' && (
              <>
                <input required name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Nazwa kategorii" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                <textarea required name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Opis kategorii" rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </>
            )}

            {activeTab === 'config' && (
              <>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700">Typ Konfiguracji</label>
                  <select name="type" value={formData.type || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <option value="">Wybierz typ...</option>
                    <option value="menu">Menu Nawigacyjne</option>
                    <option value="footer">Stopka (Footer)</option>
                    <option value="blocks">Bloki Zawartości</option>
                    <option value="views">Widoki Wyświetlania</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Dane JSON</label>
                  <textarea 
                    name="dataJson" 
                    value={formData.dataJson || JSON.stringify(formData.data || {}, null, 2)} 
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setFormData((prev: any) => ({ ...prev, data: parsed, dataJson: e.target.value }));
                      } catch (err) {
                        setFormData((prev: any) => ({ ...prev, dataJson: e.target.value }));
                      }
                    }} 
                    rows={10} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm" 
                    placeholder='{ "key": "value" }'
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-end space-x-4 pt-4">
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(null); setFormData({}); }} className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700">Anuluj</button>
              )}
              <button type="submit" disabled={status?.type === 'loading'} className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center space-x-2 shadow-lg shadow-blue-100 disabled:opacity-50">
                {status?.type === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                <span>Zapisz</span>
              </button>
            </div>

            <AnimatePresence>
              {status && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={cn("p-4 rounded-xl flex items-center space-x-3", status.type === 'success' ? "bg-green-50 text-green-700 border border-green-100" : status.type === 'error' ? "bg-red-50 text-red-700 border border-red-100" : "bg-blue-50 text-blue-700 border border-blue-100")}>
                  {status.type === 'success' ? <CheckCircle2 size={20} /> : status.type === 'error' ? <AlertCircle size={20} /> : <Loader2 className="animate-spin" size={20} />}
                  <span className="font-medium">{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* List Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista: {activeTab}</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {activeTab === 'articles' && articles.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                <img src={item.imageUrl} className="w-24 h-16 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.category} • {item.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id, 'articles')} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'videos' && videos.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                <img src={item.thumbnailUrl} className="w-24 h-16 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.category} • {item.duration}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id, 'videos')} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'store' && products.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                <img src={item.imageUrl} className="w-24 h-16 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.platform} • {item.price} PLN</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id, 'products')} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'esport' && matches.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="flex-grow">
                  <h3 className="font-bold">{item.teamA} vs {item.teamB}</h3>
                  <p className="text-xs text-gray-500">{item.game} • {item.status} • {item.date} {item.time}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id, 'esportMatches')} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'comments' && comments.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="flex-grow">
                  <h3 className="font-bold">{item.author}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{item.content}</p>
                </div>
                <button onClick={() => handleDelete(item.id, 'comments')} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
              </div>
            ))}

            {activeTab === 'forum' && forumCats.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="flex-grow">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id, 'forumCategories')} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'config' && configs.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="flex-grow">
                  <h3 className="font-bold uppercase">{item.type}</h3>
                  <p className="text-xs text-gray-500">ID: {item.id}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id, 'siteConfig')} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

