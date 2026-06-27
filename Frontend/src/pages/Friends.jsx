const Friends = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary mb-1">Friends</h1>
        <p className="text-sm text-text-muted">Manage your connections and find people you know.</p>
      </div>

      <div className="flex h-64 flex-col items-center justify-center gap-4 sm:rounded-2xl sm:border border-border bg-surface text-center shadow-sm">
        <span className="text-4xl">👥</span>
        <h2 className="text-xl font-extrabold text-text-primary">Coming Soon</h2>
        <p className="text-text-muted">Friends page is currently under development.</p>
      </div>
    </div>
  );
};
export default Friends;
