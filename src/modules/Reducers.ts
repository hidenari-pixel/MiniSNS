import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Message } from "../types/Message";
import firebase from "firebase";

// export const fetchUserId = createAsyncThunk<{ users: string[] }>(
//   "fetchUser",
//   async () => {
//     const promise = firebase
//       .firestore()
//       .collection("users")
//       .get()
//       .then((snapshot) => {
//         const data = [] as string[];
//         snapshot.docs.map((doc) => {
//           const { userId } = doc.data();
//           data.push(userId);
//         });
//         return data;
//       });
//     const data = await promise;
//     return {
//       users: data,
//     };
//   }
// );

const initialState = {
  isLogin: false as boolean,
  isLoading: false as boolean,
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
      console.log(isLogin);
      return {
        ...state,
        isLogin: isLogin,
        isLoading: isLoading,
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUserId.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(fetchUserId.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.users = action.payload.users;
  //   });
  // },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: module.reducer,
});
