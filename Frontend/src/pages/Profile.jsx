
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
        <div className="flex justify-center py-10">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center py-10">
          <h2 className="text-xl font-semibold">User not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar || "https://placehold.co/100x100"}
              alt={profile.username}
              className="h-24 w-24 rounded-full object-cover"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {profile.username}
              </h1>

              <p className="text-gray-600">
                {profile.email}
              </p>

              <div className="mt-3 flex gap-6">
                <span>
                  <strong>{posts.length}</strong> Posts
                </span>

                <span>
                  <strong>{profile.followers.length}</strong> Followers
                </span>

                <span>
                  <strong>{profile.following.length}</strong> Following
                </span>
              </div>
            </div>

            <FollowButton
              profileUser={profile}
              onFollowChange={fetchProfile}
            />
          </div>
        </div>

        {posts.length === 0 ? (
          <h2 className="text-center text-lg font-semibold">
            No posts yet.
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

export default Profile;
