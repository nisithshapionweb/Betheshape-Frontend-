import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react"; // আইকনের জন্য
import { useState } from "react";
import Swal from "sweetalert2";

const fetchPayments = async () => {
  const res = await axios.get("http://localhost:5000/pdf/payments");
  return res.data;
};

const AdminPdfPayment = () => {
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data: payments = [], isLoading, error, refetch } = useQuery({
    queryKey: ["pdfPayments"],
    queryFn: fetchPayments,
    refetchInterval: 5000,
  });

  const updateStatus = async (id, status) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: `Do you want to ${status} this payment?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: status === 'accepted' ? '#28a745' : '#dc3545',
        confirmButtonText: `Yes, ${status}`,
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) return;

      setProcessingId(id);

      const response = await axios.patch(`http://localhost:5000/pdf/payments/${id}`, {
        status: status
      });

  

      await Swal.fire({
        title: 'Success!',
        text: `Payment ${status} successfully`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      queryClient.invalidateQueries(["pdfPayments"]);
      refetch();

    } catch (error) {
      console.error('Update error:', error);
      
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update payment status',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setProcessingId(null);
    }
  };

  // ডিলিট ফাংশন
  const deletePayment = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Payment?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) return;

      setDeletingId(id);

      const response = await axios.delete(`http://localhost:5000/pdf/payments/${id}`);

     

      await Swal.fire({
        title: 'Deleted!',
        text: 'Payment record has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      queryClient.invalidateQueries(["pdfPayments"]);
      refetch();

    } catch (error) {
      console.error('Delete error:', error);
      
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete payment',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      accepted: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[status] || styles.pending;
  };

  const getBorderColor = (status) => {
    const colors = {
      pending: 'border-l-yellow-500',
      accepted: 'border-l-green-500',
      rejected: 'border-l-red-500'
    };
    return colors[status] || colors.pending;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          Error loading payments: {error.message}
          <button 
            onClick={() => refetch()}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📄 PDF Payment Requests
        </h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            Pending: {payments.filter(p => p.paymentStatus === 'pending').length}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Accepted: {payments.filter(p => p.paymentStatus === 'accepted').length}
          </span>
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            Rejected: {payments.filter(p => p.paymentStatus === 'rejected').length}
          </span>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No payment requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className={`bg-white rounded-lg shadow-md border-l-4 ${getBorderColor(payment.paymentStatus)} overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  {/* বাম পাশের তথ্য */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {payment.userName || 'Unknown User'}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(payment.paymentStatus)}`}>
                        {payment.paymentStatus?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">📧 Email:</span> {payment.userEmail}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">📄 PDF:</span> {payment.pdfName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">💰 Amount:</span> ৳{payment.amount}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {payment.transactionId && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">🆔 Transaction:</span> {payment.transactionId}
                          </p>
                        )}
                        {payment.senderNumber && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">📱 Sender:</span> {payment.senderNumber}
                          </p>
                        )}
                        {payment.paymentMethod && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">💳 Method:</span> {payment.paymentMethod}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-400">
                      Requested: {new Date(payment.purchasedAt).toLocaleString()}
                      {payment.verifiedAt && (
                        <span className="ml-3">
                          Verified: {new Date(payment.verifiedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ডান পাশের বাটন */}
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 md:ml-4 items-start md:items-center">
                    {payment.paymentStatus === 'pending' ? (
                      <>
                        <button
                          onClick={() => updateStatus(payment._id, "accepted")}
                          disabled={processingId === payment._id || deletingId === payment._id}
                          className={`px-4 py-2 rounded-lg text-white transition-colors ${
                            processingId === payment._id || deletingId === payment._id
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600'
                          }`}
                        >
                          {processingId === payment._id ? (
                            <span className="flex items-center">
                              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            '✓ Accept'
                          )}
                        </button>
                        
                        <button
                          onClick={() => updateStatus(payment._id, "rejected")}
                          disabled={processingId === payment._id || deletingId === payment._id}
                          className={`px-4 py-2 rounded-lg text-white transition-colors ${
                            processingId === payment._id || deletingId === payment._id
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                        >
                          ✗ Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-4 py-2 rounded-lg text-white ${
                        payment.paymentStatus === 'accepted' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {payment.paymentStatus === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                      </span>
                    )}

                    {/* ডিলিট বাটন - সব স্টেটাসের জন্য */}
                    <button
                      onClick={() => deletePayment(payment._id)}
                      disabled={processingId === payment._id || deletingId === payment._id}
                      className={`p-2 rounded-lg text-white transition-colors ${
                        processingId === payment._id || deletingId === payment._id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      title="Delete payment record"
                    >
                      {deletingId === payment._id ? (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPdfPayment;