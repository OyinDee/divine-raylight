import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function LatestBlog() {
  const [latest, setLatest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatest = async () => {
      const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"), limit(1));
      const snapshot = await getDocs(q);
      setLatest(snapshot.docs.length ? { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } : null);
    };
    fetchLatest();
  }, []);

  const handleReadMore = () => {
    window.scrollTo(0, 0);
    navigate("/blog");
  };

  if (!latest) return null;

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 px-8 py-12 w-full max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-8 text-primary font-bricolage text-center">Latest Blog Post</h2>
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg shadow service-card">
        {latest.imageUrl && (
          <img src={latest.imageUrl} alt={latest.title} className="w-full md:w-48 h-48 object-cover rounded-lg shadow" />
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-primary font-bricolage mb-2">{latest.title}</h3>
          <span className="text-xs text-gray-400 block mb-2">{latest.createdAt?.toDate?.().toLocaleString()}</span>
          <p className="text-gray-700 font-poppins">{latest.content}</p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleReadMore}
          className="bg-accent hover:bg-primary text-white font-bold px-6 py-3 rounded-md transition-all shadow font-poppins"
        >
          Read More Blog Posts
        </button>
      </div>
    </section>
  );
}

export default LatestBlog;
