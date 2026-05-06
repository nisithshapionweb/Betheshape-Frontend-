import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const HometextCreate = () => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const [editingId, setEditingId] = useState(null);
  // Store new uploaded files or null to keep existing image
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner");
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/banner", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]);
      Swal.fire("Success!", "Banner created successfully.", "success");
      reset();
      setEditingId(null);
    },
    onError: () => Swal.fire("Error!", "Failed to create banner.", "error"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.put(`/banner/${id}`, data),
    onSuccess: (res) => {
      const modified = res.data.modifiedCount || res.data.acknowledged;
      if (modified) {
        Swal.fire("Updated!", "Banner updated successfully.", "success");
      } else {
        Swal.fire("No Changes", "No changes were made.", "info");
      }
      queryClient.invalidateQueries(["banners"]);
      reset();
      setEditingId(null);
    },
    onError: () => Swal.fire("Error!", "Failed to update banner.", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/banner/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Banner deleted successfully.", "success");
      } else {
        Swal.fire("Failed", "Banner not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["banners"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete banner.", "error"),
  });

  const onSubmit = async (data) => {
    data.status = "inactive";

    if (!editingId) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate({ id: editingId, data });
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setValue("title", banner.title);
    setValue("description", banner.description);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  const handleMakeActive = async (banner) => {
    if (banner.status === "active") {
      Swal.fire("Info", "This banner is already active.", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Make this banner active?",
      text: "Only one banner can be active at a time. This will deactivate other active banners.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make active",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
    });

    if (result.isConfirmed) {
      updateMutation.mutate({ id: banner._id, data: { status: "active" } });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin | Banner</title>
      </Helmet>

      <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-4">
        <div className="w-full max-w-[1400px] bg-white shadow-2xl rounded-xl border p-6">
          <h1 className="text-center text-2xl font-semibold mt-2 my-10 text-teal-600">Create Home text</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Controller
              name="title"
              defaultValue=""
              control={control}
              rules={{
                required: "Title is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 100, message: "Minimum 100 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Enter your title..."
                    className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
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

            <Controller
              name="description"
              defaultValue=""
              control={control}
              rules={{
                required: "Description is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
                maxLength: { value: 2000, message: "Minimum 2000 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Write a short description..."
                    className={`w-full px-4 py-3 border rounded-md resize-none text-gray-700 focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
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
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            >
              {editingId
                ? updateMutation.isLoading
                  ? "Updating..."
                  : "Update Banner"
                : createMutation.isLoading
                ? "Submitting..."
                : "Submit Banner"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-[1400px] bg-white shadow-lg rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4 text-teal-700">
            Text History
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200 min-w-[700px]">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="border border-gray-300 py-2 px-4 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-center">
                    Status
                  </th>
                  <th className="border border-gray-300 py-2 px-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      Loading text...
                    </td>
                  </tr>
                ) : banners.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No Text available.
                    </td>
                  </tr>
                ) : (
                  banners.map((banner) => (
                    <tr
                      key={banner._id}
                      className="text-sm border-t border-gray-200"
                    >
                      <td className="border border-gray-300 py-2 px-4 whitespace-pre-line break-words">
                        {banner.title}
                      </td>
                      <td className="border border-gray-300 py-2 px-4 whitespace-pre-line break-words">
                        {banner.description}
                      </td>
                      <td className="border border-gray-300 py-2 px-4 text-center">
                        {banner.status === "active" ? (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-300 py-2 px-4">
                        <div className="flex justify-center items-center flex-wrap gap-2">
                          <button
                            onClick={() => handleEdit(banner)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(banner._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                          {banner.status !== "active" && (
                            <button
                              onClick={() => handleMakeActive(banner)}
                              className="text-white text-xs px-2 py-1 bg-green-500 hover:bg-green-600 rounded"
                            >
                              Make Active
                            </button>
                          )}
                        </div>
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

export default HometextCreate;
