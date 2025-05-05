import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import DOMPurify from 'dompurify';

function SingleBlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blogPosts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate("/blog");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-white to-primary/10">
      <div className="container max-w-4xl mx-auto px-6">
        <button 
          onClick={() => navigate("/blog")}
          className="mb-8 flex items-center gap-2 text-accent hover:text-primary transition-colors"
        >
          ← Back to Blog
        </button>

        <article className="bg-white rounded-2xl shadow-xl border border-accent/20 overflow-hidden">
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary font-bricolage mb-4">
              {post.title}
            </h1>
            
            <time className="text-sm text-accent block mb-8">
              {post.createdAt?.toDate?.().toLocaleString()}
            </time>
            
            <div 
              className="prose prose-lg max-w-none blog-content"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(post.content) 
              }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default SingleBlogPost;
