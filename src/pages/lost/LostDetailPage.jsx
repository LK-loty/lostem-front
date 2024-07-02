import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageSlider from "../../components/common/ImageSlider";
import PostReportModal from "../../components/common/Modal/report/PostReportModal";
import { readPostDetail, updatePostState, deletePost } from "../../apis/post";
import { readMyChatList, readMyRoomId } from "../../apis/chat";
import { formatRelativeDate, formatDate } from "../../utils/date";
import UserSelectionModal from "../../components/common/Modal/UserSelectionModal";
import RoomListModal from "../../components/common/Modal/RoomListModal";

const LostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // 게시글 아이디
  const [currentUserTag, setCurrentUserTag] = useState("");
  const [selectedState, setSelectedState] = useState(""); // 선택된 상태

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  const [isPostReportModalOpen, setIsPostReportModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRoomListModalOpen, setRoomListModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readPostDetail(postId, "lost");
        if (response.status === 200) {
          setPost(response.data.postLostDTO);
          setUser(response.data.postUserDTO);
          setCurrentUserTag(localStorage.getItem("tag"));
          setSelectedState(response.data.postLostDTO.state);
        }
      } catch (error) {
        if (error.response.status === 404)
          navigate("/notfound", { replace: true });
      }
    };

    fetchData();
  }, [postId]);

  const handleDeleteClick = async () => {
    try {
      const response = await deletePost(postId, "lost");
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
      if (newState === "해결완료") {
        setModalOpen(true);
      } else {
        const data = { postId: postId, state: newState };
        const response = await updatePostState(data, "lost");
        if (response.status === 200) {
          setSelectedState(newState);
        }
      }
    } catch (error) {
      console.error("상태 업데이트 중 에러:", error);
    }
  };

  const handleChatButtonClick = async () => {
    if (currentUserTag !== user.tag) {
      // 작성자 !== 본인
      const data = { postId: post.postId, postType: "lost" };
      const response = await readMyRoomId(data);
      console.log(response);
      if (response.status === 200) {
        navigate(`/chat/${response.data}`);
      } else
        navigate("/chat", {
          state: {
            userInfo: user,
            postInfo: {
              title: post.title,
              image: post.images[0],
              state: post.state,
              postId: post.postId,
              postType: "lost",
            },
          },
        });
    } else {
      // 작성자 --- 본인
      setRoomListModalOpen(true);
    }
  };

  return (
    <div className="postdetail">
      {isPostReportModalOpen && (
        <PostReportModal
          title={post.title}
          postId={post.postId}
          type={"lost"}
          tag={user.tag}
          onClose={() => setIsPostReportModalOpen(false)}
        />
      )}
      {isModalOpen && (
        <UserSelectionModal
          postId={post.postId}
          type={"lost"}
          onClose={() => setModalOpen(false)}
        />
      )}
      {isRoomListModalOpen && (
        <RoomListModal
          postId={postId}
          type={"lost"}
          onClose={() => setRoomListModalOpen(false)}
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
            <button
              className="fill-green-button"
              onClick={handleChatButtonClick}
            >
              채팅하기
            </button>
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
              <button className="outline-green-button">수정하기</button>
            </Link>
            <button
              className="fill-green-button"
              onClick={handleChatButtonClick}
            >
              채팅하기
            </button>
          </div>
        )}
        <div className="details-container">
          <ImageSlider images={post.images || []} />
          <div className="details-contents">
            <div className="details-title">
              {post.title}{" "}
              <span className="time">{formatRelativeDate(post.time)}</span>
            </div>
            <div className="writer-info">
              <img src={user.profile} />
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
              <span className="bolder">분실일자</span> {formatDate(post.date)}
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
