import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';


const initialUser = () => {
  const item = window.localStorage.getItem('userInfo')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {
      loaded: false,
      loggedIn: false,
      accessToken: null,
      refreshToken: null,
      user: null
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload.info;
      state.token = action.payload.token.access;
      state.auth.loaded = action.payload.loaded;
      state.auth.loggedIn = action.payload.loggedIn;
      state.auth.accessToken = action.payload.accessToken;
      state.auth.refreshToken = action.payload.refreshToken;
      state['accessToken'] = action.payload.token.access;
      state["refreshToken"] = action.payload.token.refresh;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.info))
      localStorage.setItem("accessToken", action.payload.token.access)
      localStorage.setItem("refreshToken", action.payload.token.refresh)
    },
    loadedLoggedIn: (state, action) => {
      state.auth.loaded = action.payload.loaded;
      state.auth.loggedIn = action.payload.loggedIn;
    },
    logout: (state, action) => {
      state.auth = {
        loaded: false,
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
        user: null
      }
      localStorage.removeItem('userInfo')
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

    }
  },
});

export const { setUser, login, loadedLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
