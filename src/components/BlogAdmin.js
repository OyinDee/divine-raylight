import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchPosts = async () => {
    const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing post
      await updateDoc(doc(db, "blogPosts", editId), {
        title,
        content,
      });
      setEditId(null);
    } else {
      // Add new post
      await addDoc(collection(db, "blogPosts"), {
        title,
        content,
        createdAt: serverTimestamp(),
      });
    }
    setTitle("");
    setContent("");
    fetchPosts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "blogPosts", id));
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle("");
    setContent("");
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Manage Blog</h2>
      <form onSubmit={handleAdd} className="mb-6">
        <input className="border p-2 mr-2" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea className="border p-2 mr-2" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update Post" : "Add Post"}
        </button>
        {editId && (
          <button type="button" onClick={handleCancelEdit} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </form>
      <div>
        {posts.map(post => (
          <div key={post.id} className="mb-4 p-2 border rounded flex justify-between items-center">
            <div>
              <strong>{post.title}</strong>
              <p className="text-xs">{post.createdAt?.toDate?.().toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(post)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogAdmin;
