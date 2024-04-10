import { configureStore } from '@reduxjs/toolkit';
import listSlice from './slices/listSlice';
import favoritesSlice from './slices/favoritesSlice';
import watchedSlice from './slices/watchedSlice';

export const store = configureStore({
  reducer: {
    list: listSlice,
    favorites: favoritesSlice,
    watched: watchedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
