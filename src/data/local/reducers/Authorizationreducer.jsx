import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIService } from "../../remote/services/Apiservices";
import { retrieveFromLocalStorage } from "../../../Utils/constants";
import { showErrorToast, showSuccessToast } from "../../../Utils/api-utils";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  ...retrieveFromLocalStorage([
    "loginProfile"
  ])
};

const saveToLocalStorage = (key, data) => {
  sessionStorage.setItem(key, data);
};

export const login = createAsyncThunk("/user_login", async (userCredentials) => {
  const profile = await APIService.login(userCredentials);
  const response = await profile.data;
  if (response) {
    saveToLocalStorage("loginProfile", JSON.stringify(response));
  }
  return response;
});

export const createEvent = createAsyncThunk(
  "misc/createEvent",
  async (data) => {
    return APIService.createEvent(data);
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  await sessionStorage.removeItem('LoginProfile');
});

const AuthenticationSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.userDetails = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status_code === "0") {
          state.loginProfile = action.payload;
        } else {
          state.error = action.payload.message;
          showErrorToast(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = showErrorToast(action.error.message);
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        if (action.payload.status_code === "0") {
          showSuccessToast("Event created successfully!");
        } else {
          state.error = action.payload.message;
          showErrorToast(action.payload.message);
        }
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = showErrorToast(action.error.message);
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loginProfile = null;
      });
  },
});

export const Authreducer = AuthenticationSlice.reducer;
