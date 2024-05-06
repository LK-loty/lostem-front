import React, { useState } from "react";
import StarRating from "../StarRating";
import { createReview } from "../../../apis/review";

const ReviewModal = ({ onClose, postType, postId, tag }) => {
  const [rating, setRating] = useState(1); // 별점 상태
  const [review, setReview] = useState(""); // 후기 상태

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      star: rating,
      postType: postType,
      postId: postId,
      tag: tag,
      contents: review,
    };

    console.log(data);

    await createReview(data);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p className="modal-title">후기 작성</p>
          <form className="post-report" onSubmit={handleSubmit}>
            <StarRating value={rating} onStarClick={handleRatingChange} />
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="후기를 작성해주세요"
              rows={4}
              cols={50}
            ></textarea>
            <div className="modal-button">
              <button type="button" className="cancel-button" onClick={onClose}>
                취소
              </button>
              <button type="submit" className="confirm-button">
                작성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
