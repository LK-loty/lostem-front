import { useState } from "react";
import SproutRating from "../../../SproutRating";

const ReviewModal = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p className="modal-title">후기 작성하기</p>
          <form className="post-report">
            <SproutRating
              rating={rating}
              handleRatingChange={handleRatingChange}
            />

            <div className="modal-button">
              <button type="button" className="cancel-button" onClick={onClose}>
                취소
              </button>
              <button type="button" className="confirm-button" onClick={handle}>
                작성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PostReportModal;
