
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItemFromStorage, setItemToStorage } from '@/services/storage';
import { Movie } from '@/types/Movie';

interface Watched {
  watchedList: Movie[];
}

const initialState: Watched = {
  watchedList: getItemFromStorage('watched', []),
};


const watchedSlice = createSlice({
  name: 'watched',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      state.watchedList.push(action.payload);
      setItemToStorage('watched', state.watchedList);
    },
    remove: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.watchedList.findIndex(
        (movie) => movie.id === action.payload,
      );

      if (indexToRemove !== -1) {
        state.watchedList.splice(indexToRemove, 1);
        setItemToStorage('watched', state.watchedList);
      }
    },
  },
});

export default watchedSlice.reducer;
export const { actions } = watchedSlice;
