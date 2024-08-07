import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    max: 100,
    limitsEnabled: false,
    backgroundColor: '#374151',
  },
  reducers: {
    increment: (state) => {
      if (!state.limitsEnabled || state.value < state.max) {
        state.value += 1;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    setCount: (state, action) => {
      state.value = action.payload;
    },
    toggleLimits: (state) => {
      state.limitsEnabled = !state.limitsEnabled;
    },
    setMax: (state, action) => {
      state.max = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const { increment, decrement, reset, setCount, toggleLimits, setMax, setBackgroundColor } = counterSlice.actions;
export default counterSlice.reducer;
