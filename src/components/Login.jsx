import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const Form = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //fetch authenticate
    if (email === "" || password === "") {
      alert("EMPTY!");
      return;
    }

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;

        alert(errorMessage);
      });
  };

  return (
    <>
      <h1 className="text-2xl align-text-top">Log In</h1>
      <div className="flex justify-center">
        <form className="flex flex-col m-2 w-md">
          <input
            onChange={handleEmail}
            id="email"
            name="email"
            className="border-2 m-0.5"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={handlePassword}
            id="password"
            name="password"
            className="border-2 m-0.5"
            type="password"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="border-2 m-3 bg-emerald-400"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
