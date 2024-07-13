import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/registration/Registration";
import Home from "./components/home/Home";
import Persons from "./pages/persons/Persons";
import Person from "./components/person/Person";
import Login from "./components/user/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import Register from "./components/user/Register";
import EditPerson from "./components/editPerson/EditPerson";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<Persons />} />
          <Route path="/list/:id" element={<Person />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/edit/:id" element={<EditPerson />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
      </Routes>
    </>
  );
}

export default App;
