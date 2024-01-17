import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlide from "../../components/common/ImageSlider";
import { readFoundDetail } from "../../apis/post";

const FoundDetailPage = () => {
  const { postId } = useParams(); // 게시글 아이디
  const [detailData, setDetailData] = useState();
  const images = ["", "", ""];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readFoundDetail(postId);
        if (response.status === 200) {
          setDetailData(response.data);
        }
      } catch (error) {
        console.error("lostdetailpage fetchdata 에러", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="postdetail">
      <Link to="/">&lt; 목록 보기</Link>
      <span>투썸 연신내역점에서 발견한 카드지갑 주인 찾습니다</span>
      <img />
      <span>닉네임다섯</span>
      <ImageSlide images={images} />
      상태 습득물명 카테고리 습득날짜 습득지역 습득장소
      <hr />
      자세한설명
    </div>
  );
};
export default FoundDetailPage;
