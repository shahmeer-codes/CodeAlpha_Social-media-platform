
import { useState } from "react";
import { createPost } from "../services/postService";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      return;
    }

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
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg bg-white p-5 shadow"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Posting..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreatePost;
