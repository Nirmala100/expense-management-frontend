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
      if (res.status === 403) {
        throw new Error("User not found");
      } else if (res.status != 200) {
        throw new Error("Server error");
      }
      return res.json();
    }).then(resJson => {
      if (resJson.token !== undefined) {
        localStorage.setItem("token", resJson.token);
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
}