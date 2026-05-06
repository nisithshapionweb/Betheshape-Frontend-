import Lottie from "lottie-react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiEdit3, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import contactAnimation from "../../../lottie-animation/contact.json";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const Contact = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required.";
    if (!formData.user_phone.trim()) newErrors.user_phone = "Phone is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Message sent successfully!");

    setFormData({
      user_name: "",
      user_phone: "",
      subject: "",
      message: "",
    });
  };

  const renderInput = (name, placeholder, Icon, type = "text") => (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-base font-medium text-gray-700">
          {placeholder} :
        </span>
      </label>

      <div className="relative">
        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>

        <input
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full pl-10 pr-3 py-3 border rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-green-300 bg-transparent ${
            errors[name]
              ? "border-red-500"
              : formData[name]
              ? "border-green-400"
              : "border-gray-300"
          }`}
          placeholder={`Enter Your ${placeholder}`}
        />
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-transparent">
      <Helmet>
        <title>Be The Shape | Contact</title>
      </Helmet>

      <div className="py-5 px-2">
        <div className="text-center mb-10">
          <TittleAnimation
            tittle="Contact Us"
            subtittle="Send Us a Message"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">

          {/* LOTTIE SECTION */}
          <div className="flex justify-center bg-transparent">
            <div className="w-full max-w-md bg-transparent">
              <Lottie
                animationData={contactAnimation}
                className="w-full h-full bg-transparent"
              />
            </div>
          </div>

          {/* FORM */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-5 bg-transparent"
          >
            {renderInput("user_name", "Name", FiUser)}
            {renderInput("user_phone", "Mobile Number", FiPhone)}
            {renderInput("subject", "Subject", FiEdit3)}

            {/* MESSAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium text-gray-700">
                  Message :
                </span>
              </label>

              <div className="relative">
                <div className="absolute left-0 top-3 pl-3 pointer-events-none">
                  <FiMessageSquare className="h-5 w-5 text-gray-400" />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-md h-32 resize-none bg-transparent focus:outline-none focus:ring-1 focus:ring-green-300 ${
                    errors.message
                      ? "border-red-500"
                      : formData.message
                      ? "border-green-400"
                      : "border-gray-300"
                  }`}
                  placeholder="Type Your Message"
                ></textarea>
              </div>

              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#1f4e43] hover:bg-[#2e6e5f] text-white font-bold py-3 rounded-md transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;