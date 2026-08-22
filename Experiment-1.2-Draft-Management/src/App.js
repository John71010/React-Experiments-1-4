import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost, editPost } from "./postSlice";
import "./App.css";

function App() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleAdd = () => {
    if (newPost.trim()) {
      dispatch(addPost({ id: Date.now(), content: newPost }));
      setNewPost("");
    }
  };

  return (
    <div className="container">
      <h1>Redux Post Manager</h1>

      <div className="post-input">
        <input
          type="text"
          placeholder="Write your post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        <button onClick={handleAdd}>Add</button>
      </div>

      {posts.map((post) => (
        <div className="post" key={post.id}>
          <p>{post.content}</p>

          <div>
            <button className="edit">Edit</button>

            <button
              className="delete"
              onClick={() => dispatch(deletePost(post.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;