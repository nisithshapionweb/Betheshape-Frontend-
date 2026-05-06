import { BookOpen, Brain, PenLine, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import Promotion from "../../HomePages/Promotion";
import LetterWritting from "./LetterWritting";
import OldGeneration from "./OldGeneration";
import Quiz from "./Quiz";
import StoryWritting from "./StoryWritting";

const FiveLayer = () => {
  return (
    <div className="py-5">
      <Helmet>
        <title>Writing & Expression | Betheshape</title>
        <meta
          name="description"
          content="Develop your English writing skills through stories, letters, quizzes, and reflections on different topics."
        />
      </Helmet>

      {/* Title Section */}
      <div className="max-w-[1400px] mx-auto px-4">
        <TittleAnimation
          tittle="Writing & Expression"
          subtittle="Practice expressing your ideas through story writing, letter writing, and quizzes to improve your communication skills."
        />
      </div>

      {/* Feature Cards */}
      <div className="max-w-[1400px] mx-auto  grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Users className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">Life Perspectives</h3>
          <p className="text-sm text-gray-500">
            Explore ideas and values from different generations and life
            experiences.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <PenLine className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg">Story Writing</h3>
          <p className="text-sm text-gray-500">
            Improve creativity and storytelling skills through engaging writing
            exercises.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <BookOpen className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Letter Writing</h3>
          <p className="text-sm text-gray-500">
            Learn how to write formal and informal letters effectively.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Brain className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-lg">Knowledge Quiz</h3>
          <p className="text-sm text-gray-500">
            Test your understanding and reinforce your learning through quizzes.
          </p>
        </div>
      </div>

      {/* Learning Sections */}
      <div>
        <Promotion position="layer_5_bottom" />
        <OldGeneration />
        <StoryWritting />
        <LetterWritting />
        <Quiz />
      </div>
    </div>
  );
};

export default FiveLayer;
