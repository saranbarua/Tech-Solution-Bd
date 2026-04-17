import { SEO, Layout } from "../components/Layout";

const companyImages = [
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1200&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80",
];
const clientLogos = [
  "Meridian",
  "Vantara",
  "Helion Group",
  "Stratis",
  "Aurelian",
  "Novaris",
];

const Clients = () => {
  return (
    <Layout>
      <SEO
        title="Global Partnerships"
        description="Collaborating with industry leaders to bring innovative solutions across global markets."
      />

      <div className="  px-6 md:px-14 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {companyImages.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden aspect-[4/5] group"
              style={{
                animation: `fadeUp 0.8s ease forwards`,
                animationDelay: `${i * 80}ms`,
                opacity: 0,
              }}
            >
              <img
                src={src}
                alt="company"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                style={{
                  filter: "grayscale(100%) contrast(1.1)",
                }}
              />

              {/* soft cinematic overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* subtle shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -inset-20 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* animations */}
        <style>
          {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0px);
            }
          }
        `}
        </style>
      </div>
    </Layout>
  );
};

export default Clients;
