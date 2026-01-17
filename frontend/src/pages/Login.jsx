import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // DEMO LOGIN (can be replaced with backend later)
    if (email === "admin@greengrade.com" && password === "admin123") {
      localStorage.setItem("loggedIn", "true");
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-bold text-green-900 text-center">
          🌿 GreenGrade Login
        </h1>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

        <label className="block mt-4 text-sm">Email</label>
        <input
          type="email"
          className="w-full mt-1 p-3 border rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mt-4 text-sm">Password</label>
        <input
          type="password"
          className="w-full mt-1 p-3 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-6 w-full bg-green-700 text-white p-3 rounded-xl hover:bg-green-800"
        >
          Login
        </button>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Demo: admin@greengrade.com / admin123
        </p>
      </form>
    </div>
  );
}
