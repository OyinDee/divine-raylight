import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import DOMPurify from 'dompurify';
import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track expanded state per post
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

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

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    try {
      await addDoc(collection(db, "subscriptions"), {
        email,
        subscribedAt: new Date(),
        status: "active"
      });
      setEmail("");
      setSubscribeStatus("Successfully subscribed!");
      setTimeout(() => setSubscribeStatus(""), 3000);
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscribeStatus("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const sanitizeAndTruncate = (content, length, showFull) => {
    if (!content) return '';
    // Configure DOMPurify to allow style attributes
    const sanitizeConfig = {
      ALLOWED_TAGS: ['p', 'span', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'br'],
      ALLOWED_ATTR: ['style', 'href', 'target'],
      ALLOW_DATA_ATTR: false
    };
    
    const sanitizedContent = DOMPurify.sanitize(content, sanitizeConfig);
    
    if (!showFull && length) {
      const temp = document.createElement('div');
      temp.innerHTML = sanitizedContent;
      const textContent = temp.textContent || temp.innerText;
      return textContent.length > length ? 
        textContent.substring(0, length) + "..." : 
        textContent;
    }
    return sanitizedContent;
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
            const isLong = post.content && post.content.replace(/<[^>]*>/g, '').length > 300;
            const showFull = expanded[post.id];
            const displayContent = sanitizeAndTruncate(post.content, 300, showFull);

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
                <Link to={`/blog/${post.id}`} className="flex-1 flex flex-col justify-between z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-primary font-bricolage mb-2 hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <span className="text-xs text-accent block mb-2">
                      {post.createdAt?.toDate?.().toLocaleString()}
                    </span>
                    <div>
                      {showFull ? (
                        <div 
                          dangerouslySetInnerHTML={{ __html: displayContent }}
                          className="blog-content"
                        />
                      ) : (
                        <p className="text-gray-700 font-poppins">{displayContent}</p>
                      )}
                      {isLong && (
                        <button
                          className="ml-2 text-primary underline font-semibold text-sm mt-2"
                          onClick={() => toggleExpand(post.id)}
                        >
                          {showFull ? "Show less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
                {/* Decorative accent bar */}
                <div className="absolute bottom-0 right-0 w-24 h-2 bg-primary/40 rounded-tl-xl"></div>
              </div>
            );
          })}
        </div>
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-accent/30">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center font-bricolage">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 text-center mb-6">Stay updated with our latest insights and stories.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubscribing}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-accent hover:bg-primary text-white font-bold px-6 py-2 rounded-md transition-all shadow flex items-center justify-center gap-2"
            >
              {isSubscribing ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Subscribing...</span>
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          {subscribeStatus && (
            <p className={`text-center mt-4 ${subscribeStatus.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
              {subscribeStatus}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogList;
