import { baseUrl } from "./constant";
import LoginApi from "./login";

export default class ExpenseApi {
  constructor() {
    this.url = `${baseUrl}/expenses`;
    this.loginApi = new LoginApi();
  }
  getExpensesByFilter(fromDate, toDate) {
    var url = `${this.url}`;
    if (fromDate && toDate) {
      url = url + "?" + new URLSearchParams({
        fromDate: fromDate,
        toDate: toDate
      });
    }

    return fetch(url, {
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
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  createNewExpense(newExpense) {
    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify({
        name: newExpense.name,
        categoryName: newExpense.categoryName,
        price: newExpense.price,
        date: newExpense.date,
      }),
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      this.loginApi.validateLogin(res);
      return res.json()
    });
  }
}
