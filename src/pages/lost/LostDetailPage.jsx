import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageSlider from "../../components/common/ImageSlider";
import PostReportModal from "../../components/common/Modal/report/PostReportModal";
import { readLostDetail, updateLostState, deleteLost } from "../../apis/post";
import { formatRelativeDate, formatDate } from "../../utils/date";

const LostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // 게시글 아이디
  const [currentUserTag, setCurrentUserTag] = useState("");
  const [selectedState, setSelectedState] = useState(""); // 선택된 상태

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
          setCurrentUserTag(localStorage.getItem("tag"));
          setSelectedState(response.data.postLostDTO.state);
        }
      } catch (error) {
        console.error("lostdetailpage fetchdata 에러", error);
      }
    };

    fetchData();
  }, []);

  // 수정 버튼 클릭 시 실행되는 함수
  const handleEditClick = () => {
    // 수정 페이지로 이동하는 로직 작성
  };

  const handleDeleteClick = async () => {
    try {
      const response = await deleteLost(postId);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("게시글 삭제 중 에러:", error);
    }
  };

  const handleStateChange = async (e) => {
    const newState = e.target.value;
    try {
      const data = { postId: postId, state: newState };
      const response = await updateLostState(data);
      if (response.status === 200) {
        // 상태 업데이트 성공 시 페이지 다시 로드
        window.location.reload();
      }
    } catch (error) {
      console.error("상태 업데이트 중 에러:", error);
    }
  };

  const formattedTime = post.time ? formatRelativeDate(post.time) : "";
  const formattedDate = post.date ? formatDate(post.date) : "";

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
        {currentUserTag !== user.tag ? (
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
        ) : (
          <div className="postdetail-buttons">
            <button
              className="outline-green-button"
              onClick={handleDeleteClick}
            >
              삭제하기
            </button>
            <Link to={`/${postId}/edit`}>
              <button className="fill-green-button" onClick={handleEditClick}>
                수정하기
              </button>
            </Link>
          </div>
        )}
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
            {currentUserTag !== user.tag ? (
              <div className="green bolder">{post.state}</div>
            ) : (
              <select
                className="state-select"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="찾는중">찾는중</option>
                <option value="확인중">확인중</option>
                <option value="해결완료">해결완료</option>
              </select>
            )}
            <div className="item">
              <span className="bolder">분실물명</span> {post.item}
            </div>
            <div className="category">
              <span className="bolder">카테고리</span> {post.category}
            </div>
            <div className="period">
              <span className="bolder">분실일자</span> {formattedDate}
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
