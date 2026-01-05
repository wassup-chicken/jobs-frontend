import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Form from "./components/Form";
import Resume from "./components/Resume";
import firebaseConfig from "./config/firebase";

function App() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  return (
    <>
      <Form />
      <br />
      <Resume />
    </>
  );
}

export default App;
