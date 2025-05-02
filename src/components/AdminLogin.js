import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";

function AdminLogin({ onLogin, onLogout, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // loader state

  // Admin management state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [adminMgmtError, setAdminMgmtError] = useState("");
  const [adminMgmtLoading, setAdminMgmtLoading] = useState(false);

  // Fetch all admin users (emails) - only works if you use Firebase Admin SDK on backend.
  // For client-side, you can only show the current user.
  useEffect(() => {
    if (user) {
      setAdminList([user.email]);
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLogin) onLogin();
    } catch (err) {
      setError("Login failed");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth);
    if (onLogout) onLogout();
    setLoading(false);
  };

  // Add a new admin (create user)
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAdminMgmtError("");
    setAdminMgmtLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      setAdminList((prev) => [...prev, adminEmail]);
      setAdminEmail("");
      setAdminPassword("");
    } catch (err) {
      setAdminMgmtError(err.message || "Failed to add admin");
    }
    setAdminMgmtLoading(false);
  };

  // Delete an admin (delete user) - can only delete self from client-side
  const handleDeleteAdmin = async (emailToDelete) => {
    setAdminMgmtError("");
    setAdminMgmtLoading(true);
    try {
      if (user.email === emailToDelete) {
        await deleteUser(auth.currentUser);
        setAdminList([]);
        if (onLogout) onLogout();
      } else {
        setAdminMgmtError(
          "You can only delete the currently logged-in admin from this page."
        );
      }
    } catch (err) {
      setAdminMgmtError(err.message || "Failed to delete admin");
    }
    setAdminMgmtLoading(false);
  };

  if (user) {
    return (
      <div className="mb-8 flex flex-col gap-6 items-center">
        <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 border border-gray-100 max-w-md w-full">
          <span className="text-gray-700 font-medium">
            Logged in as{" "}
            <span className="text-primary">{user.email}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition flex items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            Logout
          </button>
        </div>
        {/* Admin management section */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100 max-w-md w-full">
          <h3 className="text-lg font-bold mb-4 text-primary">Manage Admins</h3>
          <form
            onSubmit={handleAddAdmin}
            className="flex flex-col gap-3 mb-4"
          >
            <input
              className="border border-gray-300 rounded-md p-2"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="New Admin Email"
              required
              disabled={adminMgmtLoading}
            />
            <input
              className="border border-gray-300 rounded-md p-2"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="New Admin Password"
              required
              disabled={adminMgmtLoading}
            />
            <button
              type="submit"
              className="bg-accent hover:bg-primary text-white font-bold px-4 py-2 rounded-md transition-all shadow"
              disabled={adminMgmtLoading}
            >
              {adminMgmtLoading ? "Adding..." : "Add Admin"}
            </button>
          </form>
          <div>
            <h4 className="font-semibold mb-2">Current Admins</h4>
            <ul>
              {adminList.map((admin, idx) => (
                <li
                  key={admin}
                  className="flex items-center justify-between mb-2"
                >
                  <span className="text-gray-700">{admin}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => handleDeleteAdmin(admin)}
                    disabled={adminMgmtLoading}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 mt-2">
              <span>
                Note: You can only delete the currently logged-in admin from this
                page.
              </span>
            </div>
            {adminMgmtError && (
              <div className="text-red-500 mt-2">{adminMgmtError}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl shadow-lg border border-gray-100 px-8 py-8 w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-primary mb-2 text-center font-bricolage">
          Admin Login
        </h2>
        <input
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          required
          disabled={loading}
        />
        <input
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-accent hover:bg-primary text-white font-bold px-4 py-3 rounded-md transition-all shadow flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <div className="text-red-500 text-center font-medium mt-2">{error}</div>
        )}
      </form>
    </div>
  );
}

export default AdminLogin;
