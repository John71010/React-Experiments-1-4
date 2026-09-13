import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: [
    { id: 1, content: "Hello World" },
    { id: 2, content: "My first post" }
  ],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    }
  }
});

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
