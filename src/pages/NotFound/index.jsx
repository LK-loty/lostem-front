import { useNavigate } from "react-router-dom";
import "./style.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound-content">
        <p>
          <strong className="green">404 Not Found</strong>
          <br />
          권한이 없거나 존재하지 않는 페이지입니다.
        </p>
        <button onClick={() => navigate(-1)} className="back-button">
          이전페이지로
        </button>
      </div>
    </div>
  );
};
export default NotFound;
