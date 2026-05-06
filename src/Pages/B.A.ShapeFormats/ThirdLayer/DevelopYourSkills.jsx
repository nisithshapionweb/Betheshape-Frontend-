
import { useQuery } from "@tanstack/react-query";
import { BookOpenCheck, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RichTextField from "../../../shared/TextEditor/RichTextField";

const DevelopYourSkills = () => {
  const axiosPublic = useAxiosPublic();
  const [openIndex, setOpenIndex] = useState(0);
  const { user } = useAuth();
  // ✅ Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // ✅ Fetch corporate email fields
  const { data: developSkillsFields = [], isLoading: fieldsLoading } =
    useQuery({
      queryKey: ["developSkillsFields"],
      queryFn: async () => {
        const res = await axiosPublic.get("/third-layer/developSkillsField");
        return res.data?.data || [];
      },
    });

  // ✅ Fetch corporate emails
  const { data: developSkills = [], isLoading: developSkillsLoading } =
    useQuery({
      queryKey: ["developSkills"],
      queryFn: async () => {
        const res = await axiosPublic.get("/third-layer/developSkills");
        return res.data || [];
      },
    });

  const isLoading = fieldsLoading || developSkillsLoading;
  useEffect(() => {
    if (developSkills.length > 0) {
      setOpenIndex(0);
    }
  }, [developSkills]);
  // ✅ Submit handler (Learning Your Exercise)
  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      userInfo: {
        userId: user?._id,
        name: user?.displayName,
        email: user?.email,
        role: user?.role,
      },
    };

    try {
      const res = await axiosPublic.post(
        "/third-layer/createExercisedevelopSkills",
        payload,
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Exercise submitted successfully",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
    );
  }

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeField = developSkillsFields.find(
    (item) => item.isActive === "ON",
  );

  return (
    <div className="max-w-[1400px] mx-auto p-2 md:p-6 space-y-10 bg-white rounded-2xl shadow-md my-10">
      {/* ✅ Title & Description */}
      <section className="text-center">
        {developSkillsFields.map((field) => (
          <div key={field._id} className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-3 md:p-8 rounded-lg shadow-md border-l-4 border-teal-500 relative overflow-hidden mb-8">
             <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-300 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
            <h3 className="font-bold text-3xl text-teal-600">
              {field.title}
            </h3>
            <p className="text-gray-600 text-sm lg:text-base text-justify py-5">
              {field.description}
            </p>
          </div>
        ))}
      </section>

      {/* ✅ Corporate Email List */}
      <section>
        {developSkills.length === 0 ? (
          <p className="text-gray-500 text-center">No items found.</p>
        ) : (
          <div className="space-y-3">
            {developSkills.map((item, index) => (
              <div
                key={item._id}
                className="border rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center gap-5 text-justify px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200 transition"
                >
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ${
                    openIndex === index ? "max-h-[1500px]" : "max-h-0"
                  }`}
                >
                  <div
                    className="px-4 py-3 text-gray-700 text-sm lg:text-base"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Learning Your Exercise (ONLY if Active) */}
      {activeField && (
        <section className="card bg-white shadow-2xl rounded-2xl p-4 md:p-6 mt-10 space-y-5">
 <h3 className="text-base md:text-xl font-semibold text-teal-600 flex items-center gap-2">
  <BookOpenCheck className="w-6 h-6 text-teal-600" />
  {activeField?.title
    ? `${activeField.title} Practice Exercise`
    : "Practice Exercise"}
</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text text-base font-medium text-gray-700">
                  Tittle:
                </span>
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter Your Tittle..."
                    className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                  />
                )}
              />
            </div>

            <RichTextField
              name="description"
              control={control}
              placeholder="Enter Your Description..."
              className="w-full"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg"
            >
              {isSubmitting ? "Adding..." : "Add Corporate Email Exercise"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default DevelopYourSkills;
