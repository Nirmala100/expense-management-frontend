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

  updateCategory(category) {
    const url = `${URL}/${category.id}`;
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    }).then((response) => {
      console.log("Category update response", response);
      return response.json();
    })
  }

  createCategory(category) {
    return fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    }).then((response) => {
      console.log("New category created", response);
      return response.json();
    })
  }

  deleteCategory(category) {
    const url = `${URL}/${category.id}`;
    return fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    }).then((response) => {
      console.log("Category deleted", response);
      return;
    })
  }
}
