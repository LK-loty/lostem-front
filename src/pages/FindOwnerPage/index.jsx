import { useState } from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import Header from "../../components/common/Header";
import PostList from "../../components/PostList";
import Paginate from "../../components/common/Paginate";

const FindOwnerPage = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const postPerPage = 20; // 페이지 당 post 개수

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="FindOwerPage">
      <Header />
      <div className="post-list-container">
        {posts.length > 0 ? (
          <ul className="post-list">
            {posts.map((post, index) => (
              <li key={index}>
                <PostList post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-post">게시물이 존재하지 않습니다</div>
        )}
        <Link to="/findowner/post" className="go-post">
          <GoPencil size={20} />
          글쓰기
        </Link>
      </div>
      <Paginate
        page={page}
        totalItemsCount={posts.length}
        postPerPage={postPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
export default FindOwnerPage;
