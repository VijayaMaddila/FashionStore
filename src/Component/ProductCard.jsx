const ProductCard = ({
  product,
  addToCart,
  toggleWishlist, // passed from App.js
  isWishlisted, // boolean passed from App.js
}) => {
  const {
    image,
    name,
    price,
    originalPrice,
    discount,
    rating,
    isBestSeller,
    brand,
  } = product;

  return (
    <div className="product-card">
      {/* Best Seller Badge */}
      {isBestSeller && <span className="badge">Best Seller</span>}

      {/* Wishlist Button */}
      <button
        className={`isWishlisted ${isWishlisted ? "active" : ""}`}
        onClick={() => toggleWishlist(product)}
      >
        {isWishlisted ? "❤️" : "♡"}
      </button>

      {/* Product Image */}
      <img src={image} alt={name} className="product-image" />

      {/* Product Details */}
      <h3 className="product-name">{name}</h3>
      <p className="product-brand">{brand}</p>

      {/* Price & Discount */}
      <p className="product-price">
        ₹{price.toLocaleString("en-IN")}
        {originalPrice && (
          <span className="original-price">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
        )}
      </p>
      {discount && <p className="product-discount">{discount}</p>}

      {/* Rating */}
      <p className="product-rating">{"⭐".repeat(Math.floor(rating))}</p>

      {/* Add to Cart */}
      <button className="add-to-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
