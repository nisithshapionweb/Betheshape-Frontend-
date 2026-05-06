import { FadeLoader } from "react-spinners";

const CustomLoading = () => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      
      {/* 🔹 Very light overlay (almost invisible) */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[1.5px]" />

      {/* 🔹 Loader card */}
      <div className="relative flex flex-col items-center gap-3 px-5 py-4 rounded-xl shadow-lg bg-white/70 backdrop-blur-md border border-teal-100">
        
        <FadeLoader
          color="#0f766e"
          height={10}
          width={3}
          radius={2}
          margin={-5}
          speedMultiplier={1.2}
        />

        <p className="text-teal-700 text-xs font-medium tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default CustomLoading;


// import { FadeLoader } from "react-spinners";

// const CustomLoading = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="flex flex-col items-center space-y-4">
//         <FadeLoader   color="#134e4a" size={60} speedMultiplier={1.2} />
//         <p className="text-teal-700 font-semibold text-lg tracking-wide animate-pulse">
//           Loading, please wait...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CustomLoading;
