import axios from "axios";

const API = axios.create({
  baseURL: "https://travelai-948u.onrender.com",
});

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);

export const getTrips = () => API.get("/trips");
export const createTrip = (data) => API.post("/trips", data);
export const deleteTrip = (id) => API.delete(`/trips/${id}`);