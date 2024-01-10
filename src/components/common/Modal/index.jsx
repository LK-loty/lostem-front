import { useEffect } from "react";
import "./style.scss";

const Modal = ({ show, handleClose, content }) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return (
    show && (
      <div className="modal-wrap">
        <div className="modal-content">
          {content}
          <div className="modal-button">
            <button
              name="button"
              className="button-close"
              onClick={handleClose}
            >
              취소
            </button>
            <button
              name="button"
              className="button-check"
              onClick={handleClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default Modal;
