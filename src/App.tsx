import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Preloader from "../src/components/Pre";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./Utils/firebase-config";

const About = lazy(() => import("./pages/About/About"));
const Home = lazy(() => import("./pages/Home/Home"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Resume = lazy(() => import("./pages/Resume/ResumeNew"));
const DashBoard = lazy(() => import("./pages/Admin/Dashboard/Dashboard"));
const Login = lazy(() => import("./pages/Login/Login"));

function App() {
  const [load, upadateLoad] = useState(true);

  const [db, setDb] = useState<Firestore | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const _db = getFirestore(app);
    setDb(_db);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Preloader load={true} />}>
                <Home db={db} />
              </Suspense>
            }
          />
          <Route
            path="/project"
            element={
              <Suspense fallback={<Preloader load={true} />}>
                <Projects />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<Preloader load={true} />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/resume"
            element={
              <Suspense fallback={<Preloader load={true} />}>
                <Resume />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Preloader load={true} />}>
                <DashBoard />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Preloader load={true} />}>
                <Login />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;