import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '@/types/Movie';
import { getSingleMovie } from '@/api/movieApi';

interface SingleMovieState {
  singleMovie: Movie | null;
  loading: boolean;
  error: string;
}

const initialState: SingleMovieState = {
  singleMovie: null,
  loading: false,
  error: '',
};

export const fetchSingleMovie = createAsyncThunk(
  'movie/fetch',
  async (id: string) => {
    return getSingleMovie(id);
  },
);

const singleMovieSlice = createSlice({
  name: 'singleMovie',
  initialState,
  reducers: {
    setMovie(state, action) {
      state.singleMovie = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleMovie.pending, (state) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(fetchSingleMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.singleMovie = action.payload;
    });

    builder.addCase(fetchSingleMovie.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default singleMovieSlice.reducer;
export const { actions } = singleMovieSlice;