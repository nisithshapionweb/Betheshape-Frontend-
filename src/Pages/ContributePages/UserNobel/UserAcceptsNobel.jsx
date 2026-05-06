

import { useQuery } from "@tanstack/react-query";
import { ImageOff, Link2Off } from "lucide-react";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const UserAcceptsNobel = () => {
  const axiosPublic = useAxiosPublic();

  const { data: goodNobels = [], isLoading } = useQuery({
    queryKey: ["acceptedUserNobels"],
    queryFn: async () => {
      const res = await axiosPublic.get("/userNobel/public/accepted");
      return res.data || [];
    },
  });

  if (isLoading) return <CustomLoading />;

  return (
    <div className="bg-[#faf9f6] min-h-screen py-20">
      <div className="max-w-[1400px] mx-auto px-2">

        {/* ===== Official Header ===== */}
        <div className="text-center mb-20">
          {/* Medal Circle */}
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-yellow-600 flex items-center justify-center text-yellow-600 text-3xl font-serif font-bold mb-6">
            N
          </div>

          <h1 className="text-2xl md:text-4xl font-serif font-semibold text-gray-900 tracking-wide">
            Official Nobel Laureate Contributions
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg text-justify">
            The following works have been formally reviewed and recognized 
            for their intellectual merit, originality, and lasting contribution 
            to scholarly advancement.
          </p>

          <div className="w-32 h-[2px] bg-yellow-600 mx-auto mt-8"></div>
        </div>

        {/* ===== Content ===== */}
        {goodNobels.length === 0 ? (
          <div className="text-center py-20 border-t border-b">
            <h3 className="text-2xl font-serif text-gray-800">
              No Recognized Contributions at Present
            </h3>
            <p className="text-gray-500 mt-4">
              Officially approved Nobel contributions will appear here upon confirmation.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {goodNobels.map((item) => (
              <div key={item._id} className="text-center">

                {/* Title */}
                <h2 className="text-2xl font-serif text-gray-900 mb-3">
                  {item.name}
                </h2>

                {/* Date */}
                <p className="text-sm text-gray-500 tracking-wide">
                  {item?.createdAt &&
                    new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                </p>

                {/* Image */}
                {item?.ideaShareImage ? (
                  <div className="mt-8 flex justify-center">
                    <img
                      src={item.ideaShareImage}
                      alt={item.name}
                      className="w-full max-w-md rounded-md shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col items-center text-gray-400">
                    <ImageOff size={40} />
                    <p className="text-xs mt-2">No Official Image Provided</p>
                  </div>
                )}

                {/* Description */}
                <div
                  className="mt-10 text-gray-700 leading-loose text-justify max-w-7xl mx-auto text-[17px]"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                {/* Footer */}
                <div className="mt-10">
                  {item?.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-700 font-medium hover:underline"
                    >
                      Access Official Reference →
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                      <Link2Off size={16} />
                      <span>No External Documentation Available</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="mt-16 border-t border-gray-200"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAcceptsNobel;