import { useQuery } from "@tanstack/react-query";
import { ImageOff, Link2Off } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdMenuBook } from "react-icons/md";
import Swal from "sweetalert2";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RichTextField from "../../../shared/TextEditor/RichTextField";
import MediaUpload from "../../../utils/MediaUpload";

const GoodNobelFormat = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [resetSignal, setResetSignal] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      ideaShareImage: "",
      link: "",
    },
  });

  // ✅ Fetch goodNobel fields
  const { data: goodNobelFields = [], isLoading: goodNobelFieldsLoading } =
    useQuery({
      queryKey: ["goodNobelFields"],
      queryFn: async () => {
        const res = await axiosPublic.get("/seven-layer/goodNobelField");
        return res.data?.data || [];
      },
    });

  // ✅ Fetch all goodNobels
  const { data: goodNobels = [], isLoading: goodNobelsLoading } = useQuery({
    queryKey: ["goodNobels"],
    queryFn: async () => {
      const res = await axiosPublic.get("/seven-layer/goodNobel");
      return res.data || [];
    },
  });

  if (goodNobelFieldsLoading || goodNobelsLoading) {
    return <CustomLoading />;
  }
  // ✅ Reset Form
  const resetForm = () => {
    reset({
      name: "",
      ideaShareImage: "",
      description: "",
      link: "",
    });
    setResetSignal((prev) => prev + 1);
  };

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      link: data.link,
      ideaShareImage: data.ideaShareImage,
      userInfo: {
        userId: user?._id,
        name: user?.displayName,
        email: user?.email,
        role: user?.role,
      },
    };

    try {
      const res = await axiosPublic.post(
        "/seven-layer/createExercisegoodNobel",
        payload,
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Exercise submitted successfully",
        });
        resetForm();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const activeField = goodNobelFields.find((item) => item.isActive === "ON");

  return (
    <div className="max-w-[1400px] mx-auto  space-y-10 my-10">
      {/* ✅ goodNobel Fields */}
      <section className="text-center">
        {goodNobelFields.length === 0 ? (
          <p className="text-gray-500">No Good Nobel found.</p>
        ) : (
          <div className="space-y-6">
            {goodNobelFields.map((field) => (
              <div
                key={field._id}
                className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-3 md:p-8 rounded-lg shadow-md border-l-4 border-teal-500 relative overflow-hidden mb-8"
              >
                   <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-300 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
                <h3 className="font-bold text-3xl text-teal-700 mb-4">
                  {field.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed text-justify">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ goodNobels Section */}
      <section className="max-w-[1300px] ml-auto">
        {goodNobels.length === 0 ? (
          <p className="text-gray-500 text-center">No Good Nobel found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {goodNobels.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                {/* Image */}

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Nobel Name */}
                  <div className="flex justify-start items-center gap-12">
                    <div>
                      <h2 className="text-xl font-semibold text-teal-700 flex items-center gap-2">
                        <MdMenuBook className="text-orange-600 text-2xl" />
                        <span>{item.name}</span>
                      </h2>
                    </div>
                    <div>
                      {item?.ideaShareImage ? (
                        <div className="h-12 w-full overflow-hidden">
                          <img
                            src={item.ideaShareImage}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <ImageOff size={48} strokeWidth={1.5} />
                          <p className="text-sm mt-2 font-medium">
                            No Nobel Image Available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    className="text-gray-700 text-sm leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t mt-3">
                    {/* Link or Placeholder */}
                    {item?.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
                      >
                        🔗 Visit Nobel
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Link2Off size={16} />
                        <span>No Link Available</span>
                      </div>
                    )}

                    {/* Date (always right) */}
                    <p className="text-xs text-gray-500">
                      {item?.createdAt &&
                        new Date(item.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Learning Your Exercise (ONLY if Active) */}
      {activeField && (
        <section className="card bg-white shadow-2xl rounded-2xl p-4 md:p-6 mt-10 space-y-5">
          <h3 className="text-xl font-semibold text-teal-600">
            📖 Learning Your Good Nobel Exercise
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control w-full py-6">
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
                    placeholder="Enter tittle..."
                    className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                  />
                )}
              />
            </div>
            <div>
              <MediaUpload
                control={control}
                name="ideaShareImage"
                label="Good Nobel Image (Optional)"
                type="image"
                maxSizeMB={5}
                resetSignal={resetSignal}
              />
            </div>
            <div className="form-control w-full py-6">
              <label className="label">
                <span className="label-text text-base font-medium text-gray-700">
                  Link (Optional):
                </span>
              </label>
              <Controller
                name="link"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter tittle..."
                    className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <RichTextField
                name="description"
                control={control}
                placeholder="Enter Your Description..."
                className="w-full " // ensure editor is full width
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg"
            >
              {isSubmitting ? "Adding..." : "Add Good Nobel Exercise"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default GoodNobelFormat;
