import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  userId: "",
  postIndex: 0,
};

export const module = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIndex: (state, action) => {
      return {
        ...state,
        postIndex: action.payload,
      };
    },
    setMessages: (state, action) => {
      return {
        ...state,
        messages: action.payload,
      };
    },
    setUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: module.reducer,
});
