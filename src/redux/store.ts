import { configureStore } from '@reduxjs/toolkit'
import listSlice from './slices/listSlice'
import favoritesSlice from './slices/favoritesSlice'
import watchedSlice from './slices/watchedSlice'
import searchSlice from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    list: listSlice,
    favorites: favoritesSlice,
    watched: watchedSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
