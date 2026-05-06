import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";
import useAuth from "../../hooks/useAuth";

const COLORS = ["#FFBB28", "#0088FE", "#00C49F", "#FF8042", "#A28BFF"];

const fetchUserDashboard = async (email) => {
  const res = await axios.get(`http://localhost:5000/api/dashboard/summary/${email}`);
  return res.data;
};

const UserDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userDashboard", user?.email],
    queryFn: () => fetchUserDashboard(user.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 py-10">Error loading dashboard</p>;

  // PDF stats
  const pdfData = data?.pdfStats?.map(i => ({ name: i._id, value: i.count })) || [];
  // Payment stats
  const paymentData = data?.paymentStats?.map(i => ({ name: i._id, value: i.count })) || [];

  return (
    <div className="max-w-[1400px] mx-auto p-2 md:p-6 bg-teal-50 min-h-screen rounded-2xl shadow mt-5">
      <h2 className="text-3xl font-bold mb-4">📊 My Dashboard</h2>
      <p className="text-gray-600 mb-8">
        Welcome <span className="font-semibold">{user?.email}</span>
      </p>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* PDFs */}
        <div className="bg-white border-l-4 border-blue-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Total PDFs</h3>
          <p className="text-3xl font-bold text-blue-600">{data?.totalPdfs || 0}</p>
        </div>
        <div className="bg-white border-l-4 border-yellow-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Pending PDFs</h3>
          <p className="text-3xl font-bold text-yellow-600">{pdfData.find(p => p.name === "pending")?.value || 0}</p>
        </div>
        <div className="bg-white border-l-4 border-purple-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Accepted PDFs</h3>
          <p className="text-3xl font-bold text-purple-600">{pdfData.find(p => p.name === "accepted")?.value || 0}</p>
        </div>
        <div className="bg-white border-l-4 border-red-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Rejected PDFs</h3>
          <p className="text-3xl font-bold text-red-600">{pdfData.find(p => p.name === "rejected")?.value || 0}</p>
        </div>

        {/* Payments */}
        <div className="bg-white border-l-4 border-green-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Total Payments</h3>
          <p className="text-3xl font-bold text-green-600">{data?.totalPayments || 0}</p>
        </div>
        <div className="bg-white border-l-4 border-yellow-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Pending Payments</h3>
          <p className="text-3xl font-bold text-yellow-600">{paymentData.find(p => p.name === "pending")?.value || 0}</p>
        </div>
        <div className="bg-white border-l-4 border-purple-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Accepted Payments</h3>
          <p className="text-3xl font-bold text-purple-600">{paymentData.find(p => p.name === "accepted")?.value || 0}</p>
        </div>
        <div className="bg-white border-l-4 border-red-500 rounded-xl p-5 text-center shadow">
          <h3 className="text-sm text-gray-500">Rejected Payments</h3>
          <p className="text-3xl font-bold text-red-600">{paymentData.find(p => p.name === "rejected")?.value || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">📘 PDF Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pdfData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {pdfData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">💳 Payment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" barSize={40} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
