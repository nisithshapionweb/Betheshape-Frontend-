// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/pagination";
// import CustomLoading from "../../components/Loading/CustomLoading";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const HometextCreateui = () => {
//   const axiosPublic = useAxiosPublic();

//   const { data: banners = [], isLoading } = useQuery({
//     queryKey: ["activeBanner"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/banner?status=active");
//       return res.data;
//     },
//     refetchOnWindowFocus: true,
//   });

//   if (isLoading) {
//     return <CustomLoading />;
//   }
//   const activeBanner = banners[0]; // 👈 take the first active banner

//   return (
//     <div>
//       <Helmet>
//         <title>Be The Shape | Home</title>
//       </Helmet>
//       <div className="flex items-center justify-center mt-10 max-w-[1400px] mx-auto min-h-[50vh] ">
//         <div className="w-full">
//           <div className="flex items-center flex-col-reverse lg:flex-row gap-6">
//             {/* Text Section */}
//             <div className="w-full text-center">
//               <motion.h1
//                 data-translate
//                 className="text-2xl md:text-4xl font-bold text-[#2e5a44] text-justify"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
//               >
//                 {activeBanner?.title ||
//                   "Challenge Your Mind, One Question at a Time!"}
//               </motion.h1>

//               <motion.p
//                 data-translate
//                 className="py-4 text-base lg:text-lg text-justify"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
//               >
//                 {activeBanner?.description ||
//                   `Welcome to the ultimate quiz adventure! Explore a wide variety of topics—from science and technology to history, literature, and pop culture. Challenge your knowledge with thought-provoking questions, sharpen your skills, and unlock new achievements as you progress. Whether you’re a curious learner or a competitive quiz master, our interactive quizzes make learning fun, exciting, and rewarding. Track your scores, compete with friends, and discover how much you really know. Every question is a step towards becoming a true knowledge champion!`}
//               </motion.p>

//               <Link
//                 data-translate
//                 to="/courses"
//                 className="btn bg-bgButton text-white px-6 py-4 mb-12 rounded-md text-base hover:bg-inherit hover:text-hoverTextPrimary transition-colors duration-300"
//               >
//                 JOIN QUIZ
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HometextCreateui;
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import CustomLoading from "../../components/Loading/CustomLoading";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const HometextCreateui = () => {
  const axiosPublic = useAxiosPublic();

  // fetch banner data
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["activeBanner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner?status=active");
      return res.data;
    },
    refetchOnWindowFocus: true,
  });

  const activeBanner = banners[0];

  if (isLoading) return <CustomLoading />;

  return (
    <div>
      <Helmet>
        <title>Be The Shape | Home</title>
      </Helmet>

      {/* Banner Section */}
      <div className="flex items-center justify-center mt-10 max-w-[1400px] mx-auto min-h-[50vh] ">
        <div className="w-full">
          <div className="flex items-center flex-col-reverse lg:flex-row gap-6">
            <div className="w-full text-center">

              {/* Title */}
              <motion.h1
                data-translate={activeBanner?.title || "Challenge Your Mind, One Question at a Time!"}
                className="text-2xl md:text-4xl font-bold text-[#2e5a44] text-justify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                {activeBanner?.title || "Challenge Your Mind, One Question at a Time!"}
              </motion.h1>

              {/* Description */}
              <motion.p
                data-translate={activeBanner?.description || `Welcome to the ultimate quiz adventure! Explore a wide variety of topics—from science and technology to history, literature, and pop culture.`}
                className="py-4 text-base lg:text-lg text-justify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                {activeBanner?.description || `Welcome to the ultimate quiz adventure! Explore a wide variety of topics—from science and technology to history, literature, and pop culture.`}
              </motion.p>

              {/* Button */}
              <Link
                data-translate="JOIN QUIZ"
                to="/b-a-shape-formats/fifth-layer"
                className="btn bg-teal-600 text-white px-6 py-4 mb-12 rounded-md text-base hover:bg-inherit hover:text-teal-800 transition-colors duration-300"
              >
                JOIN QUIZ
              </Link>
            </div>
          </div>
        </div>
      </div>

     
     
    </div>
  );
};

export default HometextCreateui;
