
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminLoading from "../../../../../components/Loading/AdminLoading";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import RichTextField from "../../../../../shared/TextEditor/RichTextField";
import VerbModal from "./VerbModal";

const AdminVerb = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue,control } = useForm({
    defaultValues: {
      mainWord: "",
      banglaPronunciation: "",
      banglaMeaning: "",
      synonyms: "",
      antonyms: "",
      exampleEnglish: "",
      exampleBangla: "",
    },
  });

  // Fetch all verb Fields
  const {
    data: verbFields = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["verbFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/second-layer/verbField");
      return res.data.data;
    },
  });

  // Create verb
  const { mutateAsync: createverb } = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post("/second-layer/verb", newData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "verb created successfully!", "success");
      reset();
      queryClient.invalidateQueries({ queryKey: ["verb"] });
    },
    onError: (error) => {
      Swal.fire("❌ Error", error.message || "Failed to create verb", "error");
    },
  });
  // Fetch all verb
  const {
    data: verb = [],
    isLoading: verbLoading,
    refetch: refetchverb,
    isError: verbError,
  } = useQuery({
    queryKey: ["verb"],
    queryFn: async () => {
      const res = await axiosPublic.get("/second-layer/verb");
      return res.data.data || [];
    },
  });

  // delete verb
  const { mutateAsync: deleteverb } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/second-layer/verb/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "verb has been deleted.", "success");
      refetchverb(); // Refetch the list after deletion
    },
    onError: (error) => {
      Swal.fire("Error!", "Failed to delete verb.", "error");
      console.error(error);
    },
  });

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this verb?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteverb(id);
      }
    });
  };
  const [showAll, setShowAll] = useState(false);
  // Toggle show all rows
  const visibleverb = showAll ? verb : verb.slice(0, 10);
  // form submit
  const onSubmit = async (data) => {
    createverb(data);
  };

  // modal open
  const handleEditClick = (field, value, id) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedVocabId(id);
    setModalOpen(true);
  };

  // edit handler
  const handleEdit = (id) => {
    const role = user?.role;

    switch (role) {
      case "admin":
        navigate(`/admin-dashboard/edit-verb/${id}`);
        break;

      case "moderator":
        navigate(`/moderator-dashboard/edit-verb/${id}`);
        break;

      default:
        navigate("/login");
    }
  };

  // Toggle handler using item.isActive
  const handleToggle = (currentState) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to turn ${
        currentState === "ON" ? "OFF" : "ON"
      } this verb?`,
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

  // Toggle mutation using item.isActive
  const toggleIsActiveMutation = useMutation({
    mutationFn: async (currentState) => {
      const res = await axiosPublic.put(`/second-layer/verbField/toggle`, {
        fieldName: "isActive", // ✅ এটা দিতে হবে
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `verb is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries({ queryKey: ["verbFields"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || error.message,
        "error"
      );
    },
  });
  if (isLoading || verbLoading) {
    return <AdminLoading />;
  }
  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Quiz | verb</title>
      </Helmet>
      <TittleAnimation
        tittle="Create verb"
        subtittle="Create With admin or Moderator"
      />

      <div className="mt-10">
        <div className="card bg-white shadow-md rounded-2xl p-3 md:p-5">
          <div className="w-full">
            <div className=" space-y-4">
              <div className="mb-4 text-center">
                {verbFields && verbFields.length > 0 && (
                  <>
                    {/* Title */}
                    <div className="flex items-start justify-center gap-2 mb-2">
                      {verbFields[0].title || "Title"}
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "title",
                            verbFields[0].title,
                            verbFields[0].title
                          )
                        }
                        className="min-w-5 min-h-5 w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>

                    {/* description */}
                    <div className="flex items-start justify-center gap-2">
                      <span className="text-base text-justify">
                        {verbFields[0].description || "description"}
                      </span>
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "description",
                            verbFields[0].description,
                            verbFields[0].description
                          )
                        }
                        className="min-w-5 min-h-5 w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                {verbFields.map((item) => (
                  <div key={item._id} className="flex items-center gap-2 my-2">
                    <span className="font-semibold">
                      Create {item.title || "verb"} Exercise
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
              <form onSubmit={handleSubmit(onSubmit)}>
                {verbFields?.map((item) => (
                  <div key={item._id} className="space-y-4 p-2">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 ">
                      <div className="flex items-center justify-start gap-5 mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.mainWord || "Main-Word"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "mainWord",
                              item.mainWord,
                              item.mainWord
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RichTextField
                          name="mainWord"
                          control={control}
                          placeholder={`Enter Your ${item.mainWord}`}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start gap-5 mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.banglaPronunciation || "Bangla-Pronunciation"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "banglaPronunciation",
                              item.banglaPronunciation,
                              item.banglaPronunciation
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RichTextField
                          name="banglaPronunciation"
                          control={control}
                          placeholder={`Enter Your ${item.banglaPronunciation}`}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start gap-5 mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.banglaMeaning || "Bangla-Meaning"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "banglaMeaning",
                              item.banglaMeaning,
                              item.banglaMeaning
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RichTextField
                          name="banglaMeaning"
                          control={control}
                          placeholder={`Enter Your ${item.banglaMeaning}`}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start gap-5 mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.synonyms || "Synonyms"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "synonyms",
                              item.synonyms,
                              item.synonyms
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RichTextField
                          name="synonyms"
                          control={control}
                          placeholder={`Enter Your ${item.synonyms}`}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start gap-5 mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.antonyms || "Antonyms"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "antonyms",
                              item.antonyms,
                              item.antonyms
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RichTextField
                          name="antonyms"
                          control={control}
                          placeholder={`Enter Your ${item.antonyms}`}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start gap-5 mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.exampleEnglish || "Example (English)"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "exampleEnglish",
                              item.exampleEnglish,
                              item.exampleEnglish
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RichTextField
                          name="exampleEnglish"
                          control={control}
                          placeholder={`Enter Your ${item.exampleEnglish}`}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start gap-5 mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.exampleBangla || "Example (Bangla)"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "exampleBangla",
                              item.exampleBangla,
                              item.exampleBangla
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RichTextField
                          name="exampleBangla"
                          control={control}
                          placeholder={`Enter Your ${item.exampleBangla}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-6 p-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg shadow-md p-5 mt-10 w-[350px] md:w-full">
        <h1 className="mb-5">
          Total verb Items:{" "}
          <span className="text-3xl font-bold ">{verb.length}</span>
        </h1>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          {verbLoading ? (
            <div className="p-6 text-center text-gray-500">
              Loading verb...
            </div>
          ) : verbError ? (
            <div className="p-6 text-center text-red-500">
              Error loading verb.
            </div>
          ) : (
            <table className="table w-full">
              {verbFields?.map((item, index) => (
                <thead
                  key={item._id}
                  className="bg-teal-600 text-white text-sm"
                >
                  <tr>
                    <th >Serial</th>
                    <th className="min-w-96">{item?.mainWord}</th>
                    <th className="min-w-96">{item?.banglaPronunciation}</th>
                    <th className="min-w-96">{item?.banglaMeaning}</th>
                    <th className="min-w-96">{item?.synonyms}</th>
                    <th className="min-w-96">{item?.antonyms}</th>
                    <th className="min-w-96">{item?.exampleEnglish}</th>
                    <th className="min-w-96">{item?.exampleBangla}</th>
                    <th className="min-w-16">Action</th>
                  </tr>
                </thead>
              ))}
              <tbody>
                {visibleverb.length > 0 ? (
                  visibleverb.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition border-b text-sm"
                    >
                      <td className="font-semibold min-w-10">{i + 1}</td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words"
                          dangerouslySetInnerHTML={{
                            __html: row.mainWord,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words"
                          dangerouslySetInnerHTML={{
                            __html: row.banglaPronunciation,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words"
                          dangerouslySetInnerHTML={{
                            __html: row.banglaMeaning,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words"
                          dangerouslySetInnerHTML={{
                            __html: row.synonyms,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words"
                          dangerouslySetInnerHTML={{
                            __html: row.antonyms,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words"
                          dangerouslySetInnerHTML={{
                            __html: row.exampleEnglish,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words"
                          dangerouslySetInnerHTML={{
                            __html: row.exampleBangla,
                          }}
                        />
                      </td>

                      <td className="min-w-16 flex justify-center items-center gap-1">
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="px-2 py-1 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-1"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(row._id)}
                          className="px-2 py-1 text-green-600 rounded-md hover:bg-green-100 flex items-center gap-1"
                        >
                          <Edit2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500">
                      No verb found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {verb.length > 10 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <VerbModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedVocabId}
        />
      )}
    </div>
  );
};

export default AdminVerb;
