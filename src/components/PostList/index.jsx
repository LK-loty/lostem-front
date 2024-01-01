import React from "react";
import postImg from "../../assets/images/img_loty.png";

const PostList = ({ post }) => {
  return (
    <div className="post-list">
      <img src={postImg} alt="hi" className="post-image" />
      <div className="post-details">
        <span className="post-state">{post.state}</span>
        <span className="post-title">{post.title}</span>
        <span className="post-region-time">
          {post.region} · {post.time}
        </span>
      </div>
    </div>
  );
};

export default PostList;
