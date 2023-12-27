import React from "react";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post, index) => (
        <div className="post-list-container" key={index}>
          <img src={post.image} alt="" className="post-image" />
          <div className="post-details">
            <span className="post-state">{post.state}</span>
            <span className="post-title">{post.title}</span>
            <span className="post-region-time">
              {post.region} · {post.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
