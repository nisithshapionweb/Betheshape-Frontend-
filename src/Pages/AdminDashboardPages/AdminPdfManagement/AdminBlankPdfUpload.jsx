import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, FileText, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import RichTextField from "../../../shared/TextEditor/RichTextField";
import MediaUpload from "../../../utils/MediaUpload";

const AdminBlankPdfUpload = () => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [resetSignal, setResetSignal] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      tittle: "",
      description: "",
      PdfThumbnil: null,
    },
  });

  /* ---------------- FETCH PDF LIST ---------------- */
  const { data: pdfs = [], isLoading } = useQuery({
    queryKey: ["pdfs"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/pdf/blank");
      return res.json();
    },
  });

  /* ---------------- UPLOAD MUTATION ---------------- */
  const uploadMutation = useMutation({
    mutationFn: async (formData) => {
      setUploading(true);
      const res = await fetch("http://localhost:5000/pdf/blank/upload", {
        method: "POST",
        body: formData,
      });
      return res.json();
    },
    onSuccess: () => {
      setUploading(false);
      queryClient.invalidateQueries(["pdfs"]);
      setFile(null);
      reset();
      setResetSignal((prev) => !prev);
      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "PDF uploaded successfully!",
        confirmButtonColor: "#10b981",
      });
    },
    onError: (error) => {
      setUploading(false);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error?.message || "Upload failed. Try again.",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  /* ---------------- DELETE MUTATION ---------------- */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:5000/pdf/blank/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      Swal.fire("Deleted", "PDF removed", "success");
      queryClient.invalidateQueries(["pdfs"]);
    },
  });

  /* ---------------- FILE SELECT ---------------- */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setMessage({ text: "", type: "" });
    } else {
      setFile(null);
      setMessage({ text: "Invalid file. Please upload PDF.", type: "error" });
    }
  };

  /* ---------------- DELETE WITH CONFIRM ---------------- */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  /* ---------------- FORM SUBMIT ---------------- */
  const handleUpload = (data) => {
    if (!file) return setMessage({ text: "Select a PDF first", type: "error" });

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("tittle", data.tittle);
    formData.append("description", data.description || "");
    if (data.PdfThumbnil) formData.append("PdfThumbnil", data.PdfThumbnil);

    uploadMutation.mutate(formData);
  };

  const truncateHTML = (html = "", wordLimit = 10) => {
    if (!html || typeof html !== "string") return "";
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).slice(0, wordLimit);
    return words.join(" ") + (text.split(/\s+/).length > wordLimit ? "..." : "");
  };

  return (
    <div className="space-y-10 px-4 md:px-8">
      <Helmet>
        <title>Admin | PDF Upload</title>
      </Helmet>

      <TittleAnimation tittle="PDF Management" subtittle="Upload PDFs and Manage Files" />

      {/* Upload Card */}
      <div className="w-full max-w-7xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
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

        {/* PDF Upload */}
        <div className="my-6">
          <label
            htmlFor="pdf-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-red-500 transition-all bg-white/50"
          >
            {file ? (
              <>
                <FileText className="text-red-500 w-10 h-10 mb-2" />
                <p className="text-gray-700 text-sm">{file.name}</p>
                <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
              </>
            ) : (
              <>
                <Upload className="text-gray-500 w-10 h-10 mb-2" />
                <p className="text-gray-600 text-sm">Drag & Drop or Click to Select PDF</p>
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
        </div>

        {/* PDF Thumbnail */}
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
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        )}

        <button
          onClick={handleSubmit(handleUpload)}
          disabled={uploading}
          className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {uploading ? (
            <>
              <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" /> Upload
            </>
          )}
        </button>
      </div>

      {/* PDF History Table */}
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-teal-700">PDF History</h2>

        <table className="table-auto w-full text-sm border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-2 py-2">Image</th>
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Description</th>
              <th className="px-2 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : pdfs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No PDFs uploaded
                </td>
              </tr>
            ) : (
              pdfs.map((pdf) => (
                <tr key={pdf._id} className="border-b hover:bg-gray-50">
                  <td className="text-center py-2">
                    {pdf.PdfThumbnil ? (
                      <img src={pdf.PdfThumbnil} className="w-12 h-12 object-cover rounded mx-auto" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="text-center">{truncateHTML(pdf.tittle, 5)}</td>
                  <td
                    className="px-2 py-2 text-start"
                    dangerouslySetInnerHTML={{ __html: truncateHTML(pdf.description, 10) }}
                  ></td>
                  <td className="text-center">
                    <button onClick={() => handleDelete(pdf._id)} className="text-red-600 hover:text-red-800">
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

export default AdminBlankPdfUpload;