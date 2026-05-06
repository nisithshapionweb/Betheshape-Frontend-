import { Controller, useForm } from "react-hook-form";
import RichTextField from "../../../../../shared/TextEditor/RichTextField";
import MediaUpload from "../../../../../utils/MediaUpload";

const EditgoodmovieFormatModal = ({
  isOpen,
  onClose,
  idea,
  onUpdate,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: idea?.name || "",
      ideaShareImage: idea?.ideaShareImage || "",
      link: idea?.link || "",
      description: idea?.description || "",
    },
  });

  const onSubmit = async (data) => {
    await onUpdate(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 space-y-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-teal-600">
          Edit Good Movie
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full border px-3 py-2 rounded"
                placeholder="Title"
              />
            )}
          />

          {/* Image */}
          <MediaUpload
            control={control}
            name="ideaShareImage"
            label="Change Image"
            type="image"
          />

          {/* Link */}
          <Controller
            name="link"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full border px-3 py-2 rounded"
                placeholder="Link"
              />
            )}
          />

          {/* Description */}
          <RichTextField
            name="description"
            control={control}
            placeholder="Description..."
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-teal-600 text-white rounded"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditgoodmovieFormatModal;
