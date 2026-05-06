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
import LetterWrittingFormatModal from "./LetterWrittingModal";

const AdminLetterWrittingFormat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const [editItem, setEditItem] = useState(null);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Form Setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // ✅ Fetch vocabulary fields
  const {
    data: letterWritingFields = [],
    isLoading: letterWritingFieldsLoading,
  } = useQuery({
    queryKey: ["letterWritingFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/letterWritingField");
      return res.data?.data || [];
    },
  });
  // ✅ Create Letter Writing
  const createMutation = useMutation({
    mutationFn: (newData) =>
      axiosPublic.post("/seven-layer/letterWriting", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["letterWriting"]);
      Swal.fire(
        "✅ Success!",
        "Letter Writing added successfully.",
        "success",
      );
      resetForm();
    },
    onError: () => Swal.fire("❌ Error!", "Failed to add Letter Writing.", "error"),
  });
  // ✅ Get all Letter Writing fetch Data
  const { data: letterWritings = [], isLoading } = useQuery({
    queryKey: ["letterWritings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/letterWriting");
      return res.data || [];
    },
  });
  // ✅ Update Letter Writing
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      axiosPublic.put(`/seven-layer/letterWriting/${id}`, data),
    onSuccess: () => {
      Swal.fire(
        "✅ Updated!",
        "Letter Writing updated successfully.",
        "success",
      );
      queryClient.invalidateQueries(["letterWritings"]);
      resetForm();
      setEditItem(null);
    },
    onError: () =>
      Swal.fire("❌ Error!", "Failed to update Letter Writing.", "error"),
  });

  // ✅ Delete Letter Writing
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/seven-layer/letterWriting/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Letter Writing deleted successfully.", "success");
      } else {
        Swal.fire("Info", "Letter Writing not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["letterWriting"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete Letter Writing.", "error"),
  });

  // ✅ Reset Form
  const resetForm = () => {
    reset({
      name: "",
      description: "",
    });
    setEditItem(null);
  };

  const onSubmit = async (data) => {
    if (editItem) {
      updateMutation.mutate({
        id: editItem._id,
        data,
      });
    } else {
      createMutation.mutate(data);
    }
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
      const res = await axiosPublic.put(
        `/seven-layer/letterWritingField/toggle`,
        {
          fieldName: "isActive",
          currentValue: currentState,
        },
      );
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Letter Writing field is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries(["letterWritingFields"]);
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
  if (letterWritingFieldsLoading || isLoading) {
    return <AdminLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Admin | Create Letter Writing Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Create Letter Writing"
        subtittle="Manage Letter Writings "
      />

      <div className="mt-10 max-w-[1400px] mx-auto">
        <div className=" w-full bg-white shadow-md rounded-xl p-2 md:p-5">
          {/* ✅ Vocabulary Fields Section */}
          <div className="text-center mb-6">
            {letterWritingFields && letterWritingFields.length > 0 && (
              <>
                <div className="flex items-start justify-center gap-2 mb-2">
                  {letterWritingFields[0].title || "Title"}
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "title",
                        letterWritingFields[0].title,
                        letterWritingFields[0]._id,
                      )
                    }
                    className="min-h-5 min-w-5 w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-center gap-2">
                  <span className="text-base text-justify">
                    {letterWritingFields[0].description || "Description"}
                  </span>
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "description",
                        letterWritingFields[0].description,
                        letterWritingFields[0]._id,
                      )
                    }
                    className="w-5 h-5 min-h-5 min-w-5  text-green-600 cursor-pointer"
                  />
                </div>
              </>
            )}

            {letterWritingFields.map((item) => (
              <div key={item._id} className="flex items-start gap-2  mt-3">
                <span className="font-semibold">
                  Toggle {item.title || "Letter Writing Field"}
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

          {/* ✅ Create Letter Writing Form */}
          <div className="w-full  bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Letter Writing Name */}
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
                      placeholder="Enter Your Tittle..."
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
                {isSubmitting
                  ? editItem
                    ? "Updating..."
                    : "Adding..."
                  : editItem
                    ? "Update Letter Writing"
                    : "Add Letter Writing"}
              </button>
            </form>
          </div>

          {/* ✅ letterWriting List */}
          <div className="w-full bg-white shadow-lg rounded-xl border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-700">
              List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm sm:text-base">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Serial</th>
                    <th className="px-4 py-2">Tittle</th>
                    <th className="px-4 py-2">Description</th>
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
                  ) : letterWritings.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No letterWriting found.
                      </td>
                    </tr>
                  ) : (
                    letterWritings.map((item,index) => (
                      <tr key={item._id} className="hover:bg-gray-50 border-b">
                          <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2 text-center">{item.name}</td>
                        <td
                          className="px-4 py-2 text-center"
                          dangerouslySetInnerHTML={{
                            __html: truncateHTML(item.description, 10),
                          }}
                        ></td>
                        <td className="px-4 py-2 text-center flex justify-center gap-3">
                          {/* Edit */}
                          <button
                            onClick={() => {
                              setEditItem(item);
                              reset({
                                name: item.name,
                                description: item.description,
                              });
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-green-600 hover:text-green-800"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>

                          {/* Delete */}
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
        <LetterWrittingFormatModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedVocabId}
        />
      )}
    </>
  );
};

export default AdminLetterWrittingFormat;
