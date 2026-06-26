import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getComments,
  createComment,
  deleteComment,
} from "../services/commentService";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const data = await getComments(postId);
      setComments(data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      setLoading(true);

      await createComment(postId, text);

      setText("");
      fetchComments();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Comments
      </h3>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow transition-all duration-300 hover:scale-105 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "..." : "Post"}
        </button>
      </form>

      {comments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-6 text-center text-slate-500">
          No comments yet.
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <img
                    src={comment.user.avatar || "https://placehold.co/40x40"}
                    alt={comment.user.username}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {comment.user.username}
                    </h4>

                    <p className="mt-1 text-slate-600">
                      {comment.text}
                    </p>
                  </div>
                </div>

                {user?._id === comment.user._id && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-sm font-medium text-red-500 transition hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
