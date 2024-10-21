import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  company:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log('Action payload:', action.payload);
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.company = action.payload.company;
    },

    clearUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.company = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
