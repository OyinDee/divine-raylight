import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";

function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const q = query(collection(db, "subscriptions"), orderBy("subscribedAt", "desc"));
        const snapshot = await getDocs(q);
        setSubscriptions(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this subscription?")) {
      try {
        await deleteDoc(doc(db, "subscriptions", id));
        setSubscriptions(prev => prev.filter(sub => sub.id !== id));
      } catch (error) {
        console.error("Error deleting subscription:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-primary mb-6 font-bricolage">Newsletter Subscribers</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td className="px-6 py-4 whitespace-nowrap">{sub.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sub.subscribedAt?.toDate?.().toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscriptions.length === 0 && (
          <p className="text-center text-gray-500 py-4">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}

export default SubscriptionsList;
