import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodReducer';

const store = configureStore({
  reducer: {
    food: foodReducer,
  },
});

export default store;