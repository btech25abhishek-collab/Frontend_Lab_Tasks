
import { useState } from "react";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLGaEVzfIedm5gkfhnD21Axi8OmdUvSfvL4PF3J5ebqA&s=10",
      title: "Laptop",
      description: "Powerful laptop for study, work and gaming.",
      price: 110000,
      rating: 4.5,
      reviews: 120
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2Pttxb6xUeOmwZ6ZVpuaWvYu5cSmtt_1WGdWkUybQg&s=10",
      title: "Headphones",
      description: "Comfortable headphones with clear sound.",
      price: 1999,
      rating: 4.3,
      reviews: 85
    },
    {
      id: 3,
      image: "data:image/jpeg;base64,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",
      title: "Smartphone",
      description: "Modern smartphone with advanced features.",
      price: 24999,
      rating: 4.7,
      reviews: 200
    }
  ];

  const filteredProducts = products.filter((product) =>
    (product.title + " " + product.description)
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
  <div className="App">
    <h1>Our Products</h1>

    <div className="product-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
        />
      ))}
    </div>
  </div>
);
}

export default App;
