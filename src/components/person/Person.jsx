import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import "./person.scss";
import { baseUrl } from "../../baseUrl";

const Person = () => {
  const personId = Number(useLocation().pathname.split("/")[2]);
  const [person, setPerson] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const url = baseUrl + "/api/persons/" + personId;
    axios.get(url).then((res) => {
      setPerson(res.data);
    });
  }, []);

  return (
    <div className="person">
      <img src={person.picture} alt="" />
      <h2>{person.sname}</h2>
      <div className="info">
        <p>
          <span>Other Names</span>: {person.fname} {person.mname}
        </p>
        <p>
          <span>State</span>: {person.State}
        </p>
        <p>
          <span>Town</span>: {person.town}
        </p>
        <p>
          <span>Age</span> : {moment(person.dob).fromNow(true)}
        </p>
        <p>
          <span>LGA</span>: {person.LGA}
        </p>
        <p>
          <span>Address</span>: {person.address}
        </p>
      </div>
      <button
        onClick={(e) => {
          navigate("/registration/" + personId);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Person;
