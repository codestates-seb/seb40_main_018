import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

const searchMoviesSlice = createSlice({
  name: "searchMovies",
  initialState,
  reducers: {
    prepareForNewSearch(state, action) {
      return {
        ...initialState,
        query: action.payload,
      };
    },
  },
});

export const { prepareForNewSearch } = searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
