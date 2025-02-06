import axios from "axios";

const API_URL = "http://localhost:5000/api/favorites";

export const saveFavorite = async (eventText, eventDate, eventLink) => {
  const token = localStorage.getItem("token");
  return axios.post(API_URL, { eventText, eventDate, eventLink }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFavorites = async () => {
  const token = localStorage.getItem("token");
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteFavorite = async (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
