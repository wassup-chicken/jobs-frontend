import { useState } from "react";

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const handleUrl = (e) => {
    setUrl(url + e.target.value);
  };

  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resume === null || url === "") {
      alert("At least one hast to be mandatory");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("url", url);

    const req = {
      method: "POST",
      body: formData,
    };
    try {
      const res = await fetch("http://localhost:8080/upload", req);
      const data = await res.json();

      setData(data);
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };
  return (
    <>
      {data ? (
        <>
          <h1 className="text-2xl align-text-top">AI Interview Prep</h1>

          <div>
            <h3>Elevator Pitch: </h3>
            <p>{data?.elevator_pitch}</p>
          </div>
          <div>
            <h3>Job Summary: </h3>
            <p>{data?.jd}</p>
          </div>
          <div>
            <h3>Questions: </h3>
            <ul>
              <li>{data.questions[0]}</li>
              <li>{data.questions[1]}</li>
              <li>{data.questions[2]}</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl align-text-top">AI Interview Prep</h1>

          <div className="flex justify-center">
            <form className="flex flex-col w-md text-align text-left m-5">
              <label htmlFor="url" className="m-0.5">
                Job Description/URL
              </label>
              <input
                id="url"
                onChange={handleUrl}
                className="border-2 m-0.5"
                type="text"
                name="url"
              />
              <label htmlFor="resume">Attach Resume in PDF: </label>
              <input
                id="resume"
                onChange={handleResume}
                className="bg-amber-50 border-2 m-0.5"
                type="file"
                name="resume"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="border-2 bg-emerald-400 m-3"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Resume;
