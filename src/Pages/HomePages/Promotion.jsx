import axios from "axios";
import { useEffect, useState } from "react";

const Promotion = ({ position }) => {
  const [ad, setAd] = useState(null);
  const [visible, setVisible] = useState(true);

  const CLOSE_DURATION = 60 * 1000;

  useEffect(() => {
    let timer;

    const handleVisibility = () => {
      const closedData = localStorage.getItem(`promo_closed_${position}`);

      if (closedData) {
        const closedTime = parseInt(closedData);
        const now = Date.now();
        const remaining = CLOSE_DURATION - (now - closedTime);

        if (remaining > 0) {
          setVisible(false);

          timer = setTimeout(() => {
            localStorage.removeItem(`promo_closed_${position}`);
            setVisible(true);
          }, remaining);

          return false;
        } else {
          localStorage.removeItem(`promo_closed_${position}`);
        }
      }

      return true;
    };

    const fetchAd = async () => {
      try {
        const res = await axios.get(
          "https://api.betheshape.com/api/promotions"
        );

        const now = new Date();

        const activeAd = res.data
          .filter((item) => {
            const start = new Date(item.startAt);
            const expire = new Date(item.expireAt);

            return (
              item.position === position &&
              start <= now &&
              expire > now
            );
          })
          .sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          )[0];

        setAd(activeAd || null);
      } catch (error) {
        console.error("Failed to fetch promotion", error);
      }
    };

    if (handleVisibility()) {
      fetchAd();
    }

    return () => clearTimeout(timer);
  }, [position]);

  const handleClose = () => {
    localStorage.setItem(`promo_closed_${position}`, Date.now());
    setVisible(false);
  };

  if (!ad || !visible) return null;

  return (
    <div className="fixed bottom-3 left-0 w-full z-50 px-2 sm:px-4">
      <div
        className="bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-500 
           text-white backdrop-blur-md 
           shadow-2xl max-w-6xl mx-auto px-4 py-3 
           flex flex-col sm:flex-row items-center 
           justify-between gap-4 rounded-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg transition"
        >
          ✕
        </button>

        {/* Content */}
        <div
          onClick={() => window.open(ad.link, "_blank")}
          className="flex items-center gap-4 w-full sm:w-auto cursor-pointer group"
        >
          {ad.imageUrl && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <div className="text-left">
            <h3 className="text-gray-900 font-semibold text-sm sm:text-base group-hover:text-teal-600 transition">
              {ad.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
              {ad.description}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal-600 hover:bg-teal-700 text-white 
                     px-6 py-2 rounded-full text-sm font-medium 
                     transition-all duration-300 
                     w-full sm:w-auto text-center shadow-md hover:shadow-lg"
        >
          Explore Now →
        </a>
      </div>
    </div>
  );
};

export default Promotion;