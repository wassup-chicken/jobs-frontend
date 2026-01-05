import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Form = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPw = (e) => {
    setConfirmPw(e.target.value);
  };

  const handleSubmit = (e) => {
    //fetch authenticate
    if (email === "" || password === "" || confirmPw === "") {
      alert("Gotta enter em!");
      return;
    }

    if (password !== confirmPw) {
      alert("inconsistent password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);

        //navigate to log in to have them sign in again...
        //send email to confirm then have them log in
        setEmail("");
        setPassword("");
        setConfirmPw("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        alert(errorMsg);
        setEmail("");
        setPassword("");
        setConfirmPw("");

        // alert(errorMsg);
      });
  };

  return (
    <>
      <h1 className="text-2xl align-text-top">Sign Up</h1>
      <div className="flex justify-center">
        <form className="flex flex-col m-2 w-md">
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
            id="password"
            name="password"
            className="border-2 m-0.5 rounded-sm p-1"
            type="password"
            value={confirmPw}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="border-2 m-3 bg-emerald-400 rounded-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
