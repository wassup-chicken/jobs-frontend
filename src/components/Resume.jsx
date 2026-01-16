import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Helper functions for sessionStorage (it only stores strings, so we need to stringify/parse)
  const saveToSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const getFromSessionStorage = (key) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const handleReset = () => {
    setData(null);
    sessionStorage.removeItem("data");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (resume === null || url === "") {
      setError({ message: "can't be blank bruh" });
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("url", url);

    const token = await user.getIdToken();

    const req = {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ` + token },
    };
    try {
      setLoading(true);
      const res = await fetch(import.meta.env.VITE_API_URL + `/upload`, req);
      const data = await res.json();

      setData(data);
      saveToSessionStorage("data", data);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    setLoading(false);
    const storedData = getFromSessionStorage("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="p-24">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-24">
      {data ? (
        <>
          <h1 className="text-2xl align-text-top">AI Interview Prep</h1>
          <div>
            <div className="container flex flex-col gap-3 mt-5">
              <h3 className="text-left text-2xl">Elevator Pitch: </h3>
              <p className="text-left">{data?.elevator_pitch}</p>
            </div>
            <div className="container flex flex-col gap-3 mt-5">
              <h3 className="text-left text-2xl">Job Summary: </h3>
              <p className="text-left">{data?.jd}</p>
            </div>
            <div className="container flex flex-col gap-3 mt-5">
              <h3 className="text-left text-2xl">Questions:</h3>
              {data?.questions ? (
                data.questions.map((question, index) => (
                  <p key={index} className="text-left">
                    {question}
                  </p>
                ))
              ) : (
                <p className="text-left">No questions available</p>
              )}
            </div>

            <button
              onClick={handleReset}
              type="button"
              className="border-2 p-2 bg-emerald-400 m-5 rounded-sm"
            >
              Try Again
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-2xl align-text-top">AI Interview Prep</h1>
          {isError && <Error error={isError} />}
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-md text-align text-left m-5 gap-1.5"
            >
              <label htmlFor="url" className="m-0.5">
                Job Description/URL
              </label>
              <input
                id="url"
                onChange={handleUrl}
                className="border-2 m-0.5 rounded-sm p-1"
                type="text"
                name="url"
              />
              <label htmlFor="resume">Attach Resume in PDF:</label>
              <input
                id="resume"
                onChange={handleResume}
                className="block w-full text-sm text-slate-500
         file:mr-4 file:py-2 file:px-4
         file:rounded-md file:border-0
         file:text-sm file:font-semibold
         file:bg-pink-50 file:text-pink-700
         hover:file:bg-pink-100"
                type="file"
                name="resume"
              />
              <button
                type="submit"
                className="border-2 bg-emerald-400 m-3 rounded-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
