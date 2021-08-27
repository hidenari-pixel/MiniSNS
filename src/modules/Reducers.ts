import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Message } from "../types/Message";
import { Timeline } from "../types/timeline";

const initialState = {
  login: false as boolean,
  messages: [] as Message[],
  users: [] as string[],
  userId: "" as string,
  postIndex: 0 as number,
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
    setUserNames: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    setLogin: (state, action) => {
      return {
        ...state,
        login: action.payload,
      };
    },
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: module.reducer,
});
