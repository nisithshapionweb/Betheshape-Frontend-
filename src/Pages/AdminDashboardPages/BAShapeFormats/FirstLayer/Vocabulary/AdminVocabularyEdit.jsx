


import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import AdminLoading from "../../../../../components/Loading/AdminLoading";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import RichTextField from "../../../../../shared/TextEditor/RichTextField";

const AdminVocabularyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { handleSubmit, setValue, control } = useForm();

  // 🔹 Fetch vocabulary field labels
  const {
    data: vocabularyFields = [],
    isLoading: isLoadingvocabularyFields,
  } = useQuery({
    queryKey: ["vocabularyFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/vocabularyField");
      return res.data.data;
    },
  });

  // 🔹 Fetch single vocabulary data
  const { data: vocabulary, isLoading } = useQuery({
    queryKey: ["vocabulary", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/first-layer/vocabulary/${id}`);
      return res.data.data;
    },
  });

  // 🔹 Set default values
  useEffect(() => {
    if (vocabulary) {
      setValue("mainWord", vocabulary.mainWord || "");
      setValue("banglaPronunciation", vocabulary.banglaPronunciation || "");
      setValue("banglaMeaning", vocabulary.banglaMeaning || "");
      setValue("synonyms", vocabulary.synonyms || "");
      setValue("antonyms", vocabulary.antonyms || "");
      setValue("exampleEnglish", vocabulary.exampleEnglish || "");
      setValue("exampleBangla", vocabulary.exampleBangla || "");
    }
  }, [vocabulary, setValue]);

  // 🔹 Submit handler
 const onSubmit = async (data) => {
  try {
    await axiosPublic.put(`/first-layer/vocabulary/${id}`, data);

    Swal.fire({
      icon: "success",
      title: "Updated Successfully!",
      text: "vocabulary information has been updated.",
      confirmButtonColor: "#0d9488",
    });

    navigate(-1); // back to list
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Update Failed!",
      text: error?.response?.data?.message || "Something went wrong",
      confirmButtonColor: "#dc2626",
    });
  }
};


  if (isLoading || isLoadingvocabularyFields) return <AdminLoading />;

  const labels = vocabularyFields[0] || {};

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Edit vocabulary</title>
      </Helmet>

      <TittleAnimation tittle="Edit vocabulary" subtittle="Admin / Moderator" />

      <div className="mt-10">
        <div className="bg-white shadow-md rounded-2xl p-3 md:p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Main Word */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {labels.mainWord || "Main Word"}
              </label>
              <RichTextField
                name="mainWord"
                control={control}
                placeholder="Enter Main Word"
              />
            </div>

            {/* Bangla Pronunciation */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {labels.banglaPronunciation || "Bangla Pronunciation"}
              </label>
              <RichTextField
                name="banglaPronunciation"
                control={control}
                placeholder="Enter Bangla Pronunciation"
              />
            </div>

            {/* Bangla Meaning */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {labels.banglaMeaning || "Bangla Meaning"}
              </label>
              <RichTextField
                name="banglaMeaning"
                control={control}
                placeholder="Enter Bangla Meaning"
              />
            </div>

            {/* Synonyms */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {labels.synonyms || "Synonyms"}
              </label>
              <RichTextField
                name="synonyms"
                control={control}
                placeholder="Enter Synonyms"
              />
            </div>

            {/* Antonyms */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {labels.antonyms || "Antonyms"}
              </label>
              <RichTextField
                name="antonyms"
                control={control}
                placeholder="Enter Antonyms"
              />
            </div>

            {/* Example English */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {labels.exampleEnglish || "Example (English)"}
              </label>
              <RichTextField
                name="exampleEnglish"
                control={control}
                placeholder="Enter English Example"
              />
            </div>

            {/* Example Bangla */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {labels.exampleBangla || "Example (Bangla)"}
              </label>
              <RichTextField
                name="exampleBangla"
                control={control}
                placeholder="Enter Bangla Example"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
            >
              Update vocabulary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminVocabularyEdit;

