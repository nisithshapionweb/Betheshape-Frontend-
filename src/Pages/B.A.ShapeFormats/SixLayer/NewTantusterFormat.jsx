import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpenCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const NewtantusterFormat = () => {
  const axiosPublic = useAxiosPublic();
  const [activeSection, setActiveSection] = useState("mainWord");
  const { register, handleSubmit, reset, setValue } = useForm();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const refs = {
    mainWord: useRef(null),
    banglaPronunciation: useRef(null),
    banglaMeaning: useRef(null),
    synonyms: useRef(null),
    antonyms: useRef(null),
    exampleEnglish: useRef(null),
    exampleBangla: useRef(null),
  };

  // Fetch sentence fields
  const { data: newtantusterFields = [], isLoading: fieldLoading } = useQuery({
    queryKey: ["newtantusterFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/six-layer/newtantusterField");

      return res.data.data || [];
    },
  });

  // Fetch newtantuster data
  const { data: newtantuster = [], isLoading: newtantusterLoading } = useQuery({
    queryKey: ["newtantuster"],
    queryFn: async () => {
      const res = await axiosPublic.get("/six-layer/newtantuster");

      return res.data.data || [];
    },
  });

  const { mutateAsync: createNewTantusterExercise } = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post(
        "/six-layer/createExerciseNewTantuster",
        newData,
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "Exercise created successfully!", "success");
      reset();
      queryClient.invalidateQueries({ queryKey: ["NewTantuster"] });
    },
    onError: (error) => {
      Swal.fire(
        "❌ Error",
        error.message || "Failed to create NewTantuster",
        "error",
      );
    },
  });

  if (fieldLoading || newtantusterLoading) return <CustomLoading />;

  const newtantusterField = newtantusterFields[0] || {};
  const data = newtantuster[0] || {};

  if (!data)
    return <p className="text-center mt-10">No newtantuster data found.</p>;

  // Dynamic tab generation
  const tabs = [
    { id: "mainWord", label: newtantusterField.mainWord },
    { id: "banglaPronunciation", label: newtantusterField.banglaPronunciation },
    { id: "banglaMeaning", label: newtantusterField.banglaMeaning },
    { id: "synonyms", label: newtantusterField.synonyms },
    { id: "antonyms", label: newtantusterField.antonyms },
    { id: "exampleEnglish", label: newtantusterField.exampleEnglish },
    { id: "exampleBangla", label: newtantusterField.exampleBangla },
  ];

  const handleSectionScroll = (section) => {
    setActiveSection(section);

    const yOffset = -120; // এখানে navbar + tabs এর height অনুযায়ী adjust করো
    const element = refs[section].current;

    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

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
    createNewTantusterExercise(payload);
    reset();
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="py-8 ">
        <div className="flex flex-col items-center mb-3 space-y-2">
          {newtantusterFields?.map((item) => (
            <div key={item._id} className="text-center max-w-[1400px] bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-3 md:p-8 rounded-lg shadow-md border-l-4 border-teal-500 relative overflow-hidden mb-8">
               <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-300 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
              <h2 className="text-3xl font-bold text-teal-700">
                {item?.title || "Title Missing"}
              </h2>
              <p className="text-justify py-5 text-gray-700">
                {item?.description || "Description Missing"}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8 sticky top-20 z-999 w-full text-sm md:text-base">
          <div className="flex flex-wrap p-2 border-b max-w-[1400px] mx-auto px-2">
            {tabs.map(
              (tab) =>
                tab.label &&
                tab.label !== "no" &&
                tab.label !== "none" && (
                  <button
                    key={tab.id}
                    onClick={() => handleSectionScroll(tab.id)}
                    className={`px-2 md:px-6 py-2 m-1 rounded-lg font-semibold transition-all duration-300 ${
                      activeSection === tab.id
                        ? "bg-teal-800 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ),
            )}
          </div>
        </div>

        {tabs.map(
          (tab) =>
            tab.label &&
            tab.label !== "no" &&
            tab.label !== "none" && (
              <section key={tab.id} ref={refs[tab.id]} className="p-2 md:p-3">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  {tab.label}
                </h2>
                <div
                  className="prose max-w-none text-gray-700 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: data?.[tab.id] || "<p>No content available.</p>",
                  }}
                />
              </section>
            ),
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {newtantusterFields?.map(
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

                            {newtantusterFields?.[0]?.mainWord !== "no" &&
                              newtantusterFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.banglaPronunciation !==
                              "no" &&
                              newtantusterFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.banglaMeaning !== "no" &&
                              newtantusterFields?.[0]?.banglaMeaning !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.synonyms !== "no" &&
                              newtantusterFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.antonyms !== "no" &&
                              newtantusterFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.exampleEnglish !== "no" &&
                              newtantusterFields?.[0]?.exampleEnglish !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.exampleBangla !== "no" &&
                              newtantusterFields?.[0]?.exampleBangla !==
                                "none" && (
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

                            {newtantusterFields?.[0]?.mainWord !== "no" &&
                              newtantusterFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.banglaPronunciation !==
                              "no" &&
                              newtantusterFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.banglaMeaning !== "no" &&
                              newtantusterFields?.[0]?.banglaMeaning !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.synonyms !== "no" &&
                              newtantusterFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.antonyms !== "no" &&
                              newtantusterFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.exampleEnglish !== "no" &&
                              newtantusterFields?.[0]?.exampleEnglish !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.exampleBangla !== "no" &&
                              newtantusterFields?.[0]?.exampleBangla !==
                                "none" && (
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

                            {newtantusterFields?.[0]?.mainWord !== "no" &&
                              newtantusterFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.banglaPronunciation !==
                              "no" &&
                              newtantusterFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.banglaMeaning !== "no" &&
                              newtantusterFields?.[0]?.banglaMeaning !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.synonyms !== "no" &&
                              newtantusterFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.antonyms !== "no" &&
                              newtantusterFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.exampleEnglish !== "no" &&
                              newtantusterFields?.[0]?.exampleEnglish !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {newtantusterFields?.[0]?.exampleBangla !== "no" &&
                              newtantusterFields?.[0]?.exampleBangla !==
                                "none" && (
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

export default NewtantusterFormat;
