
import { BookOpen, Film, Map, Music } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import Promotion from "../../HomePages/Promotion";
import GoodMovie from "./GoodMovie";
import GoodNobel from "./GoodNobel";
import GoodPorem from "./GoodPorem";
import GoodSong from "./GoodSong";
import Traveling from "./Traveling";

const FourthLayer = () => {
  return (
    <div className="py-5">

      <Helmet>
        <title>Culture & Entertainment | Betheshape</title>
        <meta
          name="description"
          content="Explore English through culture and entertainment including travel topics, songs, movies, poems, and novels."
        />
      </Helmet>

      {/* Title Section */}
      <div className="max-w-[1400px] mx-auto px-4">
        <TittleAnimation
          tittle="Culture & Entertainment"
          subtittle="Improve your English through travel experiences, songs, movies, poems, and novels while enjoying cultural learning."
        />
      </div>

      {/* Feature Cards */}
      <div className="max-w-[1400px] mx-auto  grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Map className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">Travel & Exploration</h3>
          <p className="text-sm text-gray-500">
            Learn English through travel stories and global cultural experiences.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Music className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg">Songs & Lyrics</h3>
          <p className="text-sm text-gray-500">
            Improve listening and vocabulary skills through meaningful songs.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <Film className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Movies</h3>
          <p className="text-sm text-gray-500">
            Discover English expressions and storytelling through movies.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <BookOpen className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-lg">Poems & Novels</h3>
          <p className="text-sm text-gray-500">
            Enhance reading and literary understanding with poems and novels.
          </p>
        </div>

      </div>

      {/* Learning Sections */}
      <div >
         <Promotion position="layer_4_bottom" />
        <Traveling />
        <GoodSong />
        <GoodMovie />
        <GoodPorem />
        <GoodNobel />
      </div>

    </div>
  );
};

export default FourthLayer;

