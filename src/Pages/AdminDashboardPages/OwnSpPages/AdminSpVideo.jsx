import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import RichTextField from "../../../shared/TextEditor/RichTextField";
import MediaUpload from "../../../utils/MediaUpload";

const AdminSpVideo = () => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [resetSignal, setResetSignal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // 🔥 Only important parts changed (UI same রাখা হয়েছে)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      tittle: "",
      description: "",
      youtubeLink: "",
      videoThumbnil: null,
    },
  });

  /* ---------------- FETCH VIDEO LIST ---------------- */
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await fetch("https://api.betheshape.com/own-sp/videos");
      return res.json();
    },
  });

  /* ---------------- UPLOAD ---------------- */
  const uploadMutation = useMutation({
    mutationFn: async (data) => {
      setUploading(true);
      const res = await fetch("https://api.betheshape.com/own-sp/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      setUploading(false);
      queryClient.invalidateQueries(["videos"]);

      reset();
      setResetSignal((prev) => !prev);

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "Video added successfully!",
        confirmButtonColor: "#10b981",
      });
    },
  });

  /* ---------------- DELETE ---------------- */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://api.betheshape.com/own-sp/videos/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      Swal.fire("Deleted", "Video removed", "success");
      queryClient.invalidateQueries(["videos"]);
    },
  });

  /* ---------------- SUBMIT ---------------- */
  const handleUpload = (data) => {
    if (!data.youtubeLink) {
      return setMessage({ text: "YouTube link required", type: "error" });
    }

    uploadMutation.mutate(data);
  };
  const truncateHTML = (html = "", wordLimit = 10) => {
    if (!html || typeof html !== "string") return "";
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).slice(0, wordLimit);
    return (
      words.join(" ") + (text.split(/\s+/).length > wordLimit ? "..." : "")
    );
  };
  return (
    <div className="space-y-10">
      <Helmet>
        <title>Admin | video Upload & Payment Settings</title>
      </Helmet>

      <TittleAnimation
        tittle="video Management"
        subtittle="Upload videos and Configure Payment Methods"
      />

      {/* ================= UPLOAD CARD ================= */}
      <div className="w-full max-w-7xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
        {/* Title Input */}
        <div className="form-control w-full py-6">
          <label className="label">
            <span className="label-text text-base font-medium text-gray-700">
              Title:
            </span>
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

        {/* Description */}
        <div className="w-full">
          <RichTextField
            name="description"
            control={control}
            placeholder="Enter Your Description..."
            className="w-full "
          />
        </div>

        <div className="form-control w-full py-6">
          <label className="label">
            <span className="label-text text-base font-medium text-gray-700">
              Youtube Video Link :
            </span>
          </label>
          <Controller
            name="youtubeLink"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter YouTube video link..."
                className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
              />
            )}
          />
        </div>

        {/* MediaUpload Thumbnail */}
        <MediaUpload
          control={control}
          name="videoThumbnil"
          label="video Thumbnail"
          type="image"
          maxSizeMB={5}
          resetSignal={resetSignal}
        />

        {/* MESSAGE */}
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

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleSubmit(handleUpload)}
          disabled={uploading}
          className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {uploading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
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

      {/* ================= video HISTORY TABLE ================= */}
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4 text-teal-700">
          video History
        </h2>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-2 py-2">Image</th>
                <th className="px-2 py-2">Title</th>
                <th className="px-2 py-2">Description</th>
                <th className="px-2 py-2">Video Link</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : videos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No videos uploaded
                  </td>
                </tr>
              ) : (
                videos.map((video) => (
                  <tr key={video._id} className="border-b hover:bg-gray-50">
                    <td className="text-center py-2">
                      {video.videoThumbnil ? (
                        <img
                          src={video.videoThumbnil}
                          className="w-12 h-12 object-cover rounded mx-auto"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td className="text-center">
                      {truncateHTML(video.tittle, 5)}
                    </td>
                    <td
                      className="px-2 py-2 text-start"
                      dangerouslySetInnerHTML={{
                        __html: truncateHTML(video.description, 10),
                      }}
                    ></td>
                    <td className="text-center">
                      {video.youtubeLink ? (
                        <a
                          href={video.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          title={video.youtubeLink}
                        >
                          🔗 Link
                        </a>
                      ) : (
                        "No Link"
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="text-red-600"
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
    </div>
  );
};

export default AdminSpVideo;
