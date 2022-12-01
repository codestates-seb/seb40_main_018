import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

const searchMoviesSlice = createSlice({
  name: "searchCards",
  initialState,
  reducers: {
    prepareForNewSearch(state = initialState, action) {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const { prepareForNewSearch } = searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
