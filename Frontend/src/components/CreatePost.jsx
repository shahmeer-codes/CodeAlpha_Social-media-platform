import { useState } from "react";
import { createPost } from "../services/postService";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) return;

    try {
      setLoading(true);

      await createPost({
        content,
        image,
      });

      setContent("");
      setImage(null);
      e.target.reset();

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:shadow-lg">
      <h2 className="mb-5 text-xl font-semibold text-slate-800">
        Create a Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full rounded-xl border border-slate-300 bg-slate-50 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
