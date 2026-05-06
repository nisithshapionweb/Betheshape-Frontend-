import axios from "axios";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CustomLoading from "../../components/Loading/CustomLoading";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Blogs
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`http://localhost:5000/blog/blog`, {
        withCredentials: true,
      });
    
      setBlogs(res?.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch blogs. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Truncate helper
  const truncateWords = (text, limit = 25) => {
    if (!text || typeof text !== "string") return "";
    const words = text.trim().split(/\s+/);
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  // Loading UI
  if (loading) return <CustomLoading />;

  // Error UI
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center max-w-md w-full shadow-lg">
          <AlertCircle size={42} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Unable to Load Blogs
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>

          <button
            onClick={fetchBlogs}
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
    <>
      <Helmet>
        <title>Be The Shape | Blog</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <TittleAnimation
          tittle="Our Blog"
          subtittle="Inspiration, Ideas & Insights"
        />

        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 mt-12 text-lg">
            No blogs available yet.
          </div>
        ) : (
          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 flex flex-col"
              >
                {/* Image */}
                <Link to={`/blog-us/${blog._id}`}>
                  <div className="h-60 overflow-hidden">
                    <img
                      src={blog.ideaShareImage}
                      alt={blog.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition mb-3 line-clamp-2">
                    {blog.name}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {truncateWords(
                      blog.description.replace(/<[^>]+>/g, ""),
                      20,
                    )}
                  </p>

                  <div className="flex-grow" />

                  {/* Read More Button */}
                  <Link
                    to={`/blog-us/${blog._id}`}
                    className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
