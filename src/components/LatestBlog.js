import React, { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
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

  const truncateContent = (content) => {
    if (!content) return '';
    const temp = document.createElement('div');
    temp.innerHTML = DOMPurify.sanitize(content);
    const textContent = temp.textContent || temp.innerText;
    return textContent.length > 150 ? 
      textContent.substring(0, 150) + "..." : 
      textContent;
  };

  if (!latest) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-accent/10">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary font-bricolage mb-10">
          Latest Blog Post
        </h2>
        <div className="flex justify-center">
          <div className="relative flex flex-col md:flex-row bg-white rounded-2xl shadow-xl border border-accent/20 overflow-hidden w-full max-w-2xl hover:shadow-2xl transition">
            {/* Accent bar */}
            <div className="absolute left-0 top-0 h-full w-2 bg-accent rounded-l-2xl"></div>
            {/* Blog image */}
            {latest.imageUrl && (
              <div className="flex-shrink-0 flex items-center justify-center p-6 md:p-8">
                <img
                  src={latest.imageUrl}
                  alt={latest.title}
                  className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-xl shadow border-4 border-accent/10"
                />
              </div>
            )}
            {/* Blog content */}
            <div className="flex-1 flex flex-col justify-center px-6 py-6 md:py-8">
              <h3 className="text-2xl md:text-3xl font-bold text-primary font-bricolage mb-2">
                {latest.title}
              </h3>
              <span className="text-xs text-accent font-semibold mb-3 block">
                {latest.createdAt?.toDate?.().toLocaleString()}
              </span>
              <p className="text-gray-700 font-poppins text-base md:text-lg mb-2">
                {truncateContent(latest.content)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={handleReadMore}
            className="bg-accent hover:bg-primary text-white font-bold px-8 py-3 rounded-md transition-all shadow font-poppins"
          >
            Read More Blog Posts
          </button>
        </div>
      </div>
    </section>
  );
}

export default LatestBlog;
