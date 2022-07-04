import { API } from "../../user/backend";
import { toast } from "react-toastify";
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    console.log(data)
    if(data.status != 401 || data.status != 400){
         localStorage.setItem("jwt", JSON.stringify(data));
    localStorage.setItem("token", JSON.stringify(data.user.token));
    }
    else{
      toast("Something Went Wrong")
    }
    // localStorage.setItem("jwt", JSON.stringify(data));
    // localStorage.setItem("token", JSON.stringify(data.user.token));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.clear()
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
