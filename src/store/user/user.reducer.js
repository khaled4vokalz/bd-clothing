import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      // redux toolkit under the hood uses a library called "Immer"
      // that helps maintain immutability even though it seems like
      // we're mutating the state
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
