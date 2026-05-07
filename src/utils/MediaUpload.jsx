


// import axios from "axios";
// import { Image, Video, X } from "lucide-react";
// import { useRef, useState } from "react";
// import { Controller } from "react-hook-form";
// import Swal from "sweetalert2";

// const CLOUD_NAME = "damrv9kir";
// const UPLOAD_PRESET = "Betheshape-images";

// const MediaUpload = ({ control, name, label, type = "image", maxSizeMB = 5 }) => {
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [media, setMedia] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const cancelToken = useRef(null);

//   const Icon = type === "video" ? Video : Image;

//   const uploadToCloudinary = async (file, type) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     cancelToken.current = axios.CancelToken.source();

//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
//       formData,
//       {
//         onUploadProgress: (e) => {
//           if (!e.total) return;
//           const percent = Math.round((e.loaded * 100) / e.total);
//           setProgress(percent);
//         },
//         cancelToken: cancelToken.current.token,
//       }
//     );

//     return { url: res.data.secure_url, public_id: res.data.public_id };
//   };

//   const handleDelete = async (field) => {
//     // Cancel ongoing upload
//     if (uploading && cancelToken.current) {
//       cancelToken.current.cancel("Upload canceled by user");
//       setUploading(false);
//     }

//     if (media?.public_id) {
//       try {
//         await axios.post(`https://api.betheshape.com/delete-media/${type}`, {
//           publicId: media.public_id,
//         });
//       } catch (error) {
//         console.error("Delete failed:", error);
//         Swal.fire("Delete Failed", "Could not delete file", "error");
//       }
//     }

//     field.onChange(null);
//     setMedia(null);
//     setProgress(0);
//     setShowSuccess(false);
//   };

//   return (
//     <div className="border p-4 rounded-xl bg-white shadow-sm mb-4">
//       <h4 className="font-semibold mb-3 text-gray-700">
//         {label} (Max {maxSizeMB}MB)
//       </h4>

//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <>
//             {!media && (
//               <label className="relative block cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition">
//                 <Icon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
//                 <p>Click to upload {type}</p>

//                 <input
//                   type="file"
//                   accept={`${type}/*`}
//                   className="hidden"
//                   disabled={uploading}
//                   onChange={async (e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;

//                     if (file.size > maxSizeMB * 1024 * 1024) {
//                       return Swal.fire(
//                         "File Too Large",
//                         `Maximum ${type} size is ${maxSizeMB}MB`,
//                         "warning"
//                       );
//                     }

//                     setUploading(true);
//                     setProgress(0);
//                     setShowSuccess(false);

//                     try {
//                       const uploaded = await uploadToCloudinary(file, type);
//                       setProgress(100);
//                       setTimeout(() => {
//                         setUploading(false);
//                         setMedia(uploaded);
//                         field.onChange(uploaded.url);
//                         setShowSuccess(true);
//                       }, 1000);
//                     } catch (err) {
//                       if (axios.isCancel(err)) {
//                         Swal.fire("Upload canceled", "File upload was canceled", "info");
//                       } else {
//                         Swal.fire("Upload Failed", "Something went wrong", "error");
//                       }
//                       setUploading(false);
//                       setProgress(0);
//                     }
//                   }}
//                 />

//                 {uploading && (
//                   <>
//                     <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-xl">
//                       <p className="text-teal-500 font-semibold mb-3">
//                         Uploading... {progress}%
//                       </p>
//                       <div className="w-3/4 bg-gray-200 rounded-full h-3">
//                         <div
//                           className="bg-teal-500 h-3 rounded-full transition-all duration-300"
//                           style={{ width: `${progress}%` }}
//                         />
//                       </div>
//                     </div>
//                     {/* Close icon during upload */}
//                     <button
//                       type="button"
//                       onClick={() => handleDelete(field)}
//                       className="absolute top-3 right-3 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow"
//                     >
//                       <X size={20} />
//                     </button>
//                   </>
//                 )}
//               </label>
//             )}

//             {media && (
//               <div className="border rounded-xl p-4 space-y-3 relative">
//                 <div className="flex justify-center relative">
//                   {type === "image" ? (
//                     <img
//                       src={media.url}
//                       alt="preview"
//                       className="h-32 object-cover rounded-lg"
//                     />
//                   ) : (
//                     <video src={media.url} controls className="h-32 rounded-lg" />
//                   )}

