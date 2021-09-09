import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Message } from "../types/Message";

const initialState = {
  isLogin: false as boolean,
  isLoading: true as boolean,
  users: [] as string[],
  userId: "" as string,
  docId: "" as string,
  messages: [] as Message[],
  postIndex: 0 as number,
};

export const module = createSlice({
  name: "miniSns",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { isLogin, isLoading } = action.payload;
      return {
        ...state,
        isLogin: isLogin,
        isLoading: isLoading,
      };
    },
    setUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    setUsers: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    setDocId: (state, action) => {
      return {
        ...state,
        docId: action.payload,
      };
    },
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
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: module.reducer,
});
