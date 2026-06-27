import { Users, Globe, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-6">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-text-primary flex justify-center items-center">About Shavio</h1>
        <div className="flex justify-center items-center">
            <p className="mt-2 max-w-2xl  text-text-secondary">
          Shavio is a modern social networking platform designed to make
          sharing ideas, connecting with people, and discovering communities
          simple and enjoyable.
        </p>
        </div>
        
      </section>

      <section className="rounded-2xl border border-border bg-surface p-8">
        <div className="flex items-start gap-4">
         

          <div>
            <h2 className="text-xl flex justify-center items-center font-semibold text-text-primary">
              Our Story
            </h2>

            <p className="mt-3 leading-7 text-text-secondary">
              Shavio was created as a platform where people can share updates,
              interact through posts, follow other users, and stay connected in
              a clean and distraction-free environment. The focus is on
              meaningful interactions rather than unnecessary complexity.
            </p>

            <p className="mt-4 leading-7 text-text-secondary">
              Whether you're sharing everyday moments, discovering new people,
              or building your online presence, Shavio provides a straightforward
              and responsive experience across desktop and mobile devices.
            </p>
          </div>
        </div>
      </section>

       <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <Users className="mb-4 h-7 w-7 text-primary" />
          <h3 className="font-semibold text-text-primary">
            Connect
          </h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Follow people, build your network, and stay updated through a
            personalized feed.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <Globe className="mb-4 h-7 w-7 text-primary" />
          <h3 className="font-semibold text-text-primary">
            Share
          </h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Publish posts, engage through likes and comments, and express your
            ideas with ease.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <Shield className="mb-4 h-7 w-7 text-primary" />
          <h3 className="font-semibold text-text-primary">
            Privacy
          </h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            User privacy and account security are important parts of the
            platform's design and development.
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;