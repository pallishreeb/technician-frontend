/** @format */

import "./App.css";
import Technicians from "./pages/Technicians";
import Apartments from "./pages/Appartments";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthApi } from "./context/authContext/authProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Events from "./pages/Events";

function App() {
  const { state } = useAuthApi();
  let admin = state.user
  return (
    <div className="bg-blue">
      {
        admin && <Navbar />
      }


      <ToastContainer autoClose={2000} />
      {
        admin ? <Routes>
          <Route exact path="/" element={<Jobs />} />
          <Route exact path="/technicians" element={<Technicians />} />
          <Route exact path="/apartments" element={<Apartments />} />
          <Route exact path="/events" element={<Events />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes> : <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      }

    </div>
  );
}

export default App;
