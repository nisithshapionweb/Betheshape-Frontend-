import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell, Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [pdfStatus, setPdfStatus] = useState([]);
  const [usersByMonth, setUsersByMonth] = useState([]);
  const [topCollections, setTopCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const base = "http://localhost:5000/api/dashboard";

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [sRes, pRes, uRes, tRes] = await Promise.all([
        axios.get(`${base}/summary`),
        axios.get(`${base}/user-pdfs-status`),
        axios.get(`${base}/users-by-month`),
        axios.get(`${base}/top-collections`),
      ]);
      setSummary(sRes.data);
      setPdfStatus(pRes.data);
      setUsersByMonth(uRes.data);
      setTopCollections(tRes.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60_000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  // Prepare pie data
  const pieData = pdfStatus.map((p) => ({ name: p.status, value: p.count }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Helmet><title>Admin Dashboard</title></Helmet>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard — Be The Shape</h1>
        <p className="text-sm text-gray-600">Overview of users, PDFs, and content collections.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <div className="text-2xl font-semibold">{summary ? summary.usersCount : "—"}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Admin PDFs</h3>
          <div className="text-2xl font-semibold">{summary ? summary.adminPdfCount : "—"}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">User PDFs</h3>
          <div className="text-2xl font-semibold">{summary ? summary.userPdfCount : "—"}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Users over time */}
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">User Registrations (last 6 months)</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={usersByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PDF Status Pie */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">User PDF Status</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top collections */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Top Collections</h3>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={topCollections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
