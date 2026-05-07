// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAuth from "../hooks/useAuth";

// const fetchPayments = async () => {
//   const res = await axios.get("https://api.betheshape.com/own-sp-payment/admin");
//   return res.data;
// };

// const OwnSpPaymentRoute = ({ children }) => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const {
//     data: ownSpPayments = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["allPayments"],
//     queryFn: fetchPayments,
//     refetchInterval: 5000, // 🕒 প্রতি 5 সেকেন্ডে backend এ ping (live update)
//     refetchOnWindowFocus: true,
//   });

//   // optional: tab change করলে update check
//   useEffect(() => {
//     const interval = setInterval(() => {
//       queryClient.invalidateQueries(["allPayments"]);
//     }, 15000); // প্রতি 15 সেকেন্ডে refresh করবে
//     return () => clearInterval(interval);
//   }, [queryClient]);

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg">
//         Checking your payment access...
//       </div>
//     );

//   if (isError) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "Failed to verify payment status.",
//     });
//     return <Navigate to="/own-sp-payment-confirmed" replace />;
//   }

//   const userPayment = ownSpPayments.find(
//     (p) => p.userEmail === user?.email && p.status === "accepted"
//   );

//   if (!userPayment) {
//     return <Navigate to="/own-sp-payment-confirmed" replace />;
//   }

//   // মেয়াদ যাচাই
//   const expireDate = new Date(userPayment.expireAt);
//   const today = new Date();

//   if (today > expireDate) {
//     Swal.fire({
//       icon: "warning",
//       title: "Access Expired",
//       text: "Your payment period has expired.",
//     });
//     return <Navigate to="/own-sp-payment-confirmed" replace />;
//   }

//   return children;
// };

// export default OwnSpPaymentRoute;

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const fetchPayments = async () => {
  const res = await axios.get("https://api.betheshape.com/own-sp-payment/admin");
  return res.data;
};

const OwnSpPaymentRoute = ({ children }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: ownSpPayments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: fetchPayments,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  // optional refresh
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allPayments"]);
    }, 15000);

    return () => clearInterval(interval);
  }, [queryClient]);

  // ❌ error alert (safe way)
  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to verify payment status.",
      });
    }
  }, [isError]);

  // ⏳ IMPORTANT: LOADING GUARD (FLASH FIX)
  if (isLoading || !user?.email) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg">
        Checking your payment access...
      </div>
    );
  }

  // 🔍 find user payment
  const userPayment = ownSpPayments.find(
    (p) => p.userEmail === user.email && p.status === "accepted"
  );

  // ❌ no payment
  if (!userPayment) {
    return <Navigate to="/own-sp-payment-confirmed" replace />;
  }

  // ⏳ expire check
  const expireTime = new Date(userPayment.expireAt).getTime();

  if (Date.now() > expireTime) {
    Swal.fire({
      icon: "warning",
      title: "Access Expired",
      text: "Your payment period has expired.",
    });

    return <Navigate to="/own-sp-payment-confirmed" replace />;
  }

  // ✅ access granted
  return children;
};

export default OwnSpPaymentRoute;