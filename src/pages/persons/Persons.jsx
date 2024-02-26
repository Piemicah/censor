import { useEffect, useState } from "react";
import "./persons.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

const Persons = () => {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [persons]);

  const fetchData = async () => {
    const url = baseUrl + "/api/persons";

    await axios
      .get(url)
      .then((res) => {
        setPersons(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const deletePerson = async (personId) => {
    try {
      const url = baseUrl + "/api/persons/" + personId;
      await axios.delete(url);
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="persons">
      <h1>LIST OF REGISTERED CITIZENS</h1>

      <table>
        <thead>
          <tr>
            <th>Surname</th>
            <th>First Name</th>
            <th>Middle Name</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "even-row" : "odd-row"}
              onContextMenu={() => {
                <div>
                  <h5>assss</h5>
                  <h5>b</h5>
                </div>;
              }}
            >
              <td className="sname">{person.sname}</td>
              <td>{person.fname}</td>
              <td>{person.mname}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => {
                    navigate("/person/" + person.personId);
                  }}
                >
                  details
                </button>
                <button
                  className="action-btn"
                  onClick={(e) => {
                    deletePerson(person.personId);
                    if (person.picture) {
                      const pid = person.picture.split("/")[8].split(".")[0];
                      const url = baseUrl + "/api/upload/" + pid;
                      axios.delete(url).catch((er) => {
                        console.log(er.message);
                      });
                    }
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
