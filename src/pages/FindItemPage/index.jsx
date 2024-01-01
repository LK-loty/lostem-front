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
      <ul className="post-container">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <li>
              <PostList post={post} key={index} />
            </li>
          ))
        ) : (
          <div className="no-post">게시물이 존재하지 않습니다</div>
        )}
      </ul>
    </div>
  );
};

export default FindItemPage;
