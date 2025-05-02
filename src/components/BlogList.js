import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      <div>
        {posts.map(post => (
          <div key={post.id} className="mb-8 p-4 border rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <span className="text-xs text-gray-400">{post.createdAt?.toDate?.().toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogList;
