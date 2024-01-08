import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import PostList from "../../components/PostList";
import Paginate from "../../components/common/Paginate";
import { readPost } from "../../apis/post";

const FindItemPage = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const postPerPage = 20; // 페이지 당 post 개수

  // page 이동 시 게시글 요청하는 로직으로 변경할 것 (readPost 함수도 포함)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readPost();
        if (data) {
          console.log(data);
          setPosts(data);
        }
      } catch (error) {
        console.error("finditempage useeffect 에러", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="finditem">
      <div className="post-list-container">
        {posts.length > 0 ? (
          <ul className="post-list">
            {posts.map((post, index) => (
              <li key={index}>
                <Link to={`/${post.postId}`}>
                  <PostList post={post} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-post">게시물이 존재하지 않습니다</div>
        )}
        <Link to="/post" className="go-post">
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

export default FindItemPage;
