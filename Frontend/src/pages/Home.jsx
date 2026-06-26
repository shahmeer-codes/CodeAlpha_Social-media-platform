
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/postService";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 py-6">
        <CreatePost onPostCreated={handlePostCreated} />

        {loading ? (
          <h2 className="text-center text-lg font-semibold">
            Loading posts...
          </h2>
        ) : posts.length === 0 ? (
          <h2 className="text-center text-lg font-semibold">
            No posts available.
          </h2>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onPostDeleted={handlePostDeleted}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
