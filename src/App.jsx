import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Resume from "./components/Resume";
import FirebaseConfig from "./config/firebase";

function App() {
  // Initialize Firebase
  const app = initializeApp(FirebaseConfig);

  const auth = getAuth(app);

  return (
    <>
      <Login auth={auth} />
      <br />
      <Signup auth={auth} />
      <br />
      <Resume auth={auth} />
    </>
  );
}

export default App;
