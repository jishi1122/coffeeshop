import React, { useMemo, useState } from 'react';
import './App.css';

const menuItems = [
  { id: 1, name: 'Coffee', price: 7.50, image: '/image/coffee.jpeg' },
  { id: 2, name: 'Tea', price: 5.00, image: '/image/tea.jpeg' },
  { id: 3, name: 'Coffee Latte', price: 12.50, image: '/image/coffee latte.jpeg' },
  { id: 4, name: 'Ice Coffee', price: 15.00, image: '/image/ice coffe.jpeg' },
  { id: 5, name: 'Hot Mocha', price: 10.25, image: '/image/mocha.jpeg' },
  { id: 6, name: 'Water', price: 2.00, image: '/image/water.jpeg' },
];

function Header({ onLoginClick, onHomeClick, searchTerm, onSearchChange, cartCount }) {
  return (
    <header className="header">
      <button type="button" className="logo" onClick={onHomeClick}>
        <span>Coffee Shop</span>
      </button>

      <nav className="navbar">
        <a href="#home" onClick={onHomeClick}>Home</a>
        <a href="#about" onClick={onHomeClick}>About</a>
        <a href="#menu" onClick={onHomeClick}>Menu</a>
        <a href="#cart" onClick={onHomeClick}>Cart ({cartCount})</a>
        <button type="button" className="nav-login" onClick={onLoginClick}>Login</button>
      </nav>

      <div className="Search">
        <input
          type="search"
          id="search"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </header>
  );
}

function HomePage({ searchTerm, filteredMenuItems, onAddToCart, cartItems, onRemoveFromCart, onClearCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <section className="home" id="home">
        <div className="home-image-scroll" aria-hidden="true">
          <div className="home-image-track">
            {[...menuItems, ...menuItems].map((item, index) => (
              <img key={`${item.id}-${index}`} src={item.image} alt="" />
            ))}
          </div>
        </div>

        <div className="content">
          <h3>Fresh Coffee At Morning</h3>
          <p>Keep your day beautiful with your coffee</p>
          <a href="#menu" className="btn">Try It Now</a>
        </div>
      </section>

      <section className="about" id="about">
        <h1 className="heading"><span>About</span> Us</h1>

        <div className="row">
          <div className="image about-image-box">
            <img src="/image/coco.jpeg" alt="Coffee cup" />
          </div>

          <div className="content">
            <h3>What makes our coffee special?</h3>
            <p>
              Our coffee is made to give customers a warm and fresh experience every morning.
              We focus on taste, quality, and a comfortable coffee shop atmosphere.
            </p>
            <p>
              We offer different drinks such as coffee, tea, latte, mocha, and iced coffee
              so every customer can find something they like.
            </p>
            <a href="#menu" className="btn">Learn More</a>
          </div>
        </div>
      </section>

      <section className="menu" id="menu">
        <h1 className="heading">Our <span>Menu</span></h1>

        {searchTerm && (
          <p className="search-result-text">
            Showing results for: <strong>{searchTerm}</strong>
          </p>
        )}

        <div className="box-container">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <div className="box" key={item.id}>
                <img className="menu-image" src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <div className="price">${item.price.toFixed(2)}</div>
                <button type="button" className="btn" onClick={() => onAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No menu items found.</p>
          )}
        </div>
      </section>

      <section className="cart" id="cart">
        <h1 className="heading">Your <span>Cart</span></h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Add something from the menu.</p>
        ) : (
          <div className="cart-box">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-product">
                  <img className="cart-image" src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                </div>
                <div className="cart-actions">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button type="button" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <h2>Total: ${total.toFixed(2)}</h2>
              <button type="button" className="btn" onClick={onClearCart}>Clear Cart</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function LoginPage({ onHomeClick }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Login form submitted');
  };

  return (
    <section className="login" id="login">
      <h1 className="heading"><span>Login</span></h1>

      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input type="text" placeholder="username" name="username" id="username" />
          </div>

          <div className="inputBox">
            <input type="password" placeholder="password" name="password" id="password" />
          </div>

          <input type="submit" value="Submit" className="btn" />
          <button type="button" className="btn back-btn" onClick={onHomeClick}>Back Home</button>
        </form>
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [searchTerm]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const goHome = () => {
    setPage('home');
  };

  return (
    <div className="App">
      <Header
        onLoginClick={() => setPage('login')}
        onHomeClick={goHome}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartCount}
      />

      {page === 'home' ? (
        <HomePage
          searchTerm={searchTerm}
          filteredMenuItems={filteredMenuItems}
          onAddToCart={addToCart}
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
        />
      ) : (
        <LoginPage onHomeClick={goHome} />
      )}
    </div>
  );
}

export default App;
