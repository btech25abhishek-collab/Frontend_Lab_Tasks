
function ProductCard({ image, title, description, price, rating, reviews }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />

      <h2>{title}</h2>
      <p>{description}</p>

      <div className="rating">
        ⭐ {rating} <span>({reviews} reviews)</span>
      </div>

      <h3>₹{price}</h3>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
