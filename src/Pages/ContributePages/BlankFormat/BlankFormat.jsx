import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const BlankFormat = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pdfs = [], isLoading } = useQuery({
    queryKey: ["blankPDFs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pdf/blank");
      return res.data || [];
    },
  });

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateText = (text = "", wordLimit = 15) => {
    if (!text) return "";
    const words = text.replace(/<[^>]+>/g, " ").split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleDownload = (id) => {
    window.location.href = `http://localhost:5000/pdf/blank/download/${id}`;
  };

  if (isLoading) return <CustomLoading />;

  return (
    <div className="min-h-screen py-5">
      <Helmet>
        <title>Blank Document Formats</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-2 md:px-6">

        {/* ===== Header ===== */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-teal-700 text-xl font-serif font-bold mb-6">
            PDF
          </div>

          <h1 className="text-2xl md:text-4xl font-serif font-semibold text-gray-900">
            Official Blank Document Formats
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg text-justify">
            These blank document formats are provided for applicants and contributors
            to properly prepare and submit their documents according to the official
            submission guidelines of the platform.
          </p>

          <div className="w-28 h-[2px] bg-teal-700 mx-auto mt-8"></div>
        </div>

        {/* ===== Content ===== */}
        {pdfs.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-gray-300">
            <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />

            <h3 className="text-2xl font-serif text-gray-800">
              No Blank Formats Available
            </h3>

            <p className="text-gray-500 mt-4">
              Blank document formats will appear here once they are uploaded by the administrator.
            </p>
          </div>
        ) : (
          <div className=" rounded-lg shadow-xl divide-y divide-gray-200 p-2">
            {pdfs.map((pdf) => {
              const isExpanded = expandedDescriptions[pdf._id];
              const showToggle =
                pdf.description && pdf.description.split(/\s+/).length > 15;

              return (
                <div
                  key={pdf._id}
                  className="p-2 md:p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-1 items-start gap-4">
                    {pdf.PdfThumbnil ? (
                      <img
                        src={pdf.PdfThumbnil}
                        alt="pdf thumbnail"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        {pdf.tittle || pdf.originalName}
                      </h3>

                      <p className="text-gray-700 text-sm mt-1">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: isExpanded
                              ? pdf.description
                              : truncateText(pdf.description),
                          }}
                        />
                        {showToggle && (
                          <button
                            className="ml-2 text-teal-600 text-xs font-semibold"
                            onClick={() => toggleDescription(pdf._id)}
                          >
                            {isExpanded ? "See less" : "See more"}
                          </button>
                        )}
                      </p>

                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <p className="text-sm text-gray-500">
                          Added on{" "}
                          {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Free
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-start md:self-auto">
                    <button
                      onClick={() => handleDownload(pdf._id)}
                      className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlankFormat;