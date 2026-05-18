import { createSlice } from "@reduxjs/toolkit";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/; max-age=86400`; 
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getCookie("user") ? decodeURIComponent(getCookie("user")) : null,
    email: getCookie("email") ? decodeURIComponent(getCookie("email")) : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, email } = action.payload;
      state.user = user;
      if (email) state.email = email;
      setCookie("user", encodeURIComponent(user));
      if (email) setCookie("email", encodeURIComponent(email));
    },
    LogOut: (state, action) => {
      state.user = null;
      state.email = null;
      deleteCookie("user");
      deleteCookie("email");
      
      // Also notify backend to clear HttpOnly cookies
      fetch('http://localhost:8000/logout', { method: 'POST', credentials: 'include' }).catch(console.error);
    },
    Register:(state,action)=>{
      const {user,email,password}= action.payload;
      state.user = user;
      state.email=email;
      state.password=password;
    }
  },
});

export const { setCredentials, LogOut, Register  } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentEmail=(state)=>state.auth.email;
export const selectCurrentToken = (state) => !!state.auth.user; // Aliased to boolean for compatibility

