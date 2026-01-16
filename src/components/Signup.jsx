import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorComponent from "./Error";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isError, setError] = useState(null);

  const { user, auth } = useAuth();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleConfirmPw = (e) => {
    setConfirmPw(e.target.value);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //fetch authenticate
    if (email === "" || password === "" || confirmPw === "") {
      setError({ message: "can't be blank bruh" });
      return;
    }

    if (password !== confirmPw) {
      setError({ message: "be consistent bruh" });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (currentUser) => {
        const user = currentUser.user;

        // Send verification email first
        try {
          await sendEmailVerification(user);
          console.log("verification email sent");
        } catch (e) {
          console.log("there was an error: " + e);
        }

        // Sign out user immediately - they need to verify email before logging in
        await signOut(auth);

        // Clear form and navigate to login
        setEmail("");
        setPassword("");
        setConfirmPw("");
        navigate("/login");
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setConfirmPw("");

        setError(error);
      });
  };

  return (
    <>
      <h1 className="text-2xl align-text-top pt-24 m-10">Sign Up</h1>
      {isError && <ErrorComponent error={isError} />}
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
          <input
            onChange={handleConfirmPw}
            id="confirmpassword"
            name="confirmpassword"
            className="border-2 m-0.5 rounded-sm p-1"
            type="password"
            value={confirmPw}
            placeholder="Confirm Password"
          />
          <div>
            <p>
              Already have an account?{" "}
              <Link className="text-emerald-500" to="/">
                Login
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
    </>
  );
};

export default SignUp;
