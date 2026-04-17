import { images } from "@/public/image/Images";
import { SEO, Layout } from "../components/Layout";

const companyImages = [
  images.cl1,
  images.cl2,
  images.cl3,
  images.cl4,
  images.cl5,
  images.cl6,
  images.cl7,
  images.cl8,
  images.cl9,
  images.cl10,
  images.cl11,
  images.cl12,
  images.cl13,
  images.cl14,
  images.cl15,
  images.cl16,
  images.cl17,
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
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                style={{
                  filter: "contrast(1.1)",
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
