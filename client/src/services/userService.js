import axios from "axios";

const API_URL = "http://localhost:3001/api/users"; // Update this with your deployed API URL

export const getUserProfile = async () => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
};

export const updatePassword = async (newPassword) => {
  return axios.put(`${API_URL}/profile/password`, { newPassword }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
};
