import React, { useState, useEffect } from 'react';

// Mock data for restaurants
const restaurantsData = [
  {
    id: 1,
    name: "Bella Pizza",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 99,
    minOrder: 500,
    image: "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MHx8fHwxNzUwMTM5Mjg0fDA&ixlib=rb-4.1.0&q=85",
    menu: [
      {
        id: 1,
        name: "Пицца Маргарита",
        description: "Классическая пицца с томатным соусом, моцареллой и базиликом",
        price: 650,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1hcmdoZXJpdGF8ZW58MHx8fHwxNzUwMTM5MzA1fDA&ixlib=rb-4.1.0&q=85",
        category: "Пицца"
      },
      {
        id: 2,
        name: "Паста Карбонара",
        description: "Спагетти с беконом, яйцом, пармезаном и сливочным соусом",
        price: 550,
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwwfHx8fDE3NTAxMzkzMjV8MA&ixlib=rb-4.1.0&q=85",
        category: "Паста"
      },
      {
        id: 3,
        name: "Пицца Пепперони",
        description: "Острая пицца с салями пепперони и моцареллой",
        price: 750,
        image: "https://images.pexels.com/photos/6605191/pexels-photo-6605191.jpeg",
        category: "Пицца"
      }
    ]
  },
  {
    id: 2,
    name: "Burger House",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 149,
    minOrder: 400,
    image: "https://images.pexels.com/photos/30600496/pexels-photo-30600496.jpeg",
    menu: [
      {
        id: 4,
        name: "Делюкс Бургер",
        description: "Говяжья котлета, салат, помидор, сыр, специальный соус",
        price: 490,
        image: "https://images.unsplash.com/photo-1577973479360-62e8e4759cf4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBkZWx1eGV8ZW58MHx8fHwxNzUwMTM5MzEzfDA&ixlib=rb-4.1.0&q=85",
        category: "Бургеры"
      },
      {
        id: 5,
        name: "Чизбургер",
        description: "Классический бургер с говяжьей котлетой и сыром",
        price: 350,
        image: "https://images.pexels.com/photos/2874979/pexels-photo-2874979.jpeg",
        category: "Бургеры"
      },
      {
        id: 6,
        name: "Картофель фри",
        description: "Хрустящий картофель с солью",
        price: 180,
        image: "https://images.pexels.com/photos/28376181/pexels-photo-28376181.jpeg",
        category: "Гарниры"
      }
    ]
  },
  {
    id: 3,
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "35-45 min",
    deliveryFee: 199,
    minOrder: 800,
    image: "https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MHx8fHwxNzUwMTM5Mjk0fDA&ixlib=rb-4.1.0&q=85",
    menu: [
      {
        id: 7,
        name: "Суши сет",
        description: "Ассорти из 12 суши: лосось, тунец, угорь, креветка",
        price: 1200,
        image: "https://images.unsplash.com/photo-1625937751876-4515cd8e78bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MHx8fHwxNzUwMTM5MzE5fDA&ixlib=rb-4.1.0&q=85",
        category: "Суши"
      },
      {
        id: 8,
        name: "Ролл Филадельфия",
        description: "Лосось, сливочный сыр, огурец, нори",
        price: 580,
        image: "https://images.pexels.com/photos/9882300/pexels-photo-9882300.jpeg",
        category: "Роллы"
      },
      {
        id: 9,
        name: "Мисо суп",
        description: "Традиционный японский суп с водорослями и тофу",
        price: 290,
        image: "https://images.pexels.com/photos/17312774/pexels-photo-17312774.jpeg",
        category: "Супы"
      }
    ]
  },
  {
    id: 4,
    name: "Trattoria Roma",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: 120,
    minOrder: 600,
    image: "https://images.unsplash.com/photo-1668269378925-b928a41a9786?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwwfHx8fDE3NTAxMzkzMDB8MA&ixlib=rb-4.1.0&q=85",
    menu: [
      {
        id: 10,
        name: "Ризотто с грибами",
        description: "Кремовое ризотто с белыми грибами и пармезаном",
        price: 680,
        image: "https://images.unsplash.com/photo-1593548615309-5a45c504f994?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwwfHx8fDE3NTAxMzkzMDB8MA&ixlib=rb-4.1.0&q=85",
        category: "Ризотто"
      },
      {
        id: 11,
        name: "Лазанья",
        description: "Слоеная лазанья с мясным соусом и сыром",
        price: 590,
        image: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg",
        category: "Горячие блюда"
      },
      {
        id: 12,
        name: "Тирамису",
        description: "Классический итальянский десерт с маскарпоне",
        price: 320,
        image: "https://images.pexels.com/photos/546945/pexels-photo-546945.jpeg",
        category: "Десерты"
      }
    ]
  }
];

