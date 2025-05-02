import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

function TestimonialAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

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
    await addDoc(collection(db, "testimonials"), {
      author,
      content,
      createdAt: serverTimestamp(),
    });
    setAuthor("");
    setContent("");
    fetchTestimonials();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "testimonials", id));
    fetchTestimonials();
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>
      <form onSubmit={handleAdd} className="mb-6">
        <input className="border p-2 mr-2" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
        <textarea className="border p-2 mr-2" value={content} onChange={e => setContent(e.target.value)} placeholder="Testimonial" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>
      <div>
        {testimonials.map(t => (
          <div key={t.id} className="mb-4 p-2 border rounded flex justify-between items-center">
            <div>
              <strong>{t.author}</strong>
              <p className="text-sm">{t.content}</p>
            </div>
            <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialAdmin;
