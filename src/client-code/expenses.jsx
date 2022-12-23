export default class ExpenseApi {
  getExpensesByFilter(fromDate, toDate) {
    var url = "http://localhost:8081/expenses";
    if (fromDate && toDate) {
      url = url + "?" + new URLSearchParams({
        fromDate: fromDate,
        toDate: toDate
      });
    }
   // console.log("Fetching from URL", url);

    return fetch(url, {
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
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
