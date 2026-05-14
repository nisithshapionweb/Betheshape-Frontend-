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
import footerLogo from "../../assets/footer-share.jpeg";
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
        "https://api.betheshape.com/api/admin/social-links"
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
       {/* Logo & Contact */}
<div>
  {/* Main Footer Logo */}
  <div className="flex items-center gap-3 mb-4">
    <img
      src={footerLogo}
      alt="Footer Logo"
      className="h-16 w-24 rounded-xl shadow-md object-cover border border-white/40"
    />

    {/* Small Betheshape Logo */}
    <img
      src={imageLogo}
      alt="Betheshape Logo"
      className="h-12 w-12 rounded-full shadow-lg border-2 border-[#d49c5b] object-cover"
    />
  </div>

  {/* Website Related Text */}
  <p className="text-gray-700 leading-7 text-[15px] mb-5 max-w-md">
   Be the shape is a family wings of magnanimous notion  / Be the Shape is a child of magnanimous notion.
  </p>

  <p className="mb-4 font-bold uppercase text-base tracking-wide text-[#d49c5b]">
    Office Address
  </p>

  <p className="flex items-center gap-2 mb-2 text-gray-700">
    <FaPhoneAlt className="text-[#d49c5b]" />
    01XXXXXXXX
  </p>

  <p className="flex items-center gap-2 mb-2 text-gray-700">
    <MdEmail className="text-[#d49c5b]" />
    info@betheshape.com
  </p>

  <p className="flex items-center gap-2 text-gray-700">
    <MdLocationOn className="text-[#d49c5b]" />
    House 15, Road 11, Uttara Sector 3
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