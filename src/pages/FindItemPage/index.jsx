import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import PostList from "../../components/PostList";
import { readPost } from "../../apis/post";

const FindItemPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readPost();
        if (data) {
          console.log(data);
          setPosts(data);
        }
      } catch (error) {
        console.error("finditempage useeffect 에러", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="finditem">
      <Header />
      {posts.length > 0 ? (
        <ul className="post-container">
          {posts.map((post, index) => (
            <li key={index}>
              <PostList post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-post">게시물이 존재하지 않습니다</div>
      )}
    </div>
  );
};

export default FindItemPage;
