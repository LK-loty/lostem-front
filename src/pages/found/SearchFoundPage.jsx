import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import PostList from "../../components/PostList";
import Paginate from "../../components/common/Paginate";
import { searchFound } from "../../apis/search";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

import { category } from "../../data/category";
import { regions } from "../../data/regions";

const SearchFoundPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { date: "" } });

  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]); // 게시글 데이터
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalItemCount, setTotalItemCount] = useState();
  const postPerPage = 20; // 페이지 당 post 개수

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();

  const onSubmit = (data) => {
    // 입력되지 않은 필드를 확인하고 삭제
    const formData = {};
    for (const key in data) {
      if (data[key] !== "" && data[key] !== null) {
        formData[key] = data[key];
      }
    }

    localStorage.setItem("searchFound", JSON.stringify(formData));

    searchFound(formData).then((response) => {
      // if (response.status === 200) {
      console.log("검색 결과 => ", response.data);
      setPosts(response.data.content);
      setTotalItemCount(response.data.totalElements);

      navigate("/found/search");
      // }
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
    navigate(`?page=${page}`);

    const searchData = JSON.parse(localStorage.getItem("searchLost"));

    if (searchData) {
      searchFound({ ...searchData, page: page - 1 }).then((response) => {
        if (response.status === 200) {
          console.log("검색 결과 => ", response.data);
          setPosts(response.data.content);
          setTotalItemCount(response.data.totalElements);
        }
      });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get("page")) || 1;
    setPage(currentPage);
  }, [location.search]);

  useEffect(() => {
    const searchData = JSON.parse(localStorage.getItem("searchFound"));

    if (searchData) {
      setValue("title", searchData.title || "");
      setValue("item", searchData.item || "");
      setValue("date", searchData.date || "");
      setValue("area", searchData.area || "");
      setValue("place", searchData.place || "");
      setValue("category", searchData.category || "");
      setValue("contents", searchData.contents || "");

      searchFound(searchData).then((response) => {
        if (response.status === 200) {
          console.log("검색 결과 => ", response.data);
          setPosts(response.data.content);
          setTotalItemCount(response.data.totalElements);
        }
      });
    }
  }, []);

  return (
    <div className="findpage">
      <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
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
          <div>습득일자</div>
          <DatePicker
            {...register("date")}
            dateFormat="yyyy.MM.dd"
            dateFormatCalendar="yyyy년 MM월"
            locale={ko}
            maxDate={new Date()}
            selected={date}
            onChange={(date) => {
              setDate(date);
              setValue("date", date);
            }}
            isClearable={true}
          />
          <br />
          {errors?.date && (
            <span className="error">{errors?.date?.message}</span>
          )}
        </div>
        <div className="postform-group">
          <div>습득지역</div>
          <div className="region-container">
            <select {...register("area")}>
              <option value="">선택</option>
              {regions.map((reg) => (
                <option key={reg.id} value={reg.name}>
                  {reg.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="postform-group">
          습득장소
          <input type="text" name="place" {...register("place")} />
          {errors?.place && (
            <span className="error">{errors?.place?.message}</span>
          )}
        </div>
        <div className="postform-group">
          카테고리
          <div className="category-wrap">
            {category.map((cat) => (
              <React.Fragment key={cat.id}>
                <input
                  type="radio"
                  name="category"
                  className="radio"
                  id={cat.id}
                  value={cat.name}
                  {...register("category", {})}
                />
                <label htmlFor={cat.id}>{cat.name}</label>
              </React.Fragment>
            ))}
          </div>
          {errors?.category && (
            <span className="error">{errors?.category?.message}</span>
          )}
        </div>
        <div className="postform-group">
          글내용
          <textarea
            {...register("contents", {
              maxLength: {
                value: 300,
                message: "글내용은 300자이내로 입력해야 합니다",
              },
            })}
          />
        </div>
        <div className="serach-form-button">
          <button
            type="button"
            className="outline-green-button"
            onClick={() => reset()}
          >
            초기화
          </button>
          <button type="submit" className="fill-green-button">
            검색
          </button>
        </div>
      </form>
      <div className="post-list-container">
        {totalItemCount > 0 ? (
          <ul className="post-list">
            {posts.map((post, index) => (
              <li key={index}>
                <Link to={`/found/${post.postId}`}>
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
