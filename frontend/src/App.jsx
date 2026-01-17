import { useState } from "react";
import Login from "./pages/Login";
import { analyzeItem } from "./services/api";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [file, setFile] = useState(null);
  const [type, setType] = useState("Plant");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // 🔐 LOGIN CHECK
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // 🌿 ANALYZE
  const onAnalyze = async () => {
    setErr("");
    setResult(null);

    if (!file) {
      setErr("Please upload an image.");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeItem(file, type);
      setResult(data);
    } catch {
      setErr("Something went wrong. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="mx-auto max-w-3xl">

        {/* 🌿 TITLE */}
        <h1 className="text-3xl font-bold text-green-900">
          🌿 GreenGrade
        </h1>

        {/* 🔓 LOGOUT BUTTON */}
        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            setIsLoggedIn(false);
          }}
          className="mt-2 text-sm text-red-600 underline"
        >
          Logout
        </button>

        <p className="mt-2 text-gray-600">
          Upload an image and get grading for Plant / Tree / Flower / Seed
        </p>

        {/* 📦 INPUT CARD */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow border">
          <label className="block text-sm font-medium">Select Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          >
            <option>Plant</option>
            <option>Tree</option>
            <option>Flower</option>
            <option>Seed</option>
          </select>

          <label className="mt-4 block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-2 w-full rounded-xl border p-3"
          />

          {err && <p className="mt-3 text-red-600 text-sm">{err}</p>}

          <button
            onClick={onAnalyze}
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-green-700 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze & Grade"}
          </button>
        </div>

        {/* 📊 RESULT */}
        {result && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow border">
            <h2 className="text-xl font-bold">Result</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="border p-4 rounded-xl">
                <p className="text-sm text-gray-500">Grade</p>
                <p className="text-3xl font-bold text-green-800">
                  {result.grade}
                </p>
              </div>

              <div className="border p-4 rounded-xl">
                <p className="text-sm text-gray-500">Health</p>
                <p className="text-3xl font-bold">
                  {result.health}%
                </p>
              </div>

              <div className="border p-4 rounded-xl">
                <p className="text-sm text-gray-500">Growth Stage</p>
                <p>{result.growth_stage}</p>
              </div>

              <div className="border p-4 rounded-xl">
                <p className="text-sm text-gray-500">Care Tips</p>
                <p>{result.care_tips}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
