import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <p>
          <strong className="green">404 Not Found</strong>
          <br />
          권한이 없거나 존재하지 않는 페이지입니다.
        </p>
        <br />
        <Link to="/" className="back-button">
          메인으로
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
