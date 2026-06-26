import { useState } from "react";
import { Link } from "react-router-dom";
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
    const confirmDelete = window.confirm("Delete this post?");

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
    <article className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <Link
          to={`/profile/${post.user._id}`}
          className="flex items-center gap-4"
        >
          <img
            src={post.user.avatar || "https://placehold.co/80x80"}
            alt={post.user.username}
            className="h-14 w-14 rounded-full border-2 border-blue-100 object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {post.user.username}
            </h3>

            <p className="text-sm text-slate-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </Link>

        {user?._id === post.user._id && (
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>

      <div className="p-5">
        {post.content && (
          <p className="mb-5 whitespace-pre-wrap text-base leading-7 text-slate-700">
            {post.content}
          </p>
        )}

        {post.image?.url && (
          <div className="overflow-hidden rounded-xl">
            <img
              src={post.image.url}
              alt="Post"
              className="max-h-[500px] w-full object-cover transition duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={handleLike}
            className={`rounded-xl px-5 py-2 font-medium transition-all duration-300 ${
              liked
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
          </button>
        </div>

        <CommentSection postId={post._id} />
      </div>
    </article>
  );
};

export default PostCard;
