import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportPost } from "../../../../apis/report";

const reasons = [
  "욕설 및 비속어 사용",
  "도배",
  "거짓 정보",
  "스팸 및 홍보글",
  "개인정보 노출 및 불법 정보",
  "음란성",
];

const ChatReportModal = ({ title, type, postId, tag, onClose }) => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState("");

  const handleReport = () => {
    const reportData = {
      title: title,
      location: postId,
      contents: selectedReason,
      type: type,
      userTag: tag,
    };
    reportPost(reportData).then((response) => {
      if (response.status === 200) {
        onClose();
      } else if (response.status === 401) {
        localStorage.clear();
        navigate("/login");
        onClose();
      } else onClose();
    });
  };

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p className="modal-title">채팅 신고</p>
          <form className="post-report">
            {reasons.map((reason) => (
              <label key={reason}>
                <input
                  type="radio"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={handleReasonChange}
                />
                {reason}
              </label>
            ))}
            <span className="modal-caution">
              게시글 또는 사용자에 대한 신고가 발생하면 Lostem 담당자는 해당
              내용을 신속히 검토하고 필요한 경우 게시글을 삭제하고 해당 사용자의
              이용을 제한할 수 있습니다. <br />
              단, 허위 신고 시 이용제한 등의 불이익을 받을 수 있으니 주의하여
              신고를 해주시기 바랍니다.
            </span>
            <div className="modal-button">
              <button type="button" className="cancel-button" onClick={onClose}>
                취소
              </button>
              <button
                type="button"
                className="confirm-button"
                onClick={handleReport}
              >
                신고하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChatReportModal;
