import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { ACTION_TYPES } from '../../store/reducer';
import "./Main.css";

function Main({ selectedBrand, selectedColor, sortBy }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state: {products}, dispatch } = useContext(Context);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const brandFilter = selectedBrand ? `brand_name=${selectedBrand}` : "";
      const query = brandFilter ? `?${brandFilter}` : "";
      const api = `https://headphones-server.onrender.com/products${query}`;

      try {
        const response = await fetch(api);
        const data = await response.json();

        const filteredData = selectedColor
          ? data.filter(product =>
              product.color_options.includes(selectedColor)
            )
          : data;
          

        dispatch({ type: ACTION_TYPES.fetch_products, payload: filteredData });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedBrand, selectedColor, dispatch]);

  const sortedProducts = [...products].sort((p1,p2) =>{
    if (sortBy === "cheap") {
      return p1.price - p2.price
    }
    if (sortBy === "expensive") {
      return p2.price - p1.price
    }
    return 0
  })

  return (
    <main className="main flex-1 h-screen overflow-y-auto bg-gray-800 text-white p-4">
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      <ul className="products">
        {sortedProducts.map((p) => (
          <li className="products-card p-4 bg-gray-700 rounded-lg" key={p.id}>
            <img
              src={p.image_url}
              alt={p.name}
              className="h-72 w-full object-cover rounded-md" // Ensure all images have the same height
            />
            <h3 className="text-xl font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-400">{p.brand_name}</p>
            <p className="text-green-400">{p.price}$</p>
            <div className="flex space-x-2 mt-2">
              {p.color_options.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-full inline-block"
                  style={{ background: color }}
                ></span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}  

export default Main;
