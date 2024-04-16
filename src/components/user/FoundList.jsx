import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUserFoundPost } from "../../apis/user";
import PostList from "../PostList";
import Paginate from "../common/Paginate";

const FoundList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [posts, setPosts] = useState([]); // 게시글 데이터 list
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalItemCount, setTotalItemCount] = useState(); // 총 게시글 개수
  const postPerPage = 20; // 페이지 당 post 개수

  useEffect(() => {
    const tag = localStorage.getItem("tag");
    const fetchLostPosts = async () => {
      try {
        const response = await getUserFoundPost(tag);
        if (response.status === 200) {
          setPosts(response.data);
          setTotalItemCount(response.data.length);
        }
      } catch (error) {
        console.error("Error fetching lost posts:", error);
      }
    };

    fetchLostPosts();
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
    <>
      <div className="post-list-container">
        <ul className="post-list">
          {posts.map((post, index) => (
            <li key={index}>
              <Link to={`/found/${post.postId}`}>
                <PostList post={post} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Paginate
        page={page}
        totalItemsCount={totalItemCount}
        postPerPage={postPerPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default FoundList;
