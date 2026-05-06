import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Eye, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import AdminLoading from "../../../components/Loading/AdminLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManageUserNobel = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [selectedNobel, setSelectedNobel] = useState(null);

  // ✅ Get All Posts
  const { data: nobels = [], isLoading } = useQuery({
    queryKey: ["adminUserNobel"],
    queryFn: async () => {
      const res = await axiosPublic.get("/userNobel/admin/all");
      return res.data || [];
    },
  });

  // ✅ Update Status
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosPublic.patch(`/userNobel/admin/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUserNobel"]);
      Swal.fire("Updated!", "Status updated successfully.", "success");
    },
  });

  // ✅ Delete
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/userNobel/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUserNobel"]);
      Swal.fire("Deleted!", "Post deleted successfully.", "success");
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <AdminLoading />;

  return (
    <div className="max-w-[1400px] mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Manage User Nobel Posts
      </h2>

      <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
        {nobels.length === 0 ? (
          <p className="text-center text-gray-500">No posts found.</p>
        ) : (
          nobels.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {item.ideaShareImage && (
                  <img
                    src={item.ideaShareImage}
                    alt="nobel"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                )}

                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>

                  <p className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>

                  <p
                    className={`text-sm mt-1 font-medium ${
                      item.status === "pending"
                        ? "text-yellow-500"
                        : item.status === "accepted"
                          ? "text-green-600"
                          : "text-red-500"
                    }`}
                  >
                    Status: {item.status}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 items-center">
                {/* 👁 See Details */}
                <button
                  onClick={() => setSelectedNobel(item)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                >
                  <Eye size={16} /> See More
                </button>

                {item.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        statusMutation.mutate({
                          id: item._id,
                          status: "accepted",
                        })
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                    >
                      <CheckCircle size={16} /> Accept
                    </button>

                    <button
                      onClick={() =>
                        statusMutation.mutate({
                          id: item._id,
                          status: "rejected",
                        })
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= MODAL ================= */}
      {/* ================= MODAL ================= */}
      {selectedNobel && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-xl relative flex flex-col">
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{selectedNobel.name}</h3>
              <button
                onClick={() => setSelectedNobel(null)}
                className="text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto">
              {selectedNobel.ideaShareImage && (
                <img
                  src={selectedNobel.ideaShareImage}
                  alt="nobel"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-700 mb-2">
                <strong>Link:</strong>{" "}
                <a
                  href={selectedNobel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all hover:text-blue-800"
                >
                  {selectedNobel.link}
                </a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> {selectedNobel.email}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Status:</strong> {selectedNobel.status}
              </p>

              <div
                className="text-gray-700 mt-4 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: selectedNobel.description }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUserNobel;
