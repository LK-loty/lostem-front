import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/common/ImageSlider";
import { readLostDetail } from "../../apis/post";

const LostDetailPage = () => {
  const { postId } = useParams(); // 게시글 아이디
  const [data, setData] = useState({});
  const images = ["", "", ""];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readLostDetail(postId);
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("lostdetailpage fetchdata 에러", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="postdetail">
      <div className="postdetail-container">
        <div className="postdetail-buttons">
          <button>채팅하기</button>
          <button>신고하기</button>
        </div>
        <div className="postdetail-title">
          제목입니다제목입니다제목입니다제목입니다제목입니다 20시간 전
        </div>

        <div className="details-container">
          <ImageSlider images={images} />
          <div className="details-contents">
            <div className="green state">{data.state}</div>
            <div className="item">분실물명 {data.item}</div>
            <div className="period">
              분실기간 {data.start} {data.end}
            </div>
            <div className="area">분실지역 {data.area}</div>
            <div className="place">분실장소 {data.place}</div>
          </div>
        </div>
        <hr />
        {data.contents}
      </div>
    </div>
  );
};
export default LostDetailPage;
