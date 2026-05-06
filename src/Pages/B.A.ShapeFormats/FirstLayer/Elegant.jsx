import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, BookOpenCheck, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Elegant = () => {
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset, setValue } = useForm();
  const queryClient = useQueryClient();
  const { user } = useAuth();
const [page, setPage] = useState(1);
const limit = 10;


  // Fetch all elegant Fields
  const {
    data: elegantFields = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["elegantFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/elegantField");
      return res.data.data || [];
    },
  });


const {
  data: elegantData,
  isLoading: elegantLoading,
  isError: elegantError,
  refetch: refetchelegant,
} = useQuery({
  queryKey: ["elegant", page],
  queryFn: async () => {
    const res = await axiosPublic.get(
      `/first-layer/elegant?page=${page}&limit=${limit}`
    );
    return res.data;
  },
});



  // Create elegant
  const { mutateAsync: createelegantExercise } = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post(
        "/first-layer/createExerciseelegant",
        newData,
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "Exercise created successfully!", "success");
      reset();
      queryClient.invalidateQueries({ queryKey: ["elegant"] });
    },
    onError: (error) => {
      Swal.fire("❌ Error", error.message || "Failed to create elegant", "error");
    },
  });

  // Toggle show all rows
  const visibleElegant = elegantData?.data || [];

  const onSubmit = async (data) => {
    const payload = {
      user: {
        uid: user?.uid,
        email: user?.email,
        name: user?.displayName,
      },
      rows: [
        {
          mainWord: data.mainWord,
          banglaPronunciation: data.banglaPronunciation,
          banglaMeaning: data.banglaMeaning,
          synonyms: data.synonyms,
          antonyms: data.antonyms,
          exampleEnglish: data.exampleEnglish,
          exampleBangla: data.exampleBangla,
        },
        {
          mainWord2: data.mainWord2,
          banglaPronunciation2: data.banglaPronunciation2,
          banglaMeaning2: data.banglaMeaning2,
          synonyms2: data.synonyms2,
          antonyms2: data.antonyms2,
          exampleEnglish2: data.exampleEnglish2,
          exampleBangla2: data.exampleBangla2,
        },
        {
          mainWord3: data.mainWord3,
          banglaPronunciation3: data.banglaPronunciation3,
          banglaMeaning3: data.banglaMeaning3,
          synonyms3: data.synonyms3,
          antonyms3: data.antonyms3,
          exampleEnglish3: data.exampleEnglish3,
          exampleBangla3: data.exampleBangla3,
        },
      ],
      createdAt: new Date(),
    };

    // ✅ validation (আগের logic রাখছি)
    const countFilled = (row) =>
      Object.values(row).filter((v) => v && v.trim() !== "").length;

    const r1 = countFilled(payload.rows[0]);
    const r2 = countFilled(payload.rows[1]);
    const r3 = countFilled(payload.rows[2]);

    if (r1 < 3 && r2 < 3 && r3 < 3) {
      Swal.fire(
        "At least one row must have a minimum of 3 completed fields!",
        "",
        "warning",
      );
      return;
    }

    // 🔥 এখন full payload পাঠাও
    createelegantExercise(payload);
    reset();
  };

  if (isLoading || elegantLoading) return <CustomLoading />;

  if (isError || elegantError)
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl text-red-500 mb-2">Unable to Load elegant</h2>
          <p className="text-black mb-6">
            {error?.message || "Error occurred"}
          </p>
          <button
            onClick={refetchelegant}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="bg-white shadow-md rounded-lg p-2 md:p-5 mt-10 space-y-3">
        <div className="flex flex-col items-center mb-3 space-y-2">
          {elegantFields?.map((item) => (
            <div key={item._id} className="text-center max-w-[1400px] bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-3 md:p-8 rounded-lg shadow-md border-l-4 border-teal-500 relative overflow-hidden mb-8">
               <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-300 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
              <h2 className="text-3xl font-bold text-teal-600">
                {item?.title || "Title Missing"}
              </h2>
              <p className="text-justify py-5 text-gray-700">
                {item?.description || "Description Missing"}
              </p>
            </div>
          ))}
        </div>

        {/* elegant Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="table w-full">
            {elegantFields?.map((item, index) => (
              <thead key={item._id} className="bg-teal-600 text-white text-sm">
                <tr>
                  <th>Serial</th>

                  {item &&
                    item.mainWord !== "no" &&
                    item.mainWord !== "none" && (
                      <th className="w-72 md:w-96">{item?.mainWord}</th>
                    )}
                  {item &&
                    item.banglaPronunciation !== "no" &&
                    item.banglaPronunciation !== "none" && (
                      <th className="w-72 md:w-96">
                        {item?.banglaPronunciation}
                      </th>
                    )}
                  {item &&
                    item.banglaMeaning !== "no" &&
                    item.banglaMeaning !== "none" && (
                      <th className="w-72 md:w-96">{item?.banglaMeaning}</th>
                    )}
                  {item &&
                    item.synonyms !== "no" &&
                    item.synonyms !== "none" && (
                      <th className="w-72 md:w-96">{item?.synonyms}</th>
                    )}
                  {item &&
                    item.antonyms !== "no" &&
                    item.antonyms !== "none" && (
                      <th className="w-72 md:w-96">{item?.antonyms}</th>
                    )}
                  {item &&
                    item.exampleEnglish !== "no" &&
                    item.exampleEnglish !== "none" && (
                      <th className="w-72 md:w-96">{item?.exampleEnglish}</th>
                    )}
                  {item &&
                    item.exampleBangla !== "no" &&
                    item.exampleBangla !== "none" && (
                      <th className="w-72 md:w-96">{item?.exampleBangla}</th>
                    )}
                </tr>
              </thead>
            ))}
            <tbody>
              {visibleElegant.length > 0 ? (
                visibleElegant.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition border-b text-sm"
                  >
                     <td>{(page - 1) * limit + i + 1}</td>

                    {elegantFields?.[0]?.mainWord !== "no" &&
                      elegantFields?.[0]?.mainWord !== "none" && (
                        <td>
                          <div
                            className="w-72 md:w-96 min-h-20 max-h-96
             border border-gray-300 rounded-md
             p-2 text-sm bg-white
             overflow-auto text-justify
             whitespace-normal
             break-words ql-editor"
                            dangerouslySetInnerHTML={{ __html: row.mainWord }}
                          />
                        </td>
                      )}

                    {elegantFields?.[0]?.banglaPronunciation !== "no" &&
                      elegantFields?.[0]?.banglaPronunciation !== "none" && (
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
                      )}
                    {elegantFields?.[0]?.banglaMeaning !== "no" &&
                      elegantFields?.[0]?.banglaMeaning !== "none" && (
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
                      )}

                    {elegantFields?.[0]?.synonyms !== "no" &&
                      elegantFields?.[0]?.synonyms !== "none" && (
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
                      )}
                    {elegantFields?.[0]?.antonyms !== "no" &&
                      elegantFields?.[0]?.antonyms !== "none" && (
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
                      )}
                    {elegantFields?.[0]?.exampleEnglish !== "no" &&
                      elegantFields?.[0]?.exampleEnglish !== "none" && (
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
                      )}
                    {elegantFields?.[0]?.exampleBangla !== "no" &&
                      elegantFields?.[0]?.exampleBangla !== "none" && (
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
                      )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No elegant found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

    {/* Pagination */}
    {elegantData?.totalPages > 1 && (
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-2 py-1 md:px-4 md:py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1 md:px-4 md:py-2">{`Page ${page} of ${elegantData.totalPages}`}</span>
        <button
          disabled={page === elegantData.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-2 py-1 md:px-4 md:py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )}
      </div>
      {/* elegant Fields Exercise */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {elegantFields?.map(
            (item) =>
              item.isActive === "ON" && (
                <div key={item._id}>
                  <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
                   <h3 className="text-base md:text-xl font-semibold text-teal-600 flex items-center gap-2">
  <BookOpenCheck className="w-6 h-6 text-teal-600" />
  {item?.title ? `${item.title} Practice Exercise` : "Practice Exercise"}
</h3>
                    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                      <table className="table w-full">
                        <thead className="bg-teal-600 text-white text-sm">
                          <tr>
                            <th>Serial</th>
                            {item &&
                              item.mainWord !== "no" &&
                              item.mainWord !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.mainWord}
                                </th>
                              )}
                            {item &&
                              item.banglaPronunciation !== "no" &&
                              item.banglaPronunciation !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.banglaPronunciation}
                                </th>
                              )}
                            {item &&
                              item.banglaMeaning !== "no" &&
                              item.banglaMeaning !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.banglaMeaning}
                                </th>
                              )}
                            {item &&
                              item.synonyms !== "no" &&
                              item.synonyms !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.synonyms}
                                </th>
                              )}
                            {item &&
                              item.antonyms !== "no" &&
                              item.antonyms !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.antonyms}
                                </th>
                              )}
                            {item &&
                              item.exampleEnglish !== "no" &&
                              item.exampleEnglish !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.exampleEnglish}
                                </th>
                              )}
                            {item &&
                              item.exampleBangla !== "no" &&
                              item.exampleBangla !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.exampleBangla}
                                </th>
                              )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>

                            {elegantFields?.[0]?.mainWord !== "no" &&
                              elegantFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.banglaPronunciation !== "no" &&
                              elegantFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.banglaMeaning !== "no" &&
                              elegantFields?.[0]?.banglaMeaning !== "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.synonyms !== "no" &&
                              elegantFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.antonyms !== "no" &&
                              elegantFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.exampleEnglish !== "no" &&
                              elegantFields?.[0]?.exampleEnglish !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.exampleBangla !== "no" &&
                              elegantFields?.[0]?.exampleBangla !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleBangla")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleBangla}`}
                                  />
                                </td>
                              )}
                          </tr>
                        </tbody>
                        {/* 2 */}
                        <tbody>
                          <tr>
                            <td>2</td>

                            {elegantFields?.[0]?.mainWord !== "no" &&
                              elegantFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.banglaPronunciation !== "no" &&
                              elegantFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.banglaMeaning !== "no" &&
                              elegantFields?.[0]?.banglaMeaning !== "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.synonyms !== "no" &&
                              elegantFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.antonyms !== "no" &&
                              elegantFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.exampleEnglish !== "no" &&
                              elegantFields?.[0]?.exampleEnglish !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.exampleBangla !== "no" &&
                              elegantFields?.[0]?.exampleBangla !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleBangla2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleBangla}`}
                                  />
                                </td>
                              )}
                          </tr>
                        </tbody>
                        {/* 3 */}
                        <tbody>
                          <tr>
                            <td>3</td>

                            {elegantFields?.[0]?.mainWord !== "no" &&
                              elegantFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.banglaPronunciation !== "no" &&
                              elegantFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.banglaMeaning !== "no" &&
                              elegantFields?.[0]?.banglaMeaning !== "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.synonyms !== "no" &&
                              elegantFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.antonyms !== "no" &&
                              elegantFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.exampleEnglish !== "no" &&
                              elegantFields?.[0]?.exampleEnglish !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {elegantFields?.[0]?.exampleBangla !== "no" &&
                              elegantFields?.[0]?.exampleBangla !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleBangla3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleBangla}`}
                                  />
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-center mt-5">
                      <button className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
                        Submit Now
                      </button>
                    </div>
                  </div>
                </div>
              ),
          )}
        </form>
      </div>
    </div>
  );
};

