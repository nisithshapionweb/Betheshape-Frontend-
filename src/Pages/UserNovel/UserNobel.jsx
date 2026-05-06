import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

import AdminLoading from "../../components/Loading/AdminLoading";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import RichTextField from "../../shared/TextEditor/RichTextField";
import MediaUpload from "../../utils/MediaUpload";
import EditUserNobelModal from "./EditUserNobelModal";

const UserNobel = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);

  // ✅ Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      ideaShareImage: "",
      description: "",
      link: "",
    },
  });

  // ✅ Create post mutation
  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/userNobel", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["userNobel"]);
      Swal.fire("✅ Success!", "Your post has been submitted.", "success");
      resetForm();
    },
    onError: () => Swal.fire("❌ Error!", "Failed to submit post.", "error"),
  });

  // ✅ Get user posts
  const { data: userPosts = [], isLoading } = useQuery({
    queryKey: ["userNobel"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/userNobel/my-posts?email=${user?.email}`,
      );
      return res.data || [];
    },
  });

  // ✅ Delete post
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/userNobel/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["userNobel"]);
      Swal.fire("Deleted!", "Your post was deleted.", "success");
    },
    onError: () => Swal.fire("Error!", "Failed to delete post.", "error"),
  });

  // ✅ Update post (edit)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.put(`/userNobel/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["userNobel"]);
      Swal.fire("Updated!", "Your post was updated.", "success");
      setEditOpen(false);
    },
    onError: () => Swal.fire("Error!", "Failed to update post.", "error"),
  });

  // ✅ Reset form
  const resetForm = () => {
    reset({
      name: "",
      ideaShareImage: "",
      description: "",
      link: "",
    });
    setResetSignal((prev) => prev + 1);
  };

  // ✅ Submit handler
  const onSubmit = (data) => {
    const payload = { ...data, email: user?.email };
    createMutation.mutate(payload);
  };

  // ✅ Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });
    if (confirm.isConfirmed) deleteMutation.mutate(id);
  };

  // ✅ Edit handler
  const handleEdit = (post) => {
    setSelectedIdea(post);
    setEditOpen(true);
  };

  // ✅ Truncate description safely
  const truncateHTML = (html = "", wordLimit = 10) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).slice(0, wordLimit);
    return (
      words.join(" ") + (text.split(/\s+/).length > wordLimit ? "..." : "")
    );
  };

  if (isLoading) return <AdminLoading />;

  return (
    <>
      <Helmet>
        <title>User | My Nobel Posts</title>
      </Helmet>

      <TittleAnimation
        tittle="Submit Your Nobel Post"
        subtittle="Manage your own posts"
      />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        {/* Create post form */}
        <div className="bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control w-full py-6">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">
                  Title:
                </span>
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter title..."
                    className="w-full px-4 py-3 border rounded-md focus:ring-1 focus:ring-teal-300"
                  />
                )}
              />
            </div>

            <MediaUpload
              control={control}
              name="ideaShareImage"
              label="Image (Optional)"
              type="image"
              maxSizeMB={5}
              resetSignal={resetSignal}
            />

            <div className="form-control w-full py-6">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">
                  Link (Optional):
                </span>
              </label>
              <Controller
                name="link"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter link..."
                    className="w-full px-4 py-3 border rounded-md focus:ring-1 focus:ring-teal-300"
                  />
                )}
              />
            </div>

            <RichTextField
              name="description"
              control={control}
              placeholder="Enter your description..."
              className="w-full"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-teal-700 disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Post"}
            </button>
          </form>
        </div>

        {/* List of user's posts */}
        <div className="bg-white shadow-lg rounded-xl border p-4 sm:p-6  w-[350px] md:w-full">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-700">
            My Posts
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm sm:text-base">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Link</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No posts found.
                    </td>
                  </tr>
                ) : (
                  userPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50 border-b">
                      <td className="px-4 py-2 text-center">
                        {post.ideaShareImage ? (
                          <img
                            src={post.ideaShareImage}
                            alt="nobel"
                            className="w-12 h-12 object-cover rounded-md mx-auto"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No Image</span>
                        )}
                      </td>
                      <td className="px-4 py-2">{post.name}</td>
                      <td
                        className="px-4 py-2"
                        dangerouslySetInnerHTML={{
                          __html: truncateHTML(post.description, 10),
                        }}
                      />
                      <td className="px-4 py-2">{post.link}</td>
                      <td className="px-4 py-2 text-center font-medium">
                        {post.status === "pending"
                          ? "Pending"
                          : post.status === "accepted"
                            ? "Accepted"
                            : "Rejected"}
                      </td>
                      <td className="px-4 py-2 flex gap-3 justify-center">
                        {post.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleEdit(post)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && selectedIdea && (
        <EditUserNobelModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          idea={selectedIdea}
          onUpdate={(data) =>
            updateMutation.mutate({ id: selectedIdea._id, data })
          }
        />
      )}
    </>
  );
};

export default UserNobel;
