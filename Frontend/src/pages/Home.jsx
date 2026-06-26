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

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Background Decorations */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-10">

          {/* Header */}
          <div className="mb-10 rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-xl">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
              Social Platform
            </span>

            <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-900">
              Welcome Back 👋
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
              Stay connected with your friends, share your thoughts,
              and discover what's happening around you.
            </p>
          </div>

          {/* Create Post */}
          <div className="mb-10">
            <CreatePost onPostCreated={handlePostCreated} />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

              <p className="mt-6 text-slate-500 animate-pulse">
                Loading your feed...
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-white/40 bg-white/80 p-16 text-center shadow-xl backdrop-blur-xl">

              <div className="text-7xl">📭</div>

              <h2 className="mt-6 text-3xl font-bold text-slate-800">
                No Posts Yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-slate-500">
                Looks a little quiet here...
                Be the first to share something with everyone.
              </p>

              <div className="mt-8 inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
                Create your first post 🚀
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
                >
                  <PostCard
                    post={post}
                    onPostDeleted={handlePostDeleted}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;