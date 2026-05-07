"use client";

import { useQuery } from "@tanstack/react-query";
import { ExternalLink, PlayCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AiOther = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ country filter state
  const [selectedCountry, setSelectedCountry] = useState("All");

  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["OwnSpOther"],
    queryFn: async () => {
      const res = await axiosPublic.get("/own-sp/explore");
      return res.data;
    },
  });

  // ✅ unique country list
  const countries = ["All", ...new Set(ideas.map((i) => i.countryName))];

  // ✅ filtered data
  const filteredIdeas =
    selectedCountry === "All"
      ? ideas
      : ideas.filter((idea) => idea.countryName === selectedCountry);

  return (
    <div className="min-h-screen py-10">
      <Helmet>
        <title>Own Sp Other</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-2 md:px-6">
        {/* ===== Header ===== */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-green-600 flex items-center justify-center mb-6">
            <Sparkles className="text-green-600 w-8 h-8" />
          </div>

          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
            Explore Top Universities Around the World
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg text-justify">
            Discover some of the world’s leading universities known for academic
            excellence, innovation, and global impact. These institutions offer
            outstanding opportunities for higher education, research, and career
            development, helping students build a strong foundation for their future.
          </p>

          <div className="w-28 h-[2px] bg-green-600 mx-auto mt-8"></div>
        </div>

        {/* ===== 🌍 Country Filter ===== */}
        <div className="flex justify-center mb-10">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* ===== Loading ===== */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-600">
            Loading resources...
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-gray-300">
            <h3 className="text-2xl text-gray-800">No Resources Available</h3>
            <p className="text-gray-500 mt-4">
              Resources will appear here once added.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-300">
            {filteredIdeas.map((idea) => (
              <div
                key={idea._id}
                className="py-5 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"
              >
                {/* Left Side */}
                <div className="flex gap-5">
                  <img
                    src={idea.ideaShareImage}
                    alt={idea.name}
                    className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg border"
                  />

                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      {idea.name}
                    </h3>

                    {/* 🌍 Country */}
                    <p className="text-xs text-green-600 mt-1">
                      {idea.countryName}
                    </p>

                    <div
                      className="text-gray-600 text-sm mt-2 text-justify"
                      dangerouslySetInnerHTML={{
                        __html: idea.description,
                      }}
                    />

                    <p className="text-xs text-gray-400 mt-3">
                      Added on{" "}
                      {new Date(idea.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {idea?.videolink && (
                    <a
                      href={idea.videolink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition px-3 md:px-5 py-1.5 md:py-2 rounded"
                    >
                      <PlayCircle size={18} />
                      Tutorial
                    </a>
                  )}

                  {idea?.websitelink && (
                    <a
                      href={idea.websitelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition px-3 md:px-5 py-1.5 md:py-2 rounded"
                    >
                      <ExternalLink size={18} />
                      Website
                    </a>
                  )}

                  {idea?.extraWebsitelink && (
                    <a
                      href={idea.extraWebsitelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Extra Website"
                      className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-3 md:px-5 py-1.5 md:py-2 rounded"
                    >
                      <ExternalLink size={18} />
                      Extra
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiOther;