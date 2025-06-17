import React, { useState, useEffect } from 'react';

// Mock data for restaurants with Arabic support
const restaurantsData = [
  {
    id: 1,
    name: "مطعم الأصالة",
    nameEn: "Al Asala Restaurant",
    cuisine: "مأكولات شرقية",
    cuisineEn: "Middle Eastern",
    rating: 4.9,
    deliveryTime: "20-30 دقيقة",
    deliveryTimeEn: "20-30 min",
    deliveryFee: 25,
    minOrder: 100,
    image: "https://images.unsplash.com/photo-1712488070215-d22e012314ae",
    menu: [
      {
        id: 1,
        name: "شاورما اللحم",
        nameEn: "Meat Shawarma",
        description: "شاورما لحم طازج مع الخضار والطحينة",
        descriptionEn: "Fresh meat shawarma with vegetables and tahini",
        price: 85,
        image: "https://images.pexels.com/photos/29850814/pexels-photo-29850814.jpeg",
        category: "شاورما",
        categoryEn: "Shawarma"
      },
      {
        id: 2,
        name: "طبق الحمص",
        nameEn: "Hummus Plate",
        description: "حمص طازج مع زيت الزيتون والخبز العربي",
        descriptionEn: "Fresh hummus with olive oil and Arabic bread",
        price: 45,
        image: "https://images.pexels.com/photos/6252726/pexels-photo-6252726.jpeg",
        category: "مقبلات",
        categoryEn: "Appetizers"
      },
      {
        id: 3,
        name: "كباب مشوي",
        nameEn: "Grilled Kebab",
        description: "كباب لحم مشوي مع الخضار والرز",
        descriptionEn: "Grilled meat kebab with vegetables and rice",
        price: 120,
        image: "https://images.unsplash.com/photo-1677903784547-963c38f74bfc",
        category: "مشاوي",
        categoryEn: "Grilled"
      }
    ]
  },
  {
    id: 2,
    name: "فلافل الملك",
    nameEn: "King Falafel",
    cuisine: "طعام شعبي",
    cuisineEn: "Street Food",
    rating: 4.7,
    deliveryTime: "15-25 دقيقة",
    deliveryTimeEn: "15-25 min",
    deliveryFee: 20,
    minOrder: 50,
    image: "https://images.unsplash.com/photo-1583665354191-634609954d54",
    menu: [
      {
        id: 4,
        name: "ساندويتش فلافل",
        nameEn: "Falafel Sandwich",
        description: "فلافل طازج مع السلطة والطحينة",
        descriptionEn: "Fresh falafel with salad and tahini",
        price: 35,
        image: "https://images.unsplash.com/photo-1734772591537-15ac1b3b3c04",
        category: "ساندويتشات",
        categoryEn: "Sandwiches"
      },
      {
        id: 5,
        name: "طبق مشكل",
        nameEn: "Mixed Plate",
        description: "فلافل، حمص، بابا غنوج مع الخبز",
        descriptionEn: "Falafel, hummus, baba ghanouj with bread",
        price: 75,
        image: "https://images.pexels.com/photos/15564067/pexels-photo-15564067.jpeg",
        category: "أطباق رئيسية",
        categoryEn: "Main Dishes"
      }
    ]
  },
  {
    id: 3,
    name: "مخبز القاهرة",
    nameEn: "Cairo Bakery",
    cuisine: "مخبوزات",
    cuisineEn: "Bakery",
    rating: 4.8,
    deliveryTime: "10-20 دقيقة",
    deliveryTimeEn: "10-20 min",
    deliveryFee: 15,
    minOrder: 30,
    image: "https://images.pexels.com/photos/9824446/pexels-photo-9824446.jpeg",
    menu: [
      {
        id: 6,
        name: "خبز عربي طازج",
        nameEn: "Fresh Arabic Bread",
        description: "خبز عربي طازج من الفرن",
        descriptionEn: "Fresh Arabic bread from the oven",
        price: 8,
        image: "https://images.pexels.com/photos/27693786/pexels-photo-27693786.jpeg",
        category: "خبز",
        categoryEn: "Bread"
      },
      {
        id: 7,
        name: "حلويات شرقية",
        nameEn: "Eastern Sweets",
        description: "تشكيلة من الحلويات الشرقية التقليدية",
        descriptionEn: "Assortment of traditional Eastern sweets",
        price: 60,
        image: "https://images.pexels.com/photos/7427851/pexels-photo-7427851.jpeg",
        category: "حلويات",
        categoryEn: "Sweets"
      }
    ]
  },
  {
    id: 4,
    name: "مشاوي النيل",
    nameEn: "Nile Grill",
    cuisine: "مشاوي",
    cuisineEn: "Grill",
    rating: 4.6,
    deliveryTime: "25-35 دقيقة",
    deliveryTimeEn: "25-35 min",
    deliveryFee: 30,
    minOrder: 150,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    menu: [
      {
        id: 8,
        name: "مشاوي مشكلة",
        nameEn: "Mixed Grill",
        description: "تشكيلة من الكباب والكفتة مع الخضار",
        descriptionEn: "Assortment of kebab and kofta with vegetables",
        price: 180,
        image: "https://images.unsplash.com/photo-1746274394124-141a1d1c5af3",
        category: "مشاوي",
        categoryEn: "Grilled"
      }
    ]
  }
];

// Language context
const translations = {
  ar: {
    appName: "طلباتي",
    cart: "السلة",
    login: "تسجيل الدخول",
    heroTitle: "توصيل الطعام في القاهرة",
    heroSubtitle: "اطلب أشهى الأكلات من أفضل المطاعم في المدينة. توصيل سريع وطعام طازج.",
    avgDelivery: "متوسط التوصيل",
    restaurants: "مطعم",
    serviceRating: "تقييم الخدمة",
    popularRestaurants: "المطاعم الشعبية",
    emptyCart: "السلة فارغة",
    addDishes: "أضف أطباق من قوائم المطاعم",
    continueShopping: "متابعة التسوق",
    back: "رجوع",
    addToCart: "أضف للسلة",
    orderTotal: "إجمالي الطلب",
    delivery: "التوصيل",
    free: "مجاني",
    total: "المجموع",
    placeOrder: "تأكيد الطلب",
    orderPlaced: "تم تأكيد الطلب!",
    orderProcessing: "طلبك قيد المعالجة. انتظر مكالمة للتأكيد.",
    excellent: "ممتاز!",
    phone: "رقم الهاتف",
    password: "كلمة المرور",
    name: "الاسم",
    address: "عنوان التوصيل",
    register: "تسجيل",
    haveAccount: "لديك حساب؟ سجل دخولك",
    noAccount: "ليس لديك حساب؟ سجل الآن",
    remove: "حذف",
    orderNumber: "رقم الطلب",
    points: "النقاط",
    deliveryAddress: "عنوان التوصيل",
    paymentMethod: "طريقة الدفع",
    cardOnline: "الدفع بالكارت",
    cashOnDelivery: "الدفع عند التوصيل",
    orderComment: "تعليق على الطلب",
    additionalRequests: "طلبات إضافية",
    orderSummary: "ملخص الطلب",
    dishes: "الأطباق",
    bonusPoints: "نقاط مكافأة",
    youWillGet: "ستحصل على",
    min: "دقيقة",
    egp: "جنيه"
  },
  en: {
    appName: "DeliVista",
    cart: "Cart",
    login: "Login",
    heroTitle: "Food Delivery in Cairo",
    heroSubtitle: "Order delicious dishes from the best restaurants in the city. Fast delivery, fresh food.",
    avgDelivery: "Avg Delivery",
    restaurants: "Restaurants",
    serviceRating: "Service Rating",
    popularRestaurants: "Popular Restaurants",
    emptyCart: "Cart is empty",
    addDishes: "Add dishes from restaurant menus",
    continueShopping: "Continue Shopping",
    back: "Back",
    addToCart: "Add to Cart",
    orderTotal: "Order Total",
    delivery: "Delivery",
    free: "Free",
    total: "Total",
    placeOrder: "Place Order",
    orderPlaced: "Order Placed!",
    orderProcessing: "Your order is being processed. Expect a call for confirmation.",
    excellent: "Excellent!",
    phone: "Phone Number",
    password: "Password",
    name: "Name",
    address: "Delivery Address",
    register: "Register",
    haveAccount: "Have an account? Login",
    noAccount: "No account? Register now",
    remove: "Remove",
    orderNumber: "Order Number",
    points: "Points",
    deliveryAddress: "Delivery Address",
    paymentMethod: "Payment Method",
    cardOnline: "Card Payment",
    cashOnDelivery: "Cash on Delivery",
    orderComment: "Order Comment",
    additionalRequests: "Additional Requests",
    orderSummary: "Order Summary",
    dishes: "Dishes",
    bonusPoints: "Bonus Points",
    youWillGet: "You will get",
    min: "min",
    egp: "EGP"
  }
};

