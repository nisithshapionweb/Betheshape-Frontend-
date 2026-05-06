import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

import CustomLoading from "../../../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const BeforeProfessionalFormatExcersice = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);

  // 🔹 GET all Before Professional Exercises
  const {
    data: exercises = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exercise-before-professional"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/six-layer/getAllExerciseBeforeProfessional"
      );
      return res.data?.data || [];
    },
  });

  // 🔹 DELETE exercise
  const { mutate: deleteExercise } = useMutation({
    mutationFn: (id) =>
      axiosPublic.delete(
        `/six-layer/deleteExerciseBeforeProfessional/${id}`
      ),
    onSuccess: () => {
      Swal.fire(
        "Deleted!",
        "Before Professional exercise deleted successfully",
        "success"
      );
      queryClient.invalidateQueries({
        queryKey: ["exercise-before-professional"],
      });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Delete failed",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Before Professional exercise will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExercise(id);
      }
    });
  };

  const visibleExercises = showAll
    ? exercises
    : exercises.slice(0, 10);

  if (isLoading) return <CustomLoading />;

  if (isError) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load Before Professional exercises
      </p>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
          {/* 🔹 No Data State */}
      {!isLoading && exercises.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <button
            disabled
            className="px-6 py-3 rounded-full border border-dashed border-teal-400
                 text-teal-600 font-semibold bg-teal-50 cursor-not-allowed
                 hover:bg-teal-50 flex items-center gap-2"
          >
            🚫 No Before Professional Exercise Found
          </button>
        </div>
      )}
      {visibleExercises.map((exercise) => (
        <div
          key={exercise._id}
          className="bg-white rounded-lg shadow border"
        >
          {/* 🔹 User Info + Delete */}
          <div className="flex justify-between items-center bg-gray-50 border-b px-4 py-3">
            <div>
              <h2 className="font-semibold text-lg">User Info</h2>
              <p className="text-sm">
                Name: {exercise.userInfo?.name || "N/A"}
              </p>
              <p className="text-sm">
                Email: {exercise.userInfo?.email || "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                Role: {exercise.userInfo?.role}
              </p>
            </div>

            <button
              onClick={() => handleDelete(exercise._id)}
              className="text-red-600 hover:bg-red-100 p-2 rounded-full"
              title="Delete Exercise"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* 🔹 Exercise Content */}
          <section className="px-4 py-6 space-y-4">
            <h3 className="font-semibold text-2xl text-teal-600">
              {exercise.name}
            </h3>

            {/* HTML description render */}
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: exercise.description,
              }}
            />

            <p className="text-xs text-gray-400 pt-4">
              Submitted on:{" "}
              {new Date(exercise.createdAt).toLocaleString()}
            </p>
          </section>
        </div>
      ))}

      {/* 🔹 Show more / less */}
      {exercises.length > 10 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-outline btn-sm"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BeforeProfessionalFormatExcersice;