export default Elegant;
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { AlertCircle, RefreshCw } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import CustomLoading from "../../../components/Loading/CustomLoading";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const Elegant = () => {
//   const axiosPublic = useAxiosPublic();
//   const [showAll, setShowAll] = useState(false);
//   const { register, handleSubmit, reset, setValue } = useForm();
//   const queryClient = useQueryClient();
//   const { user } = useAuth();

//   // Fetch all elegant Fields
//   const {
//     data: elegantFields = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["elegantFields"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/first-layer/elegantField");
//       return res.data.data || [];
//     },
//   });

//   // Fetch elegant
//   const {
//     data: elegant,
//     isLoading: elegantLoading,
//     isError: elegantError,
//     refetch: refetchelegant,
//     error,
//   } = useQuery({
//     queryKey: ["elegant"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/first-layer/elegant");
//       return res.data.data;
//     },
//   });

//   // Create elegant
//   const { mutateAsync: createelegantExercise } = useMutation({
//     mutationFn: async (newData) => {
//       const res = await axiosPublic.post(
//         "/first-layer/createExerciseelegant",
//         newData,
//       );
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("✅ Success", "Exercise created successfully!", "success");
//       reset();
//       queryClient.invalidateQueries({ queryKey: ["elegant"] });
//     },
//     onError: (error) => {
//       Swal.fire("❌ Error", error.message || "Failed to create elegant", "error");
//     },
//   });

//   // Toggle show all rows
//   const visibleelegant = showAll ? elegant || [] : (elegant || []).slice(0, 10);

//   const onSubmit = async (data) => {
//     const payload = {
//       user: {
//         uid: user?.uid,
//         email: user?.email,
//         name: user?.displayName,
//       },
//       rows: [
//         {
//           mainWord: data.mainWord,
//           banglaPronunciation: data.banglaPronunciation,
//           banglaMeaning: data.banglaMeaning,
//           synonyms: data.synonyms,
//           antonyms: data.antonyms,
//           exampleEnglish: data.exampleEnglish,
//           exampleBangla: data.exampleBangla,
//         },
//         {
//           mainWord2: data.mainWord2,
//           banglaPronunciation2: data.banglaPronunciation2,
//           banglaMeaning2: data.banglaMeaning2,
//           synonyms2: data.synonyms2,
//           antonyms2: data.antonyms2,
//           exampleEnglish2: data.exampleEnglish2,
//           exampleBangla2: data.exampleBangla2,
//         },
//         {
//           mainWord3: data.mainWord3,
//           banglaPronunciation3: data.banglaPronunciation3,
//           banglaMeaning3: data.banglaMeaning3,
//           synonyms3: data.synonyms3,
//           antonyms3: data.antonyms3,
//           exampleEnglish3: data.exampleEnglish3,
//           exampleBangla3: data.exampleBangla3,
//         },
//       ],
//       createdAt: new Date(),
//     };

//     // ✅ validation (আগের logic রাখছি)
//     const countFilled = (row) =>
//       Object.values(row).filter((v) => v && v.trim() !== "").length;

//     const r1 = countFilled(payload.rows[0]);
//     const r2 = countFilled(payload.rows[1]);
//     const r3 = countFilled(payload.rows[2]);

//     if (r1 < 3 && r2 < 3 && r3 < 3) {
//       Swal.fire(
//         "At least one row must have a minimum of 3 completed fields!",
//         "",
//         "warning",
//       );
//       return;
//     }

//     // 🔥 এখন full payload পাঠাও
//     createelegantExercise(payload);
//     reset();
//   };

//   if (isLoading || elegantLoading) return <CustomLoading />;

//   if (isError || elegantError)
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center p-4">
//         <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
//           <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
//           <h2 className="text-xl text-red-500 mb-2">Unable to Load elegant</h2>
//           <p className="text-black mb-6">
//             {error?.message || "Error occurred"}
//           </p>
//           <button
//             onClick={refetchelegant}
//             className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
//           >
//             <RefreshCw size={16} />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="max-w-[1400px] mx-auto">
//       <div className="bg-white shadow-md rounded-lg p-2 md:p-5 mt-10 space-y-3">
//         <div className="flex flex-col items-center mb-3 space-y-2">
//           {elegantFields?.map((item) => (
//             <div key={item._id} className="text-center max-w-[1400px]">
//               <h2 className="text-3xl font-bold text-teal-600">
//                 {item?.title || "Title Missing"}
//               </h2>
//               <p className="text-justify py-5 text-gray-700">
//                 {item?.description || "Description Missing"}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* elegant Table */}
//         <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
//           <table className="table w-full">
//             {elegantFields?.map((item, index) => (
//               <thead key={item._id} className="bg-teal-600 text-white text-sm">
//                 <tr>
//                   <th>Serial</th>

//                   {item &&
//                     item.mainWord !== "no" &&
//                     item.mainWord !== "none" && (
//                       <th className="w-72 md:w-96">{item?.mainWord}</th>
//                     )}
//                   {item &&
//                     item.banglaPronunciation !== "no" &&
//                     item.banglaPronunciation !== "none" && (
//                       <th className="w-72 md:w-96">
//                         {item?.banglaPronunciation}
//                       </th>
//                     )}
//                   {item &&
//                     item.banglaMeaning !== "no" &&
//                     item.banglaMeaning !== "none" && (
//                       <th className="w-72 md:w-96">{item?.banglaMeaning}</th>
//                     )}
//                   {item &&
//                     item.synonyms !== "no" &&
//                     item.synonyms !== "none" && (
//                       <th className="w-72 md:w-96">{item?.synonyms}</th>
//                     )}
//                   {item &&
//                     item.antonyms !== "no" &&
//                     item.antonyms !== "none" && (
//                       <th className="w-72 md:w-96">{item?.antonyms}</th>
//                     )}
//                   {item &&
//                     item.exampleEnglish !== "no" &&
//                     item.exampleEnglish !== "none" && (
//                       <th className="w-72 md:w-96">{item?.exampleEnglish}</th>
//                     )}
//                   {item &&
//                     item.exampleBangla !== "no" &&
//                     item.exampleBangla !== "none" && (
//                       <th className="w-72 md:w-96">{item?.exampleBangla}</th>
//                     )}
//                 </tr>
//               </thead>
//             ))}
//             <tbody>
//               {visibleelegant.length > 0 ? (
//                 visibleelegant.map((row, i) => (
//                   <tr
//                     key={i}
//                     className="hover:bg-gray-50 transition border-b text-sm"
//                   >
//                     <td className="font-semibold ">{i + 1}</td>

//                     {elegantFields?.[0]?.mainWord !== "no" &&
//                       elegantFields?.[0]?.mainWord !== "none" && (
//                         <td>
//                           <div
//                             className="w-72 md:w-96 min-h-20 max-h-96
//              border border-gray-300 rounded-md
//              p-2 text-sm bg-white
//              overflow-auto text-justify
//              whitespace-normal
//              break-words ql-editor"
//                             dangerouslySetInnerHTML={{ __html: row.mainWord }}
//                           />
//                         </td>
//                       )}

//                     {elegantFields?.[0]?.banglaPronunciation !== "no" &&
//                       elegantFields?.[0]?.banglaPronunciation !== "none" && (
//                         <td>
//                           <div
//                             className="w-72 md:w-96 min-h-20 max-h-96
//              border border-gray-300 rounded-md
//              p-2 text-sm bg-white
//              overflow-auto text-justify
//              whitespace-normal
//              break-words ql-editor"
//                             dangerouslySetInnerHTML={{
//                               __html: row.banglaPronunciation,
//                             }}
//                           />
//                         </td>
//                       )}
//                     {elegantFields?.[0]?.banglaMeaning !== "no" &&
//                       elegantFields?.[0]?.banglaMeaning !== "none" && (
//                         <td>
//                           <div
//                             className="w-72 md:w-96 min-h-20 max-h-96
//              border border-gray-300 rounded-md
//              p-2 text-sm bg-white
//              overflow-auto text-justify
//              whitespace-normal
//              break-words ql-editor"
//                             dangerouslySetInnerHTML={{
//                               __html: row.banglaMeaning,
//                             }}
//                           />
//                         </td>
//                       )}

//                     {elegantFields?.[0]?.synonyms !== "no" &&
//                       elegantFields?.[0]?.synonyms !== "none" && (
//                         <td>
//                           <div
//                             className="w-72 md:w-96 min-h-20 max-h-96
//              border border-gray-300 rounded-md
//              p-2 text-sm bg-white
//              overflow-auto text-justify
//              whitespace-normal
//              break-words ql-editor"
//                             dangerouslySetInnerHTML={{
//                               __html: row.synonyms,
//                             }}
//                           />
//                         </td>
//                       )}
//                     {elegantFields?.[0]?.antonyms !== "no" &&
//                       elegantFields?.[0]?.antonyms !== "none" && (
//                         <td>
//                           <div
//                             className="w-72 md:w-96 min-h-20 max-h-96
//              border border-gray-300 rounded-md
//              p-2 text-sm bg-white
//              overflow-auto text-justify
//              whitespace-normal
//              break-words ql-editor"
//                             dangerouslySetInnerHTML={{
//                               __html: row.antonyms,
//                             }}
//                           />
//                         </td>
//                       )}
//                     {elegantFields?.[0]?.exampleEnglish !== "no" &&
//                       elegantFields?.[0]?.exampleEnglish !== "none" && (
//                         <td>
//                           <div
//                             className="w-72 md:w-96 min-h-20 max-h-96
//              border border-gray-300 rounded-md
//              p-2 text-sm bg-white
//              overflow-auto text-justify
//              whitespace-normal
//              break-words ql-editor"
//                             dangerouslySetInnerHTML={{
//                               __html: row.exampleEnglish,
//                             }}
//                           />
//                         </td>
//                       )}
//                     {elegantFields?.[0]?.exampleBangla !== "no" &&
//                       elegantFields?.[0]?.exampleBangla !== "none" && (
//                         <td>
//                           <div
//                             className="w-72 md:w-96 min-h-20 max-h-96
//              border border-gray-300 rounded-md
//              p-2 text-sm bg-white
//              overflow-auto text-justify
//              whitespace-normal
//              break-words ql-editor"
//                             dangerouslySetInnerHTML={{
//                               __html: row.exampleBangla,
//                             }}
//                           />
//                         </td>
//                       )}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="text-center py-6 text-gray-500">
//                     No elegant found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {elegant?.length > 10 && (
//           <div className="flex justify-center mt-4">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//             >
//               {showAll ? "See Less" : "See More"}
//             </button>
//           </div>
//         )}
//       </div>
//       {/* elegant Fields Exercise */}
//       <div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {elegantFields?.map(
//             (item) =>
//               item.isActive === "ON" && (
//                 <div key={item._id}>
//                   <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
//                     <h3 className="text-xl font-semibold text-teal-600">
//                       📖 Learning Your Exercise
//                     </h3>
//                     <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
//                       <table className="table w-full">
//                         <thead className="bg-teal-600 text-white text-sm">
//                           <tr>
//                             <th>Serial</th>
//                             {item &&
//                               item.mainWord !== "no" &&
//                               item.mainWord !== "none" && (
//                                 <th className="w-72 md:w-96">
//                                   {item?.mainWord}
//                                 </th>
//                               )}
//                             {item &&
//                               item.banglaPronunciation !== "no" &&
//                               item.banglaPronunciation !== "none" && (
//                                 <th className="w-72 md:w-96">
//                                   {item?.banglaPronunciation}
//                                 </th>
//                               )}
//                             {item &&
//                               item.banglaMeaning !== "no" &&
//                               item.banglaMeaning !== "none" && (
//                                 <th className="w-72 md:w-96">
//                                   {item?.banglaMeaning}
//                                 </th>
//                               )}
//                             {item &&
//                               item.synonyms !== "no" &&
//                               item.synonyms !== "none" && (
//                                 <th className="w-72 md:w-96">
//                                   {item?.synonyms}
//                                 </th>
//                               )}
//                             {item &&
//                               item.antonyms !== "no" &&
//                               item.antonyms !== "none" && (
//                                 <th className="w-72 md:w-96">
//                                   {item?.antonyms}
//                                 </th>
//                               )}
//                             {item &&
//                               item.exampleEnglish !== "no" &&
//                               item.exampleEnglish !== "none" && (
//                                 <th className="w-72 md:w-96">
//                                   {item?.exampleEnglish}
//                                 </th>
//                               )}
//                             {item &&
//                               item.exampleBangla !== "no" &&
//                               item.exampleBangla !== "none" && (
//                                 <th className="w-72 md:w-96">
//                                   {item?.exampleBangla}
//                                 </th>
//                               )}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>1</td>

//                             {elegantFields?.[0]?.mainWord !== "no" &&
//                               elegantFields?.[0]?.mainWord !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("mainWord")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.mainWord}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.banglaPronunciation !== "no" &&
//                               elegantFields?.[0]?.banglaPronunciation !==
//                                 "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("banglaPronunciation")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.banglaPronunciation}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.banglaMeaning !== "no" &&
//                               elegantFields?.[0]?.banglaMeaning !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("banglaMeaning")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.banglaMeaning}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.synonyms !== "no" &&
//                               elegantFields?.[0]?.synonyms !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("synonyms")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.synonyms}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.antonyms !== "no" &&
//                               elegantFields?.[0]?.antonyms !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("antonyms")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.antonyms}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.exampleEnglish !== "no" &&
//                               elegantFields?.[0]?.exampleEnglish !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("exampleEnglish")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.exampleEnglish}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.exampleBangla !== "no" &&
//                               elegantFields?.[0]?.exampleBangla !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("exampleBangla")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.exampleBangla}`}
//                                   />
//                                 </td>
//                               )}
//                           </tr>
//                         </tbody>
//                         {/* 2 */}
//                         <tbody>
//                           <tr>
//                             <td>2</td>

//                             {elegantFields?.[0]?.mainWord !== "no" &&
//                               elegantFields?.[0]?.mainWord !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("mainWord2")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.mainWord}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.banglaPronunciation !== "no" &&
//                               elegantFields?.[0]?.banglaPronunciation !==
//                                 "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("banglaPronunciation2")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.banglaPronunciation}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.banglaMeaning !== "no" &&
//                               elegantFields?.[0]?.banglaMeaning !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("banglaMeaning2")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.banglaMeaning}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.synonyms !== "no" &&
//                               elegantFields?.[0]?.synonyms !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("synonyms2")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.synonyms}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.antonyms !== "no" &&
//                               elegantFields?.[0]?.antonyms !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("antonyms2")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.antonyms}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.exampleEnglish !== "no" &&
//                               elegantFields?.[0]?.exampleEnglish !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("exampleEnglish2")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.exampleEnglish}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.exampleBangla !== "no" &&
//                               elegantFields?.[0]?.exampleBangla !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("exampleBangla2")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.exampleBangla}`}
//                                   />
//                                 </td>
//                               )}
//                           </tr>
//                         </tbody>
//                         {/* 3 */}
//                         <tbody>
//                           <tr>
//                             <td>3</td>

//                             {elegantFields?.[0]?.mainWord !== "no" &&
//                               elegantFields?.[0]?.mainWord !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("mainWord3")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.mainWord}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.banglaPronunciation !== "no" &&
//                               elegantFields?.[0]?.banglaPronunciation !==
//                                 "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("banglaPronunciation3")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.banglaPronunciation}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.banglaMeaning !== "no" &&
//                               elegantFields?.[0]?.banglaMeaning !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("banglaMeaning3")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.banglaMeaning}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.synonyms !== "no" &&
//                               elegantFields?.[0]?.synonyms !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("synonyms3")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.synonyms}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.antonyms !== "no" &&
//                               elegantFields?.[0]?.antonyms !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("antonyms3")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.antonyms}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.exampleEnglish !== "no" &&
//                               elegantFields?.[0]?.exampleEnglish !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("exampleEnglish3")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.exampleEnglish}`}
//                                   />
//                                 </td>
//                               )}
//                             {elegantFields?.[0]?.exampleBangla !== "no" &&
//                               elegantFields?.[0]?.exampleBangla !== "none" && (
//                                 <td>
//                                   <textarea
//                                     {...register("exampleBangla3")}
//                                     className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
//                                     placeholder={`Enter Your ${item.exampleBangla}`}
//                                   />
//                                 </td>
//                               )}
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <div className="flex justify-center mt-5">
//                       <button className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
//                         Submit Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ),
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Elegant;
