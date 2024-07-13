import { useState, useEffect } from "react";
import api from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Display = ({ label, value }) => {
  return (
    <div className="flex justify-between">
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
};

const Person = () => {
  const [person, setPerson] = useState({});

  const id = useLocation().pathname.split("/").splice(-1)[0];
  const navigate = useNavigate();

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    try {
      const res = await api.get(`/api/persons/${id}/`);
      setPerson(res.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-2">
        <h1 className="mt-8 text-3xl font-bold text-blue-900 md:text-5xl">
          {person.fname}
        </h1>
        <div className="flex flex-col w-[80vw] md:w-[40vw]">
          <Display
            label="Other Names"
            value={`${person.sname} ${person.mname}`}
          />
          <Display label="Email" value={person.email} />
          <Display label="Phone" value={person.phone} />
          <Display label="State" value={person.state} />
          <Display label="LGA" value={person.lga} />
        </div>
        <button
          className="px-6 py-1 text-white bg-blue-900 rounded-sm mt-8"
          onClick={() => {
            navigate("/edit/" + id);
          }}
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default Person;
