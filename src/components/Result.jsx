const Result = () => {
  return (
    <div className="container">
      <div>
        <h3>Elevator Pitch: </h3>
        <p>{data.elevator_pitch}</p>
      </div>
      <div>
        <h3>Job Summary: </h3>
        <p>{data.jd}</p>
      </div>
      <div>
        <h3>Questions: </h3>
        <ul>
          <li>{data.questions[0]}</li>
          <li>{data.questions[1]}</li>
          <li>{data.questions[2]}</li>
        </ul>
      </div>

      <Link className="text-emerald-500" to="/">
        Try Again
      </Link>
    </div>
  );
};

export default Result;
