import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import fileIcon from "../../assets/img.png";
import "./registration.scss";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

const Registration = () => {
  const msg = useLocation().pathname.split("/")[2];
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [person, setPerson] = useState({});
  const [stateId, setStateId] = useState("AB");
  const [file, setFile] = useState();
  const [lgEnabled, setLgEnabled] = useState(false);
  const [message, setMessage] = useState(null);

  //const stateRef = useRef(null);

  useEffect(() => {
    if (msg === "reg") return;
    const personId = Number(msg);
    const url = baseUrl + "/api/persons/" + personId;
    axios
      .get(url)
      .then((res) => {
        setPerson(res.data);
      })
      .catch((er) => {
        console.log(er.message);
      });
  }, []);

  useEffect(() => {
    const url = baseUrl + "/api/states";
    axios
      .get(url)
      .then((res) => {
        setStates(res.data);
      })
      .catch((er) => {});
  }, []);

  useEffect(() => {
    const url = baseUrl + "/api/states/" + stateId;
    axios
      .get(url)
      .then((res) => {
        setLgas(res.data);
      })
      .catch((er) => {
        console.log(er.message);
      });
  }, [stateId]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const res = await axios.post(baseUrl + "/api/upload", formData);
      return res.data.url;
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
    setMessage(null);
  };

  const register = async () => {
    let imgUrl = "";
    if (file) imgUrl = await upload();
    person.picture = imgUrl;

    const url = baseUrl + "/api/persons";
    axios
      .post(url, person)
      .then((res) => res.data)
      .catch((er) => {
        console.log(er.message);
        setMessage("All fields must be filled");
      });

    setMessage("Successfully Added!");
  };

  const update = async () => {
    const personId = Number(msg);

    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
      person.picture = imgUrl;
    }

    const url = baseUrl + "/api/persons/" + personId;
    await axios
      .put(url, person)
      .then((res) => res.data)
      .catch((er) => {
        console.log(er.message);
      });

    setMessage("Successfully updated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (msg === "reg") register();
    else update();

    setFile(null);
    setPerson({});
  };
  //console.log(person);
  //console.log(stateRef);
  //stateRef.current.value = "AB";
  return (
    <div className="registration">
      <form className="form" id="form" onSubmit={handleSubmit}>
        <div className="info">
          <div>
            <label htmlFor="sname">Surname</label>
            <input
              type="text"
              form="form"
              value={person.sname}
              id="sname"
              name="sname"
              placeholder="Enter Surname"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              value={person.fname}
              id="fname"
              placeholder="Enter First name"
              name="fname"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="mname">Other Name</label>
            <input
              type="text"
              value={person.mname}
              id="mname"
              placeholder="Enter other names"
              name="mname"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="dob">Date of birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={person.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sex">Sex</label>
            <select
              name="sex"
              id="sex"
              value={person.sex}
              onChange={handleChange}
            >
              <option>{}</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="phone">Mobile</label>
            <input
              type="tel"
              value={person.phone}
              id="phone"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="nat">Nationality</label>
            <input
              type="text"
              value={person.Nationality}
              id="nat"
              name="Nationality"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              //value={person.stateId}
              onChange={(e) => {
                person.stateId = e.target.value;
                setStateId(e.target.value);
                setLgEnabled(true);
              }}
            >
              <option>Select State</option>
              {states.map((state) => (
                <option key={state.stateId} value={state.stateId}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lga">LGA</label>
            <select
              disabled={lgEnabled ? false : true}
              form="form"
              name="lgId"
              //disabled={true}
              id="lgId"
              //value={person.lgId}
              onChange={handleChange}
            >
              <option value>Select lga</option>
              {lgas.map((lga) => (
                <option value={lga.lgId} key={lga.lgId}>
                  {lga.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              form="form"
              value={person.email}
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="occ">Occupation</label>
            <input
              type="text"
              form="form"
              id="occ"
              value={person.occupation}
              name="occupation"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="home">Home Town</label>
            <input
              type="text"
              form="form"
              id="home"
              name="town"
              value={person.town}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="add">Address</label>
            <textarea
              name="address"
              form="form"
              value={person.address}
              id="add"
              cols="30"
              rows="5"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="img-info">
          {msg !== "reg" ? (
            <img
              className="image"
              src={file ? URL.createObjectURL(file) : person.picture}
            />
          ) : (
            file && (
              <img className="image" src={URL.createObjectURL(file)} alt="" />
            )
          )}
          <div className="browse">
            <input
              type="file"
              id="file"
              name="file"
              hidden={true}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="file">
              <img src={fileIcon} alt="" />
              <span>Upload Image</span>
            </label>
          </div>
          <div className="buttons">
            <button
              type="reset"
              onClick={(e) => {
                setPerson({});
                setMessage(null);
              }}
            >
              Cancel
            </button>
            <button form="form">{msg === "reg" ? "Submit" : "Update"}</button>
          </div>
          {message && <div>{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default Registration;
