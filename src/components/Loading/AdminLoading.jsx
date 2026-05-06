import { FadeLoader } from "react-spinners";

const AdminLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4">
        <FadeLoader color="#134e4a" size={60} speedMultiplier={1.2} />
        <p className="text-teal-700 font-semibold text-lg tracking-wide animate-pulse">
          Loading Dashboard, please wait...
        </p>
      </div>
    </div>
  );
};

export default AdminLoading;
