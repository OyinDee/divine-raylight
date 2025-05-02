import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function AdminLogin({ onLogin, onLogout, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLogin) onLogin();
    } catch (err) {
      setError("Login failed");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    if (onLogout) onLogout();
  };

  if (user) {
    return (
      <div className="mb-6">
        <span className="mr-2">Logged in as {user.email}</span>
        <button onClick={handleLogout} className="bg-gray-400 text-white px-2 py-1 rounded">Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="mb-6">
      <input className="border p-2 mr-2" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Admin Email" required />
      <input className="border p-2 mr-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}

export default AdminLogin;
