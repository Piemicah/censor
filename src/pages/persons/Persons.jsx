import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import api from "../../api";

const Persons = () => {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const res = await api.get("/api/persons/");
      setPersons(res.data);
    } catch (error) {
      alert(error.message);
    }
  };

  function handleDetail(pid) {
    navigate("/list/" + pid);
  }

  const handleDelete = async (id) => {
    const url = baseUrl + `/api/persons/${id}/`;
    await axios.delete(url).catch((err) => {
      console.log(err.message);
    });
    // window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-2">
        <h1 className="mt-8 text-2xl font-bold text-blue-900 md:text-5xl md:mb-4">
          List of Registered Citizens
        </h1>
        <div className="flex justify-between w-[90vw] text-xl font-bold md:w-[50vw] md:text-3xl">
          <span>Name</span> <span>Action</span>
        </div>
        {persons?.map((person) => (
          <div
            key={person.id}
            className="flex justify-between w-[90vw] md:w-[50vw] md:text-lg border-b border-gray-400 pb-1"
          >
            <span>
              {person.fname} {person.sname}
            </span>

            <div>
              <button
                className="bg-blue-900 text-white py-0 px-2 rounded-sm mr-1 cursor-pointer"
                onClick={() => {
                  handleDetail(person.id);
                }}
              >
                Detail
              </button>
              <button
                className="bg-red-900 text-white py-0 px-2 rounded-sm cursor-pointer"
                onClick={() => {
                  handleDelete(person.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Persons;
