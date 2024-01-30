import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import PostList from "../../components/PostList";
import Paginate from "../../components/common/Paginate";
import { readFound } from "../../apis/post";

const FindOwnerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]); // 게시글 데이터 list
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalItemCount, setTotalItemCount] = useState(); // 총 게시글 개수
  const postPerPage = 20; // 페이지 당 post 개수

  useEffect(() => {
    // 글 목록 조회
    const fetchData = async () => {
      try {
        const response = await readFound(page);
        if (response.status === 200) {
          setPosts(response.data.content);
          setTotalItemCount(response.data.totalElements);
        }
      } catch (error) {
        console.error("findownerpage useeffect 에러", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get("page")) || 1;
    setPage(currentPage);
  }, [location.search]);

  const handlePageChange = (page) => {
    setPage(page);
    navigate(`?page=${page}`);
  };

  return (
    <div className="findpage">
      <div className="post-list-container">
        {totalItemCount > 0 ? (
          <ul className="post-list">
            {posts.map((post, index) => (
              <li key={index}>
                <Link to={`/findowner/${post.postId}`}>
                  <PostList post={post} />
                </Link>
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
        totalItemsCount={totalItemCount}
        postPerPage={postPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
export default FindOwnerPage;
