import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminPromotionHistory = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/promotions");
      setPromotions(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load promotions!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        await axios.delete(`http://localhost:5000/api/promotions/${id}`);
        setPromotions(promotions.filter((promo) => promo._id !== id));
        Swal.fire("Deleted!", "Promotion has been deleted.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete promotion!", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-indigo-600">
        Promotion History
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading promotions...</p>
      ) : promotions.length === 0 ? (
        <p className="text-center text-gray-500">No promotions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo._id}
              className="card bg-base-200 shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <figure>
                <img
                  src={
                    promo.imageUrl ||
                    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                  alt={promo.title || "Promotion"}
                  className="w-full h-48 object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title flex items-center justify-between">
                  {promo.title || "Promotion Title"}
                  <span className="badge badge-secondary">NEW</span>
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Position:</span>{" "}
                  {promo.position || "General"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Start:</span> {promo.startDate}{" "}
                  {promo.startTime}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">End:</span> {promo.endDate}{" "}
                  {promo.endTime}
                </p>

                {promo.link && (
                  <p className="text-sm mb-1">
                    <span className="font-medium">Link:</span>{" "}
                    <a
                      href={promo.link}
                      target="_blank"
                      className="text-indigo-600 underline"
                    >
                      Visit
                    </a>
                  </p>
                )}

                {promo.pdf && (
                  <p className="text-sm mb-3">
                    <span className="font-medium">PDF:</span>{" "}
                    <a
                      href={promo.pdf}
                      target="_blank"
                      className="text-indigo-600 underline"
                    >
                      Download
                    </a>
                  </p>
                )}

                {/* Delete Button at the bottom */}
                <div className="card-actions justify-center">
                  <button
                    onClick={() => handleDelete(promo._id)}
                    disabled={deletingId === promo._id}
                    className="btn w-full bg-red-600 hover:bg-red-800 text-white rounded-md flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPromotionHistory;