// Language Context
const LanguageContext = React.createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [isRTL, setIsRTL] = useState(true);

  const switchLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    setIsRTL(newLang === 'ar');
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const getValue = (item, key) => {
    if (language === 'ar') {
      return item[key] || item[key + 'En'];
    } else {
      return item[key + 'En'] || item[key];
    }
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, switchLanguage, t, getValue }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => React.useContext(LanguageContext);

// Header Component
export const Header = ({ currentUser, onAuthClick, cartItems, onCartClick, onLogoClick }) => {
  const { t, switchLanguage, language, isRTL } = useLanguage();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div 
            className="flex items-center cursor-pointer"
            onClick={onLogoClick}
          >
            <div className="bg-orange-500 text-white font-bold text-xl px-3 py-1 rounded-lg">
              {t('appName')}
            </div>
          </div>
          
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <button
              onClick={switchLanguage}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-3 py-2 rounded-lg transition-colors text-sm"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
            
            <button
              onClick={onCartClick}
              className="relative bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {t('cart')}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              onClick={onAuthClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {currentUser ? (language === 'ar' ? currentUser.name : currentUser.name) : t('login')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-red-500 py-20 overflow-hidden">
      {/* Cairo skyline background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.pexels.com/photos/29678689/pexels-photo-29678689.jpeg" 
          alt="Cairo skyline"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-in" style={{animationDelay: '0.3s'}}>
            {t('heroSubtitle')}
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto animate-scale-in" style={{animationDelay: '0.6s'}}>
            <div className={`flex items-center justify-center space-x-8 text-white ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="text-center transform transition-all duration-300 hover:scale-110">
                <div className="text-2xl font-bold">25 {t('min')}</div>
                <div className="text-sm opacity-90">{t('avgDelivery')}</div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-110">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm opacity-90">{t('restaurants')}</div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-110">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm opacity-90">{t('serviceRating')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Arabic food emojis */}
      <div className="absolute top-20 left-10 text-white/20 text-6xl animate-bounce" style={{animationDelay: '1s'}}>🥙</div>
      <div className="absolute top-40 right-20 text-white/20 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🧆</div>
      <div className="absolute bottom-20 left-20 text-white/20 text-5xl animate-bounce" style={{animationDelay: '2s'}}>🫓</div>
      <div className="absolute bottom-40 right-10 text-white/20 text-3xl animate-bounce" style={{animationDelay: '2.5s'}}>🍖</div>
    </div>
  );
};

