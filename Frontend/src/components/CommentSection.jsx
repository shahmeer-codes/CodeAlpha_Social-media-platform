
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
    <div className="mt-6 border-t pt-4">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded border px-3 py-2 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "..." : "Post"}
        </button>
      </form>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="rounded border p-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">
                  {comment.user.username}
                </h4>

                <p className="text-sm text-gray-600">
                  {comment.text}
                </p>
              </div>

              {user?._id === comment.user._id && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
