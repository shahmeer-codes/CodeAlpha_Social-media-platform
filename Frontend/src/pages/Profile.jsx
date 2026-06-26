import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FollowButton from "../components/FollowButton";
import PostCard from "../components/PostCard";
import { getUserProfile } from "../services/userService";
import { getUserPosts } from "../services/postService";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const [profileData, postData] = await Promise.all([
        getUserProfile(id),
        getUserPosts(id),
      ]);

      setProfile(profileData.user);
      setPosts(postData.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-100">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-100">
          <h2 className="text-2xl font-semibold text-slate-700">
            User not found
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col items-center gap-5 md:flex-row">
                <img
                  src={profile.avatar || "https://placehold.co/150x150"}
                  alt={profile.username}
                  className="h-32 w-32 rounded-full border-4 border-blue-100 object-cover shadow"
                />

                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {profile.username}
                  </h1>

                  <p className="mt-2 text-slate-500">
                    {profile.email}
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
                    <div className="rounded-xl bg-slate-100 px-5 py-3 text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {posts.length}
                      </p>

                      <p className="text-sm text-slate-500">
                        Posts
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 px-5 py-3 text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {profile.followers.length}
                      </p>

                      <p className="text-sm text-slate-500">
                        Followers
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 px-5 py-3 text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {profile.following.length}
                      </p>

                      <p className="text-sm text-slate-500">
                        Following
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <FollowButton
                profileUser={profile}
                onFollowChange={fetchProfile}
              />
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <div className="text-6xl">📷</div>

              <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                No Posts Yet
              </h2>

              <p className="mt-2 text-slate-500">
                This user hasn't shared anything yet.
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

export default Profile;
