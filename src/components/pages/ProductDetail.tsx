import React, { useState, useEffect } from 'react';
import { Link } from '../../components/Link';
import { products as mockProducts } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { Star, ShoppingCart, ShieldCheck, Zap, Globe, Clock, ChevronLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const ProductDetail = ({ id }: { id?: string }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'store', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProduct(data);
          setActiveImage(data.imageUrl || '');
        } else {
          // Fallback to mock data
          const mockProduct = mockProducts.find(p => p.id === id);
          if (mockProduct) {
            setProduct(mockProduct);
            setActiveImage(mockProduct.imageUrl || '');
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        const mockProduct = mockProducts.find(p => p.id === id);
        if (mockProduct) {
          setProduct(mockProduct);
          setActiveImage(mockProduct.imageUrl || '');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl">Produkt nie został znaleziony</h1>
        <Link to="/store" className="text-gold mt-4 inline-block">Wróć do sklepu</Link>
      </div>
    );
  }

  const gallery = product ? [product.imageUrl, ...(product.galleryImages || [])] : [];

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="pt-32 pb-20 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Link to="/store" className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 text-sm">
          <ChevronLeft size={16} />
          <span>Powrót do sklepu</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image & Gallery */}
          <div className="lg:w-1/2">
            <div className="sticky top-32 space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-2xl bg-gray-50 relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={activeImage} 
                    alt={product.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </AnimatePresence>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "aspect-video rounded-lg overflow-hidden border-2 transition-all",
                      activeImage === img ? "border-blue-600" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`${product.title} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest border border-blue-100">
                  {product.platform}
                </span>
                <span className="flex items-center space-x-1 text-gray-400 text-sm">
                  <Globe size={14} />
                  <span>{product.region}</span>
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">{product.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-blue-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="ml-2 font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({product.reviewsCount} opinii)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm">
                <div className="flex items-baseline space-x-3 mb-6">
                  <span className="text-4xl font-bold text-gray-900">{product.price.toFixed(2)} zł</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{product.originalPrice.toFixed(2)} zł</span>
                  )}
                  {discount > 0 && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{discount}%</span>
                  )}
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 mb-4 shadow-lg shadow-blue-600/10"
                >
                  <ShoppingCart size={20} />
                  <span>Kup teraz</span>
                </button>
                <p className="text-center text-xs text-gray-500">Dostawa cyfrowa: Klucz zostanie wysłany na Twój e-mail natychmiast po zakupie.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Gwarancja GamerGold</p>
                    <p className="text-xs text-gray-500">Gwarantujemy działanie każdego klucza lub zwrot pieniędzy.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <Zap className="text-blue-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Natychmiastowa wysyłka</p>
                    <p className="text-xs text-gray-500">Średni czas dostawy to mniej niż 60 sekund.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <Clock className="text-blue-500 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Wsparcie 24/7</p>
                    <p className="text-xs text-gray-500">Nasz zespół jest dostępny o każdej porze dnia i nocy.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-blue max-w-none">
              <h3 className="text-2xl font-display font-bold mb-6 border-b border-gray-100 pb-4 text-gray-900">O tej grze</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <ul className="text-gray-600 space-y-2 mt-6">
                <li>• Platforma: {product.platform}</li>
                <li>• Region: {product.region}</li>
                <li>• Gatunek: {product.category}</li>
                <li>• Język: Polski, Angielski, Niemiecki, Francuski</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
