import decode from "jwt-decode";
// import axios from "axios";
// import { baseURL } from "./axios";

export const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (token === null || !token) {
      return undefined;
    }
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      clearLocalStorage();
      return undefined;
    }
    return JSON.parse(token);
  } catch (error) {
    clearLocalStorage();
    return undefined;
  }
};

export const setToken = token => {
  try {
    const item = token;
    localStorage.setItem("token", item);
    return true;
  } catch (error) {
    return undefined;
  }
};

export const getUserId = () => {
  const token = localStorage.getItem("token");
  const decoded = decode(token);
  return decoded;
};

export const isAccountCreationFinished = token => {
  const decodedToken = decode(token);
  return decodedToken.subject ? true : false;
};
