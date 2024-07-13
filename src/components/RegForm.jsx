import { states, lga } from "./../utilities";
import { useState, useEffect } from "react";
import fileIcon from "../assets/img.png";
import api from "../api";
import Navbar from "./navbar/Navbar";

const Input = ({ type, name, label, fxn, value }) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={fxn}
        className="py-1 pl-2 bg-gray-300 rounded-md"
      />
    </div>
  );
};

const RegForm = ({ route, kind }) => {
  const [lgEnabled, setLgEnabled] = useState(false);
  const [lgas, setLgas] = useState([]);
  const [file, setFile] = useState(null);
  const [person, setPerson] = useState({});

  const type = kind === "reg" ? "Regiration Form" : "Edit Form";

  useEffect(() => {
    if (kind === "reg") return;
    else fetchPerson();
  }, []);

  const fetchPerson = async () => {
    try {
      const res = await api.get(route);
      setPerson(res.data);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (kind === "reg") addPerson();
    else updatePerson();
  };

  const addPerson = async () => {
    try {
      await api.post(route, person);
    } catch (error) {
      alert(error.message);
    }
  };

  const updatePerson = async () => {
    try {
      await api.put(route, person);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="text-3xl font-bold text-blue-900 md:text-5xl">
          {type}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-[90vw] text-left md:grid grid-cols-2 gap-x-12 md:w-[70vw] lg:w-[40vw]"
        >
          <Input
            value={person.fname}
            type="text"
            name="fname"
            label="First Name"
            fxn={handleChange}
          />
          <Input
            value={person.sname}
            type="text"
            name="sname"
            label="Surname"
            fxn={handleChange}
          />
          <Input
            value={person.mname}
            type="text"
            name="mname"
            label="Other Name"
            fxn={handleChange}
          />
          <Input
            value={person.email}
            type="text"
            name="email"
            label="Email"
            fxn={handleChange}
          />
          <Input
            value={person.phone}
            type="phone"
            name="phone"
            label="Mobile"
            fxn={handleChange}
          />
          <Input
            value={person.nin}
            type="text"
            name="nin"
            label="NIN"
            fxn={handleChange}
          />

          <div className="flex flex-col ">
            <label htmlFor="sex">Sex</label>
            <select
              value={person.sex}
              onChange={handleChange}
              name="sex"
              id="sex"
              className="py-1 pl-2 bg-gray-300 rounded-md"
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <Input
            value={person.dob}
            type="date"
            name="dob"
            label="Date of Birth"
            fxn={handleChange}
          />
          <Input
            value={person.nationality}
            type="text"
            name="nationality"
            label="Nationality"
            fxn={handleChange}
          />

          <div className="flex flex-col ">
            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              onChange={(e) => {
                setLgas(lga.filter((l) => l.stateId === e.target.value));
                setLgEnabled(true);
                const st = states.find((s) => s.stateId === e.target.value);
                setPerson({ ...person, state: st.name });
              }}
              className="py-1 pl-2 bg-gray-300 rounded-md"
            >
              <option value="">Select State</option>
              {states?.map((state) => (
                <option value={state.stateId}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="lga">LGA</label>
            <select
              onChange={handleChange}
              name="lga"
              id="lga"
              className="py-1 pl-2 bg-gray-300 rounded-md"
            >
              <option value="">Select LGA</option>
              {lgEnabled &&
                lgas?.map((lg) => <option value={lg.name}>{lg.name}</option>)}
            </select>
          </div>
          <Input
            value={person.occupation}
            type="text"
            name="occupation"
            label="Occupation"
            fxn={handleChange}
          />

          <div className="flex flex-col ">
            <label htmlFor="add">Address</label>
            <textarea
              value={person.address}
              onChange={handleChange}
              rows={3}
              name="address"
              id="add"
              className="py-1 pl-2 bg-gray-300 rounded-md"
            />
          </div>
          <Input
            value={person.town}
            type="text"
            name="town"
            label="Home Town"
            fxn={handleChange}
          />

          <div className="flex flex-col items-center">
            {file && (
              <img
                className="w-24 object-cover rounded-[50%]"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
            <div className="flex">
              <input
                type="file"
                id="file"
                name="file"
                hidden={true}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <label htmlFor="file" className="flex items-center">
                <img src={fileIcon} alt="file" className="w-8" />
                <span>Upload Image</span>
              </label>
            </div>
          </div>
          <input
            type="submit"
            className="w-full col-start-1 py-2 mt-2 mb-4 font-bold text-white bg-blue-900 rounded-md md: row-start-9"
          />
        </form>
      </div>
    </>
  );
};

export default RegForm;
