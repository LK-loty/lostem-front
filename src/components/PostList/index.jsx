const PostList = ({ post }) => {
  const currentDate = new Date();
  const postDate = new Date(post.time);
  const timeDifference = currentDate - postDate;

  let timeDisplay;
  if (timeDifference < 3600000) {
    // 1시간 이내
    const minutes = Math.floor(timeDifference / 60000);
    timeDisplay = `${minutes}분 전`;
  } else if (timeDifference < 86400000) {
    // 24시간 이내
    const hours = Math.floor(timeDifference / 3600000);
    timeDisplay = `${hours}시간 전`;
  } else {
    // 24시간 이상
    const month = String(postDate.getMonth() + 1).padStart(2, "0");
    const day = String(postDate.getDate()).padStart(2, "0");
    timeDisplay = `${month}.${day}`;
  }

  return (
    <div className="post-item">
      <div className="post-image-wrap">
        <img src={post.image} alt="" className="post-image" />
      </div>
      <div className="post-details">
        <span className="post-state">{post.state}</span>
        <span className="post-title">{post.title}</span>
        <span className="post-area-time">
          {post.area} · {timeDisplay}
        </span>
      </div>
    </div>
  );
};

export default PostList;
