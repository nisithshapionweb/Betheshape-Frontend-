import { Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";

const OwnSpBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});

  const toggleDescription = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 📥 Fetch Books (from your backend)
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/own-sp");
      const data = await res.json();
      if (res.ok) setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const truncateText = (text, limit = 15) => {
    if (!text) return "";

    // HTML remove করে plain text বানাও
    const plainText = text.replace(/<[^>]+>/g, " ");

    const words = plainText.split(/\s+/).filter(Boolean);

    if (words.length <= limit) return text;

    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="min-h-screen  py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-teal-700 font-bold text-lg mb-4">
            BOOK
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Own SP Books
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-justify">
            Access a premium collection of books and learning materials designed
            to enhance your knowledge. Browse, explore, and download resources
            anytime, anywhere.
          </p>

          <div className="w-24 h-[2px] bg-teal-600 mx-auto mt-6"></div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No Books Available
            </h3>
            <p className="text-gray-500 mt-2">
              Books will appear here once uploaded.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow divide-y">
            {books.map((book) => {
              const isExpanded = expanded[book._id];

              return (
                <div
                  key={book._id}
                  className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4 hover:bg-gray-50 transition"
                >
                  {/* Left */}
                  <div className="flex gap-4">
                    {book.PdfThumbnil ? (
                      <img
                        src={book.PdfThumbnil}
                        alt="thumbnail"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                        <FileText className="text-gray-400" />
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {book.tittle || book.originalName}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: isExpanded
                              ? book.description
                              : truncateText(book.description),
                          }}
                        />

                        {book.description &&
                          book.description.split(/\s+/).length > 15 && (
                            <button
                              onClick={() => toggleDescription(book._id)}
                              className="ml-2 text-teal-600 text-xs font-semibold"
                            >
                              {isExpanded ? "See less" : "See more"}
                            </button>
                          )}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        Added on{" "}
                        {new Date(book.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div>
                    <button
                      onClick={() =>
                        window.open(
                          `http://localhost:5000/own-sp/download/${book._id}`,
                          "_blank",
                        )
                      }
                      className="flex items-center gap-2 border border-teal-600 text-teal-600 px-4 py-2 rounded hover:bg-teal-600 hover:text-white transition"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnSpBooks;
