import React from "react";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post, index) => (
        <div className="post-list-container" key={index}>
          <div className="post-image-wrap">
            <img src={post.image} alt="" className="post-image" />
          </div>
          <div className="post-details">
            <span className="post-status">{post.status}</span>
            <div className="post-title">
              <span className="title-text">{post.title}</span>
              <span className="post-time">{post.uploadedTime}</span>
            </div>
            <span className="post-location">{post.location}</span>
            <span className="post-content">{post.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
