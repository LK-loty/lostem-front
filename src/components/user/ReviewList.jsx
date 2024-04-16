import { useState, useEffect } from "react";
import { readReview } from "../../apis/reivew";

const ReviewList = () => {
  const [reviews, setReviews] = useState([{ hi: "hi" }]);

  useEffect(() => {
    const tag = localStorage.getItem("tag");
    const fetchReviews = async () => {
      try {
        const response = await readReview(tag);
        if (response.status === 200) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews => ", error);
      }
    };
  }, []);

  return (
    <div className="review-lsit-container">
      <ul className="review-list">
        {reviews.map((review, index) => (
          <li key={index}>
            <div>
              <img />
              후기작성자닉네임 잃어버렸어요/주인을찾아요 2024.04.16 후기 내용
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReviewList;
