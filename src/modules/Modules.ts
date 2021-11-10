import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Images } from "../types/images";
import { Message } from "../types/Message";
import { Users } from "../types/users";

const defaultImage =
  "https://knsoza1.com/wp-content/uploads/2020/07/70b3dd52350bf605f1bb4078ef79c9b9.png";

const initialState = {
  isLogin: false as boolean,
  isLoading: true as boolean,
  users: [] as Users[],
  userId: "" as string,
  docId: "" as string,
  messages: [] as Message[],
  images: [] as Images[],
  defaultImage: defaultImage,
};

export const appSlice = createSlice({
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
    setImages: (state, action) => {
      return {
        ...state,
        images: action.payload,
      };
    },
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: appSlice.reducer,
});
