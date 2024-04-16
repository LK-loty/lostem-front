import { useState, useEffect } from "react";
import { readKeyword, deleteKeyword, addKeyword } from "../../apis/keyword";
import { FiX } from "react-icons/fi";

const KeywordList = () => {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");

  useEffect(() => {
    const fetchKeyword = async () => {
      try {
        const response = await readKeyword();

        if (response.status === 200) {
          setKeywords(response.data);
        }
      } catch (error) {
        console.error("마이페이지 keyword 가져오기 오류 => ", error);
      }
    };

    fetchKeyword();
  }, []);

  const handleDeleteKeyword = async (keywordToDelete) => {
    try {
      const response = await deleteKeyword(keywordToDelete);
      if (response.status === 200) {
        setKeywords(
          keywords.filter((keyword) => keyword.keyword !== keywordToDelete)
        );
      }
    } catch (error) {
      console.error("키워드 삭제 오류 => ", error);
    }
  };

  const handleAddKeyword = async () => {
    try {
      const response = await addKeyword(newKeyword);
      if (response.status === 200) {
        setKeywords([
          ...keywords,
          { id: response.data.id, keyword: newKeyword },
        ]);
        setNewKeyword("");
      }
    } catch (error) {
      console.error("키워드 추가 오류 => ", error);
    }
  };

  return (
    <>
      <div className="keyword-wrapper">
        <div className="keyword-input">
          <input
            type="text"
            placeholder="키워드 입력"
            value={newKeyword}
            onChange={(event) => setNewKeyword(event.target.value)}
          />
          <button
            className="fill-green-button"
            onClick={() => handleAddKeyword()}
          >
            추가
          </button>
        </div>
        {keywords && (
          <ul className="keyword-list">
            {keywords.map((item, index) => (
              <li key={index} className="keyword-list-item">
                <span>{item.keyword}</span>
                <button
                  type="button"
                  className="keyword-button-delete"
                  onClick={() => handleDeleteKeyword(item.keyword)}
                >
                  <FiX size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
export default KeywordList;
