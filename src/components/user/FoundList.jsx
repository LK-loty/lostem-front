import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserFoundPost } from "../../apis/user";
import PostList from "../PostList";

const FoundList = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터 list

  useEffect(() => {
    const tag = localStorage.getItem("tag");
    const fetchLostPosts = async () => {
      try {
        const response = await getUserFoundPost(tag);
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching lost posts:", error);
      }
    };

    fetchLostPosts();
  }, []);

  return (
    <>
      <div className="post-list-container">
        <ul className="post-list">
          {posts.map((post, index) => (
            <li key={index}>
              <Link to={`/found/${post.postId}`}>
                <PostList post={post} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FoundList;
