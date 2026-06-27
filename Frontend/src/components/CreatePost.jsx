import { useState, useRef, useEffect } from "react";
import { createPost } from "../services/postService";
import { useAuth } from "../context/AuthContext";
import { Image as ImageIcon, Smile, SendHorizonal, X } from "lucide-react";
import { cn } from "./Sidebar";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    try {
      setLoading(true);
      await createPost({ content, image });
      setContent("");
      setImage(null);
      setImagePreview(null);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      if (e.target) e.target.reset();
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface sm:rounded-2xl sm:border border-border shadow-sm overflow-hidden transition-shadow focus-within:shadow-md">
      <form onSubmit={handleSubmit} className="p-4 sm:p-5">
        <div className="flex gap-4">
          <div className="shrink-0">
            <img
              src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
            />
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full resize-none border-0 bg-transparent pt-2 pb-0 text-base text-text-primary outline-none placeholder:text-text-muted focus:ring-0"
              rows={1}
            />

            {imagePreview && (
              <div className="relative mt-3 max-h-80 w-full overflow-hidden rounded-xl bg-black/5 flex items-center justify-center">
                <img src={imagePreview} alt="Preview" className="h-full w-full max-h-80 object-contain" />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <label className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-primary-light text-text-secondary hover:text-primary">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <ImageIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
            </label>
            <button type="button" className="group flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-primary-light text-text-secondary hover:text-primary">
              <Smile className="h-5 w-5 transition-transform group-hover:scale-110" />
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || (!content.trim() && !image)}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Posting..." : "Post"}
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

