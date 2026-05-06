
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const LetterWrittingFormat = () => {
  const axiosPublic = useAxiosPublic();

  const { data: letterWritingFields = [], isLoading: fieldsLoading } =
    useQuery({
      queryKey: ["letterWritingFields"],
      queryFn: async () => {
        const res = await axiosPublic.get("/seven-layer/letterWritingField");
        return res.data?.data || [];
      },
    });

  const { data: letterWriting = [], isLoading: lettersLoading } =
    useQuery({
      queryKey: ["letterWriting"],
      queryFn: async () => {
        const res = await axiosPublic.get("/seven-layer/letterWriting");
        return res.data || [];
      },
    });

  const isLoading = fieldsLoading || lettersLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-gray-500 text-lg">
        Loading letter content...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-3 md:px-10 bg-gray-100">

      {/* ================= Field Section ================= */}
      <section className="mb-16 max-w-[1400px] mx-auto text-center space-y-8">
        {letterWritingFields.map((field) => (
          <div
            key={field._id}
            className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-6 md:p-8 rounded-lg shadow-md border-l-4 border-teal-500 relative overflow-hidden"
          >
            {/* Background Decorative Shape */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-300 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>

            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 relative z-10">
              {field.title}
            </h2>
            <div
              className="mt-4 text-gray-600 text-justify leading-relaxed relative z-10"
              dangerouslySetInnerHTML={{ __html: field.description }}
            />
          </div>
        ))}
      </section>

      {/* ================= Letter Section ================= */}
      <section className="flex flex-col items-center gap-14">
        {letterWriting.map((letter) => (
          <article
            key={letter._id}
            className="relative w-full max-w-[900px] bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Decorative Shapes */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 opacity-10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-purple-600 opacity-10 rounded-tr-full"></div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="text-[60px] md:text-[120px] font-bold text-gray-300 opacity-40 rotate-[-30deg] select-none tracking-widest">
                OFFICIAL
              </h1>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 px-6 py-12 md:px-20 md:py-20">

              {/* Letter Header */}
              <header className="mb-8 text-center">
                <h3 className="text-xl md:text-3xl font-serif font-bold text-gray-900">
                  {letter.name}
                </h3>
                <div className="w-24 h-[2px] bg-blue-600 mx-auto mt-3"></div>
              </header>

              {/* Letter Content */}
              {/* <div
                className="text-[14px] md:text-[17px] leading-7 md:leading-8 text-gray-800 text-justify"
                dangerouslySetInnerHTML={{ __html: letter.description }}
              /> */}

           <div className="relative pl-6 overflow-hidden">

  {/* Vertical Accent Line */}
  <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-teal-200 to-purple-200 rounded"></div>

  {/* Small Subtle Shapes */}

  {/* Small Circle */}
  <div className="absolute top-6 right-8 w-3 h-3 bg-teal-300 opacity-40 rounded-full"></div>

  {/* Small Square */}
  <div className="absolute top-24 right-16 w-3 h-3 bg-purple-300 opacity-40 rotate-12"></div>

  {/* Small Triangle */}
  <div className="absolute bottom-16 left-10 w-0 h-0 
      border-l-[6px] border-l-transparent
      border-r-[6px] border-r-transparent
      border-b-[10px] border-b-blue-300
      opacity-40">
  </div>

  {/* Small Dot Pattern */}
  <div className="absolute bottom-6 right-10 w-2 h-2 bg-gray-300 opacity-40 rounded-full"></div>
  <div className="absolute bottom-10 right-14 w-2 h-2 bg-gray-300 opacity-30 rounded-full"></div>
  <div className="absolute bottom-14 right-18 w-2 h-2 bg-gray-300 opacity-20 rounded-full"></div>

  {/* Content */}
  <div
    className="relative z-10 text-[14px] md:text-[17px] leading-7 md:leading-8 text-gray-800 text-justify"
    dangerouslySetInnerHTML={{ __html: letter.description }}
  />
</div>
              {/* Signature */}
              <div className="mt-14 text-right text-sm md:text-base text-gray-700 italic">
                — {letter.writtingBy || "Authorized Person"}
              </div>

            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default LetterWrittingFormat;