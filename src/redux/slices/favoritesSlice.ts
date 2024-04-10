import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/types/Movie';
import { getItemFromStorage, setItemToStorage } from '@/services/storage';

interface Favorites {
  favoritesList: Movie[];
}

const initialState: Favorites = {
  favoritesList: getItemFromStorage('favorites', []),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      state.favoritesList.push(action.payload);
      setItemToStorage('favorites', state.favoritesList);
    },
    remove: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.favoritesList.findIndex(
        (movie) => movie.id === action.payload,
      );

      if (indexToRemove !== -1) {
        state.favoritesList.splice(indexToRemove, 1);
        setItemToStorage('favorites', state.favoritesList);
      }
    },
  },
});

export default favoritesSlice.reducer;
export const { actions } = favoritesSlice;
