import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// import type
import { UserRequest, UserResponse } from "@/types/auth";

// import service
import AuthServices from "@/services/auth.service";
import { RootState } from "@/store";

export interface AuthState {
  user: any;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | undefined;
}

let tokenExist: string = "";
if (typeof window !== "undefined") {
  console.log("You are on the browser");
  // 👉️ can use localStorage here
  console.log("token", localStorage.getItem("token"));
  tokenExist = localStorage.getItem("token") || "";
} else {
  console.log("You are on the server");
  // 👉️ can't use localStorage
}
const initialState: AuthState = {
  user: null,
  token: "",
  isAuth: false,
  loading: false,
  error: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserRequest, thunkAPI) => {
    const response = await AuthServices.login(user.user, user.pwd);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.loading = false;
          state.user = action.payload.username;
          state.token = action.payload.accessToken;
          state.isAuth = true;
          localStorage.setItem("token", action.payload.accessToken);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      });
  },
});

const selectorToken = (state: RootState) => state.authSlice.token;
const selectorUser = (state: RootState) => state.authSlice.user;

export const { setToken } = authSlice.actions;

export { selectorToken, selectorUser };

export default authSlice.reducer;
