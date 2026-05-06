import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import MCQFormatModal from "./MCQFormatModal";

const AdminmcqFormat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Form Setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: "",
    },
  });

  // ✅ Fetch vocabulary fields
  const { data: mcqFields = [] } = useQuery({
    queryKey: ["mcqFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/mcqField");
   
      return res.data?.data || [];
    },
  });

  // ✅ Create Song
  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/seven-layer/mcq", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["songs"]);
      Swal.fire(
        "✅ Success!",
        "Good Life Style added successfully.",
        "success"
      );
      resetForm();
    },
    onError: () => Swal.fire("❌ Error!", "Failed to add song.", "error"),
  });
  // ✅ Get all song fetch Data
  const { data: mcqs = [], isLoading } = useQuery({
    queryKey: ["mcqs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/mcq");
      return res.data || [];
    },
  });


  // ✅ Delete Song
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/seven-layer/mcq/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Mcq deleted successfully.", "success");
      } else {
        Swal.fire("Info", "Mcq not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["songs"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete song.", "error"),
  });

  // ✅ Reset Form
  const resetForm = () => {
    reset({
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: "",
    });
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    // if (!imageUrl) {
    //   Swal.fire("Error!", "Please upload a song image.", "error");
    //   return;
    // }

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
      const res = await axiosPublic.put(`/seven-layer/mcqField/toggle`, {
        fieldName: "isActive",
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Song field is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries(["mcqFields"]);
    },
    onError: (error) =>
      Swal.fire(
        "Error!",
        error.response?.data?.message || error.message,
        "error"
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

  return (
    < >
      <Helmet>
        <title>Admin | Create MCQ Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Create MCQ"
        subtittle="Manage MCQ  Fields"
      />

      <div className="mt-10 max-w-[1400px] mx-auto">
        <div className=" w-full bg-white shadow-md rounded-lg p-2 md:p-5">
          {/* ✅ Vocabulary Fields Section */}
          <div className="text-center mb-6">
            {mcqFields && mcqFields.length > 0 && (
              <>
                <div className="flex items-start justify-center gap-2 mb-2">
                  {mcqFields[0].title || "Title"}
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "title",
                        mcqFields[0].title,
                        mcqFields[0]._id
                      )
                    }
                    className="w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-center text-justify gap-2">
                  <span className="text-base">
                    {mcqFields[0].description || "Description"}
                  </span>
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "description",
                        mcqFields[0].description,
                        mcqFields[0]._id
                      )
                    }
                    className="min-w-5 min-h-5 w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>
              </>
            )}

            {mcqFields.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-2 justify-start mt-3"
              >
                <span className="font-semibold">
                  Toggle {item.title || "Song Field"}
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
          <div className="w-full bg-white shadow-xl rounded-2xl border border-gray-200 p-6 sm:p-8 mb-10 transition-all duration-300 ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* ✅ MCQ Question (Required) */}
              <div className="form-control w-full">
                <label className="block text-gray-800 font-semibold mb-2 text-base">
                  MCQ Question <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="question"
                  control={control}
                  rules={{ required: "Question is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter your question..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                    />
                  )}
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.question.message}
                  </p>
                )}
              </div>

              {/* ✅ Answers Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Answer 1 (required) */}
                <div className="form-control w-full">
                  <label className="block text-gray-800 font-semibold mb-2 text-base">
                    Answer 1 <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="answer1"
                    control={control}
                    rules={{ required: "Answer 1 is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Enter answer 1..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                      />
                    )}
                  />
                  {errors.answer1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.answer1.message}
                    </p>
                  )}
                </div>

                {/* Answer 2 (required) */}
                <div className="form-control w-full">
                  <label className="block text-gray-800 font-semibold mb-2 text-base">
                    Answer 2 <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="answer2"
                    control={control}
                    rules={{ required: "Answer 2 is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Enter answer 2..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                      />
                    )}
                  />
                  {errors.answer2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.answer2.message}
                    </p>
                  )}
                </div>

                {/* Answer 3 (optional) */}
                <div className="form-control w-full">
                  <label className="block text-gray-800 font-semibold mb-2 text-base">
                    Answer 3 (optional)
                  </label>
                  <Controller
                    name="answer3"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Enter answer 3..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                      />
                    )}
                  />
                </div>

                {/* Answer 4 (optional) */}
                <div className="form-control w-full">
                  <label className="block text-gray-800 font-semibold mb-2 text-base">
                    Answer 4 (optional)
                  </label>
                  <Controller
                    name="answer4"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Enter answer 4..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                      />
                    )}
                  />
                </div>
              </div>

              {/* ✅ Correct Answer */}
              <div className="form-control w-full">
                <label className="block text-gray-800 font-semibold mb-2 text-base">
                  Correct Answer <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="correctAnswer"
                  control={control}
                  rules={{ required: "Correct answer is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter the correct answer..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                    />
                  )}
                />
                {errors.correctAnswer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.correctAnswer.message}
                  </p>
                )}
              </div>

              {/* ✅ Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding..." : "Add MCQ"}
                </button>
              </div>
            </form>
          </div>

          {/* ✅ Songs List */}
          <div className="w-full bg-white shadow-lg rounded-xl border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-700">
             MCQ List
            </h2>

            <div className="overflow-x-auto w-[420px] md:w-full">
              <table className="table-auto w-full text-sm sm:text-base">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-2">MCQ Qustion</th>
                    <th className="px-4 py-2">Answer 1</th>
                    <th className="px-4 py-2">Answer 2</th>
                    <th className="px-4 py-2">Answer 3</th>
                    <th className="px-4 py-2">Answer 4</th>
                    <th className="px-4 py-2">Correct Answer</th>
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
                  ) : mcqs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No MCQ found.
                      </td>
                    </tr>
                  ) : (
                    mcqs.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 border-b">
                        <td className="px-4 py-2 text-center">
                          {item.question}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.answer1}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.answer2}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.answer3}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.answer4}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.correctAnswer}
                        </td>
                        <td className="px-4 py-2 text-center">
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
        <MCQFormatModal
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

export default AdminmcqFormat;
