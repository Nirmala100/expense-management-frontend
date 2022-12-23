const URL = "http://localhost:8081/categories";

export default class CategoryApi {
  getCategories() {
    return fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  }
}
