import { baseUrl } from "./constant";
import LoginApi from "./login";

export default class CategoryApi {
  constructor() {
    this.url = `${baseUrl}/categories`;
    this.loginApi = new LoginApi();
  }
  getCategories() {
    return fetch(this.url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        this.loginApi.validateLogin(response);
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  updateCategory(category) {
    const url = `${this.url}/${category.id}`;
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    }).then((response) => {
      this.loginApi.validateLogin(response);
      console.log("Category update response", response);
      return response.json();
    })
  }

  createCategory(category) {
    return fetch(this.url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    }).then((response) => {
      this.loginApi.validateLogin(response);
      console.log("New category created", response);
      return response.json();
    })
  }

  deleteCategory(category) {
    const url = `${this.url}/${category.id}`;
    return fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    }).then((response) => {
      this.loginApi.validateLogin(response);
      console.log("Category deleted", response);
      return;
    })
  }
}
