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
    <section>
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <div>
        {testimonials.map(t => (
          <div key={t.id} className="mb-6 p-4 border rounded">
            <p className="italic">"{t.content}"</p>
            <div className="text-right text-sm font-semibold">{t.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialList;
