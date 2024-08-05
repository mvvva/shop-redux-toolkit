import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { ACTION_TYPES } from '../../store/reducer';
import "./Main.css";

function Main({ selectedBrand, selectedColor }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useContext(Context);

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

  return (
    <main className="main flex-1 h-screen overflow-y-auto bg-gray-800 text-white p-4">
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
      <ul className='products'>
        {state.products.map((p) => (
          <li className='products-card' key={p.id}>
            <img src={p.image_url} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.brand_name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
