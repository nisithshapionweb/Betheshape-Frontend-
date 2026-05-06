import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import MediaUpload from "../../../utils/MediaUpload";


const SuccessVideoStorie = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      tittle: "",
      video: null,
      status: "inactive",
    },
  });

  const [resetSignal, setResetSignal] = useState(0);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Get Data
  const { data: banner = [], isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner/stories");
      return res.data;
    },
  });

  // ✅ Create
  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/banner/stories", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["banner"]);
      Swal.fire("Success!", "Entry added successfully.", "success");
      resetForm();
    },
    onError: () => Swal.fire("Error!", "Failed to add entry.", "error"),
  });

  // ✅ Delete
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/banner/stories/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Entry deleted successfully.", "success");
      } else {
        Swal.fire("Info", "Entry not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["banner"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete entry.", "error"),
  });

  // ✅ Reset Form
  const resetForm = () => {
    reset({
      tittle: "",
      video: null,
      status: "inactive",
    });
    setResetSignal((prev) => prev + 1);
  };

  // ✅ Delete Handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) deleteMutation.mutate(id);
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    if (banner.length >= 5) {
      Swal.fire("Not Allowed", "You can't add more than 5 Video.", "warning");
      return;
    }

    const videoUrl = typeof data.video === "string" ? data.video : "";

    if (!videoUrl) {
      Swal.fire("Error!", "Please upload a video.", "error");
      return;
    }

    const finalData = {
      tittle: data.tittle,
      video: videoUrl,
      status: data.status || "inactive",
    };

    createMutation.mutate(finalData);
  };

  const isSubmitting = createMutation.isLoading;

  return (
    <div>
      <Helmet>
        <title>Admin | Our Success Stories</title>
      </Helmet>

      <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-3 sm:px-4">
        {/* Form Section */}
        <div className="w-full max-w-[1400px] bg-white shadow-2xl rounded-xl border p-4 sm:p-6">
          <h1 className="text-center text-xl sm:text-2xl font-semibold mt-2 mb-6 text-orange-600">
            Add Our Success Stories
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Video Upload */}
            <MediaUpload
              control={control}
              name="video"
              label="Video Upload"
              type="video"
              maxSizeMB={50}
              resetSignal={resetSignal}
            />

            {/* Title */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base font-medium text-gray-700">
                  Title :
                </span>
              </label>
              <Controller
                name="tittle"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <input
                      {...field}
                      placeholder="Enter title..."
                      className={`w-full px-3 sm:px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
                        fieldState.error
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-orange-300"
                      }`}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-600 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Adding...</span>
                </div>
              ) : (
                <span className="font-semibold text-base tracking-wider">
                  Add Stories
                </span>
              )}
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="w-full max-w-[1400px] bg-white shadow-lg rounded-xl border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-700">
            Stories List
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm sm:text-base">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-2 sm:px-4 py-2">Video</th>
                  <th className="px-2 sm:px-4 py-2">Title</th>
                  <th className="px-2 sm:px-4 py-2">Status</th>
                  <th className="px-2 sm:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : banner.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No entries found.
                    </td>
                  </tr>
                ) : (
                  banner.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition border-b"
                    >
                      <td className="px-2 sm:px-4 py-2 text-center">
                        {item.video ? (
                          <video
                            src={item.video}
                            controls
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded mx-auto"
                          />
                        ) : (
                          "No Video"
                        )}
                      </td>
                      <td className="px-2 sm:px-4 py-2">{item.tittle}</td>
                      <td className="px-2 sm:px-4 py-2 text-center">
                        <span className="font-semibold  text-green-600">
                          Active
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600"
                          title="Delete"
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
    </div>
  );
};

export default SuccessVideoStorie;
