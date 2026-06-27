import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getPosts, deletePost } from "../services/postService";
import { Loader2, RefreshCw } from "lucide-react";

const Home = () => {
  const queryClient = useQueryClient();

  const { data: postsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const posts = postsData?.posts || [];

  const handlePostCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  const handlePostDeleted = (postId) => {
    queryClient.setQueryData(['posts'], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        posts: oldData.posts.filter((post) => post._id !== postId),
      };
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary mb-1">Home Feed</h1>
        <p className="text-sm text-text-muted">See what your network is sharing.</p>
      </div>
      
      <div id="create-post" className="mb-8">
        <CreatePost onPostCreated={handlePostCreated} />
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex h-40 flex-col items-center justify-center gap-4 text-text-secondary">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Loading your feed...</p>
          </div>
        ) : isError ? (
          <div className="flex h-40 flex-col items-center justify-center gap-4 text-text-secondary bg-surface rounded-2xl border border-border p-6 text-center">
            <p className="text-sm font-medium text-danger">Failed to load posts.</p>
            <button 
              onClick={() => refetch()} 
              className="flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background">
              <span className="text-3xl">📭</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">No posts yet</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Follow users or create a post to see content here.
              </p>
            </div>
          </div>
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
    </div>
  );
};

export default Home;

