import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

import AdminLoading from "../../../components/Loading/AdminLoading";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RichTextField from "../../../shared/TextEditor/RichTextField";
import MediaUpload from "../../../utils/MediaUpload";
import AdminSpOthersEdit from "./AdminSpOthersEdit";

const AdminSpOthers = () => {
  const [resetSignal, setResetSignal] = useState(0);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.put(`/own-sp/others/${id}`, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Own Sp Other updated successfully", "success");
      queryClient.invalidateQueries(["OwnSpOther"]);
    },
    onError: () => Swal.fire("Error!", "Failed to update Other", "error"),
  });

  const handleEdit = (idea) => {
    setSelectedIdea(idea);
    setEditOpen(true);
  };

  // ✅ Form Setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      ideaShareImage: "",
      description: "",
      countryName:"",
      websitelink: "",
      extraWebsitelink: "",
      videolink: "",
    },
  });

  // ✅ Create Song
  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/own-sp/others", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["OwnSpOther"]);
      Swal.fire("✅ Success!", "Own Sp Other  added successfully.", "success");
      resetForm();
    },
    onError: () => Swal.fire("❌ Error!", "Failed to add song.", "error"),
  });
  // ✅ Get all song fetch Data
  const { data: Others = [], isLoading } = useQuery({
    queryKey: ["OwnSpOther"],
    queryFn: async () => {
      const res = await axiosPublic.get("/own-sp/others");
      return res.data || [];
    },
  });

  // ✅ Delete Song
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/own-sp/others/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Own Sp Other  deleted successfully.", "success");
      } else {
        Swal.fire("Info", "Own Sp Other not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["OwnSpOther"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete song.", "error"),
  });

  // ✅ Reset Form
  const resetForm = () => {
    reset({
      name: "",
      ideaShareImage: "",
      description: "",
      websitelink: "",
      countryName:"",
      extraWebsitelink: "",
      videolink: "",
    });
    setResetSignal((prev) => prev + 1);
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    createMutation.mutate(data);
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

  // ✅ Safe truncate function
  const truncateHTML = (html = "", wordLimit = 10) => {
    if (!html || typeof html !== "string") return "";
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).slice(0, wordLimit);
    return (
      words.join(" ") + (text.split(/\s+/).length > wordLimit ? "..." : "")
    );
  };
  if (isLoading) {
    return <AdminLoading />;
  }
  return (
    <>
      <Helmet>
        <title>Admin | Own Sp Other Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Own Sp Other "
        subtittle="Manage Own Sp Other and Suggestion Fields"
      />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className=" w-full bg-white shadow-md rounded-lg p-2 md:p-5">
          {/* ✅ Create Song Form */}
          <div className="w-full  bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Song Name */}
              <div className="form-control w-full py-3">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Tittle:
                  </span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter tittle..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>
              <div>
                <MediaUpload
                  control={control}
                  name="ideaShareImage"
                  label="Logo"
                  type="image"
                  maxSizeMB={5}
                  resetSignal={resetSignal}
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Website Link :
                  </span>
                </label>
                <Controller
                  name="websitelink"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter tittle..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>
                <div className="form-control w-full py-3">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Country Name:
                  </span>
                </label>
                <Controller
                  name="countryName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter Country Name..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Extra Website Link (Optional) :
                  </span>
                </label>
                <Controller
                  name="extraWebsitelink"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter tittle..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Tutorial Link :
                  </span>
                </label>
                <Controller
                  name="videolink"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter tittle..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <RichTextField
                  name="description"
                  control={control}
                  placeholder="Enter Your Description..."
                  className="w-full " // ensure editor is full width
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Other "}
              </button>
            </form>
          </div>

          {/* ✅ Songs List */}
          <div className=" bg-white shadow-lg rounded-xl border p-4  w-[350px] md:w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-700">
              List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm sm:text-base">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-2 py-2">Image</th>
                    <th className="px-2 py-2">Name</th>
                    <th className="px-2 py-2">Description</th>
                    <th className="px-2 py-2">Website Link</th>
                      <th className="px-2 py-2">Country Name</th>
                    <th className="px-2 py-2">Extra Website Link</th>
                    <th className="px-2 py-2">Video Link</th>
                    <th className="px-2 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : Others.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No Other found.
                      </td>
                    </tr>
                  ) : (
                    Others.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 border-b">
                        <td className="px-2 py-2 text-center">
                          {item.ideaShareImage ? (
                            <img
                              src={item.ideaShareImage}
                              alt="Other"
                              className="w-12 h-12 object-cover rounded-md mx-auto"
                            />
                          ) : (
                            <span className="text-gray-400 italic">
                              No Image
                            </span>
                          )}
                        </td>

                        <td className="px-2 py-2 text-start">{item.name}</td>
                        <td
                          className="px-2 py-2 text-start"
                          dangerouslySetInnerHTML={{
                            __html: truncateHTML(item.description, 10),
                          }}
                        ></td>
                        <td className="px-2 py-2 text-start">
                          {item.websitelink}
                        </td>
                        <td className="px-2 py-2 text-start">
                          {item.countryName}
                        </td>
                        <td className="px-2 py-2 text-start">
                          {item.extraWebsitelink}
                        </td>
                        <td className="px-2 py-2 text-start">
                          {item.videolink}
                        </td>
                        <td className="px-2 py-2 text-center flex gap-3 justify-center mt-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-green-600 hover:text-green-800"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800"
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
      {editOpen && selectedIdea && (
        <AdminSpOthersEdit
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          idea={selectedIdea}
          onUpdate={(data) =>
            updateMutation.mutate({
              id: selectedIdea._id,
              data,
            })
          }
        />
      )}
    </>
  );
};

export default AdminSpOthers;
