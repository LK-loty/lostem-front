import { useState, useEffect } from "react";
import { readReview } from "../../apis/review";
import { formatDate } from "../../utils/date";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const tag = localStorage.getItem("tag");
      try {
        const response = await readReview(tag);
        if (response.status === 200) {
          console.log(response.data);
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews => ", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="review-list-container">
      <ul className="review-list">
        {reviews.map((review, index) => (
          <li key={index}>
            <img className="profile_img" />
            <div className="review-detail">
              <span className="bolder">
                {review.reviewedNickname}
                <span className="tag">#{review.reviewedUserTag}</span>
              </span>
              <span className="review-time">
                {review.role} · {formatDate(review.time)}
              </span>
              <span>{review.contents}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReviewList;
