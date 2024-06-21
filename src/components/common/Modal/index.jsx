const Modal = ({ onClose, content, title }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p className="modal-title">{title}</p>
          {content}
          <div className="modal-button">
            {/* <button
              name="button"
              className="button-close"
              onClick={onClose}
            >
              취소
            </button> */}
            <button name="button" className="confirm-button" onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
