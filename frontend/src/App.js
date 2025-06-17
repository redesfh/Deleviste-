import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  RestaurantsGrid, 
  RestaurantMenu, 
  ShoppingCart, 
  AuthModal, 
  CheckoutModal, 
  OrderSuccessModal,
  LanguageProvider,
  restaurantsData 
} from './components';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIBLhQzoUVI9CbXbxCptZyzeA_Ig03WZA",
  authDomain: "delevista.firebaseapp.com",
  projectId: "delevista",
  storageBucket: "delevista.firebasestorage.app",
  messagingSenderId: "771195435829",
  appId: "1:771195435829:web:81a4e7c4baf8890ff7ea7c",
  measurementId: "G-CJ1MZB72ND"
};

function App() {
  // State management
  const [currentView, setCurrentView] = useState('home'); // 'home', 'restaurant', 'admin'
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrderData, setLastOrderData] = useState(null);

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Админ',
      phone: '+7 (999) 999-99-99',
      password: 'admin123',
      role: 'admin',
      points: 0,
      address: '',
      orders: []
    }
  ]);

  // Load user from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('delivista_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    const savedCart = localStorage.getItem('delivista_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('delivista_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Authentication functions
  const handleLogin = (loginData) => {
    const user = users.find(u => u.phone === loginData.phone && u.password === loginData.password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('delivista_user', JSON.stringify(user));
      setIsAuthModalOpen(false);
      
      // Redirect to admin if admin user
      if (user.role === 'admin') {
        setCurrentView('admin');
      }
    } else {
      alert('Неверный номер телефона или пароль');
    }
  };

  const handleRegister = (registerData) => {
    const existingUser = users.find(u => u.phone === registerData.phone);
    if (existingUser) {
      alert('Пользователь с таким номером телефона уже существует');
      return;
    }

    const newUser = {
      id: users.length + 1,
      ...registerData,
      role: 'user',
      points: 0,
      orders: []
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('delivista_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('delivista_user');
    setCurrentView('home');
  };

  // Cart functions
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Order functions
  const handlePlaceOrder = (orderData) => {
    if (!currentUser) {
      setIsCheckoutOpen(false);
      setIsAuthModalOpen(true);
      return;
    }

    // Update user points
    const updatedUser = {
      ...currentUser,
      points: currentUser.points + orderData.pointsEarned,
      orders: [...currentUser.orders, {
        id: Date.now(),
        date: new Date().toISOString(),
        items: orderData.items,
        total: orderData.total,
        address: orderData.deliveryAddress,
        status: 'processing'
      }]
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('delivista_user', JSON.stringify(updatedUser));
    
    // Update users list
    setUsers(users.map(user =>
      user.id === currentUser.id ? updatedUser : user
    ));

    setLastOrderData(orderData);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    clearCart();
  };

  // Navigation functions
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('restaurant');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedRestaurant(null);
  };

  const handleAuthClick = () => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        setCurrentView(currentView === 'admin' ? 'home' : 'admin');
      } else {
        // Show user menu or logout
        if (window.confirm('Выйти из аккаунта?')) {
          handleLogout();
        }
      }
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleCartClick = () => {
    if (cartItems.length === 0) {
      // Показываем уведомление, что корзина пуста
      alert('Корзина пуста. Добавьте блюда из меню ресторанов!');
      return;
    }
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      setIsCartOpen(false);
      setIsAuthModalOpen(true);
    } else {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  // Admin Panel Component
  const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('restaurants');
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Админ-панель</h1>
            
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('restaurants')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'restaurants' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Рестораны
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Заказы
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Пользователи
              </button>
            </div>
            
            {activeTab === 'restaurants' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Управление ресторанами</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {restaurantsData.map(restaurant => (
                    <div key={restaurant.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                          <p className="text-gray-600">{restaurant.cuisine}</p>
                          <p className="text-sm text-gray-500">⭐ {restaurant.rating} • {restaurant.menu.length} блюд</p>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                          Редактировать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Все заказы</h2>
                <div className="space-y-4">
                  {users.flatMap(user => 
                    user.orders.map(order => (
                      <div key={`${user.id}-${order.id}`} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">Заказ #{order.id}</h3>
                            <p className="text-gray-600">{user.name} • {user.phone}</p>
                            <p className="text-gray-600">{order.address}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString('ru-RU')} в {' '}
                              {new Date(order.date).toLocaleTimeString('ru-RU')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{order.total} ₽</p>
                            <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                              {order.status === 'processing' ? 'В обработке' : order.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <h4 className="font-medium text-gray-900 mb-2">Состав заказа:</h4>
                          <div className="space-y-1">
                            {order.items.map(item => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} × {item.quantity}</span>
                                <span>{item.price * item.quantity} ₽</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {users.every(user => user.orders.length === 0) && (
                    <p className="text-gray-500 text-center py-8">Заказов пока нет</p>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Пользователи</h2>
                <div className="space-y-4">
                  {users.filter(user => user.role !== 'admin').map(user => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-gray-600">{user.phone}</p>
                          <p className="text-gray-600">{user.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-green-600">{user.points} баллов</p>
                          <p className="text-sm text-gray-500">{user.orders.length} заказов</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {users.filter(user => user.role !== 'admin').length === 0 && (
                    <p className="text-gray-500 text-center py-8">Пользователей пока нет</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="App min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        onAuthClick={handleAuthClick}
        cartItems={cartItems}
        onCartClick={handleCartClick}
        onLogoClick={handleBackToHome}
      />
      
      {currentView === 'home' && (
        <>
          <HeroSection />
          <RestaurantsGrid onSelectRestaurant={handleSelectRestaurant} />
        </>
      )}
      
      {currentView === 'restaurant' && selectedRestaurant && (
        <RestaurantMenu 
          restaurant={selectedRestaurant}
          onAddToCart={addToCart}
          onBack={handleBackToHome}
        />
      )}
      
      {currentView === 'admin' && currentUser?.role === 'admin' && (
        <AdminPanel />
      )}
      
      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      
      {isCartOpen && (
        <ShoppingCart
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          onClose={() => setIsCartOpen(false)}
        />
      )}
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onPlaceOrder={handlePlaceOrder}
      />
      
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => {
          setIsOrderSuccessOpen(false);
          setLastOrderData(null);
        }}
        orderData={lastOrderData}
      />
    </div>
  );
}

export default App;