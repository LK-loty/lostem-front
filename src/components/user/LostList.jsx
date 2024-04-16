import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserLostPost } from "../../apis/user";
import PostList from "../PostList";

const LostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const tag = localStorage.getItem("tag");
    const fetchLostPosts = async () => {
      try {
        const response = await getUserLostPost(tag);
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
              <Link to={`/${post.postId}`}>
                <PostList post={post} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LostList;