//                   <button
//                     type="button"
//                     onClick={() => handleDelete(field)}
//                     className="absolute top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 {showSuccess && (
//                   <p className="text-green-600 font-medium text-center">
//                     Uploaded Successfully
//                   </p>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );
// };

// export default MediaUpload;




import axios from "axios";
import { Image, Video, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import Swal from "sweetalert2";

const CLOUD_NAME = "damrv9kir";
const UPLOAD_PRESET = "Betheshape-images";

const MediaUpload = ({
  control,
  name,
  label,
  type = "image",
  maxSizeMB = 5,
  resetSignal, // <-- accept the prop
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [media, setMedia] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const cancelToken = useRef(null);

  const Icon = type === "video" ? Video : Image;

  // ------------------- WATCH RESET SIGNAL -------------------
  useEffect(() => {
    if (resetSignal) {
      setMedia(null);
      setProgress(0);
      setUploading(false);
      setShowSuccess(false);
    }
  }, [resetSignal]);

  const uploadToCloudinary = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    cancelToken.current = axios.CancelToken.source();

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
      formData,
      {
        onUploadProgress: (e) => {
          if (!e.total) return;
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
        cancelToken: cancelToken.current.token,
      }
    );

    return { url: res.data.secure_url, public_id: res.data.public_id };
  };

  const handleDelete = async (field) => {
    if (uploading && cancelToken.current) {
      cancelToken.current.cancel("Upload canceled by user");
      setUploading(false);
    }

    if (media?.public_id) {
      try {
        await axios.post(`https://api.betheshape.com/delete-media/${type}`, {
          publicId: media.public_id,
        });
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Delete Failed", "Could not delete file", "error");
      }
    }

    field.onChange(null);
    setMedia(null);
    setProgress(0);
    setShowSuccess(false);
  };

  return (
    <div className="border p-4 rounded-xl bg-white shadow-sm mb-4">
      <h4 className="font-semibold mb-3 text-gray-700">
        {label} (Max {maxSizeMB}MB)
      </h4>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {!media && (
              <label className="relative block cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition">
                <Icon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p>Click to upload {type}</p>

                <input
                  type="file"
                  accept={`${type}/*`}
                  className="hidden"
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    if (file.size > maxSizeMB * 1024 * 1024) {
                      return Swal.fire(
                        "File Too Large",
                        `Maximum ${type} size is ${maxSizeMB}MB`,
                        "warning"
                      );
                    }

                    setUploading(true);
                    setProgress(0);
                    setShowSuccess(false);

                    try {
                      const uploaded = await uploadToCloudinary(file, type);
                      setProgress(100);
                      setTimeout(() => {
                        setUploading(false);
                        setMedia(uploaded);
                        field.onChange(uploaded.url);
                        setShowSuccess(true);
                      }, 1000);
                    } catch (err) {
                      if (axios.isCancel(err)) {
                        Swal.fire(
                          "Upload canceled",
                          "File upload was canceled",
                          "info"
                        );
                      } else {
                        Swal.fire("Upload Failed", "Something went wrong", "error");
                      }
                      setUploading(false);
                      setProgress(0);
                    }
                  }}
                />

                {uploading && (
                  <>
                    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-xl">
                      <p className="text-teal-500 font-semibold mb-3">
                        Uploading... {progress}%
                      </p>
                      <div className="w-3/4 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-teal-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(field)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow"
                    >
                      <X size={20} />
                    </button>
                  </>
                )}
              </label>
            )}

            {media && (
              <div className="border rounded-xl p-4 space-y-3 relative">
                <div className="flex justify-center relative">
                  {type === "image" ? (
                    <img
                      src={media.url}
                      alt="preview"
                      className="h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <video src={media.url} controls className="h-32 rounded-lg" />
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(field)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow"
                  >
                    <X size={20} />
                  </button>
                </div>

                {showSuccess && (
                  <p className="text-green-600 font-medium text-center">
                    Uploaded Successfully
                  </p>
                )}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MediaUpload;