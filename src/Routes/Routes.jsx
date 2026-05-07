import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import ModeratorLayout from "../layout/ModeratorLayout";
import UserLayout from "../layout/UserLayout";
import AdminArticle from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Article/AdminArticle";
import AdminPreposition from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Preposition/AdminPreposition";
import AdminTense from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Tense/AdminTense";
import AdminVerb from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Verb/AdminVerb";

import AdminPorem from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Porem/AdminPorem";

import AddOwnSpPaymentMethod from "../Pages/AddPaymentMethod/AddOwnSpPaymentMethod";
import ManageUserNobel from "../Pages/AdminDashboardPages/AdminContributePages/ManageUserNobel";
import SuccessVideoStorie from "../Pages/AdminDashboardPages/AdminHomePagesEdit/SuccessVideoStorie";
import AllUserPayment from "../Pages/AdminDashboardPages/AdminPaymentPages/AllUserPayment";
import OwnSpAllUserPayment from "../Pages/AdminDashboardPages/AdminPaymentPages/OwnSpAllUserPayment";
import AdminBlankPdfUpload from "../Pages/AdminDashboardPages/AdminPdfManagement/AdminBlankPdfUpload";
import AdminPdfPayment from "../Pages/AdminDashboardPages/AdminPdfManagement/AdminPdfPayment";
import AdminPdfUpload from "../Pages/AdminDashboardPages/AdminPdfManagement/AdminPdfUpload";
import UserUploadPdfManage from "../Pages/AdminDashboardPages/AdminPdfManagement/UserUploadPdfManage";
import AdminElegantEdit from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Elegant/AdminElegantEdit";
import ElegantExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Exercise/ElegantExercise";
import IdiomExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Exercise/IdiomExercise";
import NewTantusterExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Exercise/NewTantusterExercise";
import TantusterExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Exercise/TantusterExercise";
import VocabularyExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Exercise/VocabularyExercise";
import AdminIdiom from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Idiom/AdminIdiom";
import AdminIdiomEdit from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Idiom/AdminIdiomEdit";
import AdminNewTantuster from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/NewTantuster/AdminNewTantuster";
import AdminNewTantusterEdit from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/NewTantuster/AdminNewTantusterEdit";
import AdminTantuster from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Tantuster/AdminTantuster";
import AdminTantusterEdit from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Tantuster/AdminTantusterEdit";
import AdminVocabularyEdit from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Vocabulary/AdminVocabularyEdit";
import AdminLetterWritting from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/LetterWritting/AdminLetterWritting";
import Adminmcq from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/MCQ/Adminmcq";
import AdminOldGenaration from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/OldGenaration/AdminOldGenaration";
import AdminStoryWritting from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/StoryWritting/AdminStoryWritting";
import GoodMovieExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Exercise/GoodMovieExercise";
import GoodNovelExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Exercise/GoodNovelExercise";
import GoodPoemExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Exercise/GoodPoemExercise";
import GoodSongExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Exercise/GoodSongExercise";
import TravelingExercise from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Exercise/TravelingExercise";
import AdminMovie from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Movie/AdminMovie";
import AdminNobel from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Novel/AdminNobel";
import AdminSong from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Song/AdminSong";
import AdminTraveling from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Traveling/AdminTraveling";
import LayerManage from "../Pages/AdminDashboardPages/BAShapeFormats/LayerManage/LayerManage";
import AdminArticleEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Article/AdminArticleEdit";
import ArticleExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Exercise/ArticleExercise";
import PrepositionExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Exercise/PrepositionExercise";
import SentenceExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Exercise/SentenceExercise";
import TenseExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Exercise/TenseExercise";
import VerbExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Exercise/VerbExercise";
import AdminPrepositionEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Preposition/AdminPrepositionEdit";
import AdminSentenceEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Sentence/AdminSentenceEdit";
import AdminTenseEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Tense/AdminTenseEdit";
import AdminVerbEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Verb/AdminVerbEdit";
import GoodMovieFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/ExerciseFormat/GoodMovieFormatExercise";
import GoodNovelFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/ExerciseFormat/GoodNovelFormatExercise";
import GoodPoemFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/ExerciseFormat/GoodPoemFormatExercise";
import GoodSongFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/ExerciseFormat/GoodSongFormatExercise";
import TravelingFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/ExerciseFormat/TravelingFormatExercise";
import AdminLetterWrittingFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/LetterWrittingFormat/AdminLetterWrittingFormat";
import AdminmcqFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/MCQFormat/AdminmcqFormat";
import AdminMovieFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/MovieFormat/AdminMovieFormat";
import AdminNobelFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/NovelFormat/AdminNobel";
import AdminOldGenarationFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/OldGenarationFormat/AdminOldGenarationFormat";
import AdminPoremFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/PoremFormat/AdminPoremFormat";
import AdminSongFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/SongFormat/AdminSongFormat";
import AdminStoryWrittingFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/StoryWrittingFormat/AdminStoryWrittingFormat";
import AdminTravelingFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SevenLayer/TravelingFormat/AdminTravelingFormat";
import AdminArticleFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ArticleFormat/AdminArticleFormat";
import AdminArticleFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ArticleFormat/AdminArticleFormatEdit";
import AdminBeforeProfessionalFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/BeforeProfessionalFormat/AdminBeforeProfessionalFormat";
import AdminCorporateEmailFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/CorporateEmailFormat/AdminCorporateEmailFormat";
import AdminDevelopYourSkillsFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/DevelopYourSkillsFormat/AdminDevelopYourSkillsFormat";
import AdminElegantFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ElegantFormat/AdminElegantFormat";
import AdminElegantFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ElegantFormat/AdminElegantFormatEdit";
import BeforeProfessionalFormatExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/Excersice/BeforeProfessionalFormatExcersice";
import CorporateEmailFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/Excersice/CorporateEmailFormatExcersice";
import DevelopYourSkillsFormatExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/Excersice/DevelopYourSkillsFormatExcersice";
import GoodLifeStyleFormatExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/Excersice/GoodLifeStyleFormatExcersice";
import IdeaShareFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/Excersice/IdeaShareFormatExcersice";
import InterviewsQustionsFormatExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/Excersice/InterviewsQustionsFormatExcersice";
import ElegantFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormat/ElegantFormatExercise";
import IdiomFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormat/IdiomFormatExercise";
import NewTantusterFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormat/NewTantusterFormatExercise";
import TantusterFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormat/TantusterFormatExercise";
import VocabularyFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormat/VocabularyFormatExercise";
import ArticleFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormats/ArticleFormatExercise";
import PrepositionFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormats/PrepositionFormatExercise";
import SentenceFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormats/SentenceFormatExercise";
import TenseFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormats/TenseFormatExercise";
import VerbFormatExercise from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/ExerciseFormats/VerbFormatExercise";
import AdminGoodLifeStyleFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/GoodLifeStyleFormat/AdminGoodLifeStyleFormat";
import IdeaShareAnsSuggestionFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/IdeaShareAnsSuggestionFormat/IdeaShareAnsSuggestionFormat";
import AdminIdiomFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/IdiomFormat/AdminIdiomFormat";
import AdminIdiomFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/IdiomFormat/AdminIdiomFormatEdit";
import InterviewsQustionsFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/InterviewsQustionFormat/InterviewsQustionsFormat";
import AdminNewTantusterFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/NewTantusterFormat/AdminNewTantusterFormat";
import AdminNewTantusterFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/NewTantusterFormat/AdminNewTantusterFormatEdit";
import AdminPrepositionFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/PrepositionFormat/AdminPrepositionFormat";
import AdminPrepositionFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/PrepositionFormat/AdminPrepositionFormatEdit";
import AdminSentenceFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/SentenceFormat/AdminSentenceFormat";
import AdminSentenceFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/SentenceFormat/AdminSentenceFormatEdit";
import AdminTantusterFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/TantusterFormat/AdminTantusterFormat";
import AdminTantusterFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/TantusterFormat/AdminTantusterFormatEdit";
import AdminTenseFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/TenseFormat/AdminTenseFormat";
import AdminTenseFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/TenseFormat/AdminTenseFormatEdit";
import AdminVerbFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/VerbFormat/AdminVerbFormat";
import AdminVerbFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/VerbFormat/AdminVerbFormatEdit";
import AdminVocabularyFormat from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/VocabularyFormat/AdminVocabularyFormat";
import AdminVocabularyFormatEdit from "../Pages/AdminDashboardPages/BAShapeFormats/SixLayer/VocabularyFormat/AdminVocabularyFormatEdit";
import AdminBeforeProfessional from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/BeforeProfessional/AdminBeforeProfessional";
import AdminCorporateEmail from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/CorporateEmail/AdminCorporateEmail";
import AdminDevelopYourSkills from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/DevelopYourSkills/AdminDevelopYourSkills";
import BeforeProfessionalExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/Excersice/BeforeProfessionalExcersice";
import CorporateEmailExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/Excersice/CorporateEmailExcersice";
import DevelopYourSkillsExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/Excersice/DevelopYourSkillsExcersice";
import GoodLifeStyleExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/Excersice/GoodLifeStyleExcersice";
import IdeaShareExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/Excersice/IdeaShareExcersice";
import InterviewsQustionsExcersice from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/Excersice/InterviewsQustionsExcersice";
import AdminGoodLifeStyle from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/GoodLifeStyle/AdminGoodLifeStyle";
import IdeaShareAnsSuggestion from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/IdeaShareAnsSuggestion/IdeaShareAnsSuggestion";
import InterviewsQustions from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/InterviewsQustion/InterviewsQustions";
import AdminExploreOtherPages from "../Pages/AdminDashboardPages/OtherPages/AdminExploreOtherPages";
import AdminForNextPages from "../Pages/AdminDashboardPages/OtherPages/AdminForNextPages";
import AdminOtherPages from "../Pages/AdminDashboardPages/OtherPages/AdminOtherPages";
import AdminSpBooks from "../Pages/AdminDashboardPages/OwnSpPages/AdminSpBooks";
import AdminSpOthers from "../Pages/AdminDashboardPages/OwnSpPages/AdminSpOthers";
import AdminSpVideo from "../Pages/AdminDashboardPages/OwnSpPages/AdminSpVideo";
import BlankFormat from "../Pages/ContributePages/BlankFormat/BlankFormat";
import UploadPDF from "../Pages/ContributePages/UploadPDF/UploadPDF";
import UserAcceptsNobel from "../Pages/ContributePages/UserNobel/UserAcceptsNobel";
import DashboardRedirect from "../Pages/DashboardRedirect";
import AiOther from "../Pages/OtherPagesUi/AiOther";
import ForNext from "../Pages/OtherPagesUi/ForNext";
import Other from "../Pages/OtherPagesUi/Other";
import OwnSpBooks from "../Pages/OwnSpPages/OwnSpBooks";
import OwnSpOther from "../Pages/OwnSpPages/OwnSpOther";
import OwnSpVideos from "../Pages/OwnSpPages/OwnSpVideos";
import OwnSpPaymentHome from "../Pages/PaymentPages/OwnSpPaymentHome";
import OwnSpPaymentMethod from "../Pages/PaymentPages/OwnSpPaymentMethod";
import OwnSpPaymentSuccess from "../Pages/PaymentPages/OwnSpPaymentSuccess";
import PaymentHome from "../Pages/PaymentPages/PaymentHome";
import PaymentMethod from "../Pages/PaymentPages/PaymentMethod";
import SuccessPayment from "../Pages/PaymentPages/SuccessPayment";
import PDFDownload from "../Pages/PDFDownloadPages/PDFDownload";
import UserNobel from "../Pages/UserNovel/UserNobel";
import OwnSpUserPaymentHistory from "../Pages/UserUploadPdf/OwnSpUserPaymentHistory";
import UserDashboard from "../Pages/UserUploadPdf/UserDashboard";
import UserPaymentHistory from "../Pages/UserUploadPdf/UserPaymentHistory";
import UserUploadPdf from "../Pages/UserUploadPdf/UserUploadPdf";
import AdminRoute from "./AdminRoute";
import LayerRoutes from "./LayerRoutes";
import ModeratorRoute from "./ModeratorRoute";
import OwnSpPaymentRoute from "./OwnSpPaymentRoute";
import PaymentRoute from "./PaymentRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRouter";

