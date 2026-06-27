import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserSettings } from "../services/userService";
import { Loader2 } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "", // Don't populate password
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setMessage({ type: "", text: "" });
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setMessage({ type: "", text: "" });
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      setLoading(true);

      const submitData = new FormData();
      if (formData.username && formData.username !== user.username) {
        submitData.append("username", formData.username);
      }
      if (formData.email && formData.email !== user.email) {
        submitData.append("email", formData.email);
      }
      if (formData.bio !== undefined && formData.bio !== (user.bio || "")) {
        submitData.append("bio", formData.bio);
      }
      if (formData.password) {
        submitData.append("password", formData.password);
      }
      if (avatar) {
        submitData.append("avatar", avatar);
      }

      // Check if there is anything to update
      let hasChanges = false;
      for (const [key] of submitData.entries()) {
        if (key) {
           hasChanges = true;
           break;
        }
      }

      if (!hasChanges) {
        setMessage({ type: "info", text: "No changes to save." });
        setLoading(false);
        return;
      }

      await updateUserSettings(submitData);
      
      setMessage({ type: "success", text: "Profile updated successfully! Refresh to see changes globally." });
      setFormData(prev => ({ ...prev, password: "" }));
      setAvatar(null);
      // clear file input
      const fileInput = document.getElementById("avatar-input");
      if (fileInput) fileInput.value = "";

    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary mb-1">Settings</h1>
        <p className="text-sm text-text-muted">Update your profile and account preferences.</p>
      </div>

      <div className="bg-surface sm:rounded-2xl sm:border border-border shadow-sm p-4 sm:p-6">
        {message.text && (
          <div className={`p-4 mb-6 rounded-xl text-sm font-semibold ${message.type === 'success' ? 'bg-green-50 text-green-700' : message.type === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-text-primary">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              {user?.avatar || user?.profilePicture ? (
                <img src={user.avatar || user.profilePicture} alt="Current Avatar" className="h-16 w-16 rounded-full object-cover ring-1 ring-border" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-xl ring-1 ring-border">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <input
                  id="avatar-input"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-text-primary">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter new username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-text-primary">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter new email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-text-primary">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            ></textarea>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-text-primary">
              New Password <span className="text-text-muted font-normal">(leave blank to keep current)</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full sm:w-auto items-center justify-center rounded-xl bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

