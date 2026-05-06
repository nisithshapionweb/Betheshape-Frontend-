import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import imageLogo from "../../assets/logo.png";
import { useTranslation } from "../../context/TranslationContext";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const getNavigationLinks = (user, setLanguage, field = [], isLoading) => {
  // ✅ Serial Map
  const numberMap = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Fifth: 5,
    Sixth: 6,
    Seventh: 7,
    Eighth: 8,
    Ninth: 9,
    Tenth: 10,
  };

  // ✅ Sort Layers Serial Wise
  const sortedLayers = [...field].sort((a, b) => {
    const getNumber = (name) => {
      const word = name?.split(" ")[0];
      return numberMap[word] || 999;
    };

    return getNumber(a.layerName) - getNumber(b.layerName);
  });

  const dynamicLayers = isLoading
    ? [
        {
          title: "Loading...",
          link: "#",
          disabled: true,
        },
      ]
    : sortedLayers.map((layer) => ({
        title: layer.layerName || layer.fieldName,
        link: `/b-a-shape-formats/${layer.fieldName}`,
      }));

  // 🏠 Base Menu Links
  const baseLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us-more-information" },
    {
      title: "Learning Modules",
      subLinks: dynamicLayers,
    },
  ];

  // 👤 Dashboard If Logged In
  if (user) {
    baseLinks.splice(3, 0, { title: "Dashboard", link: "/dashboard" });
  }

  baseLinks.push(
    {
      title: "Contributor Corner",
      subLinks: [
        { title: "User PDF", link: "/contribute/upload-pdf" },
        { title: "User Nobel", link: "/contribute/accept-user-nobels" },
        { title: "Blank Format", link: "/contribute/blank-format" },
      ],
    },
    { title: "PDF Library - Download", link: "/pdf-download" },
    {
      title: "Explore",
      subLinks: [
        { title: "Other", link: "explore/other" },
        { title: "For Next", link: "/explore/for-next" },
      ],
    },
    {
      title: "Own-SP",
      subLinks: [
        { title: "Books", link: "own-sp/books" },
        { title: "Video", link: "own-sp/video" },
        { title: "Other", link: "own-sp/other" },
        
      ],
    },
    { title: "Blog", link: "/blog-us" },
  );

  return baseLinks;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [desktopSubMenu, setDesktopSubMenu] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { setLanguage, loading } = useTranslation();
  const axiosPublic = useAxiosPublic();

  // ✅ Fetch all layers
  const { data: field, isLoading } = useQuery({
    queryKey: ["field"],
    queryFn: async () => {
      const res = await axiosPublic.get("/layer-management/field");
      return res.data?.data || [];
    },
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navigationLinks = getNavigationLinks(
    user,
    setLanguage,
    field,
    isLoading,
  );

  const toggleSubMenu = (index) =>
    setActiveSubMenu(activeSubMenu === index ? null : index);

  const isActive = (link) =>
    link === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link);

  // Animation variants
  const desktopSubMenuVariants = {
    hidden: { opacity: 0, y: -5, transition: { duration: 0.1 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: { opacity: 0, y: -5, transition: { duration: 0.1 } },
  };
  const subMenuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
  };
  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: { x: "-100%", transition: { duration: 0.2 } },
  };
  const mobileSubMenuVariants = {
    hidden: { height: 0, opacity: 0, transition: { duration: 0.2 } },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  };
  const mobileItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.03, duration: 0.15 },
    }),
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-2xl z-50 px-1 py-1.5">
      <div className="max-w-[1400px] mx-auto h-[70px] flex justify-between items-center">
        <img className="h-12 w-20 cursor-pointer" src={imageLogo} alt="Logo" />

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end gap-0.5 items-center font-semibold text-xl">
          {navigationLinks.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setDesktopSubMenu(index)}
              onMouseLeave={() => setDesktopSubMenu(null)}
            >
              {item.subLinks ? (
                <div className="flex items-center cursor-pointer">
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-block rounded-md text-xl font-semibold transition duration-200 cursor-pointer ${
                      isActive(item.link)
                        ? "text-teal-700"
                        : "text-black hover:text-teal-700 px-2 py-1.5"
                    }`}
                  >
                    {item.title}
                  </motion.span>
                  {desktopSubMenu === index ? (
                    <IoMdArrowDropup size={18} />
                  ) : (
                    <IoMdArrowDropdown size={18} />
                  )}
                </div>
              ) : (
                <Link to={item.link}>
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-block rounded-md text-base md:text-lg font-semibold transition duration-200 ${
                      isActive(item.link)
                        ? "text-teal-700"
                        : "text-black hover:text-teal-700 px-4 py-1.5"
                    }`}
                  >
                    {item.title}
                  </motion.span>
                </Link>
              )}

              {/* Desktop Submenu */}
              <AnimatePresence>
                {item.subLinks && desktopSubMenu === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={desktopSubMenuVariants}
                    className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md z-50 min-w-[300px] py-2 border border-gray-100"
                  >
                    {item.subLinks.map((subItem) => (
                      <motion.div
                        key={subItem.title}
                        variants={subMenuItemVariants}
                      >
                        {subItem.action ? (
                          <div
                            onClick={subItem.action}
                            className="block text-base font-medium px-4 py-2 cursor-pointer hover:text-teal-700 hover:bg-gray-50"
                          >
                            {subItem.title}
                          </div>
                        ) : (
                          <Link to={subItem.link}>
                            <div className="block text-base font-medium px-4 py-2 hover:text-teal-700 hover:bg-gray-50">
                              {subItem.title}
                            </div>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {user ? (
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="py-1.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-md cursor-pointer"
            >
              Logout
            </motion.span>
          ) : (
            <Link to="/login">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-block px-4 py-1.5 rounded-md ${
                  location.pathname === "/login"
                    ? "bg-teal-700 text-white"
                    : "text-white bg-teal-700 hover:bg-teal-900"
                }`}
              >
                Login
              </motion.span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 rounded-md px-3 py-2 hover:bg-teal-900 cursor-pointer md:hidden"
        >
          <FaBars
            onClick={() => setIsOpen(true)}
            size={24}
            className="text-white"
          />
        </motion.button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden"
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white px-4 z-50 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 border-b min-h-24">
                <img
                  className="h-12 w-20 cursor-pointer"
                  src={imageLogo}
                  alt="Logo"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-100 rounded-md px-2 py-1 hover:bg-red-50"
                  onClick={() => setIsOpen(false)}
                >
                  <CgClose
                    size={28}
                    className="text-red-600 hover:text-red-400"
                  />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-3 font-medium text-lg ">
                  {navigationLinks.map((item, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={mobileItemVariants}
                      className="border-b pb-1"
                    >
                      {item.subLinks ? (
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleSubMenu(index)}
                        >
                          <span
                            className={`font-semibold transition duration-200 px-2 py-1.5 ${
                              isActive(item.link)
                                ? "text-teal-700"
                                : "text-black hover:text-teal-700"
                            }`}
                          >
                            {item.title}
                          </span>
                          {activeSubMenu === index ? (
                            <IoMdArrowDropup size={22} />
                          ) : (
                            <IoMdArrowDropdown size={22} />
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className={`inline-block font-semibold transition duration-200 rounded-md px-2 py-1.5 ${
                            isActive(item.link)
                              ? "text-teal-700"
                              : "text-black hover:text-teal-700"
                          }`}
                        >
                          {item.title}
                        </Link>
                      )}

                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {item.subLinks && activeSubMenu === index && (
                          <motion.div
                            variants={mobileSubMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {item.subLinks.map((subItem, subIndex) =>
                              subItem.action ? (
                                <motion.div
                                  key={subItem.title}
                                  custom={subIndex}
                                  variants={mobileItemVariants}
                                  onClick={() => {
                                    subItem.action();
                                    setIsOpen(false);
                                  }}
                                  className="block text-base border-t font-medium px-4 py-2 cursor-pointer hover:text-teal-700 hover:bg-gray-100"
                                >
                                  {subItem.title}
                                </motion.div>
                              ) : (
                                <motion.div
                                  key={subItem.title}
                                  custom={subIndex}
                                  variants={mobileItemVariants}
                                >
                                  <Link
                                    to={subItem.link}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-base border-t font-medium px-4 py-2 hover:text-teal-700 hover:bg-gray-100"
                                  >
                                    {subItem.title}
                                  </Link>
                                </motion.div>
                              ),
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t">
                {user ? (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 bg-red-600 hover:bg-red-800 text-white rounded-md font-semibold cursor-pointer"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-2 bg-teal-700 hover:bg-teal-900 text-white rounded-md font-semibold"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
