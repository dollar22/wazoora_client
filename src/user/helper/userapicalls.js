import { API } from "../backend";
import axios from "axios";

export const Signup = () => {};

export const SignIn = () => {
  return axios
    .post(`${API}/signin`)
    .then((res) => {
      console.log(res.json());
    })
    .catch((err) => {
      return err;
    });
};
