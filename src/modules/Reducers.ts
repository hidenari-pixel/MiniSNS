import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Message } from "../types/Message";

const initialState = {
  isLogin: false as boolean,
  isLoading: true as boolean,
  messages: [] as Message[],
  users: [] as string[],
  userId: "" as string,
  postIndex: 0 as number,
};

export const module = createSlice({
  name: "miniSns",
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
      const { isLogin, isLoading } = action.payload;
      return {
        ...state,
        isLogin: isLogin,
        isLoading: isLoading,
      };
    },
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: module.reducer,
});
