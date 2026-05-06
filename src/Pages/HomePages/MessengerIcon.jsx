
import { FaFacebookMessenger } from "react-icons/fa";

const MessengerIcon = () => {
  return (
    <a
      href="https://web.facebook.com/profile.php?id=61572039370539"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <FaFacebookMessenger size={24} />
    </a>
  );
};

export default MessengerIcon;