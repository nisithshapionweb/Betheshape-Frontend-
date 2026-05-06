"use client";

import {
  CircleFadingArrowUp,
  CloudUpload,
  Kanban,
  Notebook,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {
  FaChartLine,
  FaFilePdf,
  FaHome,
  FaIdeal,
  FaKey,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiLogout, HiOutlineDocumentText, HiX } from "react-icons/hi";
import {
  MdAppBlocking,
  MdDashboard,
  MdOutlinePayments,
  MdPayment,
  MdPayments,
  MdSchool,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Sidebar = ({ isSidebarOpen, handleSidebarToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, photoURL, displayName, user } = useAuth();
  const { role } = useRole();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const allMenuItems = role === "admin" ? adminMenuItems : userMenuItems;
    const activeMenu = allMenuItems.find((item) =>
      item.subItems?.some((sub) => isActive(sub.path)),
    );
    if (activeMenu) {
      setOpenDropdown(activeMenu.label);
    }
  }, [location.pathname, role]);

  const MenuItem = ({ item, onClick, level = 0 }) => {
    const isMenuActive = isActive(item.path);
    const isDropdownOpen = openDropdown === item.label;
    const indentClass = level === 1 ? "ml-4" : "";

    return (
      <li className="group w-full flex-shrink-0">
        <div
          className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer select-none w-full ${
            isMenuActive
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          } ${indentClass}`}
          onClick={() => {
            if (item.subItems) {
              toggleDropdown(item.label);
            } else {
              onClick(item.path);
            }
          }}
        >
          {isMenuActive && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
          )}
          <div
            className={`flex-shrink-0 ${
              isMenuActive ? "text-white" : item.color
            }`}
          >
            <item.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{item.label}</div>
            {item.description && (
              <div
                className={`text-xs truncate ${
                  isMenuActive
                    ? "text-blue-100"
                    : "text-gray-500 group-hover:text-gray-600"
                }`}
              >
                {item.description}
              </div>
            )}
          </div>
          {item.subItems && (
            <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-700 transition-transform duration-200">
              {isDropdownOpen ? (
                <FiChevronUp className="w-5 h-5" />
              ) : (
                <FiChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
        {item.subItems && isDropdownOpen && (
          <ul className="mt-1 space-y-1 w-full">
            {item.subItems.map((sub) => {
              const isSubActive = isActive(sub.path);
              return (
                <div
                  className={isSubActive ? "w-[90%]" : "w-full"}
                  key={sub.path}
                >
                  <MenuItem item={sub} onClick={onClick} level={level + 1} />
                </div>
              );
            })}
          </ul>
        )}
      </li>
    );
  };
  // const moderatorMenuItems = [
  //   {
  //     path: "/moderator-dashboard",
  //     icon: MdDashboard,
  //     label: "Dashboard",
  //     description: "Overview & Analytics",
  //     color: "text-blue-600",
  //   },
  //   {
  //     path: "/moderator-dashboard/enrollments",
  //     icon: FaUserGraduate,
  //     label: "Payment Management",
  //     description: "Pending Rejects payments",
  //     color: "text-cyan-600",
  //   },
  //   {
  //     path: "/moderator-dashboard/add-payment-method",
  //     icon: MdPayment,
  //     label: "Add Payment Methods",
  //     description: "Payment Processing",
  //     color: "text-yellow-600",
  //   },

  //   {
  //     path: "/moderator-dashboard/promotion",
  //     icon: HiOutlineDocumentText,
  //     label: "Promotion",
  //     description: "Any Site Promotion",
  //     color: "text-indigo-600",
  //     subItems: [
  //       {
  //         path: "/moderator-dashboard/create-a-new-promotion",
  //         icon: BiEdit,
  //         label: "Create Promotion",
  //         description: "Create New Promotion",
  //         color: "text-indigo-600",
  //       },
  //       {
  //         path: "/moderator-dashboard/promotion-history",
  //         icon: MdPayment,
  //         label: "Promotion History",
  //         description: "Promotion History",
  //         color: "text-indigo-600",
  //       },
  //     ],
  //   },

  //   {
  //     path: "/moderator-dashboard/blog",
  //     icon: HiOutlineDocumentText,
  //     label: "Blog",
  //     description: "Post Of Blog",
  //     color: "text-indigo-600",
  //     subItems: [
  //       {
  //         path: "/moderator-dashboard/create-a-new-blog",
  //         icon: BiEdit,
  //         label: "Create Blog",
  //         description: "Create New Blog",
  //         color: "text-indigo-600",
  //       },
  //       {
  //         path: "/moderator-dashboard/admin-blog-history",
  //         icon: MdPayment,
  //         label: "Blog History",
  //         description: "Blog History",
  //         color: "text-indigo-600",
  //       },
  //     ],
  //   },
  //   {
  //     path: "/moderator-dashboard/home-pages-control",
  //     icon: FaHome,
  //     label: "Home Pages Control",
  //     description: "Home Pages Edit",
  //     color: "text-indigo-600",
  //     subItems: [
  //       {
  //         path: "/moderator-dashboard/create-a-home-text",
  //         icon: BiEdit,
  //         label: "Text & Banner",
  //         description: "Text & Banner Create",
  //         color: "text-indigo-600",
  //       },
  //       {
  //         path: "/moderator-dashboard/instructor-profile-update",
  //         icon: MdPayment,
  //         label: "instructor Profile",
  //         description: "instructor Profile Update",
  //         color: "text-indigo-600",
  //       },
  //       {
  //         path: "/moderator-dashboard/video-player-and-image",
  //         icon: MdPayment,
  //         label: "Add video Player ",
  //         description: "Video Player Create",
  //         color: "text-indigo-400",
  //       },
  //       {
  //         path: "/moderator-dashboard/change-banner-image-and-text",
  //         icon: MdPayment,
  //         label: "Image & Text Update",
  //         description: "Image & Text Update",
  //         color: "text-indigo-400",
  //       },
  //       {
  //         path: "/moderator-dashboard/section-text-address-description",
  //         icon: MdPayment,
  //         label: "Add Section Text",
  //         description: "Section Text Create",
  //         color: "text-indigo-400",
  //       },
  //       {
  //         path: "/moderator-dashboard/footer-facebook-url-change",
  //         icon: MdPayment,
  //         label: "Footer Facebook URL",
  //         description: "Footer Facebook URL Change",
  //         color: "text-indigo-400",
  //       },
  //     ],
  //   },
  // ];

  const moderatorMenuItems = [
    {
      path: "/moderator-dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      description: "Overview & Analytics",
      color: "text-blue-600",
    },

    {
      path: "/moderator-dashboard/first-layer",
      icon: HiOutlineDocumentText,
      label: "First Layer",
      description: "First Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-vocabulary",
          icon: BiEdit,
          label: "Create Vocabulary",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-elegant",
          icon: MdPayment,
          label: "Create Elegant",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-idiom",
          icon: BiEdit,
          label: "Create Idiom",
          description: "Create & History",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/create-tantuster",
          icon: BiEdit,
          label: "Create Tantuster",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/new-tantuster",
          icon: BiEdit,
          label: "Create unique",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/second-layer",
      icon: HiOutlineDocumentText,
      label: "Second Layer",
      description: "Second Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-sentence",
          icon: BiEdit,
          label: "Create Sentence",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-verb",
          icon: BiEdit,
          label: "Create Verb",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-article",
          icon: BiEdit,
          label: "Create Article",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-tense",
          icon: BiEdit,
          label: "Create Tense",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-preposition",
          icon: BiEdit,
          label: "Create Preposition",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/third-layer",
      icon: HiOutlineDocumentText,
      label: "Third Layer",
      description: "Third Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/good-life-style",
          icon: BiEdit,
          label: "Create Good Life Style",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/interviews-qustions",
          icon: BiEdit,
          label: "Create Interviews Qustions",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/professional-life-style",
          icon: BiEdit,
          label: "Create Professional Life Style",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/corporate-email",
          icon: BiEdit,
          label: "Create Corporate Email",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/develop-your-skills",
          icon: BiEdit,
          label: "Create Develop Your Skills",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/idea-share-and-suggestion",
          icon: FaIdeal,
          label: " Idea Share and Suggestion",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/fourth-layer",
      icon: HiOutlineDocumentText,
      label: "Fourth Layer",
      description: "Fourth Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-traveling",
          icon: BiEdit,
          label: "Create  Traveling",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-song",
          icon: BiEdit,
          label: "Create  Song",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-porem",
          icon: BiEdit,
          label: "Create Porem",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-movie",
          icon: BiEdit,
          label: "Create Movie",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-novel",
          icon: BiEdit,
          label: "Create Novel",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/five-layer",
      icon: HiOutlineDocumentText,
      label: "Five Layer",
      description: "Five Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-old-generation",
          icon: BiEdit,
          label: "Create  Old Generation",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-story-writting",
          icon: BiEdit,
          label: "Create Story",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-letter-writting",
          icon: BiEdit,
          label: "Create Letter",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-mcq",
          icon: BiEdit,
          label: "Create Mcq",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/six-layer",
      icon: HiOutlineDocumentText,
      label: "Six Layer",
      description: "Six Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-vocabulary-format",
          icon: BiEdit,
          label: "Create Vocabulary Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-elegant-format",
          icon: MdPayment,
          label: "Create Elegant Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-idiom-format",
          icon: BiEdit,
          label: "Create Idiom Format",
          description: "Create & History",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/create-tantuster-format",
          icon: BiEdit,
          label: "Create Tantuster Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/new-tantuster-format",
          icon: BiEdit,
          label: "Create unique Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-sentence-format",
          icon: BiEdit,
          label: "Create Sentence Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-verb-format",
          icon: BiEdit,
          label: "Create Verb Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-article-format",
          icon: BiEdit,
          label: "Create Article Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-tense-format",
          icon: BiEdit,
          label: "Create Tense Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-preposition-format",
          icon: BiEdit,
          label: "Create Preposition Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/good-life-style-format",
          icon: BiEdit,
          label: "Create Good Life Style Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/interviews-qustions-format",
          icon: BiEdit,
          label: "Create Interviews Qustions Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/professional-life-style-format",
          icon: BiEdit,
          label: "Create Professional Life Style Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/corporate-email-format",
          icon: BiEdit,
          label: "Create Corporate Email Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/develop-your-skills-format",
          icon: BiEdit,
          label: "Create Develop Your Skills Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/idea-share-and-suggestion-format",
          icon: FaIdeal,
          label: " Idea Share and Suggestion Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    // seven layer
    {
      path: "/moderator-dashboard/seven-layer",
      icon: HiOutlineDocumentText,
      label: "Seven Layer",
      description: "Seven Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-traveling-format",
          icon: BiEdit,
          label: "Create  Traveling Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-song-format",
          icon: BiEdit,
          label: "Create  Song Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-porem-format",
          icon: BiEdit,
          label: "Create Porem Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-movie-format",
          icon: BiEdit,
          label: "Create Movie Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-novel-format",
          icon: BiEdit,
          label: "Create Novel Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-old-generation-format",
          icon: BiEdit,
          label: "Create  Old Generation Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-story-writting-format",
          icon: BiEdit,
          label: "Create Story Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-letter-writting-format",
          icon: BiEdit,
          label: "Create Letter Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-mcq-format",
          icon: BiEdit,
          label: "Create Mcq Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/promotion",
      icon: HiOutlineDocumentText,
      label: "Promotion",
      description: "Any Site Promotion",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-a-new-promotion",
          icon: BiEdit,
          label: "Create Promotion",
          description: "Create New Promotion",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/promotion-history",
          icon: MdPayment,
          label: "Promotion History",
          description: "Promotion History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/other",
      icon: HiOutlineDocumentText,
      label: "Other",
      description: "Other Create & History ",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-a-new-other",
          icon: BiEdit,
          label: "Create Other",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/create-a-for-next",
          icon: BiEdit,
          label: "Create For Next",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },

    {
      path: "/moderator-dashboard/first-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "First Layer Exercise",
      description: "First Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/vocabulary-exercise",
          icon: BiEdit,
          label: "Vocabulary Exercise",
          description: "User Vocabulary Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/elegant-exercise",
          icon: MdPayment,
          label: "Elegant Exercise",
          description: "User Elegant Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/idiom-exercise",
          icon: BiEdit,
          label: "Idiom Exercise",
          description: "User Idiom Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/tantuster-exercise",
          icon: BiEdit,
          label: "Tantuster Exercise",
          description: "User Tantuster Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/preposition-exercise",
          icon: BiEdit,
          label: "Unique Exercise",
          description: "User Unique Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/second-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Second Layer Exercise",
      description: "Second Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/sentence-exercise",
          icon: BiEdit,
          label: "Sentence Exercise",
          description: "User Sentence Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/verb-exercise",
          icon: MdPayment,
          label: "Verb Exercise",
          description: "User Verb Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/article-exercise",
          icon: BiEdit,
          label: "Article Exercise",
          description: "User Article Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/tense-exercise",
          icon: BiEdit,
          label: "Tense Exercise",
          description: "User Tense Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/preposition-exercise",
          icon: BiEdit,
          label: "Preposition Exercise",
          description: "User Preposition Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/third-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Third Layer Exercise",
      description: "Third Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/good-life-style-exercise",
          icon: BiEdit,
          label: "Good Life Style Exercise",
          description: "User Good Life Style Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/interviews-qustions-exercise",
          icon: BiEdit,
          label: "Interviews Qustions Exercise",
          description: "User Interviws Qustions Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/before-professional-exercise",
          icon: BiEdit,
          label: "Before Professional Exercise",
          description: "User Before Professional Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/corporate-email-exercise",
          icon: BiEdit,
          label: "Corporate Email Exercise",
          description: "User Corporate Email Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/develop-your-skills-exercise",
          icon: BiEdit,
          label: "Develop Your Skills Exercise",
          description: "User Develop Your Skills Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/idea-share-exercise",
          icon: BiEdit,
          label: "Idea Share And Suggestion Exercise",
          description: "User Idea Share And Suggestion Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/fourth-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Fourth Layer Exercise",
      description: "Fourth Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/traveling-exercise",
          icon: BiEdit,
          label: "Traveling Exercise",
          description: "User Traveling Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/song-exercise",
          icon: MdPayment,
          label: "Good Song Exercise",
          description: "User Good Song Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/poem-exercise",
          icon: BiEdit,
          label: "Good Poem Exercise",
          description: "User Good Poem Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/movie-exercise",
          icon: BiEdit,
          label: "Good Movie Exercise",
          description: "User Good Movie Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/novel-exercise",
          icon: BiEdit,
          label: "Good Novel Exercise",
          description: "User Good Novel Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/six-layer/exercise-format",
      icon: HiOutlineDocumentText,
      label: "Six Layer Exercise",
      description: "Six Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/vocabulary-exercise-format",
          icon: BiEdit,
          label: "Vocabulary Format Exercise",
          description: "User Vocabulary Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/elegant-exercise-format",
          icon: MdPayment,
          label: "Elegant Format Exercise",
          description: "User Elegant Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/idiom-exercise-format",
          icon: BiEdit,
          label: "Idiom Format Exercise ",
          description: "User Idiom Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/tantuster-exercise-format",
          icon: BiEdit,
          label: "Tantuster Format Exercise",
          description: "User Tantuster Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/newtantuster-exercise-format",
          icon: BiEdit,
          label: "Unique Format Exercise",
          description: "User Unique Exercise",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/sentence-exercise-format",
          icon: BiEdit,
          label: "Sentence Format Exercise",
          description: "User Sentence Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/verb-exercise-format",
          icon: MdPayment,
          label: "Verb Format Exercise",
          description: "User Verb Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/article-exercise-format",
          icon: BiEdit,
          label: "Article Format Exercise",
          description: "User Article Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/tense-exercise-format",
          icon: BiEdit,
          label: "Tense Format Exercise",
          description: "User Tense Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/preposition-exercise-format",
          icon: BiEdit,
          label: "Preposition Format Exercise",
          description: "User Preposition Exercise",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/good-life-style-format-exercise",
          icon: BiEdit,
          label: "Good Life Style Format Exercise",
          description: "User Good Life Style Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/interviews-qustions-format-exercise",
          icon: BiEdit,
          label: "Interviews Qustions Format Exercise",
          description: "User Interviws Qustions Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/before-professional-format-exercise",
          icon: BiEdit,
          label: "Before Professional Format Exercise",
          description: "User Before Professional Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/corporate-email-format-exercise",
          icon: BiEdit,
          label: "Corporate Email Format Exercise",
          description: "User Corporate Email Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/develop-your-skills-format-exercise",
          icon: BiEdit,
          label: "Develop Your Skills Format Exercise",
          description: "User Develop Your Skills Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/idea-share-format-exercise",
          icon: BiEdit,
          label: "Idea Share And Suggestion Format Exercise",
          description: "User Idea Share And Suggestion Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/seven-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Seven Layer Exercise",
      description: "Seven Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/traveling-exercise-format",
          icon: BiEdit,
          label: "Traveling Format Exercise",
          description: "User Traveling Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/song-exercise-format",
          icon: MdPayment,
          label: "Good Song Format Exercise",
          description: "User Good Song Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/poem-exercise-format",
          icon: BiEdit,
          label: "Good Poem Format Exercise",
          description: "User Good Poem Post",
          color: "text-indigo-600",
        },

        {
          path: "/moderator-dashboard/movie-exercise-format",
          icon: BiEdit,
          label: "Good Movie Format Exercise",
          description: "User Good Movie Post",
          color: "text-indigo-600",
        },
        {
          path: "/moderator-dashboard/novel-exercise-format",
          icon: BiEdit,
          label: "Good Novel Format Exercise",
          description: "User Good Novel Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/moderator-dashboard/blog",
      icon: MdAppBlocking,
      label: "Blog",
      description: "Post Of Blog",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/moderator-dashboard/create-a-new-blog",
          icon: BiEdit,
          label: "Create Blog",
          description: "Create New Blog",
          color: "text-indigo-600",
        },
      ],
    },
  ];

  const adminMenuItems = [
    {
      path: "/admin-dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      description: "Overview & Analytics",
      color: "text-blue-600",
    },

    {
      path: "/admin-dashboard/manage-users/all-users",
      icon: FaUsers,
      label: "All Users",
      description: "Register All User",
      color: "text-green-600",
    },

    {
      path: "/admin-dashboard/first-layer",
      icon: HiOutlineDocumentText,
      label: "First Layer",
      description: "First Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-vocabulary",
          icon: BiEdit,
          label: "Create Vocabulary",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-elegant",
          icon: MdPayment,
          label: "Create Elegant",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-idiom",
          icon: BiEdit,
          label: "Create Idiom",
          description: "Create & History",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/create-tantuster",
          icon: BiEdit,
          label: "Create Tantuster",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/new-tantuster",
          icon: BiEdit,
          label: "Create unique",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/second-layer",
      icon: HiOutlineDocumentText,
      label: "Second Layer",
      description: "Second Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-sentence",
          icon: BiEdit,
          label: "Create Sentence",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-verb",
          icon: BiEdit,
          label: "Create Verb",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-article",
          icon: BiEdit,
          label: "Create Article",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-tense",
          icon: BiEdit,
          label: "Create Tense",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-preposition",
          icon: BiEdit,
          label: "Create Preposition",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/third-layer",
      icon: HiOutlineDocumentText,
      label: "Third Layer",
      description: "Third Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/good-life-style",
          icon: BiEdit,
          label: "Create Good Life Style",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/interviews-qustions",
          icon: BiEdit,
          label: "Create Interviews Qustions",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/professional-life-style",
          icon: BiEdit,
          label: "Create Professional Life Style",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/corporate-email",
          icon: BiEdit,
          label: "Create Corporate Email",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/develop-your-skills",
          icon: BiEdit,
          label: "Create Develop Your Skills",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/idea-share-and-suggestion",
          icon: FaIdeal,
          label: " Idea Share and Suggestion",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/fourth-layer",
      icon: HiOutlineDocumentText,
      label: "Fourth Layer",
      description: "Fourth Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-traveling",
          icon: BiEdit,
          label: "Create  Traveling",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-song",
          icon: BiEdit,
          label: "Create  Song",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-porem",
          icon: BiEdit,
          label: "Create Porem",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-movie",
          icon: BiEdit,
          label: "Create Movie",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-novel",
          icon: BiEdit,
          label: "Create Novel",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/five-layer",
      icon: HiOutlineDocumentText,
      label: "Five Layer",
      description: "Five Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-old-generation",
          icon: BiEdit,
          label: "Create  Old Generation",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-story-writting",
          icon: BiEdit,
          label: "Create Story",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-letter-writting",
          icon: BiEdit,
          label: "Create Letter",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-mcq",
          icon: BiEdit,
          label: "Create Mcq",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/six-layer",
      icon: HiOutlineDocumentText,
      label: "Six Layer",
      description: "Six Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-vocabulary-format",
          icon: BiEdit,
          label: "Create Vocabulary Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-elegant-format",
          icon: MdPayment,
          label: "Create Elegant Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-idiom-format",
          icon: BiEdit,
          label: "Create Idiom Format",
          description: "Create & History",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/create-tantuster-format",
          icon: BiEdit,
          label: "Create Tantuster Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/new-tantuster-format",
          icon: BiEdit,
          label: "Create unique Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-sentence-format",
          icon: BiEdit,
          label: "Create Sentence Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-verb-format",
          icon: BiEdit,
          label: "Create Verb Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-article-format",
          icon: BiEdit,
          label: "Create Article Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-tense-format",
          icon: BiEdit,
          label: "Create Tense Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-preposition-format",
          icon: BiEdit,
          label: "Create Preposition Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/good-life-style-format",
          icon: BiEdit,
          label: "Create Good Life Style Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/interviews-qustions-format",
          icon: BiEdit,
          label: "Create Interviews Qustions Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/professional-life-style-format",
          icon: BiEdit,
          label: "Create Professional Life Style Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/corporate-email-format",
          icon: BiEdit,
          label: "Create Corporate Email Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/develop-your-skills-format",
          icon: BiEdit,
          label: "Create Develop Your Skills Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/idea-share-and-suggestion-format",
          icon: FaIdeal,
          label: " Idea Share and Suggestion Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    // seven layer
    {
      path: "/admin-dashboard/seven-layer",
      icon: HiOutlineDocumentText,
      label: "Seven Layer",
      description: "Seven Layer All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-traveling-format",
          icon: BiEdit,
          label: "Create  Traveling Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-song-format",
          icon: BiEdit,
          label: "Create  Song Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-porem-format",
          icon: BiEdit,
          label: "Create Porem Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-movie-format",
          icon: BiEdit,
          label: "Create Movie Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-novel-format",
          icon: BiEdit,
          label: "Create Novel Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-old-generation-format",
          icon: BiEdit,
          label: "Create  Old Generation Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-story-writting-format",
          icon: BiEdit,
          label: "Create Story Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-letter-writting-format",
          icon: BiEdit,
          label: "Create Letter Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-mcq-format",
          icon: BiEdit,
          label: "Create Mcq Format",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    // contribute
    {
      path: "/admin-dashboard/contribute",
      icon: HiOutlineDocumentText,
      label: "Contribute",
      description: "Contribute All Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/manage-user-nobel",
          icon: BiEdit,
          label: "Manage user-nobel",
          description: "Accept Ans Delete",
          color: "text-indigo-600",
        },
      ],
    },

    {
      path: "/admin-dashboard/layer-manage",
      icon: FaUserGraduate,
      label: "Layer Management",
      description: "Manage all layers",
      color: "text-cyan-600",
    },
    {
      path: "/admin-dashboard/pdf-management",
      icon: FaFilePdf,
      label: "PDF Management",
      description: "Manage PDF documents",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/upload-pdf",
          icon: CircleFadingArrowUp,
          label: "Upload PDF",
          description: "Upload new PDF documents",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/manage-pdf",
          icon: Kanban,
          label: "Manage PDF",
          description: "Manage existing PDF documents",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/blank-pdf",
          icon: CircleFadingArrowUp,
          label: "Upload Blank PDF",
          description: "Blank PDF documents",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/paid-pdf-status",
          icon: CircleFadingArrowUp,
          label: "Paid PDF Status",
          description: "Accepts & Rejects",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/all-payments",
      icon: MdPayments,
      label: " Payments Info",
      description: "Add or Post Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/all-user-payments",
          icon: MdOutlinePayments,
          label: "All User Payments",
          description: "View all user payments",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/add-payment-method",
          icon: MdPayment,
          label: "Add Payment Methods",
          description: "Payment Processing",
          color: "text-yellow-600",
        },
        {
          path: "/admin-dashboard/add-own-sp-payment-method",
          icon: MdPayment,
          label: "Own Sp Payment Methods",
          description: "Own Sp Payment Processing",
          color: "text-yellow-600",
        },
         {
          path: "/admin-dashboard/own-sp-all-user-payments",
          icon: MdOutlinePayments,
          label: "Own Sp All User Payments",
          description: "View all user payments",
          color: "text-indigo-600",
        },
      ],
    },

    {
      path: "/admin-dashboard/promotion",
      icon: HiOutlineDocumentText,
      label: "Promotion",
      description: "Any Site Promotion",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-a-new-promotion",
          icon: BiEdit,
          label: "Create Promotion",
          description: "Create New Promotion",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/promotion-history",
          icon: MdPayment,
          label: "Promotion History",
          description: "Promotion History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/other",
      icon: HiOutlineDocumentText,
      label: "Other",
      description: "Other Create & History ",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-a-new-other",
          icon: BiEdit,
          label: "Create Other",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-a-for-next",
          icon: BiEdit,
          label: "Create For Next",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/own-sp",
      icon: HiOutlineDocumentText,
      label: "Own-Sp",
      description: "Own-Sp Create & History ",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-a-books",
          icon: BiEdit,
          label: "Create Books",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-a-video",
          icon: BiEdit,
          label: "Create For Video",
          description: "Create & History",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/create-a-other",
          icon: BiEdit,
          label: "Create For Other",
          description: "Create & History",
          color: "text-indigo-600",
        },
      ],
    },

    {
      path: "/admin-dashboard/first-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "First Layer Exercise",
      description: "First Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/vocabulary-exercise",
          icon: BiEdit,
          label: "Vocabulary Exercise",
          description: "User Vocabulary Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/elegant-exercise",
          icon: MdPayment,
          label: "Elegant Exercise",
          description: "User Elegant Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/idiom-exercise",
          icon: BiEdit,
          label: "Idiom Exercise",
          description: "User Idiom Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/tantuster-exercise",
          icon: BiEdit,
          label: "Tantuster Exercise",
          description: "User Tantuster Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/preposition-exercise",
          icon: BiEdit,
          label: "Unique Exercise",
          description: "User Unique Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/second-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Second Layer Exercise",
      description: "Second Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/sentence-exercise",
          icon: BiEdit,
          label: "Sentence Exercise",
          description: "User Sentence Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/verb-exercise",
          icon: MdPayment,
          label: "Verb Exercise",
          description: "User Verb Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/article-exercise",
          icon: BiEdit,
          label: "Article Exercise",
          description: "User Article Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/tense-exercise",
          icon: BiEdit,
          label: "Tense Exercise",
          description: "User Tense Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/preposition-exercise",
          icon: BiEdit,
          label: "Preposition Exercise",
          description: "User Preposition Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/third-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Third Layer Exercise",
      description: "Third Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/good-life-style-exercise",
          icon: BiEdit,
          label: "Good Life Style Exercise",
          description: "User Good Life Style Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/interviews-qustions-exercise",
          icon: BiEdit,
          label: "Interviews Qustions Exercise",
          description: "User Interviws Qustions Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/before-professional-exercise",
          icon: BiEdit,
          label: "Before Professional Exercise",
          description: "User Before Professional Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/corporate-email-exercise",
          icon: BiEdit,
          label: "Corporate Email Exercise",
          description: "User Corporate Email Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/develop-your-skills-exercise",
          icon: BiEdit,
          label: "Develop Your Skills Exercise",
          description: "User Develop Your Skills Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/idea-share-exercise",
          icon: BiEdit,
          label: "Idea Share And Suggestion Exercise",
          description: "User Idea Share And Suggestion Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/fourth-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Fourth Layer Exercise",
      description: "Fourth Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/traveling-exercise",
          icon: BiEdit,
          label: "Traveling Exercise",
          description: "User Traveling Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/song-exercise",
          icon: MdPayment,
          label: "Good Song Exercise",
          description: "User Good Song Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/poem-exercise",
          icon: BiEdit,
          label: "Good Poem Exercise",
          description: "User Good Poem Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/movie-exercise",
          icon: BiEdit,
          label: "Good Movie Exercise",
          description: "User Good Movie Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/novel-exercise",
          icon: BiEdit,
          label: "Good Novel Exercise",
          description: "User Good Novel Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/six-layer/exercise-format",
      icon: HiOutlineDocumentText,
      label: "Six Layer Exercise",
      description: "Six Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/vocabulary-exercise-format",
          icon: BiEdit,
          label: "Vocabulary Format Exercise",
          description: "User Vocabulary Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/elegant-exercise-format",
          icon: MdPayment,
          label: "Elegant Format Exercise",
          description: "User Elegant Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/idiom-exercise-format",
          icon: BiEdit,
          label: "Idiom Format Exercise ",
          description: "User Idiom Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/tantuster-exercise-format",
          icon: BiEdit,
          label: "Tantuster Format Exercise",
          description: "User Tantuster Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/newtantuster-exercise-format",
          icon: BiEdit,
          label: "Unique Format Exercise",
          description: "User Unique Exercise",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/sentence-exercise-format",
          icon: BiEdit,
          label: "Sentence Format Exercise",
          description: "User Sentence Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/verb-exercise-format",
          icon: MdPayment,
          label: "Verb Format Exercise",
          description: "User Verb Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/article-exercise-format",
          icon: BiEdit,
          label: "Article Format Exercise",
          description: "User Article Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/tense-exercise-format",
          icon: BiEdit,
          label: "Tense Format Exercise",
          description: "User Tense Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/preposition-exercise-format",
          icon: BiEdit,
          label: "Preposition Format Exercise",
          description: "User Preposition Exercise",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/good-life-style-format-exercise",
          icon: BiEdit,
          label: "Good Life Style Format Exercise",
          description: "User Good Life Style Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/interviews-qustions-format-exercise",
          icon: BiEdit,
          label: "Interviews Qustions Format Exercise",
          description: "User Interviws Qustions Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/before-professional-format-exercise",
          icon: BiEdit,
          label: "Before Professional Format Exercise",
          description: "User Before Professional Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/corporate-email-format-exercise",
          icon: BiEdit,
          label: "Corporate Email Format Exercise",
          description: "User Corporate Email Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/develop-your-skills-format-exercise",
          icon: BiEdit,
          label: "Develop Your Skills Format Exercise",
          description: "User Develop Your Skills Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/idea-share-format-exercise",
          icon: BiEdit,
          label: "Idea Share And Suggestion Format Exercise",
          description: "User Idea Share And Suggestion Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/seven-layer/exercise",
      icon: HiOutlineDocumentText,
      label: "Seven Layer Exercise",
      description: "Seven Layer Exercise Info",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/traveling-exercise-format",
          icon: BiEdit,
          label: "Traveling Format Exercise",
          description: "User Traveling Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/song-exercise-format",
          icon: MdPayment,
          label: "Good Song Format Exercise",
          description: "User Good Song Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/poem-exercise-format",
          icon: BiEdit,
          label: "Good Poem Format Exercise",
          description: "User Good Poem Post",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/movie-exercise-format",
          icon: BiEdit,
          label: "Good Movie Format Exercise",
          description: "User Good Movie Post",
          color: "text-indigo-600",
        },
        {
          path: "/admin-dashboard/novel-exercise-format",
          icon: BiEdit,
          label: "Good Novel Format Exercise",
          description: "User Good Novel Exercise",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/blog",
      icon: MdAppBlocking,
      label: "Blog",
      description: "Post Of Blog",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-a-new-blog",
          icon: BiEdit,
          label: "Create Blog",
          description: "Create New Blog",
          color: "text-indigo-600",
        },
      ],
    },
    {
      path: "/admin-dashboard/home-pages-control",
      icon: FaHome,
      label: "Home Pages Control",
      description: "Home Pages Edit",
      color: "text-indigo-600",
      subItems: [
        {
          path: "/admin-dashboard/create-a-home-text",
          icon: BiEdit,
          label: "Text & Banner",
          description: "Text & Banner Create",
          color: "text-indigo-600",
        },

        {
          path: "/admin-dashboard/success-video-player",
          icon: MdPayment,
          label: "Success video Player ",
          description: "Success Video Player Create",
          color: "text-indigo-400",
        },
        {
          path: "/admin-dashboard/footer-facebook-url-change",
          icon: MdPayment,
          label: "Footer Facebook URL",
          description: "Footer Facebook URL Change",
          color: "text-indigo-400",
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      path: "/user-dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      description: "Your Overview",
      color: "text-blue-600",
    },
    {
      path: "/user-dashboard/upload-pdf",
      icon: CloudUpload,
      label: "Pdf Upload",
      description: "Pdf Management",
      color: "text-blue-600",
    },
    {
      path: "/user-dashboard/create-user-nobel",
      icon: Notebook,
      label: "Create  user-nobel",
      description: "Accept Ans Delete",
      color: "text-indigo-600",
    },
    {
      path: "/user-dashboard/payment-history",
      icon: MdPayment,
      label: "Payment History",
      description: "Payment Management",
      color: "text-blue-600",
    },
    {
      path: "/user-dashboard/own-sp-payment-history",
      icon: MdPayment,
      label: "Own Sp Payment History",
      description: "Payment Management",
      color: "text-blue-600",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    handleSidebarToggle();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300"
          onClick={handleSidebarToggle}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 bg-white backdrop-blur-xl border-r border-gray-200 min-h-screen shadow-lg w-64 h-full overflow-y-auto transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out lg:translate-x-0 z-[1000]`}
      >
        <div className="sticky top-0 z-10 bg-white backdrop-blur-xl border-b border-gray-200">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Link
                  to={
                    role === "admin"
                      ? "/admin-dashboard/my-profile"
                      : role === "moderator"
                        ? "/moderator-dashboard/my-profile"
                        : "/user-dashboard/my-profile"
                  }
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md overflow-hidden cursor-pointer">
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-gray-900 font-bold text-lg leading-tight">
                  {role === "admin"
                    ? "Control Panel"
                    : role === "moderator"
                      ? "Moderator Panel"
                      : "Learning Panel"}
                </h1>
                <p className="text-gray-600 text-xs font-medium">
                  {user.displayName}
                </p>
              </div>
            </div>
            <button
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={handleSidebarToggle}
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {role === "admin" ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Administration
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {adminMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          ) : role === "moderator" ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Moderator Panel
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {moderatorMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MdSchool className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Learning
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {userMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaHome className="w-4 h-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Home
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              <MenuItem
                item={{
                  path: "/",
                  icon: FaHome,
                  label: "Go to Home",
                  description: "Visit main website",
                  color: "text-blue-600",
                }}
                onClick={handleMenuClick}
              />
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <CgProfile className="w-4 h-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Account
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              {user && role && (
                <>
                  <MenuItem
                    item={{
                      path:
                        role === "admin"
                          ? "/admin-dashboard/my-profile"
                          : role === "moderator"
                            ? "/moderator-dashboard/my-profile"
                            : "/user-dashboard/my-profile",
                      icon: CgProfile,
                      label:
                        role === "admin"
                          ? "Admin Profile"
                          : role === "moderator"
                            ? "Moderator Profile"
                            : "My Profile",
                      description: "Personal Settings",
                      color:
                        role === "admin"
                          ? "text-yellow-600"
                          : role === "moderator"
                            ? "text-green-600"
                            : "text-purple-600",
                    }}
                    onClick={handleMenuClick}
                  />
                  <MenuItem
                    item={{
                      path:
                        role === "admin"
                          ? "/admin-dashboard/change-password"
                          : role === "moderator"
                            ? "/moderator-dashboard/change-password"
                            : "/user-dashboard/change-password",
                      icon: FaKey,
                      label: "Change Password",
                      description: "Update your password",
                      color:
                        role === "admin"
                          ? "text-yellow-600"
                          : role === "moderator"
                            ? "text-green-600"
                            : "text-purple-600",
                    }}
                    onClick={handleMenuClick}
                  />
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={logout}
              className="group flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all duration-300 text-red-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200"
            >
              <HiLogout className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex-1">
                <div className="font-medium text-sm">Sign Out</div>
                <div className="text-xs text-gray-500 group-hover:text-red-600">
                  End your session
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
