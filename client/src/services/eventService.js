import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export const getHistoricalEvents = async (month, day) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/${month}/${day}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
