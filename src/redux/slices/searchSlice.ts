import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: ''
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    }
  }
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
export const { actions } = searchSlice;