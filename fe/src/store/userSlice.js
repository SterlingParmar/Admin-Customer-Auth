import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../api/fetch-wrapper";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    try {
      const response = await fetchWrapper.post(`${baseUrl}/register`, data);
      return response;
    } catch (e) {
      throw e;
    }
  }
);

export const loginAdmin = createAsyncThunk("user/loginAdmin", async (data) => {
  try {
    const response = await fetchWrapper.post(`${baseUrl}/admin-login`, data);
    return response;
  } catch (e) {
    throw e;
  }
});

export const verifyUserEmail = createAsyncThunk(
  "user/verifyUserEmail",
  async (token) => {
    try {
      const response = await fetchWrapper.get(
        `${baseUrl}/verify?token=${token}`
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      id: null,
      first_name: "",
      last_name: "",
      email: "",
    },
    isLoading: false,
    isError: false,
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    // Add other user-related reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          ...state.data,
          ...action.payload.data,
        };
        state.error = "";
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
