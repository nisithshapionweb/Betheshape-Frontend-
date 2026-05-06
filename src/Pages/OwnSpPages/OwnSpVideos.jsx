import { PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

const OwnSpVideos = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👇 See more/less state
  const [expanded, setExpanded] = useState({});
  const [showFullDesc, setShowFullDesc] = useState(false);

  // ✅ Toggle function
  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ HTML safe truncate
  const truncateHTML = (html, limit = 80) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "");
    if (text.length <= limit) return html;
    return text.slice(0, limit) + "...";
  };

  // 🎯 YouTube embed converter
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // 🔥 Fetch backend videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/own-sp/videos");
        const data = await res.json();

        if (res.ok) {
          setVideos(data);

          if (data.length > 0) {
            setActiveVideo(data[0]);
          }
        }
      } catch (error) {
        console.error("Video fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen py-10 ">
      <div className="max-w-7xl mx-auto ">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            🎬 Own SP Videos
          </h1>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Watch all available videos directly from our platform.
          </p>

          <div className="w-24 h-[2px] bg-teal-600 mx-auto mt-6"></div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading videos...</p>
          </div>
        )}

        {/* VIDEO PLAYER */}
        {!loading && activeVideo && (
          <div className="mb-10">
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow">
              <iframe
                src={getEmbedUrl(activeVideo.youtubeLink)}
                title="YouTube Video"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>

            {/* TITLE */}
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {activeVideo.tittle}
            </h2>

            {/* DESCRIPTION (SEE MORE) */}
            <p
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={{
                __html: showFullDesc
                  ? activeVideo.description
                  : truncateHTML(activeVideo.description, 120),
              }}
            />

            {activeVideo.description &&
              activeVideo.description.replace(/<[^>]+>/g, "").length > 120 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-sm text-teal-600 mt-1"
                >
                  {showFullDesc ? "See less" : "See more"}
                </button>
              )}
          </div>
        )}

        {/* VIDEO LIST */}
        {!loading && videos.length > 0 && (
          <div className="bg-white rounded-lg shadow divide-y">
            {videos.map((video) => (
              <div
                key={video._id}
                className="p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">

                  {/* Thumbnail */}
                  <img
                    src={video.videoThumbnil}
                    alt="thumb"
                    className="w-16 h-12 object-cover rounded"
                  />

                  <div className="flex-1">
                    {/* TITLE */}
                    <h3 className="font-semibold text-gray-800">
                      {expanded[video._id]
                        ? video.tittle
                        : video.tittle.slice(0, 40) +
                          (video.tittle.length > 40 ? "..." : "")}
                    </h3>

                    {video.tittle.length > 40 && (
                      <button
                        onClick={() => toggleExpand(video._id)}
                        className="text-xs text-teal-600"
                      >
                        {expanded[video._id] ? "See less" : "See more"}
                      </button>
                    )}

                    {/* DESCRIPTION */}
                    <p
                      className="text-sm text-gray-500 mt-1"
                      dangerouslySetInnerHTML={{
                        __html: expanded[video._id]
                          ? video.description
                          : truncateHTML(video.description, 60),
                      }}
                    />

                    {video.description &&
                      video.description.replace(/<[^>]+>/g, "").length > 60 && (
                        <button
                          onClick={() => toggleExpand(video._id)}
                          className="text-xs text-teal-600 mt-1"
                        >
                          {expanded[video._id] ? "See less" : "See more"}
                        </button>
                      )}
                  </div>
                </div>

                {/* PLAY BUTTON */}
                <button
                  onClick={() => setActiveVideo(video)}
                  className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
                >
                  <PlayCircle size={18} />
                  Play
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default OwnSpVideos;