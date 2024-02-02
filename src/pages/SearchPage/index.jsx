import { useState, useEffect } from "react";
import PostList from "../../components/PostList";
import { searchFound, searchLost } from "../../apis/search";
import PostList from "../../components/PostList";

const SearchPage = () => {
  <div className="findpage">
    <form className="form-search">
      제목 물건이름 기간/날짜 지역 장소 카테고리 본문내용
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="title"
      />
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="item"
      />
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="start"
      />
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="place"
      />
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="local"
      />
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="category"
      />
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="contents"
      />
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="title"
      />
      <button
        type="submit"
        className="absolute top-3 right-3 md:text-lg lg:top-4"
      >
        <BsSearch />
      </button>
    </form>
  </div>;
};
export default SearchPage;
