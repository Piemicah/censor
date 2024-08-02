import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/Icon_close.png";
import burgerMenu from "../../assets/Icon_menu.png";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";
import api2 from "../../api2";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api2.post("/api/logout/");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="hidden md:flex justify-between h-12 bg-slate-800 items-center sticky top-0 right-[100vw] left-0">
        <div className="flex gap-4 ml-4">
          <Link to="/" className="font-bold text-white">
            Home
          </Link>
          <Link to="/registration" className="font-bold text-white">
            Registration
          </Link>
          <Link to="/list" className="font-bold text-white">
            List
          </Link>
        </div>
        <div className="font-bold text-white">{user}</div>
        <div className="mr-4">
          <button
            onClick={handleLogout}
            className="px-4 py-1 font-bold text-white bg-red-600 rounded-md shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="absolute top-2 left-1 md:hidden">
        <img
          src={isMenuOpen ? closeIcon : burgerMenu}
          alt=""
          className="w-8"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        />

        {isMenuOpen && (
          <div className="flex flex-col gap-2 bg-slate-800 opacity-80">
            <Link to="/" className="p-2 font-bold text-white border-b">
              Home
            </Link>
            <Link
              to="/registration"
              className="p-2 font-bold text-white border-b"
            >
              Registration
            </Link>
            <Link to="/list" className="p-2 font-bold text-white border-b">
              List
            </Link>
            <div
              onClick={handleLogout}
              className="p-2 font-bold text-white border-b"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
