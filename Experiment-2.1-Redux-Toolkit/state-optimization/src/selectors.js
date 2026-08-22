import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state) => state.posts;

export const selectPostCount = createSelector(
  [selectPosts],
  (posts) => posts.length
);

export const selectPostsByKeyword = (keyword) =>
  createSelector([selectPosts], (posts) =>
    posts.filter((post) => post.content.toLowerCase().includes(keyword.toLowerCase()))
  );
