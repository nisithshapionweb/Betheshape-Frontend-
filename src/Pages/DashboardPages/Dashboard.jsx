import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-10 px-4">
        {[
          { title: "Maths", path: "/resources/a-level/maths" },
          { title: "Physics", path: "/resources/a-level/physics" },
          { title: "Chemistry", path: "/resources/a-level/chemistry" },
        ].map(({ title, path }, idx) => (
          <div
            key={idx}
            className="group border border-[#0e2d3f] rounded-xl bg-[#64dda149] 
              hover:shadow-lg transition-all duration-300 
              text-[#3b6b53] w-full px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-20 
              flex items-center justify-center shadow-sm"
          >
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold group-hover:scale-95 transition-transform">
                {title}
              </span>
              <Link to={path}>
                <FaArrowRight
                  size={36}
                  className="transition-all duration-300 transform group-hover:translate-x-2 group-hover:scale-125
                  text-white bg-[#2ec4b6] rounded-full p-2
                  opacity-100 md:opacity-0 md:group-hover:opacity-100 mt-2"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
