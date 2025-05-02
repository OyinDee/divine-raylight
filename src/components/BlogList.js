import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track expanded state per post

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-accent/10 via-white to-primary/10 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bricolage font-bold text-primary mb-4 mt-12 drop-shadow">
            All Blog Posts
          </h1>
          <p className="text-lg text-accent font-poppins max-w-2xl mx-auto">
            Explore our latest insights, tips, and stories from <span className="font-bold text-primary">Divine Raylight Consultancy</span>.
          </p>
        </div>
        <div className="space-y-10">
          {posts.length === 0 && (
            <div className="text-center text-gray-400 font-poppins py-12">
              No blog posts yet.
            </div>
          )}
          {posts.map(post => {
            const isLong = post.content && post.content.length > 300;
            const showFull = expanded[post.id];
            const displayContent = isLong && !showFull
              ? post.content.slice(0, 300) + "..."
              : post.content;
            return (
              <div
                key={post.id}
                className="relative flex flex-col md:flex-row gap-8 p-8 bg-gradient-to-br from-accent/10 via-white to-primary/10 rounded-2xl shadow-lg border border-accent/30 service-card hover:shadow-2xl transition"
              >
                {/* Decorative accent circle */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-accent/30 rounded-full z-0"></div>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full md:w-56 h-56 object-cover rounded-xl shadow border-4 border-accent/20 z-10"
                  />
                )}
                <div className="flex-1 flex flex-col justify-between z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-primary font-bricolage mb-2">{post.title}</h3>
                    <span className="text-xs text-accent block mb-2">{post.createdAt?.toDate?.().toLocaleString()}</span>
                    <p className="text-gray-700 font-poppins">
                      {displayContent}
                      {isLong && (
                        <button
                          className="ml-2 text-primary underline font-semibold text-sm"
                          onClick={() => toggleExpand(post.id)}
                        >
                          {showFull ? "Show less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </div>
                </div>
                {/* Decorative accent bar */}
                <div className="absolute bottom-0 right-0 w-24 h-2 bg-primary/40 rounded-tl-xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BlogList;
