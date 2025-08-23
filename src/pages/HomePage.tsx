"use client";
import Image from "next/image";
import Link from "next/link";

interface Feature {
  icon: string;
  title: string;
  desc: string;
  link: string;
}

const features: Feature[] = [
  {
    icon: "/images/health-svgrepo-com.svg",
    title: "Crop Disease Detection",
    desc: "Snap a photo for AI-powered diagnosis, disease insight, and treatment tips.",
    link: "/features/plant-detection",
  },
  {
    icon: "/images/agriculture-crop-cropduster-svgrepo-com.svg",
    title: "Weather Alerts",
    desc: "Get accurate forecasts and extreme weather alerts for your farm’s location.",
    link: "/features/weather-alerts",
  },
  {
    icon: "/images/agriculture-eco-farm-svgrepo-com.svg",
    title: "Live Mandi Prices",
    desc: "See today’s minimum, maximum, and modal mandi rates across India.",
    link: "/features/mandi-price",
  },
  {
    icon: "/images/agriculture-worker-svgrepo-com.svg",
    title: "Video Tutorials",
    desc: "Learn organic farming, irrigation, pest control in your native language.",
    link: "/features/search-tutorial",
  },
  {
    icon: "/images/research-presentation-left-svgrepo-com.svg",
    title: "Smart Agri Search",
    desc: "Search govt. schemes, blogs, and agri guides with language-safe results.",
    link: "/features/search-tutorial",
  },
  {
    icon: "/images/assistant-svgrepo-com.svg",
    title: "AI Chatbot Assistant",
    desc: "Talk or chat with our bot to get instant answers—voice enabled.",
    link: "/features/chatbot-assistant",
  },
];

export default function Home() {
  return (
    <main className="bg-green-50 min-h-screen w-full">
      
      {/* Hero Section */}
      <section className="flex flex-col-reverse items-center text-center md:flex-row md:text-left max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="md:w-1/2 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
            Smart Kisan Seva
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-green-700 mb-4">
            AI-enabled farming tools for every Indian farmer
          </h2>
          <p className="text-green-800 text-base sm:text-lg mb-6 max-w-md">
            Stay ahead with crop disease detection, mandi prices, weather,
            chatbot help & expert videos.
          </p>
          <Link href="/signup">
            <button className="bg-gradient-to-r from-green-600 to-lime-500 text-white font-bold px-6 py-3 rounded-xl text-lg hover:scale-105 transition shadow-md">
              Create My Free Account
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <Image
            src="/images/smart-seva.png"
            alt="Farmer Illustration"
            width={380}
            height={380}
            className="w-full max-w-xs md:max-w-sm"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => {
          const content = (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all flex flex-col h-full"
            >
              <div className="mb-4 flex justify-center md:justify-start">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px]"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-green-800 text-sm sm:text-base">
                {feature.desc}
              </p>
            </div>
          );

          return feature.link ? (
            <Link href={feature.link} key={idx}>
              {content}
            </Link>
          ) : (
            content
          );
        })}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-700 to-lime-400 text-white py-12 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Ready to harvest success with technology?
        </h2>
        <p className="text-base sm:text-lg mb-6">
          Join 10,000+ farmers using Smart Kisan Seva — it's 100% free for life.
        </p>
        <Link href="/signup">
          <button className="bg-white text-green-700 px-6 py-3 text-lg font-semibold rounded-xl hover:bg-lime-200 shadow-md transition">
            Start Now – It’s Free
          </button>
        </Link>
      </section>
    </main>
  );
}