// Restaurant Card Component
export const RestaurantCard = ({ restaurant, onSelect }) => {
  const { getValue, t, isRTL } = useLanguage();
  
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in hover-lift"
      onClick={() => onSelect(restaurant)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={getValue(restaurant, 'name')}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 animate-slide-in`}>
          <span className="text-sm font-medium">⭐ {restaurant.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{getValue(restaurant, 'name')}</h3>
        <p className="text-gray-600 mb-4">{getValue(restaurant, 'cuisine')}</p>
        
        <div className={`flex items-center justify-between text-sm text-gray-500 ${isRTL ? 'space-x-reverse' : ''}`}>
          <span className="flex items-center">🕒 {getValue(restaurant, 'deliveryTime')}</span>
          <span className="flex items-center">🏍️ {restaurant.deliveryFee} {t('egp')}</span>
          <span className="flex items-center">💳 {restaurant.minOrder} {t('egp')}</span>
        </div>
      </div>
    </div>
  );
};

// Restaurants Grid Component
export const RestaurantsGrid = ({ onSelectRestaurant }) => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
        {t('popularRestaurants')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurantsData.map((restaurant, index) => (
          <div 
            key={restaurant.id} 
            className="animate-fade-in"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <RestaurantCard 
              restaurant={restaurant} 
              onSelect={onSelectRestaurant}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Menu Item Component
export const MenuItem = ({ item, onAddToCart }) => {
  const { getValue, t, isRTL } = useLanguage();
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in">
      <div className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex-1 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{getValue(item, 'name')}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{getValue(item, 'description')}</p>
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-xl font-bold text-gray-900">{item.price} {t('egp')}</span>
            <button
              onClick={() => onAddToCart(item)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:transform hover:scale-105 hover:shadow-md"
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
        <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
          <img 
            src={item.image} 
            alt={getValue(item, 'name')}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

// Restaurant Menu Component
export const RestaurantMenu = ({ restaurant, onAddToCart, onBack }) => {
  const { getValue, t, isRTL } = useLanguage();
  const categories = [...new Set(restaurant.menu.map(item => getValue(item, 'category')))];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 bg-gradient-to-r from-orange-600 to-red-600 animate-fade-in">
        <img 
          src={restaurant.image} 
          alt={getValue(restaurant, 'name')}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button
              onClick={onBack}
              className={`mb-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 animate-slide-in ${isRTL ? 'float-right' : 'float-left'}`}
            >
              {isRTL ? '→' : '←'} {t('back')}
            </button>
            <div className="clear-both">
              <h1 className="text-4xl font-bold text-white mb-4 animate-slide-in" style={{animationDelay: '0.2s'}}>
                {getValue(restaurant, 'name')}
              </h1>
              <div className={`flex items-center space-x-6 text-white/90 animate-slide-in ${isRTL ? 'space-x-reverse' : ''}`} style={{animationDelay: '0.4s'}}>
                <span>⭐ {restaurant.rating}</span>
                <span>🕒 {getValue(restaurant, 'deliveryTime')}</span>
                <span>🏍️ {restaurant.deliveryFee} {t('egp')}</span>
                <span>💳 {restaurant.minOrder} {t('egp')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map((category, categoryIndex) => (
          <div key={category} className="mb-12 animate-fade-in" style={{animationDelay: `${categoryIndex * 0.2}s`}}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="space-y-4">
              {restaurant.menu
                .filter(item => getValue(item, 'category') === category)
                .map((item, itemIndex) => (
                  <div key={item.id} className="animate-slide-in" style={{animationDelay: `${(categoryIndex * 0.2) + (itemIndex * 0.1)}s`}}>
                    <MenuItem 
                      item={item} 
                      onAddToCart={onAddToCart}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shopping Cart Component
export const ShoppingCart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout, onClose }) => {
  const { t, getValue, isRTL } = useLanguage();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 150 ? 0 : 25;
  const total = subtotal + deliveryFee;
  
  // Если корзина пуста, не рендерим компонент
  if (cartItems.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-2xl font-bold text-gray-900">{t('cart')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200 hover:rotate-90 transform"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {cartItems.map((item, index) => (
              <div key={item.id} className={`flex items-center space-x-4 py-4 border-b animate-slide-in ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                <img 
                  src={item.image} 
                  alt={getValue(item, 'name')}
                  className="w-16 h-16 object-cover rounded-lg transition-transform duration-200 hover:scale-110"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{getValue(item, 'name')}</h3>
                  <p className="text-gray-600">{item.price} {t('egp')}</p>
                </div>
                <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200 hover:scale-105 transform"
                >
                  {t('remove')}
                </button>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2 animate-slide-in">
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{t('orderTotal')}:</span>
              <span>{subtotal} {t('egp')}</span>
            </div>
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{t('delivery')}:</span>
              <span>{deliveryFee === 0 ? t('free') : `${deliveryFee} ${t('egp')}`}</span>
            </div>
            <div className={`flex justify-between font-bold text-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{t('total')}:</span>
              <span>{total} {t('egp')}</span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg mt-6 transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg"
          >
            {t('placeOrder')}
          </button>
        </div>
      </div>
    </div>
  );
};

// Auth Modal Component
export const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const { t, isRTL } = useLanguage();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    name: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      onLogin(formData);
    } else {
      onRegister(formData);
    }
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 11);
    
    if (limited.length >= 1) {
      let formatted = '+20';
      if (limited.length > 2) {
        formatted += ' ' + limited.slice(2, 5);
        if (limited.length > 5) {
          formatted += ' ' + limited.slice(5, 8);
          if (limited.length > 8) {
            formatted += ' ' + limited.slice(8, 11);
          }
        }
      }
      return formatted;
    }
    return '+20';
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData({...formData, phone: formatted});
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scale-in">
        <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLoginMode ? t('login') : t('register')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-all duration-200 hover:rotate-90 transform"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <input
              type="text"
              placeholder={t('name')}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 animate-slide-in"
              required
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          )}
          
          <input
            type="tel"
            placeholder="+20 ___ ___ ___"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 animate-slide-in"
            required
            style={{animationDelay: '0.1s'}}
            dir="ltr"
          />
          
          <input
            type="password"
            placeholder={t('password')}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 animate-slide-in"
            required
            style={{animationDelay: '0.2s'}}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          
          {!isLoginMode && (
            <textarea
              placeholder={t('address')}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 animate-slide-in"
              rows="3"
              required
              style={{animationDelay: '0.3s'}}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          )}
          
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg animate-slide-in"
            style={{animationDelay: '0.4s'}}
          >
            {isLoginMode ? t('login') : t('register')}
          </button>
        </form>
        
        <div className="mt-4 text-center animate-slide-in" style={{animationDelay: '0.5s'}}>
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-orange-600 hover:text-orange-700 font-medium transition-all duration-200 hover:scale-105 transform"
          >
            {isLoginMode ? t('noAccount') : t('haveAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

// Checkout Modal Component
export const CheckoutModal = ({ isOpen, onClose, cartItems, currentUser, onPlaceOrder }) => {
  const { t, getValue, isRTL } = useLanguage();
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [comment, setComment] = useState('');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 150 ? 0 : 25;
  const total = subtotal + deliveryFee;
  const pointsEarned = Math.floor(total / 10);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      items: cartItems,
      deliveryAddress,
      paymentMethod,
      comment,
      subtotal,
      deliveryFee,
      total,
      pointsEarned
    };
    onPlaceOrder(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-2xl font-bold text-gray-900">{t('placeOrder')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200 hover:rotate-90 transform"
            >
              ×
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('deliveryAddress')}</h3>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder={t('deliveryAddress')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="3"
              required
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('paymentMethod')}</h3>
            <div className="space-y-2">
              <label className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={`${isRTL ? 'ml-3' : 'mr-3'}`}
                />
                <span>{t('cardOnline')}</span>
              </label>
              <label className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={`${isRTL ? 'ml-3' : 'mr-3'}`}
                />
                <span>{t('cashOnDelivery')}</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('orderComment')}</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('additionalRequests')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="2"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('orderSummary')}</h3>
            <div className="space-y-2">
              <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{t('dishes')}:</span>
                <span>{subtotal} {t('egp')}</span>
              </div>
              <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{t('delivery')}:</span>
                <span>{deliveryFee === 0 ? t('free') : `${deliveryFee} ${t('egp')}`}</span>
              </div>
              <div className={`flex justify-between font-bold text-lg border-t pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{t('total')}:</span>
                <span>{total} {t('egp')}</span>
              </div>
              <div className="text-sm text-green-600">
                {t('youWillGet')} {pointsEarned} {t('bonusPoints')}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg"
          >
            {t('placeOrder')}
          </button>
        </form>
      </div>
    </div>
  );
};

// Order Success Modal Component
export const OrderSuccessModal = ({ isOpen, onClose, orderData }) => {
  const { t, isRTL } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center animate-scale-in">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('orderPlaced')}</h2>
        <p className="text-gray-600 mb-6">
          {t('orderProcessing')}
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{t('orderNumber')}:</span>
              <span className="font-semibold">#{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{t('total')}:</span>
              <span className="font-semibold">{orderData?.total} {t('egp')}</span>
            </div>
            <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{t('points')}:</span>
              <span className="font-semibold text-green-600">+{orderData?.pointsEarned}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg"
        >
          {t('excellent')}
        </button>
      </div>
    </div>
  );
};

export { restaurantsData };