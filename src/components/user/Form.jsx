import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import api2 from "../../api2";
import { AuthContext } from "../../context/AuthContext";

const Input = ({ name, label, value, type, fxn }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={fxn}
        type={type}
        name={name}
        id={name}
        value={value}
        className=" py-1 rounded-[0.35rem] px-2"
      />
    </div>
  );
};

const Form = ({ route, kind }) => {
  const { setIsAuthorized, setUser } = useContext(AuthContext);
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const type = kind === "login" ? "Login" : "Register";

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(route, info);

      if (kind === "login") {
        await api2.post("/api/manage_tokens/", {
          token: res.data.access,
          refresh: res.data.refresh,
          user: info.username,
        });
        setIsAuthorized(true);
        setUser(info.username);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <form
        className="flex flex-col px-4 gap-6 items-center mt-12 w-[90vw] rounded-lg bg-gray-200  shadow-lg py-4 lg:w-[30vw]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl font-bold text-blue-900">{type}</h1>
        <Input
          type="text"
          name="username"
          label="Username"
          value={info.username}
          fxn={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={info.password}
          fxn={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-900 text-white font-bold w-full rounded-md py-2 text-lg"
        >
          {type}
        </button>

        {kind === "login" ? (
          <div className="flex flex-col items-center">
            <span>Don't have account?</span>
            <span
              className="cursor-pointer font-bold"
              onClick={() => {
                navigate("/register");
              }}
            >
              SignUp
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span>Have account?</span>
            <span
              className="cursor-pointer font-bold"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
