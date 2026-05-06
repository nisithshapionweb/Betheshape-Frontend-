import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const LayerGuard = ({ fieldName, children }) => {
  const axiosPublic = useAxiosPublic();

  const { data: field, isLoading } = useQuery({
    queryKey: ["field"],
    queryFn: async () => {
      const res = await axiosPublic.get("/layer-management/field");
      return res.data?.data || [];
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  const layer = field.find((f) => f.fieldName === fieldName);

  if (!layer || layer.isActive !== "ON") {
    return (
      <div className="flex items-center justify-center h-[50vh] text-center text-2xl md:text-5xl font-semibold text-red-600">
        Admin has blocked this page.
      </div>
    );
  }

  return children;
};

export default LayerGuard;
