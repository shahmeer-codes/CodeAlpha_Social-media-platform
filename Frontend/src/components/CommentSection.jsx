import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getComments,
  createComment,
  deleteComment,
} from "../services/commentService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, SendHorizonal, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  });

  const comments = commentsData?.comments || [];

  const createMutation = useMutation({
    mutationFn: (newComment) => createComment(postId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setText("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    createMutation.mutate(text);
  };

  return (
    <div className="w-full">
      {/* Comments List */}
      <div className="space-y-4 mb-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-text-muted" />
          </div>
        ) : comments.length === 0 ? (
          <div className="py-2 text-sm text-text-muted">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="group flex items-start gap-3 transition-opacity"
            >
              <img
                src={comment.user.avatar || `https://ui-avatars.com/api/?name=${comment.user.username}&background=random`}
                alt={comment.user.username}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-border"
              />
              <div className="flex-1 min-w-0">
                <div className="rounded-2xl rounded-tl-none bg-surface border border-border px-4 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-text-primary">
                      {comment.user.username}
                    </h4>
                    {comment.createdAt && (
                      <span className="text-[10px] text-text-muted">
                        {formatDistanceToNow(new Date(comment.createdAt))}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-text-primary break-words">
                    {comment.text}
                  </p>
                </div>
                {/* Actions under comment */}
                <div className="mt-1 flex items-center gap-4 px-2">
                  <button className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors">
                    Reply
                  </button>
                  {user?._id === comment.user._id && (
                    <button
                      onClick={() => deleteMutation.mutate(comment._id)}
                      disabled={deleteMutation.isLoading}
                      className="flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-danger transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <img
          src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
          alt={user?.name}
          className="h-8 w-8 rounded-full object-cover hidden sm:block"
        />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-full border border-border bg-background py-2 pl-4 pr-10 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={createMutation.isLoading || !text.trim()}
            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-hover disabled:opacity-50"
          >
            {createMutation.isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizonal className="h-4 w-4 -ml-0.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;

