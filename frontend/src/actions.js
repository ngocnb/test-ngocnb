import axios from "axios";
import { API_URL } from "@env";

import { setCurrentUser, setToken } from "./reducer";
import { store } from "./store";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const localStorageData = JSON.parse(localStorage.getItem("persist:root"));
let token = null;
if (localStorageData !== null && localStorageData.token !== "null") {
  token = localStorageData.token;
  token = token.replace(/['"]+/g, "");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  axios.defaults.headers.common["Authorization"] = null;
}

export function facebookLogin(data) {
  return function (dispatch) {
    return axios.post(`/v1/auth/facebook`, data).then(({ data }) => {
      token = data.token;
      dispatch(setToken(data.token));
    });
  };
}

export function fetchCurrentUser() {
  return function (dispatch) {
    return axios
      .get(`/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        dispatch(setCurrentUser(data.user));
      });
  };
}

export function logOut() {
  return function (dispatch) {
    dispatch(setToken(null));
    dispatch(setCurrentUser({}));
  };
}

function setTokenToAxios() {}
