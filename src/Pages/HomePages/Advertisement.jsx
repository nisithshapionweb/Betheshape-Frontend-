import { MessageCircle } from "lucide-react";

const Advertisement = () => {
  return (
    <div>
      {/* Advertisement Section */}
      <section className="bg-teal-50 py-20">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Main Container */}
          <div>
            {/* Header */}
            <h3 className="text-2xl md:text-5xl font-bold text-teal-700 mb-6 text-center">
              🚀 Promote Your Business With Betheshape
            </h3>

            {/* Description */}
            <p className="text-gray-600 max-w-6xl mx-auto mb-10 text-base md:text-xl md:text-center text-justify">
              আপনি কি আপনার Website, Online Course, Product বা Service প্রচার করতে চান?
              <br className="hidden md:inline" />
              Betheshape প্ল্যাটফর্মে এখন Ads দেওয়ার সুযোগ রয়েছে। প্রতিদিন হাজারো ইংরেজি শেখার আগ্রহী শিক্ষার্থী আমাদের ওয়েবসাইট ভিজিট করে।
              আপনার ব্যবসাকে পৌঁছে দিন সঠিক অডিয়েন্সের কাছে।
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center gap-2">
                  🎯 Targeted Audience
                </h4>
                <p className="text-gray-600 text-sm">
                  English learners, students এবং job seekers দের কাছে সরাসরি পৌঁছান।
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center gap-2">
                  📈 Increase Visibility
                </h4>
                <p className="text-gray-600 text-sm">
                  আপনার ব্র্যান্ডের পরিচিতি বাড়ান এবং নতুন কাস্টমার পান।
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center gap-2">
                  💼 Flexible Ad Plans
                </h4>
                <p className="text-gray-600 text-sm">
                  সাশ্রয়ী মূল্যে বিভিন্ন প্যাকেজে বিজ্ঞাপন দেওয়ার সুবিধা।
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center gap-2">
                  🌟 Premium Support
                </h4>
                <p className="text-gray-600 text-sm">
                  আপনার বিজ্ঞাপন সম্পর্কিত যেকোনো সমস্যার দ্রুত সমাধান পাবেন।
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center gap-2">
                  🛠 Easy Setup
                </h4>
                <p className="text-gray-600 text-sm">
                  সহজ ধাপে আপনার বিজ্ঞাপন তৈরি করুন এবং প্রকাশ করুন।
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-700 text-lg mb-2 flex items-center gap-2">
                  📊 Performance Tracking
                </h4>
                <p className="text-gray-600 text-sm">
                  আপনার Ads এর কার্যকারিতা পর্যবেক্ষণ করুন এবং রিপোর্ট পান।
                </p>
              </div>
            </div>

            {/* Call to Action Button */}
           <div className="text-center mt-12">
  <a
    href="https://web.facebook.com/profile.php?id=61572039370539" // এখানে তোমার Messenger link বসাও
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 transition-all duration-300 shadow-md"
  >
    <MessageCircle size={20} /> {/* Messenger icon */}
    Contact Us For Ads
  </a>
</div>

            {/* Small Note */}
            <p className="text-gray-500 text-sm mt-4 text-center">
              একবার আমাদের সাথে যোগাযোগ করুন এবং আপনার Ad plan বেছে নিন।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Advertisement;