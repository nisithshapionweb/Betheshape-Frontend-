import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Edit2, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react"; // useRef and useEffect added
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminLoading from "../../../../../components/Loading/AdminLoading";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import RichTextField from "../../../../../shared/TextEditor/RichTextField";
import ElegantFormatModal from "./ElegantFormatModal";


const AdminElegantFormat = () => {
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

  // Add these refs and state for scroll preservation
  const paginationRef = useRef(null);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(null);

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

  // Fetch all elegant Fields
  const {
    data: elegantFields = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["elegantFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/six-layer/elegantField");
      return res.data.data;
    },
  });

  // Create elegant
  const { mutateAsync: createelegant } = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post("/six-layer/elegant", newData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "Elegant created successfully!", "success");
      reset();
      queryClient.invalidateQueries({ queryKey: ["elegant"] });
    },
    onError: (error) => {
      Swal.fire(
        "❌ Error",
        error.message || "Failed to create elegant",
        "error",
      );
    },
  });

  // Fetch all elegant
  const {
    data: elegantData,
    isLoading: elegantLoading,
    isError: elegantError,
    refetch: refetchelegant,
  } = useQuery({
    queryKey: ["elegant", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/six-layer/elegant?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
  });

  // delete elegant
  const { mutateAsync: deleteelegant } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/six-layer/elegant/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Elegant has been deleted.", "success");
      refetchelegant();
    },
    onError: (error) => {
      Swal.fire("Error!", "Failed to delete elegant.", "error");
      console.error(error);
    },
  });

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this elegant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteelegant(id);
      }
    });
  };

  const visibleElegant = elegantData?.data || [];

  // form submit
  const onSubmit = async (data) => {
    createelegant(data);
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
        navigate(`/admin-dashboard/edit-elegant/${id}`);
        break;
      case "moderator":
        navigate(`/moderator-dashboard/edit-elegant/${id}`);
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
      } this elegant?`,
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
      const res = await axiosPublic.put(`/first-layer/elegantField/toggle`, {
        fieldName: "isActive",
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `elegant is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries({ queryKey: ["elegantFields"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || error.message,
        "error",
      );
    },
  });

  // ============ PAGINATION SCROLL PRESERVATION ============
  // Handle page change with scroll position saving
  const handlePageChange = (newPage) => {
    if (newPage !== page && !isPageChanging) {
      // Save current scroll position relative to pagination
      if (paginationRef.current) {
        const rect = paginationRef.current.getBoundingClientRect();
        setSavedScrollPosition({
          top: window.pageYOffset + rect.top,
          height: rect.height,
        });
      }
      setIsPageChanging(true);
      setPage(newPage);
    }
  };

  // Restore scroll position after data loads
  useEffect(() => {
    if (isPageChanging && !elegantLoading && savedScrollPosition) {
      // Use requestAnimationFrame for smoother scroll
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScrollPosition.top - 100, // 100px offset for better visibility
          behavior: "instant", // Use "instant" instead of "smooth" for immediate positioning
        });
      });

      // Reset states after scroll
      setIsPageChanging(false);
      setSavedScrollPosition(null);
    }
  }, [elegantData, elegantLoading, isPageChanging, savedScrollPosition]);

  // Initial scroll to pagination if coming from another page
  useEffect(() => {
    if (paginationRef.current && !isPageChanging) {
      // Check if we should scroll to pagination (e.g., after page load)
      const shouldScrollToPagination =
        sessionStorage.getItem("scrollToPagination");
      if (shouldScrollToPagination === "true") {
        setTimeout(() => {
          paginationRef.current?.scrollIntoView({
            behavior: "instant",
            block: "center",
          });
          sessionStorage.removeItem("scrollToPagination");
        }, 100);
      }
    }
  }, []);

  // Show loading state
  if (isLoading || elegantLoading) {
    return <AdminLoading />;
  }

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Quiz | elegant</title>
      </Helmet>
      <TittleAnimation
        tittle="Create elegant"
        subtittle="Create With admin or Moderator"
      />

      <div className="mt-10">
        <div className="card bg-white shadow-md rounded-2xl p-3 md:p-5">
          <div className="w-full">
            <div className=" space-y-4 ">
              <div className="mb-4 text-center ">
                {elegantFields && elegantFields.length > 0 && (
                  <>
                    {/* Title */}
                    <div className="flex items-start justify-center gap-2 mb-2">
                      {elegantFields[0].title || "Title"}
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "title",
                            elegantFields[0].title,
                            elegantFields[0].title,
                          )
                        }
                        className="w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>

                    {/* description */}
                    <div className="flex items-start justify-center text-justify gap-2">
                      <span className="text-base">
                        {elegantFields[0].description || "description"}
                      </span>
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "description",
                            elegantFields[0].description,
                            elegantFields[0].description,
                          )
                        }
                        className="min-w-5 min-h-5 w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                {elegantFields.map((item) => (
                  <div key={item._id} className="flex items-center gap-2 my-2">
                    <span className="font-semibold">
                      Create {item.title || "elegant"} Exercise
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
                {elegantFields?.map((item) => (
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
      <div className="bg-white rounded-lg shadow-md p-5 mt-10 w-[350px] md:w-[750px] lg:w-full">
        <h1 className="mb-5">
          Total Elegant Items:{" "}
          <span className="text-3xl font-bold ">{elegantData?.total || 0}</span>
        </h1>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          {elegantLoading ? (
            <div className="p-6 text-center text-gray-500">
              Loading elegant...
            </div>
          ) : elegantError ? (
            <div className="p-6 text-center text-red-500">
              Error loading elegant.
            </div>
          ) : (
            <table className="table w-full">
              {elegantFields?.map((item, index) => (
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
                {visibleElegant.length > 0 ? (
                  visibleElegant.map((row, i) => (
                    <tr
                      key={row._id || i}
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
                      No Elegant found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination with Scroll Preservation */}
        {elegantData?.totalPages > 1 && (
          <div
            ref={paginationRef}
            className="flex justify-center gap-2 mt-4 pagination-container"
          >
            <button
              disabled={page === 1 || isPageChanging}
              onClick={() => handlePageChange(page - 1)}
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
                `Page ${page} of ${elegantData.totalPages}`
              )}
            </span>
            <button
              disabled={page === elegantData.totalPages || isPageChanging}
              onClick={() => handlePageChange(page + 1)}
              className={`px-2 py-1 md:px-4 md:py-2 bg-gray-300 rounded hover:bg-gray-400 
                ${page === elegantData.totalPages || isPageChanging ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isPageChanging ? "Loading..." : "Next"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ElegantFormatModal
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

export default AdminElegantFormat;
