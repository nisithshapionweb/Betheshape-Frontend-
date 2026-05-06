import {
    CheckCircle,
    Download,
    FileText,
    Lock,
    RefreshCw,
    ShoppingCart,
    Unlock,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import PaymentModal from "./PaymentModal";

const PDFDownload = () => {
  const { user } = useAuth();
  const [freePdfs, setFreePdfs] = useState([]);
  const [paidPdfs, setPaidPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("free");
  const [purchasedPdfs, setPurchasedPdfs] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [modalPdf, setModalPdf] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // ক্যাশ বাইপাস করার জন্য র‍্যান্ডম কোয়েরি প্যারামিটার
  const getCacheBuster = () => `_t=${Date.now()}`;

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchPaymentMethods = async () => {
    try {
      const res = await fetch("http://localhost:5000/pdf/payment-methods");
      const data = await res.json();
      if (res.ok) setPaymentMethods(data);
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };

  const fetchFreePdfs = async () => {
    setLoading(true);
    try {
      // ক্যাশ বাইপাস
      const res = await fetch(
        `http://localhost:5000/pdf/free?${getCacheBuster()}`,
      );
      const data = await res.json();
      if (res.ok) setFreePdfs(data);
    } catch (err) {
      console.error("Error fetching free PDFs:", err);
    } finally {
      setLoading(false);
    }
  };

  // শুধু একটি API কল - সব ডাটা একসাথে আনা
  const fetchAllPaidData = useCallback(
    async (showLoading = true) => {
      if (!user?.email) {
        // লগইন না থাকলে শুধু PDF দেখান
        try {
          if (showLoading) setLoading(true);
          const res = await fetch(
            `http://localhost:5000/pdf/paid?${getCacheBuster()}`,
          );
          const data = await res.json();
          if (res.ok) {
            setPaidPdfs(data);
            setPurchasedPdfs([]);
          }
        } catch (err) {
          console.error("Error fetching paid PDFs:", err);
        } finally {
          if (showLoading) setLoading(false);
          setRefreshing(false);
          setLastFetchTime(Date.now());
        }
        return;
      }

      // লগইন করা থাকলে - একটা API দিয়েই সব ডাটা আনুন
      try {
        if (showLoading) setLoading(true);

        // ক্যাশ বাইপাস সহ API কল
        const res = await fetch(
          `http://localhost:5000/pdf/paid?email=${user.email}&${getCacheBuster()}`,
        );

        const data = await res.json();

        if (res.ok) {
     

          // ডাটা সেট করুন
          setPaidPdfs(data);

          // কেনা PDF গুলোর আইডি বের করুন
          const purchased = data
            .filter((pdf) => pdf.isPurchased === true)
            .map((pdf) => pdf._id);

          setPurchasedPdfs(purchased);
          setLastFetchTime(Date.now());
        }
      } catch (err) {
        console.error("Error fetching paid PDFs:", err);
      } finally {
        if (showLoading) setLoading(false);
        setRefreshing(false);
      }
    },
    [user?.email],
  );

  // ইন্টারভ্যাল ক্লিনআপ ফাংশন
  const stopAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // অটো-রিফ্রesh সেটআপ - কিন্তু কনফ্লিক্ট এড়াতে
  useEffect(() => {
    // পেইড ট্যাব এবং ইউজার লগইন থাকলেই শুধু
    if (activeTab === "paid" && user?.email) {
      // প্রথমবার লোড
      fetchAllPaidData();

      // ইন্টারভ্যাল সেটআপ - ১০ সেকেন্ড (আগে ৫ ছিল)
      stopAutoRefresh(); // আগের ইন্টারভ্যাল ক্লিয়ার করুন
      intervalRef.current = setInterval(() => {
        fetchAllPaidData(false); // লোডিং ছাড়া রিফ্রেশ
      }, 10000); // ১০ সেকেন্ড

      return () => stopAutoRefresh();
    } else {
      stopAutoRefresh();
    }
  }, [activeTab, user?.email, fetchAllPaidData]);

  // ইউজার পরিবর্তন হলে
  // useEffect(() => {
  //   fetchFreePdfs();
  //   fetchPaymentMethods();

  //   // ইউজার লগইন/লগআউট হলে পেইড ডাটা রিফ্রেশ
  //   if (activeTab === "paid") {
  //     fetchAllPaidData();
  //   }

  //   // ক্লিনআপ
  //   return () => stopAutoRefresh();
  // }, [user, activeTab, fetchAllPaidData]);

  useEffect(() => {
    fetchFreePdfs();
    fetchPaymentMethods();
    fetchAllPaidData(); // এখানে সব paid PDFs fetch
  }, [user, fetchAllPaidData]);

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  // const handleDownload = async (id, filename, type, price) => {
  //   if (type === "free") {
  //     window.open(`http://localhost:5000/pdf/download/${id}`, "_blank");
  //     return;
  //   }

  //   if (!user?.email) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Login Required",
  //       text: "Please login to purchase or download paid PDFs.",
  //       confirmButtonColor: "#0d9488",
  //       showCancelButton: true,
  //       cancelButtonText: "Cancel",
  //       confirmButtonText: "Go to Login",
  //     }).then((result) => {
  //       if (result.isConfirmed) navigate("/login");
  //     });
  //     return;
  //   }

  //   // চেক করুন ইতিমধ্যে কেনা আছে কিনা
  //   if (purchasedPdfs.includes(id)) {
  //     window.open(`http://localhost:5000/pdf/download/${id}?email=${user.email}`, "_blank");
  //     return;
  //   }

  //   // ডাউনলোডের আগে রিয়েল-টাইম চেক
  //   try {
  //     const checkRes = await fetch(
  //       `http://localhost:5000/pdf/access?pdfId=${id}&email=${user.email}&${getCacheBuster()}`
  //     );
  //     const checkData = await checkRes.json();

  //     if (checkData.hasAccess) {
  //       // এক্সেস থাকলে ডাউনলোড করুন এবং স্টেট আপডেট করুন
  //       window.open(`http://localhost:5000/pdf/download/${id}?email=${user.email}`, "_blank");

  //       // স্টেট আপডেট
  //       setPurchasedPdfs((prev) => [...prev, id]);
  //       setPaidPdfs((prev) =>
  //         prev.map((pdf) =>
  //           pdf._id === id ? { ...pdf, isPurchased: true } : pdf
  //         )
  //       );
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error checking access:", error);
  //   }

  //   // না কেনা থাকলে মডাল দেখান
  //   const selectedPdf = paidPdfs.find((p) => p._id === id);
  //   if (selectedPdf) {
  //     setModalPdf(selectedPdf);
  //   }
  // };

  // PDFDownload.jsx - handleDownload ফাংশন আপডেট করুন

  const handleDownload = async (id, filename, type, price) => {
    try {
      // ফ্রি PDF - সরাসরি ডাউনলোড
      if (type === "free") {
        window.open(`http://localhost:5000/pdf/download/${id}`, "_blank");
        return;
      }

      // পেইড PDF - চেক করুন ইউজার লগইন করেছে কিনা
      if (!user?.email) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to purchase or download paid PDFs.",
          confirmButtonColor: "#0d9488",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Go to Login",
        }).then((result) => {
          if (result.isConfirmed) navigate("/login");
        });
        return;
      }

      // চেক করুন ইউজার ইতিমধ্যে PDF টি কিনেছে কিনা
      if (purchasedPdfs.includes(id)) {
        // কেনা থাকলে সরাসরি ডাউনলোড করান
        window.open(
          `http://localhost:5000/pdf/download/${id}?email=${user.email}`,
          "_blank",
        );
        return;
      }

      // ডাউনলোডের আগে আবার এক্সেস চেক করুন (রিয়েল-টাইম)
      try {
        const checkRes = await fetch(
          `http://localhost:5000/pdf/access?pdfId=${id}&email=${user.email}`,
        );
        const checkData = await checkRes.json();

        if (checkData.hasAccess) {
          // এক্সেস থাকলে ডাউনলোড করুন এবং স্টেট আপডেট করুন
          window.open(
            `http://localhost:5000/pdf/download/${id}?email=${user.email}`,
            "_blank",
          );

          // স্টেট আপডেট করুন
          setPurchasedPdfs((prev) => [...prev, id]);
          setPaidPdfs((prev) =>
            prev.map((pdf) =>
              pdf._id === id ? { ...pdf, isPurchased: true } : pdf,
            ),
          );
          return;
        }
      } catch (error) {
        console.error("Error checking access:", error);
      }

      // না কেনা থাকলে পেমেন্ট মডাল দেখান
      const selectedPdf = paidPdfs.find((p) => p._id === id);
      if (selectedPdf) {
        setModalPdf(selectedPdf);
      }
    } catch (error) {
      console.error("Download error:", error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "paid") {
      fetchAllPaidData();
    }
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await fetchAllPaidData(false);
    Swal.fire({
      icon: "success",
      title: "Refreshed!",
      text: `Last updated: ${new Date().toLocaleTimeString()}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // কতক্ষণ আগে আপডেট হয়েছে
  const getTimeSinceUpdate = () => {
    if (!lastFetchTime) return "";
    const seconds = Math.floor((Date.now() - lastFetchTime) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    return `${Math.floor(seconds / 60)} minutes ago`;
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <Helmet>
        <title>Official Document Archive</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-2">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-teal-700 font-serif text-xl font-bold mb-6">
            PDF
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
            Official Document Archive
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg text-justify">
            Access official documents, forms, and resources. Free documents are
            available for immediate download, while premium documents require
            purchase.
          </p>
          {user?.email && (
            <div className="mt-4 flex items-center justify-center gap-2">
             <p className="text-sm text-teal-600">
  Logged in as: {
    user.email
      ? user.email.split("@")[0].slice(0, 5) + "*****@" + user.email.split("@")[1]
      : ""
  }
</p>
              {activeTab === "paid" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleManualRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-1 text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full hover:bg-teal-200 transition disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`}
                    />
                    {refreshing ? "Refreshing..." : "Refresh"}
                  </button>
                  {lastFetchTime > 0 && (
                    <span className="text-xs text-gray-400">
                      Updated {getTimeSinceUpdate()}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="w-28 h-[2px] bg-teal-700 mx-auto mt-8"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 border-b border-gray-300">
          <button
            onClick={() => handleTabChange("free")}
            className={`flex items-center gap-2 px-1 md:px-6 py-1.5 md:py-3 font-medium transition-all ${
              activeTab === "free"
                ? "text-teal-700 border-b-2 border-teal-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Unlock className="w-5 h-5" />
            Free Documents ({freePdfs.length})
          </button>
          <button
            onClick={() => handleTabChange("paid")}
            className={`flex items-center gap-2 px-1 md:px-6 py-1.5 md:py-3 font-medium transition-all ${
              activeTab === "paid"
                ? "text-teal-700 border-b-2 border-teal-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Lock className="w-5 h-5" />
            Premium Documents ({paidPdfs.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            Loading archived documents...
          </div>
        ) : activeTab === "free" ? (
          freePdfs.length === 0 ? (
            <div className="text-center py-20 border border-gray-300 rounded-lg bg-white">
              <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-serif text-gray-800">
                No Free Documents Available
              </h3>
              <p className="text-gray-500 mt-4">
                Free documents will appear here once uploaded.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {freePdfs.map((pdf) => {
                const isExpanded = expandedDescriptions[pdf._id];
                const showToggle =
                  pdf.description && pdf.description.split(/\s+/).length > 15;
                return (
                  <div
                    key={pdf._id}
                    className="p-3 md:p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-1 items-start gap-4">
                      {pdf.PdfThumbnil ? (
                        <img
                          src={pdf.PdfThumbnil}
                          alt="pdf thumbnail"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                          {pdf.tittle || pdf.originalName}
                        </h3>
                        <p className="text-gray-700 text-sm mt-1">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: isExpanded
                                ? pdf.description
                                : truncateText(pdf.description),
                            }}
                          />
                          {showToggle && (
                            <button
                              className="ml-2 text-teal-600 text-xs font-semibold"
                              onClick={() => toggleDescription(pdf._id)}
                            >
                              {isExpanded ? "See less" : "See more"}
                            </button>
                          )}
                        </p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <p className="text-sm text-gray-500">
                            Added on{" "}
                            {new Date(pdf.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            Free
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 self-start md:self-auto">
                      <button
                        onClick={() =>
                          handleDownload(pdf._id, pdf.originalName, "free")
                        }
                        className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 px-4 md:px-6 py-1.5 md:py-2 rounded-lg font-medium"
                      >
                        <Download className="w-4 h-4" /> Download Free
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {paidPdfs.map((pdf) => {
              const isPurchased = purchasedPdfs.includes(pdf._id);
              const isExpanded = expandedDescriptions[pdf._id];
              const showToggle =
                pdf.description && pdf.description.split(/\s+/).length > 15;

              return (
                <div
                  key={pdf._id}
                  className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-1 items-start gap-4">
                    {pdf.PdfThumbnil ? (
                      <img
                        src={pdf.PdfThumbnil}
                        alt="pdf thumbnail"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        {pdf.tittle || pdf.originalName}
                      </h3>
                      <p className="text-gray-700 text-sm mt-1">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: isExpanded
                              ? pdf.description
                              : truncateText(pdf.description),
                          }}
                        />
                        {showToggle && (
                          <button
                            className="ml-2 text-teal-600 text-xs font-semibold"
                            onClick={() => toggleDescription(pdf._id)}
                          >
                            {isExpanded ? "See less" : "See more"}
                          </button>
                        )}
                      </p>

                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <p className="text-sm text-gray-500">
                          Added on{" "}
                          {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                          ৳{pdf.price}
                        </span>
                        {isPurchased && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Purchased
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-start md:self-auto">
                    {isPurchased ? (
                      <button
                        onClick={() =>
                          handleDownload(
                            pdf._id,
                            pdf.originalName,
                            "paid",
                            pdf.price,
                          )
                        }
                        className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download Now
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleDownload(
                            pdf._id,
                            pdf.originalName,
                            "paid",
                            pdf.price,
                          )
                        }
                        className="flex items-center justify-center gap-2 bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 px-6 py-2 rounded-lg font-medium"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Purchase (৳{pdf.price})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {modalPdf && (
        <PaymentModal
          pdf={modalPdf}
          paymentMethods={paymentMethods}
          user={user}
          onPaymentSuccess={() => {
            // পেমেন্ট সফল হলে সাথে সাথে রিফ্রেশ
            fetchAllPaidData();
          }}
          onClose={() => {
            setModalPdf(null);
            // মডাল বন্ধ করার পর রিফ্রেশ
            fetchAllPaidData(false);
          }}
        />
      )}
    </div>
  );
};

export default PDFDownload;
