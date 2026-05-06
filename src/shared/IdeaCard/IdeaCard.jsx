import { ImageOff, Link2Off, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

const IdeaCard = ({ item }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const showImage = item.ideaShareImage && !imgError;
  const hasLink = item.link && item.link.trim() !== "";

  return (
    <div className="group relative bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300">
      
      {/* Image Section */}
      <div className="h-56 w-full overflow-hidden relative bg-gray-100 flex items-center justify-center">

        {showImage ? (
          <>
            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <img
              src={item.ideaShareImage}
              alt={item.name}
              onLoad={() => setImgLoading(false)}
              onError={() => {
                setImgLoading(false);
                setImgError(true);
              }}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                imgLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageOff size={48} strokeWidth={1.5} />
            <p className="text-sm mt-2 font-medium">
              No Image Available
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 md:p-5 space-y-3">
        <h2 className="text-xl font-semibold text-teal-700 text-justify">
          {item.name}
        </h2>

        <div
          className="text-gray-700 text-sm leading-relaxed text-justify"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t mt-3">
          
          {hasLink ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
            >
              <LinkIcon size={16} />
              Visit Link
            </a>
          ) : (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Link2Off size={16} />
              <span>No Link Available</span>
            </div>
          )}

          <p className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
