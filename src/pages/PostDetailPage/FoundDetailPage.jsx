import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../../components/common/ImageSlider";
import { readFoundDetail } from "../../apis/post";

const FoundDetailPage = () => {
  const { postId } = useParams(); // 게시글 아이디
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const images = ["", "", ""]; // 테스트용 이미지

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readFoundDetail(postId);
        if (response.status === 200) {
          setPost(response.data.postFoundDTO);
          setUser(response.data.postUserDTO);
          console.log(response.data);
        }
      } catch (error) {
        console.error("lostdetailpage fetchdata 에러", error);
      }
    };

    fetchData();
  }, []);

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
    <div className="postdetail">
      <div className="postdetail-container">
        <div className="postdetail-buttons">
          <button>채팅하기</button>
          <button>신고하기</button>
        </div>
        <div className="details-container">
          <ImageSlider images={images} />
          <div className="details-contents">
            <div className="details-title">
              {post.title} <span className="time">{timeDisplay}</span>
            </div>
            <div className="writer-info">
              <img src="" />
              {user.nickname}
              <span className="tag">#123</span>
            </div>
            <div className="green bolder">{post.state}</div>
            <div className="item">
              <span className="bolder">분실물명</span> {post.item}
            </div>
            <div className="period">
              <span className="bolder">분실기간</span> {post.date}
            </div>
            <div className="area">
              <span className="bolder">분실지역</span> {post.area}
            </div>
            <div className="place">
              <span className="bolder">분실장소</span> {post.place}
            </div>
          </div>
        </div>
        <hr />
        <div className="plus-detail">{post.contents}</div>
      </div>
    </div>
  );
};
export default FoundDetailPage;