// Lazy load components
const ChangePassword = lazy(() => import("../Authentication/ChangePassword"));
const AdminSentence = lazy(
  () =>
    import("../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Sentence/AdminSentence"),
);
const AdminElegant = lazy(
  () =>
    import("../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Elegant/AdminElegant"),
);
const ForgotPassword = lazy(() => import("../Authentication/ForgotPassword"));
const Login = lazy(() => import("../Authentication/Login"));
const Register = lazy(() => import("../Authentication/Register"));
const About = lazy(() => import("../Pages/AboutPages/About"));
const AddPaymentMethod = lazy(
  () => import("../Pages/AddPaymentMethod/AddPaymentMethod"),
);
const AdminDashboard = lazy(
  () => import("../Pages/AdminDashboard/AdminDashboard"),
);
const AdminBlogCreate = lazy(
  () => import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogCreate"),
);

const FooterFacebookLink = lazy(
  () =>
    import("../Pages/AdminDashboardPages/AdminHomePagesEdit/FooterFacebookLink"),
);
const HometextCreate = lazy(
  () =>
    import("../Pages/AdminDashboardPages/AdminHomePagesEdit/HometextCreate"),
);

// const YouTubeVideoPlayer = lazy(
//   () =>
//     import("../Pages/AdminDashboardPages/AdminHomePagesEdit/YouTubeVideoPlayer"),
// );
const AdminPromotion = lazy(
  () =>
    import("../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotion/AdminPromotion"),
);
const AdminPromotionHistory = lazy(
  () =>
    import("../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotionHistory/AdminPromotionHistory"),
);
const AllUsers = lazy(
  () => import("../Pages/AdminDashboardPages/AllUsers/AllUsers"),
);

