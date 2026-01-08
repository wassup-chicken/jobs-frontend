import { useState, useRef, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Error from "./Error";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(null);
  const refContainer = useRef(null);
  const { user, auth } = useAuth();

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //fetch authenticate
    if (email === "" || password === "") {
      setError({ message: "can't be blank bruh" });
      return;
    }

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(async (currentUser) => {
        // Signed in
        // const user = userCredential.user;
        setEmail("");
        setPassword("");

        const token = await currentUser.user.getIdToken();

        const req = {
          method: "GET",
          headers: {
            Authorization: `Bearer ` + token,
          },
        };

        const res = await fetch(import.meta.env.VITE_API_URL + "/ping", req);

        if (res.status !== 200) {
          signOut(auth);
          setError({ message: "user can't be validated!" });
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/resume");
    }
  }, [user]);

  return (
    <div className="container">
      <h1 className="text-2xl align-text-top pt-24 m-10">Log In</h1>
      {isError && <Error error={isError} />}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col m-2 w-md gap-2">
          <input
            onChange={handleEmail}
            id="email"
            name="email"
            className="border-2 m-0.5 rounded-sm p-1"
            type="email"
            value={email}
            placeholder="Email"
            ref={refContainer}
          />
          <input
            onChange={handlePassword}
            id="password"
            name="password"
            className="border-2 m-0.5 rounded-sm p-1"
            type="password"
            value={password}
            placeholder="Password"
          />
          <div>
            <p>
              New?{" "}
              <Link className="text-emerald-500" to="/signup">
                Signup
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="border-2 m-3 bg-emerald-400 rounded-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
