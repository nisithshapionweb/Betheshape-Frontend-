
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const getSmartPaginationButtons = (totalPages, currentPage) => {
  const buttons = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) buttons.push(i);
    return buttons;
  }

  if (currentPage <= 3) {
    buttons.push(1, 2, 3, "...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    buttons.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
  } else {
    buttons.push(1, "...", currentPage, "...", totalPages);
  }

  return buttons;
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    axiosSecure
      .get(`/users/all?page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.pages);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  // 🔹 Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/delete/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            fetchUsers();
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete user.", "error");
            console.error(error);
          });
      }
    });
  };

  // 🔹 Handle Role Change
  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${id}`, { role: newRole })
          .then(() => {
            Swal.fire("Updated!", `User role changed to ${newRole}`, "success");
            fetchUsers();
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to update role.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Admin | All Users</title>
      </Helmet>
      <div className="py-6 px-4 md:py-10 max-w-7xl mx-auto">
        {/* History Table Section */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-indigo-200">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">
            All Users
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">
              Show per page:
            </label>
            <select
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(parseInt(e.target.value));
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200 max-w-[120px]"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-indigo-50 text-left text-gray-700">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>

                    {/* 🔹 Role Dropdown */}
                    <td className="px-4 py-2 border capitalize">
                      <select
                        value={user.role || "user"}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-200"
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="px-4 py-2 border text-center space-x-2">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {users.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No users found.
              </div>
            ) : (
              users.map((user, index) => (
                <div key={user._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      #{(page - 1) * limit + index + 1}
                    </span>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium break-all">{user.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Role</p>
                      <select
                        value={user.role || "user"}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center items-center">
            <button
              className={`px-3 py-1 md:px-4 md:py-2 border rounded-md text-sm ${
                page === 1
                  ? "bg-gray-100 cursor-not-allowed"
                  : "hover:bg-indigo-50"
              }`}
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              « Prev
            </button>

            {getSmartPaginationButtons(totalPages, page).map((btn, idx) =>
              btn === "..." ? (
                <span key={idx} className="px-2 md:px-4 py-1 md:py-2">
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setPage(btn)}
                  className={`px-3 py-1 md:px-4 md:py-2 border rounded-md text-sm ${
                    btn === page
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-50"
                  }`}
                >
                  {btn}
                </button>
              )
            )}

            <button
              className={`px-3 py-1 md:px-4 md:py-2 border rounded-md text-sm ${
                page === totalPages
                  ? "bg-gray-100 cursor-not-allowed"
                  : "hover:bg-indigo-50"
              }`}
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;