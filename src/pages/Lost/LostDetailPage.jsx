import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../../components/common/ImageSlider";
import PostReportModal from "../../components/common/Modal/report/PostReportModal";
import { readLostDetail } from "../../apis/post";
import { formatRelativeDate, formatDate } from "../../utils/date";

const LostDetailPage = () => {
  const { postId } = useParams(); // 게시글 아이디
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const images = ["", "", ""]; // 테스트용 이미지
  const [isPostReportModalOpen, setIsPostReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readLostDetail(postId);
        if (response.status === 200) {
          setPost(response.data.postLostDTO);
          setUser(response.data.postUserDTO);
          console.log(response.data);
        }
      } catch (error) {
        console.error("lostdetailpage fetchdata 에러", error);
      }
    };

    fetchData();
  }, []);

  const formattedTime = post.time ? formatRelativeDate(post.time) : "";
  const formattedStartTime = post.start ? formatDate(post.start) : "";
  const formattedEndTime = post.end ? formatDate(post.end) : "";

  return (
    <div className="postdetail">
      {isPostReportModalOpen && (
        <PostReportModal
          title={post.title}
          postId={post.postId}
          type={"lost"}
          onClose={() => setIsPostReportModalOpen(false)}
        />
      )}
      <div className="postdetail-container">
        <div className="postdetail-buttons">
          <button
            className="outline-green-button"
            onClick={() => setIsPostReportModalOpen(true)}
          >
            신고하기
          </button>
          <Link
            to={"/chat"}
            state={{
              userInfo: user,
              postInfo: {
                title: post.title,
                // image: post.images[0], // 게시글 첫번째 이미지
                state: post.state,
                postId: post.postId,
                postType: "lost",
              },
            }}
          >
            <button className="fill-green-button">채팅하기</button>
          </Link>
        </div>
        <div className="details-container">
          <ImageSlider images={images} />
          <div className="details-contents">
            <div className="details-title">
              {post.title} <span className="time">{formattedTime}</span>
            </div>
            <div className="writer-info">
              <img src="" />
              {user.nickname}
              <span className="tag">#{user.tag}</span>
            </div>
            <div className="green bolder">{post.state}</div>
            <div className="item">
              <span className="bolder">분실물명</span> {post.item}
            </div>
            <div className="category">
              <span className="bolder">카테고리</span> {post.category}
            </div>
            <div className="period">
              <span className="bolder">분실일자</span> {formattedStartTime} ~{" "}
              {formattedEndTime}
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
export default LostDetailPage;
