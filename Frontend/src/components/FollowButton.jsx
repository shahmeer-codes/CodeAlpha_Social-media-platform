import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toggleFollow } from "../services/userService";

const FollowButton = ({ profileUser, onFollowChange }) => {
  const { user } = useAuth();

  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profileUser || !user) return;

    const isFollowing = profileUser.followers.some(
      (follower) => follower._id === user._id
    );

    setFollowing(isFollowing);
  }, [profileUser, user]);

  if (!user || user._id === profileUser?._id) {
    return null;
  }

  const handleFollow = async () => {
    try {
      setLoading(true);

      const data = await toggleFollow(profileUser._id);

      setFollowing(data.following);

      if (onFollowChange) {
        onFollowChange();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${
        following
          ? "bg-slate-700 text-white hover:bg-slate-800"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {loading ? "Loading..." : following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
