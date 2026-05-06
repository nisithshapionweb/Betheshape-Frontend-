// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Edit } from "lucide-react";
// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import TittleAnimation from "../../../../components/TittleAnimation/TittleAnimation";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";
// import LayerManagementModal from "./LayerManagementModal";

// const LayerManage = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [fieldName, setFieldName] = useState("");
//   const [selectedLayer, setSelectedLayer] = useState(null);
//   const [currentValue, setCurrentValue] = useState("");

//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();

//   // ✅ Fetch all layers
//   const { data: fields = [], isLoading } = useQuery({
//     queryKey: ["fields"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/layer-management/field");
//       return res.data?.data || [];
//     },
//   });
// console.log(fields)
//   // ✅ Modal Edit Handler
//   const handleEditClick = (field, value, item) => {
//     setFieldName(field);
//     setCurrentValue(value);
//     setSelectedLayer(item);
//     setModalOpen(true);
//   };

//   // ✅ Toggle Handler
//   const toggleIsActiveMutation = useMutation({
//     mutationFn: async ({ layerName, currentState }) => {
//       const res = await axiosPublic.put(`/layer-management/field/toggle`, {
//         layerName,
//         fieldName: "isActive",
//         currentValue: currentState,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: `Layer is now ${data.updatedValue}`,
//       });
//       queryClient.invalidateQueries(["fields"]);
//     },
//     onError: (error) =>
//       Swal.fire(
//         "Error!",
//         error.response?.data?.message || error.message,
//         "error"
//       ),
//   });

//   const handleToggle = (layerName, currentState) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You want to turn ${
//         currentState === "ON" ? "OFF" : "ON"
//       } this layer?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         toggleIsActiveMutation.mutate({ layerName, currentState });
//       }
//     });
//   };

//   if (isLoading) {
//     return <p className="text-center text-gray-500">Loading Layers...</p>;
//   }

//   return (
//     <div >
//       <Helmet>
//         <title>Admin | Layer Management</title>
//       </Helmet>

//       <TittleAnimation
//         tittle="Layer Management"
//         subtittle="Manage Layers & Toggle Activation"
//       />

//       <div className="mt-10 w-full max-w-[1400px] mx-auto">
//         <div className="w-full bg-white shadow-md rounded-2xl p-3 md:p-5">
//           <div className="space-y-4">
//             {fields.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
//               >
//                 <div className="flex items-center gap-2">
//                   <span className="font-semibold">{item.layerName}</span>
//                   <Edit
//                     onClick={() =>
//                       handleEditClick("layerName", item.layerName, item)
//                     }
//                     className="w-5 h-5 text-green-600 cursor-pointer"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-600">
//                     {item.isActive === "ON" ? "Active" : "Inactive"}
//                   </span>
//                   <input
//                     type="checkbox"
//                     className={`toggle ${
//                       item.isActive === "ON" ? "toggle-success" : ""
//                     }`}
//                     checked={item.isActive === "ON"}
//                     onChange={() =>
//                       handleToggle(item.layerName, item.isActive)
//                     }
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ✅ Modal */}
//       {modalOpen && (
//         <LayerManagementModal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           fieldName={fieldName}
//           currentValue={currentValue}
//           vocabId={selectedLayer?._id}
//           currentLayer={selectedLayer}
//         />
//       )}
//     </div>
//   );
// };

// export default LayerManage;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import TittleAnimation from "../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LayerManagementModal from "./LayerManagementModal";

const LayerManage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [currentValue, setCurrentValue] = useState("");

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Fetch all layers
  const { data: fields = [], isLoading } = useQuery({
    queryKey: ["fields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/layer-management/field");
      return res.data?.data || [];
    },
  });

  // ✅ Layer Serial Map
  const numberMap = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Fifth: 5,
    Sixth: 6,
    Seventh: 7,
    Eighth: 8,
    Ninth: 9,
    Tenth: 10,
  };

  // ✅ Sort Layers Serial Wise
  const sortedFields = [...fields].sort((a, b) => {
    const getNumber = (name) => {
      const word = name.split(" ")[0];
      return numberMap[word] || 999;
    };

    return getNumber(a.layerName) - getNumber(b.layerName);
  });

  // ✅ Modal Edit Handler
  const handleEditClick = (field, value, item) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedLayer(item);
    setModalOpen(true);
  };

  // ✅ Toggle Mutation
  const toggleIsActiveMutation = useMutation({
    mutationFn: async ({ layerName, currentState }) => {
      const res = await axiosPublic.put(`/layer-management/field/toggle`, {
        layerName,
        fieldName: "isActive",
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Layer is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries(["fields"]);
    },
    onError: (error) =>
      Swal.fire(
        "Error!",
        error.response?.data?.message || error.message,
        "error"
      ),
  });

  const handleToggle = (layerName, currentState) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to turn ${
        currentState === "ON" ? "OFF" : "ON"
      } this layer?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleIsActiveMutation.mutate({ layerName, currentState });
      }
    });
  };

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading Layers...
      </p>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Admin | Layer Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Layer Management"
        subtittle="Manage Layers & Toggle Activation"
      />

      <div className="mt-10 w-full max-w-[1400px] mx-auto">
        <div className="w-full bg-white shadow-md rounded-2xl p-3 md:p-5">
          <div className="space-y-4">
            {sortedFields.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {item.layerName}
                  </span>

                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "layerName",
                        item.layerName,
                        item
                      )
                    }
                    className="w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {item.isActive === "ON"
                      ? "Active"
                      : "Inactive"}
                  </span>

                  <input
                    type="checkbox"
                    className={`toggle ${
                      item.isActive === "ON"
                        ? "toggle-success"
                        : ""
                    }`}
                    checked={item.isActive === "ON"}
                    onChange={() =>
                      handleToggle(
                        item.layerName,
                        item.isActive
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {modalOpen && (
        <LayerManagementModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedLayer?._id}
          currentLayer={selectedLayer}
        />
      )}
    </div>
  );
};

export default LayerManage;