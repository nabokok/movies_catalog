
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItemFromStorage, setItemToStorage } from '@/services/storage';
import { Movie } from '@/types/Movie';

interface List {
  moviesList: Movie[];
}

const initialState: List = {
  moviesList: getItemFromStorage('list', []),
};


const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      state.moviesList.push(action.payload);
      setItemToStorage('list', state.moviesList);
    },
    remove: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.moviesList.findIndex(
        (movie) => movie.id === action.payload,
      );

      if (indexToRemove !== -1) {
        state.moviesList.splice(indexToRemove, 1);
        setItemToStorage('list', state.moviesList);
      }
    },
  },
});

export default listSlice.reducer;
export const { actions } = listSlice;
