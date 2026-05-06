import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import {
  FaCamera,
  FaCheckCircle,
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";
import useAxioPublic from "../../hooks/useAxiosPublic";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosPublic = useAxioPublic();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 300000,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleProfileUpdate = async (data) => {
  setLoading(true);
  try {
    let imageUrl = userData?.imageUrl || null;

    if (image) {
      // ✅ Cloudinary Upload
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "Betheshape-images"); 
      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/damrv9kir/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then(res => res.json());

      if (cloudinaryRes.secure_url) {
        imageUrl = cloudinaryRes.secure_url;
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Image upload failed! Please try again.",
        });
        setLoading(false);
        return;
      }
    }

    const updatedData = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      imageUrl,
    };

    const response = await axiosPublic.patch(`/users/update/${userEmail}`, updatedData);

    if (response.status === 200) {
      refetch();
      setIsEditing(false);
      reset(data);
      setImage(null);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update profile. Please try again.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "An error occurred while updating your profile.",
    });
  } finally {
    setLoading(false);
  }
};

  const handleImageChange = (e) => setImage(e.target.files[0]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className=" ">
      <Helmet>
        <title>Be The Shape | Profile Management</title>
      </Helmet>
      <div className="mx-auto">
        <div className="bg-white rounded-lg max-w-[1400px] mx-auto  border  shadow-xl hover:shadow-2xl overflow-hidden">
          <div className="p-5 md:p-8 lg:p-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl md:text-2xl font-bold text-primary">
                Profile Management
              </h1>
              <button
                onClick={handleEditClick}
                className={`text-2xl p-2 rounded-full ${
                  isEditing
                    ? "bg-green-500 text-white"
                    : "bg-primary text-white hover:bg-hoverPrimary"
                } transition-all duration-300 ease-in-out`}
              >
                {isEditing ? <FaCheckCircle /> : <FaEdit />}
              </button>
            </div>
            {isEditing ? (
              <>
                {" "}
                <TittleAnimation subtittle="Edit My Profile" />
              </>
            ) : (
              <>
                {" "}
                <TittleAnimation subtittle="My Profile " />
              </>
            )}
            <div className="mb-12 text-center">
              <div className="relative inline-block">
                <img
                  className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-lg"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData?.imageUrl ||
                        "https://ui-avatars.com/api/?name=Profile&background=4800ff&color=ffffff&size=150"
                  }
                  alt="Profile"
                  onLoad={(e) => image && URL.revokeObjectURL(e.target.src)}
                />
                {isEditing && (
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full cursor-pointer hover:bg-hoverPrimary transition-colors duration-200 shadow-lg"
                  >
                    <FaCamera />
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-primary">
                {userData?.name || ""}
              </h2>
              <p className="text-gray-600">{userData?.email}</p>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSubmit(handleProfileUpdate)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProfileField
                    name="name"
                    label="Name"
                    control={control}
                    defaultValue={userData?.name}
                    rules={{
                      required: "Name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Name can only contain letters and spaces",
                      },
                    }}
                    icon={<FaUser className="text-indigo-500" />}
                  />
                  <ProfileField
                    name="email"
                    label="Email Address"
                    control={control}
                    defaultValue={userData?.email || userEmail}
                    readOnly
                    icon={<FaEnvelope className="text-indigo-500" />}
                  />
                  <ProfileField
                    name="address"
                    label="Residential Address"
                    control={control}
                    defaultValue={userData?.address}
                    rules={{ required: "Address is required" }}
                    icon={<FaMapMarkerAlt className="text-indigo-500" />}
                  />
                  <ProfileField
                    name="phone"
                    label="Phone Number"
                    control={control}
                    defaultValue={userData?.phone}
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Enter a valid 11-digit phone number",
                      },
                    }}
                    icon={<FaPhone className="text-indigo-500" />}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    className="px-6 py-3 rounded-lg text-lg font-semibold bg-gray-300 hover:bg-gray-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-lg text-lg font-semibold ${
                      loading || (!isDirty && !image)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary hover:bg-hoverPrimary text-white"
                    } transition-colors duration-200`}
                    disabled={loading || (!isDirty && !image)}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <ProfileInfo
                    label="Name"
                    value={userData?.name}
                    icon={<FaUser />}
                    bgColor="bg-green-100"
                  />
                  <ProfileInfo
                    label="Email Address"
                    value={userData?.email}
                    icon={<FaEnvelope />}
                    bgColor="bg-orange-100"
                  />
                  <ProfileInfo
                    label="Residential Address"
                    value={userData?.address}
                    icon={<FaMapMarkerAlt />}
                    bgColor="bg-indigo-100"
                  />
                  <ProfileInfo
                    label="Phone Number"
                    value={userData?.phone}
                    icon={<FaPhone />}
                    bgColor="bg-blue-100"
                  />
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                    Profile Completeness
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>Progress</span>
                    <span>{calculateProfileCompleteness(userData)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-500 h-2.5 rounded-full"
                      style={{
                        width: `${calculateProfileCompleteness(userData)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Completing your profile helps us provide a better,
                    personalized experience.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-indigo-100 p-6 text-center">
            <p className="text-sm text-gray-600">
              Last updated: {formatDate(userData?.updatedAt)} | Member since:{" "}
              {formatDate(userData?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  name,
  label,
  control,
  defaultValue,
  rules,
  icon,
  readOnly = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium mb-2 text-gray-700"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <input
            {...field}
            id={name}
            readOnly={readOnly}
            className={`w-full pl-10 pr-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
    </div>
    {rules && (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ fieldState: { error } }) =>
          error && <p className="mt-1 text-sm text-red-500">{error.message}</p>
        }
      />
    )}
  </div>
);
const ProfileInfo = ({ label, value, icon, bgColor }) => (
  <div
    className={`${bgColor} p-6 rounded-lg flex items-start space-x-4 shadow-md`}
  >
    <div className="text-indigo-600 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-800">{value || "Not provided"}</p>
    </div>
  </div>
);

// const ProfileInfo = ({ label, value, icon,bgColor }) => (
//   <div className="bg-gray-100 p-6 rounded-lg flex items-start space-x-4">
//     <div className="text-indigo-600 mt-1">{icon}</div>
//     <div>
//       <p className="text-sm text-gray-600 mb-1">{label}</p>
//       <p className="font-medium text-black">{value || "Not provided"}</p>
//     </div>
//   </div>
// );

const calculateProfileCompleteness = (userData) => {
  const fields = ["name", "email", "address", "phone", "imageUrl"];
  const filledFields = fields.filter((field) => userData && userData[field]);
  return Math.round((filledFields.length / fields.length) * 100);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default Profile;
