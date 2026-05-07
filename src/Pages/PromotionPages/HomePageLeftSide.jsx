import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HomePageLeftSide = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const { data } = await axios.get("https://api.betheshape.com/api/promotions");
        // শুধু left side এর জন্য filter
        setPromotions(data.filter((p) => p.position === "middle"));
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div className="w-full space-y-4">
      {promotions.map((promo) => (
        <motion.div
          key={promo._id}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="rounded-2xl shadow-md overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition"
        >
          {/* Image clickable */}
          <a href={promo.link} target="_blank" rel="noopener noreferrer">
            <img
              src={promo.imageUrl}
              alt={promo.title}
              className="w-full h-56 object-cover cursor-pointer hover:opacity-90 transition"
            />
          </a>

          {/* নিচে text */}
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {promo.title}
            </h3>
            {promo.description && (
              <p className="text-sm text-gray-600 mb-3">{promo.description}</p>
            )}
            <a
              href={promo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[#1f4e43] text-white text-sm rounded-lg shadow hover:bg-[#163b32] transition"
            >
              View Offer
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HomePageLeftSide;
