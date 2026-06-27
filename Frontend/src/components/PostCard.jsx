import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toggleLike, deletePost } from "../services/postService";
import CommentSection from "./CommentSection";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "./Sidebar";

const PostCard = ({ post, onPostDeleted }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    // Optimistic update
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    
    try {
      const data = await toggleLike(post._id);
      setLiked(data.liked);
      setLikes(data.likes);
    } catch (error) {
      // Revert on error
      setLiked(liked);
      setLikes(likes);
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;
    try {
      await deletePost(post._id);
      if (onPostDeleted) onPostDeleted(post._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="mb-6 bg-surface sm:rounded-2xl sm:border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${post.user._id}`} className="flex items-center gap-3">
          <img
            src={post.user.avatar || `https://ui-avatars.com/api/?name=${post.user.username}&background=random`}
            alt={post.user.username}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-text-primary hover:text-primary transition-colors">
              {post.user.username}
            </h3>
            <p className="text-xs text-text-muted">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </Link>

        {user?._id === post.user._id && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-full p-2 text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-danger hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" /> Delete Post
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content Image (if any) */}
      {post.image?.url && (
        <div className="w-full bg-black/5 flex items-center justify-center">
          <img
            src={post.image.url}
            alt="Post"
            className="w-full max-h-[750px] object-contain"
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                "group transition-colors",
                liked ? "text-danger" : "text-text-primary hover:text-text-secondary"
              )}
            >
              <Heart 
                className={cn(
                  "h-7 w-7 transition-transform duration-200 group-hover:scale-110",
                  liked && "fill-danger"
                )} 
              />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="group text-text-primary transition-colors hover:text-text-secondary"
            >
              <MessageCircle className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
            </button>
            <button className="group text-text-primary transition-colors hover:text-text-secondary">
              <Share className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
            </button>
          </div>
          <button className="group text-text-primary transition-colors hover:text-text-secondary">
            <Bookmark className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>

        {/* Likes Count */}
        {likes > 0 && (
          <p className="mt-2.5 text-sm font-bold text-text-primary">
            {likes.toLocaleString()} {likes === 1 ? 'like' : 'likes'}
          </p>
        )}

        {/* Caption */}
        {post.content && (
          <div className="mt-1 flex flex-wrap gap-1 text-sm">
            <Link to={`/profile/${post.user._id}`} className="font-bold text-text-primary hover:underline">
              {post.user.username}
            </Link>
            <span className="text-text-primary break-words whitespace-pre-wrap">
              {post.content}
            </span>
          </div>
        )}
        
        {/* View all comments toggle */}
        <button 
          onClick={() => setShowComments(!showComments)}
          className="mt-1.5 text-sm text-text-muted hover:text-text-secondary"
        >
          {showComments ? "Hide comments" : "View all comments"}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border px-4 py-3 bg-background/30">
          <CommentSection postId={post._id} />
        </div>
      )}
    </article>
  );
};

export default PostCard;

