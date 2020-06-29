import axios from "axios";

//need to get proper baseURL
export const baseURL = "";

export const justAxios = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return instance;
};

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
  return instance;
};
