import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

import CustomLoading from "../../../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const GoodSongExercise = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);

  // 🔹 GET all Idea Share Exercises
  const {
    data: exercises = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exercise-idea-share"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/fourth-layer/getAllExerciseGoodSong",
      );
      return res.data?.data || [];
    },
  });

  // 🔹 DELETE exercise
  const { mutate: deleteExercise } = useMutation({
    mutationFn: (id) =>
      axiosPublic.delete(`/fourth-layer/deleteExerciseGoodSong/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Exercise deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["exercise-idea-share"],
      });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Delete failed",
        "error",
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This exercise will be permanently deleted!",
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

  const visibleExercises = showAll ? exercises : exercises.slice(0, 10);

  if (isLoading) return <CustomLoading />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <p className="text-center text-red-600 text-lg font-semibold">
          Failed to load exercises
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* 🔹 No Data State */}
      {exercises.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <button
            disabled
            className="px-6 py-3 rounded-full border border-dashed border-teal-400
                 text-teal-600 font-semibold bg-teal-50 cursor-not-allowed
                 flex items-center gap-2"
          >
            🚫 No Exercise Found
          </button>
        </div>
      )}

      {visibleExercises.map((exercise) => (
        <div key={exercise._id} className="bg-white rounded-lg shadow border">
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
                Role: {exercise.userInfo?.role || "N/A"}
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
            <div className="group relative bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300">
              {/* Image */}
              {exercise.ideaShareImage && (
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={exercise.ideaShareImage}
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-teal-700">
                  {exercise.name}
                </h2>

                {/* Description */}
                <div
                  className="text-gray-700 text-sm leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: exercise.description }}
                ></div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t mt-3">
                  {exercise.link ? (
                    <a
                      href={exercise.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
                    >
                      🔗 Visit Link
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">No link</span>
                  )}

                  <p className="text-xs text-gray-500">
                    {new Date(exercise.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 pt-2">
              Submitted on: {new Date(exercise.createdAt).toLocaleString()}
            </p>
          </section>
        </div>
      ))}

      {/* 🔹 Show more / less */}
      {exercises.length > 10 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GoodSongExercise;
