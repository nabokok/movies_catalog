import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '@/types/Movie';
import { getMovies } from '@/api/movieApi';

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: '',
};

export const fetchMovies = createAsyncThunk(
  'movies/fetch',
  async () => {
    return getMovies();
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovie(state, action) {
      state.movies.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
    });

    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default moviesSlice.reducer;
export const { actions } = moviesSlice;