import "./App.css";
import React, { useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import reducer, { initialState } from "./store/reducer";
import { Context } from "./context/Context";
import Main from "./components/main/Main";
import Home from "./components/home/Home";
import Aside from "./components/aside/Aside";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <header className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/context-provider" className="hover:text-gray-400">Context Provider</Link></li>
            </ul>
          </nav>
        </header>
        <div className="mt-16"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/context-provider" element={
              <div className="main-wrapper">
                <Aside
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
                <Main
                  selectedBrand={selectedBrand}
                  selectedColor={selectedColor}
                />
              </div>
            } />
          </Routes>
        </div>
      </Context.Provider>
    </Router>
  );
}
