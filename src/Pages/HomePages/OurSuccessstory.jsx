import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const OurSuccessstory = () => {
  const axiosPublic = useAxiosPublic();

  const { data: successStories = [], isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner/stories");
      return res.data;
    },
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white via-teal-50 to-white">
      <div className="max-w-[1400px] mx-auto">

        {/* 🔥 Header */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-teal-700">
            Real Success Stories
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-gray-600 leading-relaxed">
            দেখুন কীভাবে Betheshape ব্যবহার করে শিক্ষার্থীরা তাদের English skills
            উন্নত করছে। নিয়মিত practice এবং structured learning এর মাধ্যমে তারা
            এখন আরও confident হয়ে উঠছে।
          </p>
        </div>

        {/* 🎥 Cards */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-5 md:px-16">

          {/* Skeleton Loading */}
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-[260px] h-[420px] flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-lg animate-pulse"
              >
                <div className="w-full h-full bg-gray-200"></div>
              </div>
            ))}

          {/* Videos */}
          {!isLoading &&
            successStories.map((story) => (
              <div
                key={story._id}
                className="relative w-[260px] h-[420px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl group"
              >
                {/* ✅ Video (Fixed) */}
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                >
                  <source src={story.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* ✅ Overlay (does NOT block click) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OurSuccessstory;