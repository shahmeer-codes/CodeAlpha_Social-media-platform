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

      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Home Feed
            </h1>

            <p className="mt-2 text-slate-500">
              Discover and share what's happening.
            </p>
          </div>

          <CreatePost onPostCreated={handlePostCreated} />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <div className="text-6xl">📭</div>

              <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                No Posts Yet
              </h2>

              <p className="mt-2 text-slate-500">
                Be the first person to create a post.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onPostDeleted={handlePostDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
