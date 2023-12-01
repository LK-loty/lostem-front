import PostForm from "../../components/common/PostForm";
import Navigation from "../../components/common/Navigation";
import Header from "../../components/common/Header";

const PostPage = () => {
  return (
    <div className="postpage">
      <Navigation />
      <Header />
      <PostForm />
    </div>
  );
};
export default PostPage;