// Header Component
export const Header = ({ currentUser, onAuthClick, cartItems, onCartClick, onLogoClick }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer"
            onClick={onLogoClick}
          >
            <div className="bg-yellow-400 text-black font-bold text-xl px-3 py-1 rounded-lg">
              DeliVista
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Корзина
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
              {currentUser ? currentUser.name : 'Войти'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 to-orange-400 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Доставка еды в Москве
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Закажите любимые блюда из лучших ресторанов города. Быстрая доставка, свежие продукты.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto">
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">25 мин</div>
                <div className="text-sm opacity-90">Средняя доставка</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">400+</div>
                <div className="text-sm opacity-90">Ресторанов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm opacity-90">Рейтинг сервиса</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Restaurant Card Component
export const RestaurantCard = ({ restaurant, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onSelect(restaurant)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-medium">⭐ {restaurant.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>🕒 {restaurant.deliveryTime}</span>
          <span>🚚 {restaurant.deliveryFee} ₽</span>
          <span>💳 от {restaurant.minOrder} ₽</span>
        </div>
      </div>
    </div>
  );
};

// Restaurants Grid Component
export const RestaurantsGrid = ({ onSelectRestaurant }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Популярные рестораны
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurantsData.map(restaurant => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            onSelect={onSelectRestaurant}
          />
        ))}
      </div>
    </div>
  );
};

// Menu Item Component
export const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="flex-1 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">{item.price} ₽</span>
            <button
              onClick={() => onAddToCart(item)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg transition-colors"
            >
              В корзину
            </button>
          </div>
        </div>
        <div className="w-32 h-32 flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

// Restaurant Menu Component
export const RestaurantMenu = ({ restaurant, onAddToCart, onBack }) => {
  const categories = [...new Set(restaurant.menu.map(item => item.category))];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-900">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button
              onClick={onBack}
              className="mb-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors"
            >
              ← Назад
            </button>
            <h1 className="text-4xl font-bold text-white mb-4">{restaurant.name}</h1>
            <div className="flex items-center space-x-6 text-white/90">
              <span>⭐ {restaurant.rating}</span>
              <span>🕒 {restaurant.deliveryTime}</span>
              <span>🚚 {restaurant.deliveryFee} ₽</span>
              <span>💳 от {restaurant.minOrder} ₽</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="space-y-4">
              {restaurant.menu
                .filter(item => item.category === category)
                .map(item => (
                  <MenuItem 
                    key={item.id} 
                    item={item} 
                    onAddToCart={onAddToCart}
                  />
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
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 1000 ? 0 : 199;
  const total = subtotal + deliveryFee;
  
  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте блюда из меню ресторанов</p>
            <button
              onClick={onClose}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:transform hover:scale-105"
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Корзина</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">{item.price} ₽</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Сумма заказа:</span>
              <span>{subtotal} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка:</span>
              <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Итого:</span>
              <span>{total} ₽</span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg mt-6 transition-colors"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

// Auth Modal Component
export const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLoginMode ? 'Вход' : 'Регистрация'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Имя"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          
          <input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          
          {!isLoginMode && (
            <>
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              
              <textarea
                placeholder="Адрес доставки"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="3"
                required
              />
            </>
          )}
          
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            {isLoginMode ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Checkout Modal Component
export const CheckoutModal = ({ isOpen, onClose, cartItems, currentUser, onPlaceOrder }) => {
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [comment, setComment] = useState('');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 1000 ? 0 : 199;
  const total = subtotal + deliveryFee;
  const pointsEarned = Math.floor(total / 100);

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Оформление заказа</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Адрес доставки</h3>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Введите адрес доставки"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="3"
              required
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Способ оплаты</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>Картой онлайн</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>Наличными курьеру</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Комментарий к заказу</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Дополнительные пожелания"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="2"
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Сумма заказа</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Блюда:</span>
                <span>{subtotal} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Итого:</span>
                <span>{total} ₽</span>
              </div>
              <div className="text-sm text-green-600">
                Вы получите {pointsEarned} бонусных баллов
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Оформить заказ
          </button>
        </form>
      </div>
    </div>
  );
};

// Order Success Modal Component
export const OrderSuccessModal = ({ isOpen, onClose, orderData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Заказ оформлен!</h2>
        <p className="text-gray-600 mb-6">
          Ваш заказ принят в обработку. Ожидайте звонка для подтверждения.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Номер заказа:</span>
              <span className="font-semibold">#{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Сумма:</span>
              <span className="font-semibold">{orderData?.total} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Баллы:</span>
              <span className="font-semibold text-green-600">+{orderData?.pointsEarned}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Отлично!
        </button>
      </div>
    </div>
  );
};

export { restaurantsData };