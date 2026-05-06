import { BookOpen, Brain, Languages, PenTool } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import Promotion from "../../HomePages/Promotion";
import Article from "./Article";
import Preposition from "./Preposition";
import Sentence from "./Sentence";
import Tense from "./Tense";
import Verb from "./Verb";

const SecondLayer = () => {
  return (
    <div className="py-5 ">
      <Helmet>
        <title>Grammar Foundation | Betheshape</title>
        <meta
          name="description"
          content="Learn the fundamentals of English grammar including sentence structure, verbs, articles, tenses, and prepositions in Betheshape."
        />
      </Helmet>

      {/* Title Section */}
      <div className="max-w-[1400px] mx-auto px-4">
        <TittleAnimation
          tittle="Grammar Foundation"
          subtittle="Learn the core rules of English grammar including sentences, verbs, articles, tenses, and prepositions to build a strong language foundation."
        />
      </div>

      {/* Feature Cards */}
      <div className="max-w-[1400px] mx-auto  grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">Sentence Structure</h3>
          <p className="text-sm text-gray-500">
            Learn how to form clear and meaningful sentences in English.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Languages className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg">Verbs</h3>
          <p className="text-sm text-gray-500">
            Understand how verbs express actions, states, and events in
            sentences.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <PenTool className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Tenses</h3>
          <p className="text-sm text-gray-500">
            Master past, present, and future tenses to express time correctly.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Brain className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-lg">Prepositions</h3>
          <p className="text-sm text-gray-500">
            Learn how prepositions connect words and show relationships in
            sentences.
          </p>
        </div>
      </div>

      {/* Learning Sections */}
      <div>
         <Promotion position="layer_2_bottom" />
        <Sentence />
        <Verb />
        <Article />
        <Tense />
        <Preposition />
      </div>
    </div>
  );
};

export default SecondLayer;
