
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PAGE_HEIGHT_MM = 220;
const MM_TO_PX = 3.78;
const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * MM_TO_PX;

const StoryWrittingFormat = () => {
  const axiosPublic = useAxiosPublic();
  const printRef = useRef(null);
  const measureRef = useRef(null);
  const [allStories, setAllStories] = useState([]);

  /* ================= Fetch Story Fields ================= */
  const { data: storyWritingFields = [] } = useQuery({
    queryKey: ["storyWritingFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/storyWritingField");
      return res.data?.data || [];
    },
  });

  /* ================= Fetch Stories ================= */
  const { data: storyWriting = [], isLoading } = useQuery({
    queryKey: ["storyWriting"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/storyWriting");
      return res.data || [];
    },
  });

  /* ================= Pagination ================= */
  const paginateContent = (htmlContent) => {
    if (!measureRef.current) return [];

    const container = measureRef.current;
    container.innerHTML = htmlContent;

    const pages = [];
    let currentPage = "";

    const children = Array.from(container.childNodes);
    container.innerHTML = "";

    children.forEach((node) => {
      container.appendChild(node.cloneNode(true));

      if (container.scrollHeight > PAGE_HEIGHT_PX) {
        container.removeChild(container.lastChild);
        pages.push(currentPage);
        currentPage = node.outerHTML || node.textContent;
        container.innerHTML = node.outerHTML || node.textContent;
      } else {
        currentPage += node.outerHTML || node.textContent;
      }
    });

    if (currentPage) pages.push(currentPage);

    return pages;
  };

  /* ================= Prepare Stories ================= */
  useEffect(() => {
    if (!storyWriting.length) return;

    const storiesWithPages = storyWriting.map((story) => {
      const pages = paginateContent(story.description || "");
      return {
        storyId: story._id,
        title: story.name || story.title || "",
        pages: pages.map((content, index) => ({
          content,
          pageNumber: index + 1,
          writtingBy: story.writtingBy || "Admin",
          createdAt: story.createdAt || "",
        })),
      };
    });

    setAllStories(storiesWithPages);
  }, [storyWriting]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading story content...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-2 md:px-10">
      {/* ================= Field Section ================= */}
      <section className="text-center mb-12 max-w-[1400px] mx-auto">
        {storyWritingFields.map((field) => (
          <div
            key={field._id}
            className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-6 md:p-8 rounded-lg shadow-md border-l-4 border-teal-500 relative overflow-hidden mb-8"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-300 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#5a1f1f]">
              {field.title}
            </h2>
            <p className="text-[#4a3826] mt-4 text-justify leading-relaxed">
              {field.description}
            </p>
          </div>
        ))}
      </section>

      {/* ================= Hidden Measuring Container ================= */}
      <div
        ref={measureRef}
        className="absolute invisible w-[90mm] md:w-[170mm] p-0 text-[15px] leading-relaxed"
        style={{ height: `${PAGE_HEIGHT_MM}mm` }}
      />

      {/* ================= Stories ================= */}
      <section className="flex flex-col items-center gap-12">
        {allStories.map((story) => (
          <div key={story.storyId} className="w-full flex flex-col gap-8">
            {story.pages.map((page, index) => (
              <div
                key={index}
                className="relative w-full max-w-[900px] mx-auto px-6 py-10 md:px-20 md:py-20 min-h-[500px] md:min-h-[900px] shadow-2xl overflow-hidden rounded-lg print:w-[210mm] print:h-[297mm] print:p-[20mm] print:shadow-none"
                style={{
                  backgroundColor: "#f5ecd9",
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(0,0,0,0.05) 0%, transparent 40%),
                    radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0%, transparent 40%),
                    repeating-linear-gradient(0deg, rgba(0,0,0,0.015), rgba(0,0,0,0.015) 1px, transparent 1px, transparent 3px)
                  `,
                }}
              >
                {/* Dark Edge Effect */}
                <div className="absolute inset-0 rounded-lg pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.35)]"></div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h1 className="text-[60px] md:text-[120px] font-bold text-gray-300 opacity-60 rotate-[-30deg] select-none tracking-widest">
                    STORY
                  </h1>
                </div>

                <div className="relative z-10">
                  {/* Title only on first page */}
                  {index === 0 && story.title && (
                    <h1 className="text-center text-xl md:text-3xl font-serif font-bold text-[#5a1f1f] mb-8">
                      {story.title}
                    </h1>
                  )}

                  {/* Content */}
                  <article
                    className="text-justify text-[14px] md:text-[17px] leading-7 md:leading-8 text-[#2b1d0e] font-serif"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />

                 
                 {/* Footer */}
{/* Footer */}
<div className="flex items-center mt-12 text-xs md:text-sm text-[#3e2c1c] w-full">
  {/* Left */}
  <div className="flex-1 text-left">
    ✍ {page.writtingBy}
  </div>

  {/* Center */}
  <div className="flex-1 text-center">
    Page {index + 1} of {story.pages.length}
  </div>

  {/* Right */}
  <div className="flex-1 text-right">
    ~ {formatDate(page.createdAt)}
  </div>
</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default StoryWrittingFormat;