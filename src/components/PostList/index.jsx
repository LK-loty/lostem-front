const PostList = ({ post }) => {
  return (
    <div className="post-list">
      <div className="post-image-wrap">
        <img src={post.image} alt="" className="post-image" />
      </div>
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
