const Upload = () => {
  return (
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
  );
};

export default Upload;
