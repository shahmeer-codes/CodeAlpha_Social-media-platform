const Messages = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary mb-1">Messages</h1>
        <p className="text-sm text-text-muted">Chat with your friends and connections.</p>
      </div>

      <div className="flex flex-1 h-64 flex-col items-center justify-center gap-4 sm:rounded-2xl sm:border border-border bg-surface text-center shadow-sm">
        <span className="text-4xl">💬</span>
        <h2 className="text-xl font-extrabold text-text-primary">Coming Soon</h2>
        <p className="text-text-muted">Messaging feature is currently under development.</p>
      </div>
    </div>
  );
};
export default Messages;
