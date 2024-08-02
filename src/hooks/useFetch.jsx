import { useState, useEffect } from "react";
import api from "../api";

const useFetch = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(url);
      setData(res.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return { data };
};

export default useFetch;
