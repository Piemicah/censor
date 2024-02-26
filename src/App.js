import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Person from "./components/person/Person";
import Registration from "./components/registration/Registration";
import Persons from "./pages/persons/Persons";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/person/:personId" element={<Person />} />
          <Route path="/persons" element={<Persons />} />
          <Route path="/registration/:msg" element={<Registration />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
