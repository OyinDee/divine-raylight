import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 px-8 py-12 w-full max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-8 text-primary font-bricolage text-center">Testimonials</h2>
      <div className="space-y-8">
        {testimonials.map(t => (
          <div key={t.id} className="flex items-center gap-6 p-6 bg-gray-50 rounded-lg shadow service-card">
            <div className="flex-1">
              <p className="italic text-gray-700 font-poppins mb-2">"{t.content}"</p>
              <div className="text-right text-sm font-semibold text-primary font-bricolage">{t.author}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialList;
