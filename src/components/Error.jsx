const Error = ({ error }) => {
  return (
    <div
      className="bg-red-100 border w-md mx-auto border-red-400 m-5 text-red-700 px-4 py-3 rounded"
      role="alert"
    >
      <span className="block sm:inline">{error.message}</span>
    </div>
  );
};

export default Error;
