import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { ACTION_TYPES } from '../../store/reducer';
import "./Aside.css";

function Aside({ selectedBrand, setSelectedBrand, selectedColor, setSelectedColor }) {
  const [loadingColors, setLoadingColors] = useState(false);
  const [error, setError] = useState(null);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [activeColor, setActiveColor] = useState("");
  const [activeBrand, setActiveBrand] = useState("");

  const { state, dispatch } = useContext(Context);
  const { colors, brands } = state;

  useEffect(() => {
    async function fetchColors() {
      setLoadingColors(true);
      try {
        const response = await fetch("https://headphones-server.onrender.com/colors");
        if (!response.ok) {
          throw new Error("Error fetching colors");
        }
        const data = await response.json();
        dispatch({ type: ACTION_TYPES.fetch_colors, payload: data });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingColors(false);
      }
    }

    async function fetchBrands() {
      setBrandsLoading(true);
      try {
        const response = await fetch("https://headphones-server.onrender.com/brands");
        if (!response.ok) {
          throw new Error("Error fetching brands");
        }
        const data = await response.json();
        dispatch({ type: ACTION_TYPES.fetch_brands, payload: data });
      } catch (error) {
        setError(error.message);
      } finally {
        setBrandsLoading(false);
      }
    }

    fetchColors();
    fetchBrands();
  }, [dispatch]);

  return (
    <aside>
      <h2>Brands</h2>
      <ul className='brands-wrapper'>
        {brands.map((brand, index) => (
          <li key={index}>
            <input
              type="radio"
              id={brand}
              name="brands"
              onChange={() => setSelectedBrand(brand)}
              checked={selectedBrand === brand}
            />
            <label htmlFor={brand}>{brand}</label>
          </li>
        ))}
      </ul>
      <div className="reset-buttons">
        <button onClick={() => setSelectedBrand("")} className="reset-btn">Reset Brand</button>
        <button onClick={() => setSelectedColor("")} className="reset-btn">Reset Color</button>
      </div>
      <h2>Colors</h2>
      <ul className='colors-wrapper'>
        {colors.map((color, index) => (
          <li key={index}>
            <button
              onClick={() => setSelectedColor(color)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "1px solid",
                backgroundColor: color,
                cursor: 'pointer',
                outlineOffset: "2px",
                outline: selectedColor === color ? "1px solid red" : "",
              }}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;
