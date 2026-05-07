import axios from "axios";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CustomLoading from "../../components/Loading/CustomLoading";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import ShareModal from "./ShareModal";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const blogUrl = `https://betheshape.com/blog-us/${id}`;

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.betheshape.com/blog/blog/${id}`);
      setBlog(res?.data?.data || res?.data || null);
      setError("");
    } catch (err) {
      setError("Blog not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <CustomLoading />;

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center max-w-md w-full shadow-lg">
          <AlertCircle size={42} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Unable to Load Blog
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchBlog}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>{blog?.name || "Be The Shape | Blog Details"}</title>
      </Helmet>

      <TittleAnimation tittle="Blog Details" subtittle="Read More" />

      {/* Blog Title */}
      <motion.h1
        className="text-3xl lg:text-4xl font-bold text-green-700 mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        {blog?.name}
      </motion.h1>

      {/* Blog Image */}
      {blog?.ideaShareImage && (
        <motion.img
          src={blog.ideaShareImage}
          alt={blog?.name}
          className="w-full h-[400px] object-cover rounded-2xl mb-6 shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        />
      )}

      {/* Author + Share */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-green-400">
            <img
              src={blog?.user?.photoURL || "/avatar.png"}
              alt={blog?.photoURL || "Author"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-gray-900 font-bold text-lg">
              {blog?.user?.name || "Unknown Author"}
            </p>
            <p className="text-green-700 uppercase font-semibold text-sm">
              {blog?.user?.role || "Contributor"}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Posted on:{" "}
              {blog?.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowShareModal(true)}
          className="mt-4 md:mt-0 bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Share
        </button>
      </motion.div>

      {/* Blog Content */}
      <motion.div
        className="prose max-w-none text-gray-700 mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog?.description || ""),
        }}
      />

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          blogTitle={blog?.name}
          blogUrl={blogUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default BlogDetails;