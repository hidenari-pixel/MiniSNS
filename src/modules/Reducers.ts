import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  timeline: [],
  userId: "",
};

export const module = createSlice({
  name: "chat",
  initialState,
  reducers: {
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
    setTimeline: (state, action) => {
      return {
        ...state,
        timeline: action.payload,
      };
    },
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: module.reducer,
});
