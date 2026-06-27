const Footer = () => {
  return (
    <footer className="pt-6 text-xs text-[var(--color-text-secondary)]">
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Help</a>
        <a href="#" className="hover:underline">Press</a>
        <a href="#" className="hover:underline">API</a>
        <a href="#" className="hover:underline">Jobs</a>
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Locations</a>
        <a href="#" className="hover:underline">Language</a>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} SocialApp from Developer</p>
    </footer>
  );
};

export default Footer;
