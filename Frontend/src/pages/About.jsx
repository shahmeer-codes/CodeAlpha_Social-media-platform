import { Building2, Code2, Users2, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="w-full max-w-4xl mx-auto pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary mb-1">About SocialApp</h1>
        <p className="text-sm text-text-muted">Learn more about our platform and mission.</p>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-base leading-relaxed text-text-primary">
          SocialApp is a modern platform designed to help you connect with professionals and friends globally. We believe in building a transparent, fast, and secure environment for communities to thrive. 
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Users2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Community First</h3>
              <p className="mt-1 text-sm text-text-muted">
                Built to foster engaging discussions and meaningful connections across boundaries.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Professional Networking</h3>
              <p className="mt-1 text-sm text-text-muted">
                Share your achievements, follow industry leaders, and build your professional brand.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Privacy & Security</h3>
              <p className="mt-1 text-sm text-text-muted">
                Your data is protected. We use enterprise-grade security to ensure your privacy.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Modern Technology</h3>
              <p className="mt-1 text-sm text-text-muted">
                Powered by a robust MERN stack, delivering a lightning-fast experience on any device.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-text-primary">Developer Information</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          This platform is constantly evolving. We're a team of passionate engineers committed to delivering the best social experience. For API access, developer documentation, or open source contributions, please visit our developer portal.
        </p>
        <div className="mt-6">
          <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-hover">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

