
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toggleLike, deletePost } from "../services/postService";
import CommentSection from "./CommentSection";

const PostCard = ({ post, onPostDeleted }) => {
  const { user } = useAuth();

  const [likes, setLikes] = useState(post.likes.length);

  const [liked, setLiked] = useState(
    post.likes.includes(user?._id)
  );

  const handleLike = async () => {
    try {
      const data = await toggleLike(post._id);

      setLiked(data.liked);
      setLikes(data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(post._id);

      if (onPostDeleted) {
        onPostDeleted(post._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-5 shadow">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              post.user.avatar ||
              "https://placehold.co/50x50"
            }
            alt={post.user.username}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">
              {post.user.username}
            </h3>

            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {user?._id === post.user._id && (
          <button
            onClick={handleDelete}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>

      <p className="mb-4 whitespace-pre-wrap">
        {post.content}
      </p>

      {post.image?.url && (
        <img
          src={post.image.url}
          alt="Post"
          className="mb-4 max-h-[500px] w-full rounded-lg object-cover"
        />
      )}

      <button
        onClick={handleLike}
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {liked ? "Unlike" : "Like"} ({likes})
      </button>

      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostCard;
