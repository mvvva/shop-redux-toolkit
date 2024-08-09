import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from "./components/main/Main";
import Home from "./components/home/Home";
import Aside from "./components/aside/Aside";
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState('');

  return (
    <Provider store={store}>
      <Router>
          <header className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
            <nav>
              <ul className="flex items-center space-x-4">
                <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                <li><Link to="/context-provider" className="hover:text-gray-400">Context Provider</Link></li>
                <li>
                  <select 
                    name="price"
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All</option>
                    <option value="cheap">Cheap</option>
                    <option value="expensive">Expensive</option>
                  </select>
                </li>
              </ul>
            </nav>
          </header>
          <div className="mt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/context-provider" element={
                <div className="main-wrapper flex">
                  <Aside
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                  <Main
                    selectedBrand={selectedBrand}
                    selectedColor={selectedColor}
                    sortBy={sortBy}
                  />
                </div>
              } />
            </Routes>
          </div>
      </Router>
    </Provider>
  );
}
