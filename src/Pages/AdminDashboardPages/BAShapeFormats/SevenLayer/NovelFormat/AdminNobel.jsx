
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AdminLoading from "../../../../../components/Loading/AdminLoading";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import RichTextField from "../../../../../shared/TextEditor/RichTextField";
import MediaUpload from "../../../../../utils/MediaUpload";

import EditNobelFormatModal from "./EditNobelModal";
import NobelFormatModal from "./NobelFormatModal";

const AdminNobelFormat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      axiosPublic.put(`/seven-layer/goodNobel/${id}`, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Good Nobel updated successfully", "success");
      queryClient.invalidateQueries(["goodNobel"]);
    },
    onError: () => Swal.fire("Error!", "Failed to update Good Nobel", "error"),
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
      link: "",
    },
  });

  // ✅ Fetch vocabulary fields
  const { data: goodNobelField = [], isLoading: developLoading } = useQuery({
    queryKey: ["goodNobelField"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/goodNobelField");
      return res.data?.data || [];
    },
  });
  // ✅ Create Song
  const createMutation = useMutation({
    mutationFn: (newData) =>
      axiosPublic.post("/seven-layer/goodNobel", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["goodNobel"]);
      Swal.fire(
        "✅ Success!",
        "Good Nobel  added successfully.",
        "success",
      );
      resetForm();
    },
    onError: () => Swal.fire("❌ Error!", "Failed to add Good Nobel.", "error"),
  });
  // ✅ Get all song fetch Data
  const { data: goodNobel = [], isLoading } = useQuery({
    queryKey: ["goodNobel"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/goodNobel");
      return res.data || [];
    },
  });

  // ✅ Delete Song
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/seven-layer/goodNobel/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Good Nobel  deleted successfully.", "success");
      } else {
        Swal.fire("Info", "Good Nobel not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["goodNobel"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete song.", "error"),
  });

  // ✅ Reset Form
  const resetForm = () => {
    reset({
      name: "",
      ideaShareImage: "",
      description: "",
      link: "",
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

  // ✅ Modal Edit Handler
  const handleEditClick = (field, value, id) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedVocabId(id);
    setModalOpen(true);
  };

  // ✅ Toggle Handler
  const toggleIsActiveMutation = useMutation({
    mutationFn: async (currentState) => {
      const res = await axiosPublic.put(`/seven-layer/goodNobelField/toggle`, {
        fieldName: "isActive",
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Good Nobel field is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries(["goodNobelField"]);
    },
    onError: (error) =>
      Swal.fire(
        "Error!",
        error.response?.data?.message || error.message,
        "error",
      ),
  });

  const handleToggle = (currentState) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to turn ${
        currentState === "ON" ? "OFF" : "ON"
      } this field?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleIsActiveMutation.mutate(currentState);
      }
    });
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
  if (isLoading || developLoading) {
    return <AdminLoading />;
  }
  return (
    <>
      <Helmet>
        <title>Admin | Create Good Nobel Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Create Good Nobel "
        subtittle="Manage Good Nobel Fields"
      />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className=" w-full bg-white shadow-md rounded-lg p-2 md:p-5">
          <div className="text-center mb-6">
            {goodNobelField && goodNobelField.length > 0 && (
              <>
                <div className="flex items-start justify-center gap-2 mb-2">
                  {goodNobelField[0].title || "Title"}
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "title",
                        goodNobelField[0].title,
                        goodNobelField[0]._id,
                      )
                    }
                    className="min-h-5 min-w-5 w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-center gap-2">
                  <span className="text-base text-justify">
                    {goodNobelField[0].description || "Description"}
                  </span>
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "description",
                        goodNobelField[0].description,
                        goodNobelField[0]._id,
                      )
                    }
                    className="w-5 h-5 min-h-5 min-w-5  text-green-600 cursor-pointer"
                  />
                </div>
              </>
            )}

            {goodNobelField.map((item) => (
              <div key={item._id} className="flex items-start gap-2  mt-3">
                <span className="font-semibold">
                  Toggle {item.title || "Develop Your Skills Field"}
                </span>
                <input
                  type="checkbox"
                  className={`toggle ${
                    item.isActive === "ON" ? "toggle-success" : ""
                  }`}
                  checked={item.isActive === "ON"}
                  onChange={() => handleToggle(item.isActive)}
                />
              </div>
            ))}
          </div>

          {/* ✅ Create Song Form */}
          <div className="w-full  bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Song Name */}
              <div className="form-control w-full py-6">
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
                  label="goodNobel Image (Optional)"
                  type="image"
                  maxSizeMB={5}
                  resetSignal={resetSignal}
                />
              </div>
              <div className="form-control w-full py-6">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Link (Optional):
                  </span>
                </label>
                <Controller
                  name="link"
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
                {isSubmitting ? "Adding..." : "Add goodNobel "}
              </button>
            </form>
          </div>

          {/* ✅ Songs List */}
          <div className=" bg-white shadow-lg rounded-xl border p-4 sm:p-6 w-[450px] md:w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-700">
              List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm sm:text-base">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Link</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : goodNobel.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No Good Nobel found.
                      </td>
                    </tr>
                  ) : (
                    goodNobel.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 border-b">
                        <td className="px-4 py-2 text-center">
                          {item.ideaShareImage ? (
                            <img
                              src={item.ideaShareImage}
                              alt="goodNobel"
                              className="w-12 h-12 object-cover rounded-md mx-auto"
                            />
                          ) : (
                            <span className="text-gray-400 italic">
                              No Image
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-2 text-start">{item.name}</td>
                        <td
                          className="px-4 py-2 text-start"
                          dangerouslySetInnerHTML={{
                            __html: truncateHTML(item.description, 10),
                          }}
                        ></td>
                        <td className="px-4 py-2 text-start">{item.link}</td>
                        <td className="px-4 py-2 text-center flex gap-3 justify-center mt-2">
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

      {/* ✅ Modal */}
      {modalOpen && (
        <NobelFormatModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedVocabId}
        />
      )}
      {editOpen && selectedIdea && (
        <EditNobelFormatModal
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

export default AdminNobelFormat;
