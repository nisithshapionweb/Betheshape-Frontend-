import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const UploadPDF = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pdfs = [], isLoading } = useQuery({
    queryKey: ["acceptedUserPDFs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pdf/user?status=accepted");
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

  const handleDownload = async (pdf) => {
    try {
      const res = await axiosPublic.get(`/pdf/user/download/${pdf._id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", pdf.originalName || "document.pdf");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Download failed.");
    }
  };

  if (isLoading) return <CustomLoading />;

  return (
    <div className="min-h-screen py-10">
      <Helmet>
        <title>Official Approved Documents</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-3 md:px-6">

        {/* ===== Header ===== */}
        <div className="text-center mb-16">

          <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-700 flex items-center justify-center text-yellow-700 text-xl font-serif font-bold mb-6">
            PDF
          </div>

          <h1 className="text-2xl md:text-4xl font-serif font-semibold text-gray-900 ">
            Official Approved Documents
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg text-justify">
            The following documents have been formally reviewed and approved.
            These files are preserved within the official archive for
            reference and public access.
          </p>

          <div className="w-28 h-[2px] bg-yellow-700 mx-auto mt-8"></div>
        </div>

        {/* ===== Content ===== */}

        {pdfs.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-gray-300">

            <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />

            <h3 className="text-2xl font-serif text-gray-800">
              No Archived Documents Available
            </h3>

            <p className="text-gray-500 mt-4 ">
              Approved PDF documents will appear here once they are verified
              and accepted by the administration.
            </p>

          </div>
        ) : (
          <div className=" rounded-lg shadow-sm divide-y divide-gray-200">

            {pdfs.map((pdf) => {

              const isExpanded = expandedDescriptions[pdf._id];

              const showToggle =
                pdf.description && pdf.description.split(/\s+/).length > 15;

              return (
                <div
                  key={pdf._id}
                  className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 hover:bg-gray-50 transition"
                >

                  {/* Left Side */}
                  <div className="flex flex-1 items-start gap-4">

                    {pdf.PdfThumbnil ? (
                      <img
                        src={pdf.PdfThumbnil}
                        alt="thumbnail"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">

                      <h3 className="text-lg font-semibold text-gray-900">
                        {pdf.tittle || pdf.originalName}
                      </h3>

                      {/* Description */}
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
                            className="ml-2 text-yellow-700 text-xs font-semibold"
                            onClick={() => toggleDescription(pdf._id)}
                          >
                            {isExpanded ? "See less" : "See more"}
                          </button>
                        )}

                      </p>

                      {/* Date + Status */}
                      <div className="flex items-center gap-3 mt-2 flex-wrap">

                        <p className="text-sm text-gray-500">
                          Published on{" "}
                          {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>

                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Approved
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex-shrink-0 self-start md:self-auto">

                    <button
                      onClick={() => handleDownload(pdf)}
                      className="flex items-center justify-center gap-2 border border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
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

export default UploadPDF;