import { Download, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UserUploadPdfManage = () => {

  const [pdfs, setPdfs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // truncate description
  const truncateHTML = (html = "", wordLimit = 15) => {
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const fetchPdfs = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch("https://api.betheshape.com/pdf/user");
      const data = await res.json();
      if (res.ok) setPdfs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  // delete
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Delete PDF?",
      text: name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`https://api.betheshape.com/pdf/user/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire("Deleted!", data.message, "success");
          fetchPdfs();
        }
      }
    });
  };

  // status update
  const handleStatusUpdate = async (id, status) => {
    const res = await fetch(
      `https://api.betheshape.com/pdf/user/status/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      Swal.fire("Updated!", data.message, "success");
      fetchPdfs();
    }
  };

  // download
  const handleDownload = async (pdf) => {

    const res = await fetch(
      `https://api.betheshape.com/pdf/user/download/${pdf._id}`
    );

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = pdf.originalName;

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <Helmet>
        <title>Admin | PDF Management</title>
      </Helmet>

      <div className="w-full max-w-[1400px] mx-auto mt-6 p-4">

        <h2 className="text-xl font-bold mb-6">
          User Uploaded PDFs
        </h2>

        {loadingHistory ? (
          <p>Loading...</p>
        ) : pdfs.length === 0 ? (
          <p>No PDFs uploaded</p>
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden md:block overflow-x-auto">

              <table className="w-full text-sm border">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Thumbnail</th>
                    <th className="p-2 border">Title</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">User</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pdfs.map((pdf) => (
                    <tr key={pdf._id} className="border">

                      <td className="p-2 text-center">
                        {pdf.PdfThumbnil ? (
                          <img
                            src={pdf.PdfThumbnil}
                            className="w-12 h-12 object-cover rounded mx-auto"
                          />
                        ) : (
                          <FileText className="text-gray-400 mx-auto" />
                        )}
                      </td>

                      <td className="p-2">{pdf.tittle}</td>

                      <td className="p-2">
                        {truncateHTML(pdf.description)}
                      </td>

                      <td className="p-2 text-xs">{pdf.email}</td>

                      <td className="p-2 text-center">
                        <span
                          className={`px-2 py-1 text-xs rounded font-semibold ${
                            pdf.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : pdf.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {pdf.status}
                        </span>
                      </td>

                      <td className="p-2 flex gap-2 justify-center">

                        {pdf.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(pdf._id, "accepted")
                              }
                              className="px-2 py-1 text-xs bg-green-600 text-white rounded"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                handleStatusUpdate(pdf._id, "rejected")
                              }
                              className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleDownload(pdf)}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded flex items-center gap-1"
                        >
                          <Download size={14} />
                          Download
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(pdf._id, pdf.originalName)
                          }
                          className="text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>

                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Mobile Cards */}

            <div className="grid gap-4 md:hidden">

              {pdfs.map((pdf) => (

                <div
                  key={pdf._id}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >

                  <div className="flex gap-3 items-start">

                    {pdf.PdfThumbnil ? (
                      <img
                        src={pdf.PdfThumbnil}
                        className="w-14 h-14 object-cover rounded"
                      />
                    ) : (
                      <FileText className="text-gray-400 w-10 h-10" />
                    )}

                    <div className="flex-1">

                      <h3 className="font-semibold text-sm">
                        {pdf.tittle}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {truncateHTML(pdf.description)}
                      </p>

                      <p className="text-xs mt-2">
                        <span className="font-semibold">User:</span>{" "}
                        {pdf.email}
                      </p>

                      <p className="text-xs mt-1">
                        Status:{" "}
                        <span
                          className={`font-semibold ${
                            pdf.status === "pending"
                              ? "text-yellow-600"
                              : pdf.status === "accepted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {pdf.status}
                        </span>
                      </p>

                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 flex-wrap">

                    {pdf.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(pdf._id, "accepted")
                          }
                          className="px-2 py-1 text-xs bg-green-600 text-white rounded"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(pdf._id, "rejected")
                          }
                          className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDownload(pdf)}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded flex items-center gap-1"
                    >
                      <Download size={14} />
                      Download
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(pdf._id, pdf.originalName)
                      }
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))}

            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserUploadPdfManage;