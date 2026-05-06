
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

import ArticleFormat from "./ArticleFormat";
import ElegantFormat from "./ElegantFormat";
import IdiomFormat from "./IdiomFormat";
import NewtantusterFormat from "./NewTantusterFormat";
import PrepositionFormat from "./PrepositionFormat";
import SentenceFormat from "./SentenceFormat";
import TantusterFormat from "./TantusterFormat";
import TenseFormat from "./TenseFormat";
import VerbFormat from "./VerbFormat";
import VocabularyFormat from "./VocabularyFormat";

import { BookOpen, Brain, CheckCircle, Layers } from "lucide-react";
import Promotion from "../../HomePages/Promotion";

const SixLayer = () => {
  return (
    <div className="py-5">

      <Helmet>
        <title>Practice & Assessment | Betheshape</title>
        <meta
          name="description"
          content="Practice and assess your English knowledge with exercises covering vocabulary, idioms, grammar, and sentence structure."
        />
      </Helmet>

      {/* Title Section */}
      <div className="max-w-[1400px] mx-auto px-4">
        <TittleAnimation
          tittle="Practice & Assessment"
          subtittle="Strengthen your English skills by practicing vocabulary, idioms, grammar, and sentence structures through interactive exercises."
        />
      </div>

      {/* Feature Cards */}
      <div className="max-w-[1400px] mx-auto  grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">Vocabulary Practice</h3>
          <p className="text-sm text-gray-500">
            Review and strengthen your vocabulary through structured exercises.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Layers className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg">Grammar Review</h3>
          <p className="text-sm text-gray-500">
            Practice grammar topics like sentences, verbs, tenses, and articles.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Interactive Exercises</h3>
          <p className="text-sm text-gray-500">
            Engage in interactive exercises designed to test your knowledge.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Brain className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-lg">Skill Reinforcement</h3>
          <p className="text-sm text-gray-500">
            Reinforce your learning by practicing across multiple English topics.
          </p>
        </div>

      </div>

      {/* Learning Sections */}
      <div >
         <Promotion position="layer_6_bottom" />
        <VocabularyFormat />
        <ElegantFormat />
        <IdiomFormat />
        <TantusterFormat />
        <NewtantusterFormat />
        <SentenceFormat />
        <VerbFormat />
        <ArticleFormat />
        <TenseFormat />
        <PrepositionFormat />
      </div>

    </div>
  );
};

export default SixLayer;

