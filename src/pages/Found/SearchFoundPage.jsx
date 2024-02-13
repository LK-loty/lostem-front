import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import PostList from "../../components/PostList";
import Paginate from "../../components/common/Paginate";

const SearchFoundPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { date: "" } });

  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]); // 게시글 데이터
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalItemCount, setTotalItemCount] = useState();
  const postPerPage = 20; // 페이지 당 post 개수

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handlePageChange = (page) => {
    setPage(page);
    navigate(`?page=${page}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get("page")) || 1;
    setPage(currentPage);
  }, [location.search]);

  return (
    <div className="findpage">
      <form className="search-found" onSubmit={handleSubmit(onSubmit)}>
        <div className="postform-group">
          제목
          <input
            type="text"
            {...register("title", {
              maxLength: {
                value: 20,
                message: "제목은 20자 이내로 입력해야 합니다",
              },
            })}
          />
          {errors?.title && (
            <span className="error">{errors?.title?.message}</span>
          )}
        </div>
        <div className="postform-group">
          습득물명
          <input
            type="text"
            {...register("item", {
              maxLength: {
                value: 20,
                message: "습득물명은 20자이내로 입력해야 합니다",
              },
            })}
          />
          {errors?.item && (
            <span className="error">{errors?.item?.message}</span>
          )}
        </div>
        <div className="postform-group">
          자세한설명
          <textarea
            {...register("contents", {
              maxLength: {
                value: 300,
                message: "자세한설명은 300자이내로 입력해야 합니다",
              },
            })}
          />
        </div>
        <button type="submit" className="">
          글쓰기
        </button>
        <button type="submit" className="">
          초기화
        </button>
      </form>
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
export default SearchFoundPage;
