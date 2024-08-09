import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/product/productSlice';
import brandSlice from '../features/product/brandSlice';
import colorSlice from '../features/product/colorSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
    brands: brandSlice,
    colors: colorSlice,
  },
}); 