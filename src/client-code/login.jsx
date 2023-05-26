import { baseUrl } from "./constant";
import { redirect } from "react-router-dom";

export default class LoginApi {
  constructor() {
    this.url = `${baseUrl}/login`;
  }

  login(username, password) {
    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    }).then(res => {
      const resJson = res.json();
      // console.log("Login message", resJson);
      // if (res.status != 200) {
      //   throw new Error(resJson.error);
      // }
      return resJson;
    }).then(resJson => {
      if (resJson.token !== undefined) {
        localStorage.setItem("token", resJson.token);
      } else if (resJson.error !== undefined) {
        throw new Error(resJson.error);
      }
      return resJson;
    });
  }

  logout() {
    localStorage.clear();
    return redirect("/login");
  }

  validateLogin(response) {
    if (response.status === 401) {
      this.logout();
    }
  }

  getUserDetails() {
    return fetch(`${baseUrl}/user`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        this.validateLogin(response);
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  updatePassword(password) {
    const url = `${baseUrl}/user/update`;
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(password)
    }).then((response) => {
      this.validateLogin(response);
      console.log("User Password update response", response);
      return response.json();
    })
  }
}