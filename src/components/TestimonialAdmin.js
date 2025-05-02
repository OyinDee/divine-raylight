import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

function TestimonialAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [author, setAuthor] = useState("");
  const [position, setPosition] = useState(""); // new
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5); // new
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 5;

  const fetchTestimonials = async () => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(db, "testimonials"), {
      author,
      position,
      content,
      rating,
      createdAt: serverTimestamp(),
    });
    setAuthor("");
    setPosition("");
    setContent("");
    setRating(5);
    setLoading(false);
    fetchTestimonials();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "testimonials", id));
    fetchTestimonials();
  };

  // Pagination logic
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const paginatedTestimonials = testimonials.slice(
    (currentPage - 1) * testimonialsPerPage,
    currentPage * testimonialsPerPage
  );

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 px-8 py-8 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-primary font-bricolage text-center">Manage Testimonials</h2>
      <form onSubmit={handleAdd} className="mb-8 flex flex-col gap-4">
        <input
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent transition font-poppins"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
          required
          disabled={loading}
        />
        <input
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent transition font-poppins"
          value={position}
          onChange={e => setPosition(e.target.value)}
          placeholder="Position (optional)"
          disabled={loading}
        />
        <textarea
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent transition font-poppins"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Testimonial"
          required
          rows={3}
          disabled={loading}
        />
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Rating:</label>
          <select
            className="border border-gray-300 rounded-md p-2 font-poppins"
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            disabled={loading}
          >
            {[5,4,3,2,1].map(val => (
              <option key={val} value={val}>{val} Star{val > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-accent hover:bg-primary text-white font-bold px-4 py-2 rounded-md transition-all shadow"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
      <div className="space-y-6">
        {paginatedTestimonials.map(t => (
          <div key={t.id} className="p-4 border rounded-lg flex items-center gap-4 bg-gray-50 shadow service-card">
            <div className="flex-1">
              <strong className="text-lg font-bricolage text-primary">{t.author}</strong>
              {t.position && (
                <span className="block text-xs text-gray-500 font-poppins">{t.position}</span>
              )}
              <p className="text-gray-700 font-poppins mt-1">{t.content}</p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-500">&#9733;</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleDelete(t.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-poppins"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-poppins"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-poppins text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-poppins"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default TestimonialAdmin;
