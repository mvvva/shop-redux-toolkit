import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, setCount, toggleLimits, setMax, setBackgroundColor } from './counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Counter.css';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const max = useSelector((state) => state.counter.max);
  const limitsEnabled = useSelector((state) => state.counter.limitsEnabled);
  const backgroundColor = useSelector((state) => state.counter.backgroundColor);
  const dispatch = useDispatch();

  const [newCount, setNewCount] = useState('');
  const [newMax, setNewMax] = useState(max);
  const [newBackgroundColor, setNewBackgroundColor] = useState(backgroundColor);
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleCountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== '') {
      setNewCount(Number(value));
    } else {
      setNewCount('');
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== '') {
      setNewMax(Number(value));
    } else {
      setNewMax('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor }}>
      <h1 className="text-5xl font-bold mb-5">Simple Counter</h1>
      <div className="text-7xl mb-5">{count}</div>
      <div className="flex space-x-3 mb-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
      <button onClick={toggleSettings} className="mb-5">
        <FontAwesomeIcon icon={faCog} size="2x" />
      </button>

      {showSettings && (
        <div className="settings-modal bg-slate-800 p-5 rounded shadow-lg fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-11/12 sm:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <div className="mt-3 space-y-4">
            <label className="block">
              Set Count:
              <input
                type="number"
                value={newCount}
                onChange={handleCountChange}
                className="ml-2 p-2 border rounded w-full"
              />
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => dispatch(setCount(newCount))}
              >
                Set
              </button>
            </label>
            <label className="block">
              Enable Limits:
              <input
                type="checkbox"
                checked={limitsEnabled}
                onChange={() => dispatch(toggleLimits())}
                className="ml-2"
              />
            </label>
            {limitsEnabled && (
              <label className="block">
                Max Count:
                <input
                  type="number"
                  value={newMax}
                  onChange={handleMaxChange}
                  className="ml-2 p-2 border rounded w-full"
                />
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => dispatch(setMax(newMax))}
                >
                  Set Max
                </button>
              </label>
            )}
            <label className="block">
              Background Color:
              <input
                type="color"
                value={newBackgroundColor}
                onChange={(e) => setNewBackgroundColor(e.target.value)}
                className="ml-2 p-2 border rounded"
              />
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => dispatch(setBackgroundColor(newBackgroundColor))}
              >
                Set Color
              </button>
            </label>
          </div>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={toggleSettings}>
            Close
          </button>
        </div>
      )}

      {showSettings && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSettings}
        ></div>
      )}
    </div>
  );
};

export default Counter;
