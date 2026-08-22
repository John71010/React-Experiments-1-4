import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectPostsByKeyword } from "./selectors";
import { FaSearch } from "react-icons/fa";

<div className="search-bar">
  <FaSearch /> 
  <input type="text" placeholder="Search posts..." />
</div>


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = useSelector(selectPostsByKeyword(searchTerm));

  return (
    // 👇 This div is the "wrapper"
    <div className="container">
      <h1>⚡ State Optimization</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredPosts.map(post => (
        <p key={post.id}>{post.content}</p>
      ))}
    </div>
  );
}

export default App;
