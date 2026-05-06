import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhoneAlt,
    FaTiktok,
    FaTwitter,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import imageLogo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔥 Platform Icon Map
  const iconMap = {
    facebook: <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800 transition" />,
    youtube: <FaYoutube className="text-red-600 text-2xl hover:text-red-800 transition" />,
    instagram: <FaInstagram className="text-pink-500 text-2xl hover:text-pink-700 transition" />,
    twitter: <FaTwitter className="text-sky-500 text-2xl hover:text-sky-700 transition" />,
    linkedin: <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900 transition" />,
    tiktok: <FaTiktok className="text-black text-2xl hover:text-gray-700 transition" />,
    whatsapp: <FaWhatsapp className="text-green-500 text-2xl hover:text-green-700 transition" />,
  };

  // 🔥 Fetch Function
  const fetchSocialLinks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/social-links"
      );
      setSocialLinks(data || {});
    } catch (err) {
      console.error("Failed to fetch social links:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();

    // ✅ Auto update every 5 seconds (no refresh needed)
    const interval = setInterval(() => {
      fetchSocialLinks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const validLinks = Object.entries(socialLinks).filter(
    ([_, value]) => value && value.trim() !== ""
  );

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-yellow-50 to-green-50 animate-gradient-x"></div>

      <div className="max-w-[1400px] mx-auto px-2 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        
        {/* Logo & Contact */}
        <div>
          <img src={imageLogo} alt="Logo" className="h-16 w-24 mb-2" />
          <p className="mb-4 font-bold uppercase text-base">Office Address</p>

          <p className="flex items-center gap-2 mb-1">
            <FaPhoneAlt /> 01XXXXXXXX
          </p>
          <p className="flex items-center gap-2 mb-1">
            <MdEmail /> info@betheshape.com
          </p>
          <p className="flex items-center gap-2">
            <MdLocationOn /> House 15, road 11, Uttara sector 3
          </p>
        </div>

        {/* Useful Links */}
        <div className="text-base">
          <h2 className="footer-title mb-4 text-base">Useful Links</h2>
          <Link to="/about-us-more-information" className="block mb-2">
            About Us
          </Link>
          <Link to="/contact-us" className="block mb-2">
            Contact
          </Link>
          <Link to="/privacy-policy" className="block mb-2">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="block mb-2">
            Terms & Conditions
          </Link>
          <Link to="/refund-policy">Refund Policy</Link>
        </div>

        {/* 🔥 Dynamic Social Section */}
        <div>
          <h2 className="footer-title mb-4 text-base">Follow Us</h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : validLinks.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {validLinks.map(([platform, url]) => (
                iconMap[platform] && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                  >
                    {iconMap[platform]}
                  </a>
                )
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No Social Link</p>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t text-center text-sm p-4 bg-white/80 relative z-10">
        <p>
          &copy; {currentYear} Learning Quiz || Developed by{" "}
          <a
            href="https://github.com/Mozammel772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Mozammel
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;