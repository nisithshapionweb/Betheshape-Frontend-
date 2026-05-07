import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// helper function: backend fieldName → UI friendly label
const formatFieldLabel = (fieldName) => {
  let words = fieldName
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → separate words
    .replace(/-/g, " ")                   // kebab-case → replace hyphen with space
    .split(" ");

  words = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return words.join(" ");
};

const CorporateEmailFormatModal = ({ isOpen, onClose, fieldName, currentValue, vocabId }) => {
  const [value, setValue] = useState(currentValue || "");
  const queryClient = useQueryClient();

  // modal খোলার সময় value reset করা
  useEffect(() => {
    if (isOpen) {
      setValue(currentValue || "");
    }
  }, [isOpen, currentValue]);

  // mutation setup
  const mutation = useMutation({
    mutationFn: async (newValue) => {
      const res = await fetch(
        `https://api.betheshape.com/six-layer/corporateEmailField/${vocabId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fieldName, value: newValue }),
        }
      );
      const data = await res.json();
     
      if (!res.ok) {
        throw new Error(data.message || "Failed to update");
      }
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${formatFieldLabel(fieldName)} updated successfully.`,
        confirmButtonColor: "#16a34a", 
      });
      queryClient.invalidateQueries(["vocabulary"]); 
      onClose();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        confirmButtonColor: "#dc2626", 
      });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Edit Field: <span className="text-green-600">{formatFieldLabel(fieldName)}</span>
        </h2>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="textarea textarea-bordered w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => mutation.mutate(value)}
            disabled={mutation.isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {mutation.isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorporateEmailFormatModal;
