import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const fetchPosts = async () => {
    const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(""); // Clear preview until upload
    }
  };

  // Upload image to Cloudinary and return the URL
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    setLoading(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const result = await res.json();
    setLoading(false);
    return result.secure_url;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    let uploadedImageUrl = imageUrl;
    if (image) {
      uploadedImageUrl = await uploadImageToCloudinary(image);
    }
    if (editId) {
      await updateDoc(doc(db, "blogPosts", editId), {
        title,
        content,
        imageUrl: uploadedImageUrl || "",
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "blogPosts"), {
        title,
        content,
        imageUrl: uploadedImageUrl || "",
        createdAt: serverTimestamp(),
      });
    }
    setTitle("");
    setContent("");
    setImage(null);
    setImageUrl("");
    setLoading(false);
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
    setImageUrl(post.imageUrl || "");
    setImage(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle("");
    setContent("");
    setImage(null);
    setImageUrl("");
  };

  // Updated modules configuration with custom link handler
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link'],  // Keep only link, remove image from toolbar
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        link: function(value) {
          if (value) {
            const url = prompt('Enter URL:');
            if (url) {
              // Ensure URL has proper formatting
              const formattedUrl = url.startsWith('http://') || url.startsWith('https://') 
                ? url 
                : `https://${url}`;
              
              // Get the Quill editor instance
              const quill = this.quill;
              const range = quill.getSelection();
              
              // If text is selected, format it as a link
              if (range && range.length > 0) {
                quill.format('link', formattedUrl);
              } else {
                // If no text is selected, insert the URL as a link
                quill.insertText(range.index, url, 'link', formattedUrl);
              }
            }
          } else {
            // Remove link formatting if the button is clicked while a link is selected
            this.quill.format('link', false);
          }
        }
      }
    },
    clipboard: {
      matchVisual: false
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background', 'font', 'align'
  ];

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 px-8 py-8 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-primary font-bricolage text-center mt-12">Manage Blog</h2>
      <form onSubmit={handleAdd} className="mb-8 flex flex-col gap-4">
        <input
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent transition font-poppins"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          disabled={loading}
        />
        <div className="h-96">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Write your blog post..."
            className="h-80"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1 font-medium text-gray-700">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block"
            disabled={loading}
          />
          {(imageUrl || image) && (
            <img
              src={imageUrl || (image && URL.createObjectURL(image))}
              alt="Preview"
              className="mt-2 rounded-lg shadow w-32 h-32 object-cover"
            />
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-accent hover:bg-primary text-white font-bold px-4 py-2 rounded-md transition-all shadow"
            disabled={loading}
          >
            {loading ? (editId ? "Updating..." : "Adding...") : (editId ? "Update Post" : "Add Post")}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-6">
        {paginatedPosts.map(post => (
          <div key={post.id} className="p-4 border rounded-lg flex flex-col gap-4 bg-gray-50 shadow service-card">
            <div className="flex items-center justify-between">
              <strong className="text-lg font-bricolage text-primary">{post.title}</strong>
              <span className="text-xs text-gray-400">{post.createdAt?.toDate?.().toLocaleString()}</span>
            </div>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-lg shadow" />
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="flex gap-2">
              <button onClick={() => handleEdit(post)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded font-poppins">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-poppins">Delete</button>
            </div>
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

export default BlogAdmin;
