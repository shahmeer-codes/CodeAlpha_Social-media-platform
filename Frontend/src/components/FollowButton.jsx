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
      (follower) => follower._id === user._id || follower === user._id
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
      className={`rounded-lg px-6 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        following
          ? "bg-background text-text-primary border border-border hover:bg-border"
          : "bg-primary text-white hover:bg-primary-hover border border-transparent"
      }`}
    >
      {loading ? "..." : following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;

