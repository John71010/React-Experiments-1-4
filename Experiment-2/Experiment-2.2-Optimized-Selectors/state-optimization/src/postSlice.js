import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: [

  { id: 1, content: "John Kalisto" },
  { id: 2, content: "CHANDIGARH UNIVERSITY" },
  { id: 3, content: "Computer Science Department" },
  { id: 4, content: "24BAI71010" }
  ],

  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;





