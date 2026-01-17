import { useState } from "react";
import { analyzePlant } from "./services/api";

export default function App() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("Plant");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onAnalyze = async () => {
    setErr("");
    setResult(null);

    if (!file) {
      setErr("Please upload an image.");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzePlant({ file, itemType: type });
      setResult(data);
    } catch (e) {
      setErr("Something went wrong. Check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-green-900">🌿 GreenGrade</h1>
        <p className="mt-1 text-gray-600">
          Upload an image and get a clean grading report for Plant / Tree / Flower / Seed.
        </p>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">Select Type</label>
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

              <label className="mt-4 block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-2 w-full rounded-xl border p-3"
              />
            </div>

            <div className="rounded-2xl border bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-900">Preview</p>
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="mt-3 h-48 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="mt-3 flex h-48 items-center justify-center rounded-xl border border-dashed text-gray-500">
                  No image selected
                </div>
              )}
            </div>
          </div>

          {err && <p className="mt-4 text-sm text-red-600">{err}</p>}

          <button
            onClick={onAnalyze}
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze & Grade"}
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900">✅ Result</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Grade</p>
                <p className="text-3xl font-extrabold text-green-800">{result.grade}</p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Health</p>
                <p className="text-3xl font-extrabold text-gray-900">{result.health}%</p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Growth Stage</p>
                <p className="text-lg font-semibold">{result.growth_stage}</p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Care Tips</p>
                <p className="text-sm text-gray-700">{result.care_tips}</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              File: {result.filename} | Type: {result.type}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
