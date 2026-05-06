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
import usePaginationScroll from "../../../../../hooks/usePaginationScroll";
import RichTextField from "../../../../../shared/TextEditor/RichTextField";
import IdiomFormatModal from "./IdiomFormatModal";

const AdminIdiomFormat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { register, handleSubmit, reset, setValue, control } = useForm({
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

  // Fetch all idiom Fields
  const {
    data: idiomFields = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["idiomFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/six-layer/idiomField");
      return res.data.data;
    },
  });

  // Create idiom
  const { mutateAsync: createidiom } = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post("/six-layer/idiom", newData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "idiom created successfully!", "success");
      reset();
      queryClient.invalidateQueries({ queryKey: ["idiom"] });
    },
    onError: (error) => {
      Swal.fire("❌ Error", error.message || "Failed to create idiom", "error");
    },
  });
  // // Fetch all idiom
  // const {
  //   data: idiom = [],
  //   isLoading: idiomLoading,
  //   refetch: refetchidiom,
  //   isError: idiomError,
  // } = useQuery({
  //   queryKey: ["idiom"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/six-layer/idiom");
  //     return res.data.data || [];
  //   },
  // });

  // Fetch all vocabulary
  const {
    data: idiom,
    isLoading: idiomLoading,
    isError: idiomError,
    refetch: refetchidiom,
  } = useQuery({
    queryKey: ["idiom", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/six-layer/idiom?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
  });
  // ===== usePaginationScroll হুক ব্যবহার =====
  const { paginationRef, isPageChanging, handlePageChange } =
    usePaginationScroll(page, idiomLoading, {
      offset: 100, // 100px অফসেট
      behavior: "instant", // instant বা smooth
      block: "center",
    });

  // delete idiom
  const { mutateAsync: deleteidiom } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/six-layer/idiom/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "idiom has been deleted.", "success");
      refetchidiom(); // Refetch the list after deletion
    },
    onError: (error) => {
      Swal.fire("Error!", "Failed to delete idiom.", "error");
      console.error(error);
    },
  });

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this idiom?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteidiom(id);
      }
    });
  };

  const visibleidiom = idiom?.data || [];
  // form submit
  const onSubmit = async (data) => {
    createidiom(data);
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
        navigate(`/admin-dashboard/edit-idiom/${id}`);
        break;

      case "moderator":
        navigate(`/moderator-dashboard/edit-idiom/${id}`);
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
      } this idiom?`,
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
      const res = await axiosPublic.put(`/six-layer/idiomField/toggle`, {
        fieldName: "isActive", // ✅ এটা দিতে হবে
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `idiom is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries({ queryKey: ["idiomFields"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || error.message,
        "error",
      );
    },
  });
  if (isLoading || idiomLoading) {
    return <AdminLoading />;
  }
  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Admin | idiom</title>
      </Helmet>
      <TittleAnimation
        tittle="Create idiom"
        subtittle="Create With admin or Moderator"
      />

      <div className="mt-10">
        <div className="card bg-white shadow-md rounded-2xl p-3 md:p-5">
          <div className="w-full">
            <div className=" space-y-4">
              <div className="mb-4 text-center">
                {idiomFields && idiomFields.length > 0 && (
                  <>
                    {/* Title */}
                    <div className="flex items-start justify-center gap-2 mb-2">
                      {idiomFields[0].title || "Title"}
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "title",
                            idiomFields[0].title,
                            idiomFields[0].title,
                          )
                        }
                        className="w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>

                    {/* description */}
                    <div className="flex items-start justify-center gap-2">
                      <span className="text-base">
                        {idiomFields[0].description || "description"}
                      </span>
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "description",
                            idiomFields[0].description,
                            idiomFields[0].description,
                          )
                        }
                        className="min-w-5 min-h-5 w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                {idiomFields.map((item) => (
                  <div key={item._id} className="flex items-center gap-2 my-2">
                    <span className="font-semibold">
                      Create {item.title || "idiom"} Exercise
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
                {idiomFields?.map((item) => (
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
                              item.mainWord,
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
                              item.banglaPronunciation,
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
                              item.banglaMeaning,
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
                              item.synonyms,
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
                              item.antonyms,
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
                              item.exampleEnglish,
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
                              item.exampleBangla,
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
          Total idiom Items:{" "}
          <span className="text-3xl font-bold ">{idiom.total}</span>
        </h1>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          {idiomLoading ? (
            <div className="p-6 text-center text-gray-500">
              Loading idiom...
            </div>
          ) : idiomError ? (
            <div className="p-6 text-center text-red-500">
              Error loading idiom.
            </div>
          ) : (
            <table className="table w-full">
              {idiomFields?.map((item, index) => (
                <thead
                  key={item._id}
                  className="bg-teal-600 text-white text-sm"
                >
                  <tr>
                    <th>Serial</th>
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
                {visibleidiom.length > 0 ? (
                  visibleidiom.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition border-b text-sm"
                    >
                      <td>{(page - 1) * limit + i + 1}</td>
                      <td>
                        <div
                          className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words ql-editor"
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
             break-words ql-editor"
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
             break-words ql-editor"
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
             break-words ql-editor"
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
             break-words ql-editor"
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
             break-words ql-editor"
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
             break-words ql-editor"
                          dangerouslySetInnerHTML={{
                            __html: row.exampleBangla,
                          }}
                        />
                      </td>

                      <td className="min-w-16 flex justify-center items-center gap-1">
                        <button
                          onClick={() => handleEdit(row._id)}
                          className="px-2 py-1 text-green-600 rounded-md hover:bg-green-100 flex items-center gap-1"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="px-2 py-1 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500">
                      No idiom found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {idiom?.totalPages > 1 && (
          <div
            ref={paginationRef}
            className="flex justify-center gap-2 mt-4 pagination-container"
          >
            <button
              disabled={page === 1 || isPageChanging}
              onClick={() => handlePageChange(page - 1, setPage)}
              className={`px-2 py-1 md:px-4 md:py-2 bg-gray-300 rounded hover:bg-gray-400 
                ${page === 1 || isPageChanging ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isPageChanging ? "Loading..." : "Prev"}
            </button>
            <span className="px-2 py-1 md:px-4 md:py-2 bg-gray-100 rounded">
              {isPageChanging ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </span>
              ) : (
                `Page ${page} of ${idiom.totalPages}`
              )}
            </span>
            <button
              disabled={page === idiom.totalPages || isPageChanging}
              onClick={() => handlePageChange(page + 1, setPage)}
              className={`px-2 py-1 md:px-4 md:py-2 bg-gray-300 rounded hover:bg-gray-400 
                ${page === idiom.totalPages || isPageChanging ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isPageChanging ? "Loading..." : "Next"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <IdiomFormatModal
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

export default AdminIdiomFormat;
