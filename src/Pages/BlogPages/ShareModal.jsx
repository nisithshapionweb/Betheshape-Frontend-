import { useState } from "react";
import { FaFacebookF, FaRegCopy, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ShareModal = ({ blogTitle, blogUrl, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset message after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative text-center">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">Share This Blog</h2>

        {/* URL with Copy Icon */}
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-sm text-gray-600 break-all">{blogUrl}</p>
          <button
            onClick={handleCopy}
            className="text-blue-600 hover:text-blue-800 text-lg"
            title="Copy URL"
          >
            <FaRegCopy />
          </button>
        </div>
        {copied && <p className="text-green-600 text-sm mt-1">Copied!</p>}

        <div className="divider my-4"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 text-3xl">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            title="Share on Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-700"
            title="Share on Twitter"
          >
            <FaXTwitter />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blogTitle + " " + blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800"
            title="Share on WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
