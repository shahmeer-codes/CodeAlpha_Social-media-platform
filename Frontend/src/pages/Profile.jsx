import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../components/PostCard";
import ProfileHeader from "../components/ProfileHeader";
import { getUserProfile } from "../services/userService";
import { getUserPosts } from "../services/postService";
import { Loader2, Grid3X3} from "lucide-react";
import { cn } from "../components/Sidebar";

const Profile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("posts");

  const { data: profileData, isLoading: loadingProfile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getUserProfile(id),
  });

  const { data: postsData, isLoading: loadingPosts, refetch: refetchPosts } = useQuery({
    queryKey: ['userPosts', id],
    queryFn: () => getUserPosts(id),
  });

  const profile = profileData?.user;
  const posts = postsData?.posts || [];
  const isLoading = loadingProfile || loadingPosts;

  const handlePostDeleted = () => {
    refetchPosts();
  };

  const handleFollowChange = () => {
    refetchProfile();
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-text-secondary">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-64 items-center justify-center sm:rounded-2xl sm:border border-border bg-surface text-center shadow-sm">
        <h2 className="text-xl font-bold text-text-primary">User not found</h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ProfileHeader 
        profile={profile} 
        postsCount={posts.length} 
        onFollowChange={handleFollowChange} 
      />

      {/* Tabs */}
      <div className="flex justify-center gap-12 border-t border-border mt-4 mb-4 text-sm font-bold uppercase tracking-widest sm:border-t-0 sm:mt-8">
        <button 
          onClick={() => setActiveTab("posts")}
          className={cn(
            "flex items-center gap-2 py-4 border-t-2 sm:border-t-0 sm:border-b-2 transition-colors",
            activeTab === "posts" 
              ? "text-text-primary border-primary sm:border-text-primary" 
              : "text-text-muted border-transparent hover:text-text-secondary"
          )}
        >
          <Grid3X3 className="h-4 w-4" />
          <span className="hidden sm:inline">Posts</span>
        </button>
        
      </div>

      {activeTab === "posts" && (
        posts.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 sm:rounded-2xl sm:border border-border bg-surface text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-text-primary">
              <Grid3X3 className="h-8 w-8 text-text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-text-primary">No Posts Yet</h2>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-4 lg:grid-cols-1">
      
            <div className="col-span-3 lg:col-span-1 space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onPostDeleted={handlePostDeleted}
                />
              ))}
            </div>
          </div>
        )
      )}

      {activeTab !== "posts" && (
        <div className="flex h-64 flex-col items-center justify-center gap-4 sm:rounded-2xl sm:border border-border bg-surface text-center shadow-sm">
          <h2 className="text-xl font-extrabold text-text-primary">Coming Soon</h2>
          <p className="text-text-muted">This tab is currently under development.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;

