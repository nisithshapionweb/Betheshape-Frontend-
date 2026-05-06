import { Briefcase, Lightbulb, MessageSquare, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import Promotion from "../../HomePages/Promotion";
import BeforeProfesional from "./BeforeProfesional";
import CorporateEmail from "./CorporateEmail";
import DevelopYourSkills from "./DevelopYourSkills";
import GoodLifeStyle from "./GoodLifeStyle";
import IdeaShare from "./IdeaShare";
import InterviewsQustion from "./InterviewsQustion";

const ThirdLayer = () => {
  return (
    <div className="py-5">
      <Helmet>
        <title>Professional Communication | Betheshape</title>
        <meta
          name="description"
          content="Improve your professional communication skills including interviews, corporate emails, idea sharing, and personal development."
        />
      </Helmet>

      {/* Title Section */}
      <div className="max-w-[1400px] mx-auto px-4">
        <TittleAnimation
          tittle="Professional Communication"
          subtittle="Develop the communication and professional skills needed for interviews, corporate environments, and personal growth."
        />
      </div>

      {/* Feature Cards */}
      <div className="max-w-[1400px] mx-auto  grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">Career Preparation</h3>
          <p className="text-sm text-gray-500">
            Learn how to prepare yourself for professional environments and
            career opportunities.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Users className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg">Interview Skills</h3>
          <p className="text-sm text-gray-500">
            Practice common interview questions and improve your confidence.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <MessageSquare className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Corporate Communication</h3>
          <p className="text-sm text-gray-500">
            Understand how to write professional emails and communicate
            effectively at work.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Lightbulb className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-lg">Idea & Skill Development</h3>
          <p className="text-sm text-gray-500">
            Improve creativity, share ideas, and develop skills for personal
            growth.
          </p>
        </div>
      </div>

      {/* Learning Sections */}
      <div >
         <Promotion position="layer_3_bottom" />
        <GoodLifeStyle />
        <InterviewsQustion />
        <BeforeProfesional />
        <CorporateEmail />
        <DevelopYourSkills />
        <IdeaShare />
      </div>
    </div>
  );
};

export default ThirdLayer;
