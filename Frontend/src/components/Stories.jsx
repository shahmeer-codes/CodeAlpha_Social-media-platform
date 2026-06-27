const Stories = () => {
  const stories = [
    { id: 1, user: "Your Story", image: "https://ui-avatars.com/api/?name=You&background=2563eb&color=fff", isUser: true },
    { id: 2, user: "alice_j", image: "https://ui-avatars.com/api/?name=Alice&background=random" },
    { id: 3, user: "bob_smith", image: "https://ui-avatars.com/api/?name=Bob&background=random" },
    { id: 4, user: "charlie_b", image: "https://ui-avatars.com/api/?name=Charlie&background=random" },
    { id: 5, user: "dave_w", image: "https://ui-avatars.com/api/?name=Dave&background=random" },
    { id: 6, user: "eve_a", image: "https://ui-avatars.com/api/?name=Eve&background=random" },
    { id: 7, user: "frank_m", image: "https://ui-avatars.com/api/?name=Frank&background=random" },
  ];

  return (
    <div className="mb-6 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {stories.map((story) => (
        <div key={story.id} className="flex min-w-[72px] flex-col items-center gap-1">
          <div className={`relative rounded-full p-1 ${story.isUser ? 'border-2 border-slate-200' : 'bg-gradient-to-tr from-yellow-400 to-primary'}`}>
            <div className="block h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-white">
              <img src={story.image} alt={story.user} className="h-full w-full object-cover" />
            </div>
            {story.isUser && (
              <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
                <span className="text-sm leading-none pb-0.5">+</span>
              </div>
            )}
          </div>
          <span className="truncate w-full text-center text-xs text-[var(--color-text-primary)]">
            {story.user}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
