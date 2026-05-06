


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

const AdminNewTantusterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { handleSubmit, setValue, control } = useForm();

  // 🔹 Fetch newtantuster field labels
  const {
    data: newtantusterFields = [],
    isLoading: isLoadingnewtantusterFields,
  } = useQuery({
    queryKey: ["newtantusterFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/newtantusterField");
      return res.data.data;
    },
  });

  // 🔹 Fetch single newtantuster data
  const { data: newtantuster, isLoading } = useQuery({
    queryKey: ["newtantuster", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/first-layer/newtantuster/${id}`);
      return res.data.data;
    },
  });

  // 🔹 Set default values
  useEffect(() => {
    if (newtantuster) {
      setValue("mainWord", newtantuster.mainWord || "");
      setValue("banglaPronunciation", newtantuster.banglaPronunciation || "");
      setValue("banglaMeaning", newtantuster.banglaMeaning || "");
      setValue("synonyms", newtantuster.synonyms || "");
      setValue("antonyms", newtantuster.antonyms || "");
      setValue("exampleEnglish", newtantuster.exampleEnglish || "");
      setValue("exampleBangla", newtantuster.exampleBangla || "");
    }
  }, [newtantuster, setValue]);

  // 🔹 Submit handler
 const onSubmit = async (data) => {
  try {
    await axiosPublic.put(`/first-layer/newtantuster/${id}`, data);

    Swal.fire({
      icon: "success",
      title: "Updated Successfully!",
      text: "newtantuster information has been updated.",
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


  if (isLoading || isLoadingnewtantusterFields) return <AdminLoading />;

  const labels = newtantusterFields[0] || {};

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Edit newtantuster</title>
      </Helmet>

      <TittleAnimation tittle="Edit newtantuster" subtittle="Admin / Moderator" />

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
              Update newtantuster
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminNewTantusterEdit;

