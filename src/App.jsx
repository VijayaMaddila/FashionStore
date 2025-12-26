import { useState } from "react";
import productsData from "../data";
import "./App.css";
import ProductCard from "./Component/ProductCard";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Add to Cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Cart Count & Total
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Filter & Sort
  const filteredProducts = productsData
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <h2 className="logo">V.fashion</h2>
        <ul className="nav-links">
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Deals</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
        <div className="navbar-actions">
          {/* Dark/Light Toggle */}
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          {/* Cart Icon */}
          <div className="cart-info" onClick={() => setIsCartOpen(true)}>
            🛒{" "}
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* ================= FILTER & SORT ================= */}
      <section className="filter-sort">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isWishlisted={!!wishlist.find((item) => item.id === product.id)}
            />
          ))}
        </div>
      </section>

      {/* ================= CART MODAL ================= */}
      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-box">
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>
              ✕
            </button>
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-qty">Qty: {item.quantity}</p>
                    <p className="cart-item-price">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))
            )}
            <h4>Total: ₹{cartTotal.toLocaleString("en-IN")}</h4>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>© 2025 V.fashion. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
