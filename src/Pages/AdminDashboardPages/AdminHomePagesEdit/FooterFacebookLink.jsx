import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaSave,
    FaTiktok,
    FaTwitter,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
import Swal from "sweetalert2";

const platforms = [
  { name: "facebook", icon: <FaFacebook className="text-blue-600 text-2xl" /> },
  { name: "youtube", icon: <FaYoutube className="text-red-600 text-2xl" /> },
  { name: "instagram", icon: <FaInstagram className="text-pink-500 text-2xl" /> },
  { name: "twitter", icon: <FaTwitter className="text-sky-500 text-2xl" /> },
  { name: "linkedin", icon: <FaLinkedin className="text-blue-700 text-2xl" /> },
  { name: "tiktok", icon: <FaTiktok className="text-black text-2xl" /> },
  { name: "whatsapp", icon: <FaWhatsapp className="text-green-500 text-2xl" /> },
];

const AdminSocialLinks = () => {
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [tempUrl, setTempUrl] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/social-links"
        );
        setLinks(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to fetch social links.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleEdit = (platform) => {
    setEditing(platform);
    setTempUrl(links[platform] || "");
  };

  const handleSave = async (platform) => {
    // 🔹 Empty URL → Remove confirmation
    if (!tempUrl.trim()) {
      const confirm = await Swal.fire({
        title: "Remove Link?",
        text: `Are you sure you want to remove the ${platform} link?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it",
        cancelButtonText: "Cancel",
      });

      if (!confirm.isConfirmed) return;

      try {
        const { data } = await axios.put(
          "http://localhost:5000/api/admin/social-links",
          { platform, url: "" } // Backend handles delete
        );

        if (data.success) {
          setLinks((prev) => {
            const newLinks = { ...prev };
            delete newLinks[platform];
            return newLinks;
          });
          setEditing(null);

          Swal.fire({
            icon: "success",
            title: "Removed!",
            text: `${platform.toUpperCase()} link removed successfully.`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text:
            error.response?.data?.error ||
            "Something went wrong while removing link.",
        });
      }

      return;
    }

    // 🔹 Normal update
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/admin/social-links",
        { platform, url: tempUrl }
      );

      if (data.success) {
        setLinks((prev) => ({ ...prev, [platform]: tempUrl }));
        setEditing(null);

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `${platform.toUpperCase()} link updated successfully.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.error ||
          "Something went wrong while updating.",
      });
    }
  };

  if (loading)
    return <div className="p-4 text-center">Loading social links...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-[1400px] mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">
        Social Media Links
      </h2>

      <div className="space-y-4">
        {platforms.map(({ name, icon }) => (
          <div key={name} className="flex items-center gap-4 border-b pb-3">
            <div className="w-10">{icon}</div>

            {editing === name ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder={`Enter ${name} URL or leave empty to remove`}
                  className="flex-1 input input-bordered"
                />
                <button
                  onClick={() => handleSave(name)}
                  className="btn btn-primary btn-sm"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  {links[name] ? (
                    <a
                      href={links[name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary break-all"
                    >
                      {links[name]}
                    </a>
                  ) : (
                    <span className="text-gray-400">No link set</span>
                  )}
                </div>

                <button
                  onClick={() => handleEdit(name)}
                  className="btn btn-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSocialLinks;