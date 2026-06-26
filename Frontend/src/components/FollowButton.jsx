
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
      className={`rounded px-5 py-2 text-white transition ${
        following
          ? "bg-gray-600 hover:bg-gray-700"
          : "bg-blue-600 hover:bg-blue-700"
      } disabled:opacity-50`}
    >
      {loading
        ? "Loading..."
        : following
        ? "Unfollow"
        : "Follow"}
    </button>
  );
};

export default FollowButton;
