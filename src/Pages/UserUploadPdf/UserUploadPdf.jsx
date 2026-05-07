import {
    AlertCircle,
    CheckCircle2,
    FileText,
    Trash2,
    Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";
import RichTextField from "../../shared/TextEditor/RichTextField";
import MediaUpload from "../../utils/MediaUpload";

const UserUploadPdf = () => {
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [pdfs, setPdfs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [resetSignal, setResetSignal] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      tittle: "",
      description: "",
      PdfThumbnil: null,
    },
  });

  // truncate html
  const truncateHTML = (html = "", wordLimit = 10) => {
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  // fetch history
  const fetchPdfs = async () => {
    if (!user?.email) return;

    setLoadingHistory(true);

    try {
      const res = await fetch(
        `https://api.betheshape.com/pdf/user?email=${user.email}`,
      );

      if (!res.ok) throw new Error("Failed to fetch PDFs");

      const data = await res.json();

      setPdfs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [user?.email]);

  // file change
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setMessage({ type: "", text: "" });
    } else {
      setFile(null);
      setMessage({ type: "error", text: "Please select a valid PDF file." });
    }
  };

  // upload
  const handleUpload = async (formValues) => {
    if (!file) {
      setMessage({ type: "error", text: "Please choose a PDF file first." });
      return;
    }

    if (!user?.email) {
      setMessage({ type: "error", text: "User email not found!" });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();

      formData.append("pdf", file);
      formData.append("email", user.email);
      formData.append("tittle", formValues.tittle);
      formData.append("description", formValues.description || "");

      if (formValues.PdfThumbnil) {
        formData.append("PdfThumbnil", formValues.PdfThumbnil);
      }

      const res = await fetch("https://api.betheshape.com/pdf/user/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });

        setFile(null);

        reset();

        setResetSignal((prev) => !prev);

        fetchPdfs();
      } else {
        setMessage({
          type: "error",
          text: data.message || "Upload failed",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Server error, please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  // delete
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://api.betheshape.com/pdf/user/${id}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (res.ok) {
            Swal.fire("Deleted!", data.message, "success");

            fetchPdfs();
          } else {
            Swal.fire("Error", data.message || "Delete failed", "error");
          }
        } catch {
          Swal.fire("Error", "Server error", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-start">
      <Helmet>
        <title>User | PDF Upload</title>
      </Helmet>

      {/* Upload Box */}
      <TittleAnimation
        tittle="Upload PDF"
        subtittle="Upload PDFs and Manage Files"
      />
      <div className="w-full max-w-[1400px] mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
        <div className="form-control w-full py-4">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Title:</span>
          </label>

          <Controller
            name="tittle"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter title..."
                className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
              />
            )}
          />
        </div>

        <RichTextField
          name="description"
          control={control}
          placeholder="Enter Description..."
          className="w-full my-4"
        />

        <div className="flex items-start justify-start my-4">
          <FileText className="text-red-600 w-7 h-7 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Upload PDF File</h1>
        </div>

        <label
          htmlFor="pdf-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 mb-4 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-red-500 transition-all bg-white/50"
        >
          {file ? (
            <>
              <FileText className="text-red-500 w-10 h-10 mb-2" />
              <p className="text-gray-700 text-sm">{file.name}</p>
              <p className="text-gray-500 text-xs">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </>
          ) : (
            <>
              <Upload className="text-gray-500 w-10 h-10 mb-2" />
              <p className="text-gray-600 text-sm">
                Drag & Drop or Click to Select PDF
              </p>
            </>
          )}

          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <MediaUpload
          control={control}
          name="PdfThumbnil"
          label="PDF Thumbnail"
          type="image"
          maxSizeMB={5}
          resetSignal={resetSignal}
        />

        {message.text && (
          <div
            className={`flex items-center gap-2 mt-4 text-sm p-2 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <button
          onClick={handleSubmit(handleUpload)}
          disabled={uploading}
          className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* PDF History */}

      <div className="w-full max-w-[1400px] mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6 overflow-x-auto my-5">
        <h2 className="text-lg font-semibold mb-4 text-teal-700">
          PDF History
        </h2>

        <table className="table-auto w-full text-sm border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-2 py-2">Image</th>
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Description</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {loadingHistory ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : pdfs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No PDFs uploaded
                </td>
              </tr>
            ) : (
              pdfs.map((pdf) => (
                <tr key={pdf._id} className="border-b hover:bg-gray-50">
                  <td className="text-center py-2">
                    {pdf.PdfThumbnil ? (
                      <img
                        src={pdf.PdfThumbnil}
                        className="w-12 h-12 object-cover rounded mx-auto"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="text-center">{truncateHTML(pdf.tittle, 5)}</td>

                  <td
                    className="px-2 py-2 text-start"
                    dangerouslySetInnerHTML={{
                      __html: truncateHTML(pdf.description, 10),
                    }}
                  ></td>

                  <td className="text-center text-xs">
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
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(pdf._id, pdf.tittle)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUploadPdf;
