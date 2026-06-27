import FollowButton from "./FollowButton";

const ProfileHeader = ({ profile, postsCount, onFollowChange }) => {
  return (
    <div className="bg-surface sm:rounded-2xl sm:border border-border shadow-sm p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
        
        {/* Avatar */}
        <div className="shrink-0 relative">
          <div className="rounded-full p-1 border-2 border-border">
            <img
              src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.username}&background=random&size=200`}
              alt={profile.username}
              className="h-24 w-24 sm:h-36 sm:w-36 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Info & Stats */}
        <div className="flex-1 w-full flex flex-col gap-4 sm:pt-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-text-primary">{profile.username}</h1>
            <div className="flex items-center gap-3">
              <FollowButton
                profileUser={profile}
                onFollowChange={onFollowChange}
              />
            </div>
          </div>

          <div className="flex justify-around sm:justify-start gap-8 py-4 sm:py-0 border-y border-border sm:border-0">
            <div className="flex flex-col sm:flex-row sm:gap-1.5 items-center">
              <span className="font-bold text-lg sm:text-base text-text-primary">{postsCount}</span>
              <span className="text-sm text-text-primary">posts</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-1.5 items-center">
              <span className="font-bold text-lg sm:text-base text-text-primary">{profile.followers?.length || 0}</span>
              <span className="text-sm text-text-primary">followers</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-1.5 items-center">
              <span className="font-bold text-lg sm:text-base text-text-primary">{profile.following?.length || 0}</span>
              <span className="text-sm text-text-primary">following</span>
            </div>
          </div>

          <div className="text-center sm:text-left mt-2 sm:mt-0">
            <h2 className="font-bold text-sm text-text-primary">{profile.name || profile.username}</h2>
            <p className="mt-1 text-sm text-text-primary whitespace-pre-wrap">
              {profile.bio || "Welcome to my profile! 👋"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

