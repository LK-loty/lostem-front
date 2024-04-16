import { formatRelativeDate } from "../../utils/date";

const PostList = ({ post }) => {
  const formattedTime = post.time ? formatRelativeDate(post.time) : "";

  return (
    <div className="post-item">
      <div className="post-image-wrap">
        <img src={post.image} alt="" className="post-image" />
      </div>
      <div className="post-details">
        <span className="post-title">{post.title}</span>
        <span className="post-area-time">
          {post.area} · {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default PostList;
