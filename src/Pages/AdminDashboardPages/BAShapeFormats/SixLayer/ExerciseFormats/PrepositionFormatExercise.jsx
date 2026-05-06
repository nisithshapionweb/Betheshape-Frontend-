import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import CustomLoading from "../../../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const PrepositionFormatExercise = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);

  // 🔹 GET exercise Preposition (grouped by user submission)
  const {
    data: exercises = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exercise-Preposition"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/six-layer/getAllExercisePreposition",
      );
      return res.data.data || [];
    },
  });

  // 🔹 DELETE exercise (delete one submission = one user block)
  const { mutateAsync: deleteExercise } = useMutation({
    mutationFn: async (id) =>
      axiosPublic.delete(`/six-layer/deleteExercisePreposition/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Exercise deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["exercise-Preposition"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Delete failed",
        "error",
      );
    },
  });

  const visibleExercises = showAll ? exercises : exercises.slice(0, 10);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user’s exercise set will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteExercise(id);
    });
  };

  if (isLoading) return <CustomLoading />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load exercise Preposition
      </p>
    );

  // ✅ Reusable Cell Component (same as yours)
  const Cell = ({ text }) => (
    <div
      className="
        w-72 md:w-96 h-40
        border border-gray-300 rounded-lg
        p-3 text-sm bg-white
        overflow-y-auto overflow-x-hidden
        text-justify whitespace-pre-wrap break-words
        shadow-sm
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
      "
    >
      {text || ""}
    </div>
  );

  return (
    <div className="space-y-10">
      {visibleExercises.length > 0 ? (
        visibleExercises.map((exercise, exIndex) => (
          <div
            key={exercise._id || exIndex}
            className="overflow-x-auto rounded-xl shadow border border-gray-200"
          >
            <div className="max-h-[900px] w-[380px] md:w-[900px] lg:w-[1600px] overflow-y-auto">
              {/* ✅ User Info (SAME STYLE as you wanted) */}
              <div className="text-center py-4 bg-gray-50 border-b  gap-2 px-4">
                <div>
                  <h1 className="font-semibold text-lg">User Info</h1>
                  <p>Name: {exercise.user?.name || "N/A"}</p>
                  <p>Email: {exercise.user?.email || "N/A"}</p>
                </div>
              </div>

              {/* ✅ Table */}
              <table className="table w-full border-collapse">
                <thead className="bg-teal-600 text-white text-sm sticky top-0 z-10">
                  <tr>
                    <th>Serial</th>
                    <th className="w-72 md:w-96">Main Word</th>
                    <th className="w-72 md:w-96">Main Word 2</th>
                    <th className="w-72 md:w-96">Main Word 3</th>
                    <th className="w-72 md:w-96">Bangla Pronunciation</th>
                    <th className="w-72 md:w-96">Bangla Pronunciation 2</th>
                    <th className="w-72 md:w-96">Bangla Pronunciation 3</th>
                    <th className="w-72 md:w-96">Bangla Meaning</th>
                    <th className="w-72 md:w-96">Bangla Meaning 2</th>
                    <th className="w-72 md:w-96">Bangla Meaning 3</th>
                    <th className="w-72 md:w-96">Synonyms</th>
                    <th className="w-72 md:w-96">Synonyms 2</th>
                    <th className="w-72 md:w-96">Synonyms 3</th>
                    <th className="w-72 md:w-96">Antonyms</th>
                    <th className="w-72 md:w-96">Antonyms 2</th>
                    <th className="w-72 md:w-96">Antonyms 3</th>
                    <th className="w-72 md:w-96">Example English</th>
                    <th className="w-72 md:w-96">Example English 2</th>
                    <th className="w-72 md:w-96">Example English 3</th>
                    <th className="w-72 md:w-96">Example Bangla</th>
                    <th className="w-72 md:w-96">Example Bangla 2</th>
                    <th className="w-72 md:w-96">Example Bangla 3</th>
                    <th className="w-72 md:w-96">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {exercise.rows?.length > 0 ? (
                    <tr className="hover:bg-gray-50 transition border-b text-sm align-top">
                      <td className="font-semibold">1</td> {/* Serial */}
                      {/* Main Words */}
                      <td>
                        <Cell text={exercise.rows[0]?.mainWord} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[1]?.mainWord} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[2]?.mainWord} />
                      </td>
                      {/* Bangla Pronunciation */}
                      <td>
                        <Cell text={exercise.rows[0]?.banglaPronunciation} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[1]?.banglaPronunciation} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[2]?.banglaPronunciation} />
                      </td>
                      {/* Bangla Meaning */}
                      <td>
                        <Cell text={exercise.rows[0]?.banglaMeaning} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[1]?.banglaMeaning} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[2]?.banglaMeaning} />
                      </td>
                      {/* Synonyms */}
                      <td>
                        <Cell text={exercise.rows[0]?.synonyms} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[1]?.synonyms} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[2]?.synonyms} />
                      </td>
                      {/* Antonyms */}
                      <td>
                        <Cell text={exercise.rows[0]?.antonyms} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[1]?.antonyms} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[2]?.antonyms} />
                      </td>
                      {/* Example English */}
                      <td>
                        <Cell text={exercise.rows[0]?.exampleEnglish} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[1]?.exampleEnglish} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[2]?.exampleEnglish} />
                      </td>
                      {/* Example Bangla */}
                      <td>
                        <Cell text={exercise.rows[0]?.exampleBangla} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[1]?.exampleBangla} />
                      </td>
                      <td>
                        <Cell text={exercise.rows[2]?.exampleBangla} />
                      </td>
                      {/* Delete Button */}
                      <td>
                        <button
                          onClick={() => handleDelete(exercise._id)}
                          className="
            flex items-center justify-center
            w-10 h-10
            bg-red-50 text-red-600
            rounded-full
            hover:bg-red-600 hover:text-white
            transition
          "
                          title="Delete this exercise"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td
                        colSpan="23"
                        className="text-center py-6 text-gray-500"
                      >
                        No Preposition found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-10 text-gray-500">No Preposition found.</p>
      )}

      {exercises?.length > 10 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PrepositionFormatExercise;
