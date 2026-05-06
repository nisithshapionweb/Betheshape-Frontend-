import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

import GoodMovieFormat from "./GoodMovieFormat";
import GoodNobelFormat from "./GoodNobelFormat";
import GoodPoremFormat from "./GoodPoremFormat";
import GoodSongFormat from "./GoodSongFormat";
import LetterWrittingFormat from "./LetterWrittingFormat";
import OldGenerationFormat from "./OldGenerationFormat";
import QuizFormat from "./QuizFormat";
import StoryWrittingFormat from "./StoryWrittingFormat";
import TravelingFormat from "./TravelingFormat";

import {
  BookOpen,
  CheckCircle,
  Film,
  Map,
  Music,
  PenLine,
  Star,
  Users,
} from "lucide-react";
import Promotion from "../../HomePages/Promotion";

const SevenLayer = () => {
  return (
    <div className="py-5 space-y-5">
      <Helmet>
        <title>Final Mastery | Betheshape</title>
        <meta
          name="description"
          content="Consolidate your English learning through culture, literature, writing, and final assessments in the Final Mastery layer."
        />
      </Helmet>

      {/* Title Section */}
      <div className="max-w-[1400px] mx-auto px-4">
        <TittleAnimation
          tittle="Final Mastery"
          subtittle="Consolidate your English skills with advanced exercises covering culture, literature, writing, and assessment."
        />
      </div>

      {/* Feature Cards */}
      <div className="max-w-[1400px] mx-auto  grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Map className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">Travel & Culture</h3>
          <p className="text-sm text-gray-500">
            Learn English through cultural experiences and travel topics.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Music className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg">Songs & Media</h3>
          <p className="text-sm text-gray-500">
            Enhance listening and vocabulary through music and media.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Film className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Movies & Stories</h3>
          <p className="text-sm text-gray-500">
            Learn expressions and narrative skills through movies and stories.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <BookOpen className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-lg">Literature & Poems</h3>
          <p className="text-sm text-gray-500">
            Improve reading comprehension through novels, poems, and literature.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto  grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Users className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">Life & Perspective</h3>
          <p className="text-sm text-gray-500">
            Learn from experiences across generations to broaden your
            perspective.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <PenLine className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg">Writing Skills</h3>
          <p className="text-sm text-gray-500">
            Practice letter writing, story writing, and effective communication.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Final Quiz</h3>
          <p className="text-sm text-gray-500">
            Test all your English skills through comprehensive quizzes and
            exercises.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Star className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-lg">Mastery Achieved</h3>
          <p className="text-sm text-gray-500">
            Consolidate your learning and demonstrate mastery across all topics.
          </p>
        </div>
      </div>

      {/* Learning Sections */}
      <div>
        <Promotion position="layer_7_bottom" />
        <TravelingFormat />
        <GoodSongFormat />
        <GoodMovieFormat />
        <GoodPoremFormat />
        <GoodNobelFormat />
        <OldGenerationFormat />
        <StoryWrittingFormat />
        <LetterWrittingFormat />
        <QuizFormat />
      </div>
    </div>
  );
};

export default SevenLayer;
