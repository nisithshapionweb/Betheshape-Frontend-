import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TittleAnimation from "../../../../components/TittleAnimation/TittleAnimation";

const CLOUD_NAME = "damrv9kir";
const UPLOAD_PRESET = "Betheshape-images";

const AdminPromotion = () => {
  // ✅ Get Bangladesh Current Date & Time
  const getBDNow = () => {
    const now = new Date();

    const bdTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
    );

    const year = bdTime.getFullYear();
    const month = String(bdTime.getMonth() + 1).padStart(2, "0");
    const day = String(bdTime.getDate()).padStart(2, "0");

    const hours = String(bdTime.getHours()).padStart(2, "0");
    const minutes = String(bdTime.getMinutes()).padStart(2, "0");

    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`,
      bdDateObj: bdTime,
    };
  };

  const bdNow = getBDNow();

  const oneHourLater = new Date(bdNow.bdDateObj.getTime() + 60 * 60 * 1000);

  const endYear = oneHourLater.getFullYear();
  const endMonth = String(oneHourLater.getMonth() + 1).padStart(2, "0");
  const endDay = String(oneHourLater.getDate()).padStart(2, "0");
  const endHours = String(oneHourLater.getHours()).padStart(2, "0");
  const endMinutes = String(oneHourLater.getMinutes()).padStart(2, "0");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: bdNow.date,
    startTime: bdNow.time,
    endDate: `${endYear}-${endMonth}-${endDay}`,
    endTime: `${endHours}:${endMinutes}`,
    image: null,
    pdf: null,
    link: "",
    position: "",
  });

  const [loading, setLoading] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Upload Image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
    const imgFormData = new FormData();
    imgFormData.append("file", imageFile);
    imgFormData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      imgFormData,
    );

    return response.data.secure_url;
  };

  // ✅ Upload PDF to Cloudinary
  const uploadPDFToCloudinary = async (pdfFile) => {
    const pdfFormData = new FormData();
    pdfFormData.append("file", pdfFile);
    pdfFormData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      pdfFormData,
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setLoading(true);

    try {
      let imageUrl = "";
      let pdfUrl = "";

      // Image Upload
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      } else {
        toast.error("Image is required!");
        setSubmitting(false);
        setLoading(false);
        return;
      }

      // PDF Upload (Optional)
      if (formData.pdf) {
        pdfUrl = await uploadPDFToCloudinary(formData.pdf);
      }

      // ✅ FIXED: Date creation with proper timezone handling
      // Bangladesh time ke UTC te convert
      const startAt = new Date(
        `${formData.startDate}T${formData.startTime}:00+06:00`,
      );
      const expireAt = new Date(
        `${formData.endDate}T${formData.endTime}:00+06:00`,
      );

      // Validate dates
      if (isNaN(startAt.getTime()) || isNaN(expireAt.getTime())) {
        toast.error("Invalid date format!");
        setSubmitting(false);
        setLoading(false);
        return;
      }

      if (expireAt <= startAt) {
        toast.error("End time must be after start time!");
        setSubmitting(false);
        setLoading(false);
        return;
      }

      const promotionData = {
        title: formData.title,
        description: formData.description,
        startAt: startAt.toISOString(), // Save as ISO string
        expireAt: expireAt.toISOString(), // Save as ISO string
        position: formData.position,
        imageUrl,
        pdfUrl,
        link: formData.link,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      await axios.post(
        "https://api.betheshape.com/api/promotions",
        promotionData,
      );

      toast.success("Promotion saved successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        image: null,
        pdf: null,
        link: "",
        position: "",
      });

      // Clear file inputs
      document.querySelectorAll('input[type="file"]').forEach((input) => {
        input.value = "";
      });

      // Refresh promotions list
      await fetchPromotions();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed! Check Cloudinary settings.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const fetchPromotions = async () => {
    setFetchLoading(true);
    try {
      const response = await axios.get(
        "https://api.betheshape.com/api/promotions",
      );
      setPromotions(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load promotions!", "error");
    } finally {
      setFetchLoading(false);
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
        await axios.delete(`https://api.betheshape.com/api/promotions/${id}`);
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

  // ✅ FIXED: Function to determine promotion status correctly
  const getPromotionStatus = (startAt, expireAt) => {
    const now = new Date();

    // Parse dates properly
    const start = new Date(startAt);
    const expire = new Date(expireAt);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(expire.getTime())) {
      return { status: "Invalid Date", color: "bg-gray-100 text-gray-600" };
    }

    if (now < start) {
      return { status: "Upcoming", color: "bg-yellow-100 text-yellow-600" };
    } else if (now >= start && now <= expire) {
      return { status: "Active", color: "bg-green-100 text-green-600" };
    } else {
      return { status: "Expired", color: "bg-red-100 text-red-600" };
    }
  };

  // ✅ FIXED: Format date properly with Bangladesh timezone
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    });
  };

  // ✅ FIXED: Get counts for summary
  const getStatusCounts = () => {
    let active = 0,
      upcoming = 0,
      expired = 0,
      invalid = 0;

    promotions.forEach((promo) => {
      const start = new Date(promo.startAt);
      const expire = new Date(promo.expireAt);
      const now = new Date();

      // Skip invalid dates
      if (
        isNaN(start.getTime()) ||
        isNaN(expire.getTime()) ||
        start.getFullYear() < 1971 ||
        expire.getFullYear() < 1971
      ) {
        invalid++;
        return;
      }

      if (now < start) {
        upcoming++;
      } else if (now >= start && now <= expire) {
        active++;
      } else {
        expired++;
      }
    });

    return { active, upcoming, expired, invalid };
  };

  return (
    <>
      <Helmet>
        <title>Admin | Promotion</title>
      </Helmet>
      <TittleAnimation tittle="Create Promotion" subtittle="Manage Promotion" />
      <div className="max-w-[1400px] mx-auto py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4 border"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promotion Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              placeholder="Enter promotion title"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promotion Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              placeholder="Enter promotion description"
              required
              disabled={loading}
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Position
            </label>
            <select
              name="position"
              value={formData.position || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              required
              disabled={loading}
            >
              <option value="">📌 Select Position</option>
              <option value="home_bottom">🏠 Home Page - Bottom</option>
              <option value="layer_1_bottom">📱 First Layer - Bottom</option>
              <option value="layer_2_bottom">📱 Second Layer - Bottom</option>
              <option value="layer_3_bottom">📱 Third Layer - Bottom</option>
              <option value="layer_4_bottom">📱 Fourth Layer - Bottom</option>
              <option value="layer_5_bottom">📱 Fifth Layer - Bottom</option>
              <option value="layer_6_bottom">📱 Sixth Layer - Bottom</option>
              <option value="layer_7_bottom">📱 Seventh Layer - Bottom</option>
            </select>
          </div>

          {/* Start Date & Time */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={bdNow.date}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
                disabled={loading}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* End Date & Time */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
                disabled={loading}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Preview */}
          {formData.startDate &&
            formData.endDate &&
            formData.startTime &&
            formData.endTime && (
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-700">
                  ⏰ Starts:{" "}
                  {new Date(
                    `${formData.startDate}T${formData.startTime}:00+06:00`,
                  ).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}
                  <br />⏰ Expires:{" "}
                  {new Date(
                    `${formData.endDate}T${formData.endTime}:00+06:00`,
                  ).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}
                </p>
              </div>
            )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promotion Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={loading}
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promotion PDF (Optional)
            </label>
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promotion Link (Optional)
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={loading || submitting}
              className={`px-6 py-2 rounded-md text-white ${
                loading || submitting
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Saving..." : "Save Promotion"}
            </button>
          </div>
        </form>

        {/* Promotion History */}
        <div className="bg-white shadow-lg rounded-xl border p-4 sm:p-6 mt-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-700">
            Promotion History
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm sm:text-base">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Position</th>
                  <th className="px-4 py-2">Start</th>
                  <th className="px-4 py-2">Expire</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {fetchLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                        <span className="ml-2">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : promotions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No Promotion Found
                    </td>
                  </tr>
                ) : (
                  promotions.map((item) => {
                    const { status, color } = getPromotionStatus(
                      item.startAt,
                      item.expireAt,
                    );

                    return (
                      <tr key={item._id} className="hover:bg-gray-50 border-b">
                        <td className="px-4 py-2 text-center">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-14 h-14 object-cover rounded-md mx-auto border"
                            />
                          ) : (
                            <span className="text-gray-400">No Image</span>
                          )}
                        </td>

                        <td className="px-4 py-2 font-medium">{item.title}</td>

                        <td className="px-4 py-2">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {item.position}
                          </span>
                        </td>

                        <td className="px-4 py-2 text-xs">
                          {formatDate(item.startAt)}
                        </td>

                        <td className="px-4 py-2 text-xs">
                          {formatDate(item.expireAt)}
                        </td>

                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${color}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={deletingId === item._id}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs disabled:bg-red-300"
                          >
                            {deletingId === item._id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          {!fetchLoading && promotions.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
              {(() => {
                const { active, upcoming, expired, invalid } =
                  getStatusCounts();
                return (
                  <>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-700">
                        <span className="font-bold">Active:</span> {active}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-700">
                        <span className="font-bold">Upcoming:</span> {upcoming}
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm text-red-700">
                        <span className="font-bold">Expired:</span> {expired}
                      </p>
                    </div>
                    {invalid > 0 && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-bold">Invalid Dates:</span>{" "}
                          {invalid}
                        </p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPromotion;