const AdminVocabulary = lazy(
  () =>
    import("../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Vocabulary/AdminVocabulary"),
);
const Blog = lazy(() => import("../Pages/BlogPages/Blog"));
const BlogDetails = lazy(() => import("../Pages/BlogPages/BlogDetails"));
const Contact = lazy(() => import("../Pages/FooterPages/Contact"));
const PrivacyPolicy = lazy(() => import("../Pages/FooterPages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("../Pages/FooterPages/RefundPolicy"));
const TermsAndConditions = lazy(
  () => import("../Pages/FooterPages/TermsAndConditions"),
);
const Home = lazy(() => import("../Pages/HomePages/Home"));
const Profile = lazy(() => import("../Pages/ProfilePages/Profile"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
    }}
  >
    <div>Loading...</div>
  </div>
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about-us-more-information",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "b-a-shape-formats/*",
        element: (
          <PrivateRoute>
            <PaymentRoute>
              <LayerRoutes />
            </PaymentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/ba-shape-format-payment-confirmed",
        element: <PaymentHome />,
      },

      // Contribute Pages
      {
        path: "contribute/blank-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BlankFormat />
          </Suspense>
        ),
      },
      {
        path: "contribute/upload-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UploadPDF />
          </Suspense>
        ),
      },
      {
        path: "contribute/accept-user-nobels",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserAcceptsNobel />
          </Suspense>
        ),
      },
      // Own Sp Pages
      {
        path: "/own-sp-payment-confirmed",
        element: <OwnSpPaymentHome />,
      },
      {
        path: "own-sp/books",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OwnSpPaymentRoute>
              <OwnSpBooks />
            </OwnSpPaymentRoute>
          </Suspense>
        ),
      },
      {
        path: "own-sp/video",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OwnSpPaymentRoute>
              <OwnSpVideos />
            </OwnSpPaymentRoute>
          </Suspense>
        ),
      },
      {
        path: "own-sp/other",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OwnSpPaymentRoute>
              <OwnSpOther />
            </OwnSpPaymentRoute>
          </Suspense>
        ),
      },

      // Blog
      {
        path: "/blog-us",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/blog-us/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BlogDetails />
          </Suspense>
        ),
      },
      // Authentication
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPassword />
          </Suspense>
        ),
      },

      // download pdf
      {
        path: "/pdf-download",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PDFDownload />
          </Suspense>
        ),
      },
      {
        path: "/explore/other",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Other />
          </Suspense>
        ),
      },
      {
        path: "/explore/for-next",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ForNext />
          </Suspense>
        ),
      },
      {
        path: "/explore/others",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AiOther />
          </Suspense>
        ),
      },
      // footer
      {
        path: "/contact-us",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "/terms-and-conditions",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TermsAndConditions />
          </Suspense>
        ),
      },
      {
        path: "/refund-policy",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RefundPolicy />
          </Suspense>
        ),
      },
    ],
  },
  // Admin Dashboard
  {
    path: "admin-dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "manage-users/all-users",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllUsers />
          </Suspense>
        ),
      },
      {
        path: "layer-manage",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <LayerManage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "add-payment-method",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AddPaymentMethod />
          </Suspense>
        ),
      },
      {
        path: "add-own-sp-payment-method",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AddOwnSpPaymentMethod />
          </Suspense>
        ),
      },
      // First Layer
      {
        path: "create-vocabulary",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabulary />
          </Suspense>
        ),
      },
      {
        path: "edit-vocabulary/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabularyEdit />
          </Suspense>
        ),
      },
      {
        path: "vocabulary-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VocabularyExercise />
          </Suspense>
        ),
      },
      {
        path: "create-elegant",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegant />
          </Suspense>
        ),
      },
      {
        path: "edit-elegant/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegantEdit />
          </Suspense>
        ),
      },
      {
        path: "elegant-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ElegantExercise />
          </Suspense>
        ),
      },
      {
        path: "create-idiom",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiom />
          </Suspense>
        ),
      },
      {
        path: "edit-idiom/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiomEdit />
          </Suspense>
        ),
      },
      {
        path: "idiom-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdiomExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tantuster",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantuster />
          </Suspense>
        ),
      },
      {
        path: "edit-tantuster/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantusterEdit />
          </Suspense>
        ),
      },
      {
        path: "tantuster-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TantusterExercise />
          </Suspense>
        ),
      },
      {
        path: "new-tantuster",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantuster />
          </Suspense>
        ),
      },
      {
        path: "edit-newtantuster/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantusterEdit />
          </Suspense>
        ),
      },
      {
        path: "newtantuster-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NewTantusterExercise />
          </Suspense>
        ),
      },
      // Second Layer
      {
        path: "create-sentence",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentence />
          </Suspense>
        ),
      },
      {
        path: "edit-sentence/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentenceEdit />
          </Suspense>
        ),
      },
      {
        path: "sentence-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SentenceExercise />
          </Suspense>
        ),
      },
      {
        path: "create-verb",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerb />
          </Suspense>
        ),
      },
      {
        path: "edit-verb/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerbEdit />
          </Suspense>
        ),
      },
      {
        path: "verb-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VerbExercise />
          </Suspense>
        ),
      },
      {
        path: "create-article",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticle />
          </Suspense>
        ),
      },
      {
        path: "edit-article/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticleEdit />
          </Suspense>
        ),
      },
      {
        path: "article-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ArticleExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tense",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTense />
          </Suspense>
        ),
      },
      {
        path: "edit-tense/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTenseEdit />
          </Suspense>
        ),
      },
      {
        path: "tense-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TenseExercise />
          </Suspense>
        ),
      },
      {
        path: "create-preposition",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPreposition />
          </Suspense>
        ),
      },
      {
        path: "edit-preposition/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPrepositionEdit />
          </Suspense>
        ),
      },
      {
        path: "preposition-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrepositionExercise />
          </Suspense>
        ),
      },

      // Third Layer
      {
        path: "good-life-style",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminGoodLifeStyle />
          </Suspense>
        ),
      },
      {
        path: "good-life-style-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodLifeStyleExcersice />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustions />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustionsExcersice />
          </Suspense>
        ),
      },
      {
        path: "professional-life-style",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBeforeProfessional />
          </Suspense>
        ),
      },
      {
        path: "before-professional-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BeforeProfessionalExcersice />
          </Suspense>
        ),
      },
      {
        path: "corporate-email",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCorporateEmail />
          </Suspense>
        ),
      },
      {
        path: "corporate-email-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CorporateEmailExcersice />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDevelopYourSkills />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DevelopYourSkillsExcersice />
          </Suspense>
        ),
      },
      {
        path: "idea-share-and-suggestion",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareAnsSuggestion />
          </Suspense>
        ),
      },
      {
        path: "idea-share-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareExcersice />
          </Suspense>
        ),
      },
      // Fourth Layer

      {
        path: "create-traveling",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTraveling />
          </Suspense>
        ),
      },
      {
        path: "traveling-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TravelingExercise />
          </Suspense>
        ),
      },

      {
        path: "create-song",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSong />
          </Suspense>
        ),
      },
      {
        path: "song-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodSongExercise />
          </Suspense>
        ),
      },
      {
        path: "create-porem",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPorem />
          </Suspense>
        ),
      },
      {
        path: "poem-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodPoemExercise />
          </Suspense>
        ),
      },
      {
        path: "create-movie",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminMovie />
          </Suspense>
        ),
      },
      {
        path: "movie-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodMovieExercise />
          </Suspense>
        ),
      },
      {
        path: "create-novel",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNobel />
          </Suspense>
        ),
      },
      {
        path: "novel-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodNovelExercise />
          </Suspense>
        ),
      },

      // Five Layer
      {
        path: "create-old-generation",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOldGenaration />
          </Suspense>
        ),
      },
      {
        path: "create-story-writting",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminStoryWritting />
          </Suspense>
        ),
      },
      {
        path: "create-letter-writting",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLetterWritting />
          </Suspense>
        ),
      },
      {
        path: "create-mcq",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Adminmcq />
          </Suspense>
        ),
      },
      // Six Layer
      {
        path: "create-vocabulary-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabularyFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-vocabulary-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabularyFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "vocabulary-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VocabularyFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-elegant-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegantFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-elegant-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegantFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "elegant-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ElegantFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-idiom-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiomFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-idiom-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiomFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "idiom-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdiomFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tantuster-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantusterFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-tantuster-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantusterFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "tantuster-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TantusterFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "new-tantuster-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantusterFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-newtantuster-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantusterFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "newtantuster-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NewTantusterFormatExercise />
          </Suspense>
        ),
      },
      // Second Layer Format
      {
        path: "create-sentence-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentenceFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-sentence-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentenceFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "sentence-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SentenceFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-verb-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerbFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-verb-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerbFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "verb-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VerbFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-article-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticleFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-article-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticleFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "article-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ArticleFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tense-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTenseFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-tense-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTenseFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "tense-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TenseFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-preposition-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPrepositionFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-preposition-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPrepositionFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "preposition-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrepositionFormatExercise />
          </Suspense>
        ),
      },
      // Third Layer
      {
        path: "good-life-style-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminGoodLifeStyleFormat />
          </Suspense>
        ),
      },
      {
        path: "good-life-style-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodLifeStyleFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustionsFormat />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustionsFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "professional-life-style-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBeforeProfessionalFormat />
          </Suspense>
        ),
      },
      {
        path: "before-professional-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BeforeProfessionalFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "corporate-email-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCorporateEmailFormat />
          </Suspense>
        ),
      },
      {
        path: "corporate-email-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CorporateEmailFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDevelopYourSkillsFormat />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DevelopYourSkillsFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "idea-share-and-suggestion-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareAnsSuggestionFormat />
          </Suspense>
        ),
      },
      {
        path: "idea-share-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareFormatExercise />
          </Suspense>
        ),
      },
      // Seven Layer

      {
        path: "create-traveling-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTravelingFormat />
          </Suspense>
        ),
      },
      {
        path: "traveling-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TravelingFormatExercise />
          </Suspense>
        ),
      },

      {
        path: "create-song-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSongFormat />
          </Suspense>
        ),
      },
      {
        path: "song-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodSongFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-porem-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPoremFormat />
          </Suspense>
        ),
      },
      {
        path: "poem-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodPoemFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-movie-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminMovieFormat />
          </Suspense>
        ),
      },
      {
        path: "movie-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodMovieFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-novel-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNobelFormat />
          </Suspense>
        ),
      },
      {
        path: "novel-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodNovelFormatExercise />
          </Suspense>
        ),
      },

      // Five Layer
      {
        path: "create-old-generation-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOldGenarationFormat />
          </Suspense>
        ),
      },
      {
        path: "create-story-writting-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminStoryWrittingFormat />
          </Suspense>
        ),
      },
      {
        path: "create-letter-writting-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLetterWrittingFormat />
          </Suspense>
        ),
      },
      {
        path: "create-mcq-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminmcqFormat />
          </Suspense>
        ),
      },

      // Promotion
      {
        path: "create-a-new-promotion",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotion />
          </Suspense>
        ),
      },
      {
        path: "promotion-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotionHistory />
          </Suspense>
        ),
      },
      {
        path: "upload-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPdfUpload />
          </Suspense>
        ),
      },
      {
        path: "manage-user-nobel",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ManageUserNobel />
          </Suspense>
        ),
      },
      {
        path: "manage-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserUploadPdfManage />
          </Suspense>
        ),
      },
      {
        path: "blank-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlankPdfUpload />
          </Suspense>
        ),
      },
      {
        path: "paid-pdf-status",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPdfPayment />
          </Suspense>
        ),
      },
      {
        path: "create-a-new-other",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOtherPages />
          </Suspense>
        ),
      },
      {
        path: "create-explore-other",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminExploreOtherPages />
          </Suspense>
        ),
      },
      {
        path: "create-a-books",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSpBooks />
          </Suspense>
        ),
      },
      {
        path: "create-a-video",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSpVideo />
          </Suspense>
        ),
      },
      {
        path: "create-a-other",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSpOthers />
          </Suspense>
        ),
      },
      {
        path: "create-a-for-next",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminForNextPages />
          </Suspense>
        ),
      },
      // payment confirmed
      {
        path: "all-user-payments",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllUserPayment />
          </Suspense>
        ),
      },
      {
        path: "own-sp-all-user-payments",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OwnSpAllUserPayment />
          </Suspense>
        ),
      },

      // Admin Blog Routes
      {
        path: "create-a-new-blog",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlogCreate />
          </Suspense>
        ),
      },

      // Home Pages text banner and instructor Profile Update
      {
        path: "create-a-home-text",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HometextCreate />
          </Suspense>
        ),
      },
      {
        path: "success-video-player",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SuccessVideoStorie />
          </Suspense>
        ),
      },

      {
        path: "footer-facebook-url-change",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FooterFacebookLink />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      // Admin Profile and Password Change
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ChangePassword />
          </Suspense>
        ),
      },
    ],
  },
  // Moderator Dashboard
  {
    path: "moderator-dashboard",
    element: (
      <PrivateRoute>
        <ModeratorRoute>
          <ModeratorLayout />
        </ModeratorRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard />
          </Suspense>
        ),
      },

      // First Layer
      {
        path: "create-vocabulary",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabulary />
          </Suspense>
        ),
      },
      {
        path: "edit-vocabulary/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabularyEdit />
          </Suspense>
        ),
      },
      {
        path: "vocabulary-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VocabularyExercise />
          </Suspense>
        ),
      },
      {
        path: "create-elegant",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegant />
          </Suspense>
        ),
      },
      {
        path: "edit-elegant/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegantEdit />
          </Suspense>
        ),
      },
      {
        path: "elegant-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ElegantExercise />
          </Suspense>
        ),
      },
      {
        path: "create-idiom",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiom />
          </Suspense>
        ),
      },
      {
        path: "edit-idiom/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiomEdit />
          </Suspense>
        ),
      },
      {
        path: "idiom-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdiomExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tantuster",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantuster />
          </Suspense>
        ),
      },
      {
        path: "edit-tantuster/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantusterEdit />
          </Suspense>
        ),
      },
      {
        path: "tantuster-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TantusterExercise />
          </Suspense>
        ),
      },
      {
        path: "new-tantuster",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantuster />
          </Suspense>
        ),
      },
      {
        path: "edit-newtantuster/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantusterEdit />
          </Suspense>
        ),
      },
      {
        path: "newtantuster-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NewTantusterExercise />
          </Suspense>
        ),
      },
      // Second Layer
      {
        path: "create-sentence",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentence />
          </Suspense>
        ),
      },
      {
        path: "edit-sentence/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentenceEdit />
          </Suspense>
        ),
      },
      {
        path: "sentence-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SentenceExercise />
          </Suspense>
        ),
      },
      {
        path: "create-verb",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerb />
          </Suspense>
        ),
      },
      {
        path: "edit-verb/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerbEdit />
          </Suspense>
        ),
      },
      {
        path: "verb-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VerbExercise />
          </Suspense>
        ),
      },
      {
        path: "create-article",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticle />
          </Suspense>
        ),
      },
      {
        path: "edit-article/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticleEdit />
          </Suspense>
        ),
      },
      {
        path: "article-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ArticleExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tense",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTense />
          </Suspense>
        ),
      },
      {
        path: "edit-tense/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTenseEdit />
          </Suspense>
        ),
      },
      {
        path: "tense-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TenseExercise />
          </Suspense>
        ),
      },
      {
        path: "create-preposition",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPreposition />
          </Suspense>
        ),
      },
      {
        path: "edit-preposition/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPrepositionEdit />
          </Suspense>
        ),
      },
      {
        path: "preposition-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrepositionExercise />
          </Suspense>
        ),
      },

      // Third Layer
      {
        path: "good-life-style",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminGoodLifeStyle />
          </Suspense>
        ),
      },
      {
        path: "good-life-style-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodLifeStyleExcersice />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustions />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustionsExcersice />
          </Suspense>
        ),
      },
      {
        path: "professional-life-style",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBeforeProfessional />
          </Suspense>
        ),
      },
      {
        path: "before-professional-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BeforeProfessionalExcersice />
          </Suspense>
        ),
      },
      {
        path: "corporate-email",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCorporateEmail />
          </Suspense>
        ),
      },
      {
        path: "corporate-email-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CorporateEmailExcersice />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDevelopYourSkills />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DevelopYourSkillsExcersice />
          </Suspense>
        ),
      },
      {
        path: "idea-share-and-suggestion",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareAnsSuggestion />
          </Suspense>
        ),
      },
      {
        path: "idea-share-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareExcersice />
          </Suspense>
        ),
      },
      // Fourth Layer

      {
        path: "create-traveling",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTraveling />
          </Suspense>
        ),
      },
      {
        path: "traveling-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TravelingExercise />
          </Suspense>
        ),
      },

      {
        path: "create-song",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSong />
          </Suspense>
        ),
      },
      {
        path: "song-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodSongExercise />
          </Suspense>
        ),
      },
      {
        path: "create-porem",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPorem />
          </Suspense>
        ),
      },
      {
        path: "poem-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodPoemExercise />
          </Suspense>
        ),
      },
      {
        path: "create-movie",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminMovie />
          </Suspense>
        ),
      },
      {
        path: "movie-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodMovieExercise />
          </Suspense>
        ),
      },
      {
        path: "create-novel",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNobel />
          </Suspense>
        ),
      },
      {
        path: "novel-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodNovelExercise />
          </Suspense>
        ),
      },

      // Five Layer
      {
        path: "create-old-generation",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOldGenaration />
          </Suspense>
        ),
      },
      {
        path: "create-story-writting",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminStoryWritting />
          </Suspense>
        ),
      },
      {
        path: "create-letter-writting",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLetterWritting />
          </Suspense>
        ),
      },
      {
        path: "create-mcq",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Adminmcq />
          </Suspense>
        ),
      },
      // Six Layer
      {
        path: "create-vocabulary-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabularyFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-vocabulary-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabularyFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "vocabulary-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VocabularyFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-elegant-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegantFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-elegant-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegantFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "elegant-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ElegantFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-idiom-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiomFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-idiom-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiomFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "idiom-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdiomFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tantuster-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantusterFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-tantuster-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantusterFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "tantuster-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TantusterFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "new-tantuster-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantusterFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-newtantuster-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantusterFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "newtantuster-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NewTantusterFormatExercise />
          </Suspense>
        ),
      },
      // Second Layer Format
      {
        path: "create-sentence-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentenceFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-sentence-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentenceFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "sentence-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SentenceFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-verb-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerbFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-verb-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerbFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "verb-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VerbFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-article-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticleFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-article-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticleFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "article-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ArticleFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-tense-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTenseFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-tense-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTenseFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "tense-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TenseFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-preposition-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPrepositionFormat />
          </Suspense>
        ),
      },
      {
        path: "edit-preposition-format/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPrepositionFormatEdit />
          </Suspense>
        ),
      },
      {
        path: "preposition-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrepositionFormatExercise />
          </Suspense>
        ),
      },
      // Third Layer
      {
        path: "good-life-style-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminGoodLifeStyleFormat />
          </Suspense>
        ),
      },
      {
        path: "good-life-style-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodLifeStyleFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustionsFormat />
          </Suspense>
        ),
      },
      {
        path: "interviews-qustions-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InterviewsQustionsFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "professional-life-style-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBeforeProfessionalFormat />
          </Suspense>
        ),
      },
      {
        path: "before-professional-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BeforeProfessionalFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "corporate-email-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCorporateEmailFormat />
          </Suspense>
        ),
      },
      {
        path: "corporate-email-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CorporateEmailFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDevelopYourSkillsFormat />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DevelopYourSkillsFormatExcersice />
          </Suspense>
        ),
      },
      {
        path: "idea-share-and-suggestion-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareAnsSuggestionFormat />
          </Suspense>
        ),
      },
      {
        path: "idea-share-format-exercise",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareFormatExercise />
          </Suspense>
        ),
      },
      // Seven Layer

      {
        path: "create-traveling-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTravelingFormat />
          </Suspense>
        ),
      },
      {
        path: "traveling-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TravelingFormatExercise />
          </Suspense>
        ),
      },

      {
        path: "create-song-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSongFormat />
          </Suspense>
        ),
      },
      {
        path: "song-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodSongFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-porem-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPoremFormat />
          </Suspense>
        ),
      },
      {
        path: "poem-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodPoemFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-movie-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminMovieFormat />
          </Suspense>
        ),
      },
      {
        path: "movie-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodMovieFormatExercise />
          </Suspense>
        ),
      },
      {
        path: "create-novel-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNobelFormat />
          </Suspense>
        ),
      },
      {
        path: "novel-exercise-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoodNovelFormatExercise />
          </Suspense>
        ),
      },

      // Five Layer
      {
        path: "create-old-generation-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOldGenarationFormat />
          </Suspense>
        ),
      },
      {
        path: "create-story-writting-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminStoryWrittingFormat />
          </Suspense>
        ),
      },
      {
        path: "create-letter-writting-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLetterWrittingFormat />
          </Suspense>
        ),
      },
      {
        path: "create-mcq-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminmcqFormat />
          </Suspense>
        ),
      },

      // Promotion
      {
        path: "create-a-new-promotion",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotion />
          </Suspense>
        ),
      },
      {
        path: "promotion-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotionHistory />
          </Suspense>
        ),
      },
      {
        path: "upload-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPdfUpload />
          </Suspense>
        ),
      },
      {
        path: "manage-user-nobel",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ManageUserNobel />
          </Suspense>
        ),
      },
      {
        path: "manage-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserUploadPdfManage />
          </Suspense>
        ),
      },
      {
        path: "blank-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlankPdfUpload />
          </Suspense>
        ),
      },

      {
        path: "create-a-new-other",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOtherPages />
          </Suspense>
        ),
      },
      {
        path: "create-a-for-next",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminForNextPages />
          </Suspense>
        ),
      },
      // payment confirmed

      // Admin Blog Routes
      {
        path: "create-a-new-blog",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlogCreate />
          </Suspense>
        ),
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
      // Admin Profile and Password Change
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ChangePassword />
          </Suspense>
        ),
      },
    ],
  },
  // User Dashboard
  {
    path: "user-dashboard",
    element: (
      <PrivateRoute>
        <UserRoute>
          <UserLayout />
        </UserRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "upload-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserUploadPdf />
          </Suspense>
        ),
      },
      {
        path: "create-user-nobel",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserNobel />
          </Suspense>
        ),
      },
      {
        path: "payment-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserPaymentHistory />
          </Suspense>
        ),
      },
      {
        path: "own-sp-payment-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OwnSpUserPaymentHistory />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ChangePassword />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardRedirect />
      </PrivateRoute>
    ),
  },
  {
    path: "/payment-confirmed",
    element: (
      <PrivateRoute>
        <PaymentMethod />
      </PrivateRoute>
    ),
  },
  {
    path: "/own-sp-payment-confirm",
    element: (
      <PrivateRoute>
        <OwnSpPaymentMethod />
      </PrivateRoute>
    ),
  },
  {
    path: "/payment-success",
    element: (
      <PrivateRoute>
        <SuccessPayment />
      </PrivateRoute>
    ),
  },
  {
    path: "/own-sp-payment-success",
    element: (
      <PrivateRoute>
        <OwnSpPaymentSuccess />
      </PrivateRoute>
    ),
  },
]);
