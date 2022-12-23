import React from "react";
import M from "materialize-css";
import ExpenseApi from "../../../../client-code/expenses";

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   fromDate: undefined,
    //   toDate: undefined,
    // };
  }

 

  render() {
    return (
      <div>
        <table className="striped">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.props.expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.categoryName}</td>
                <td>{expense.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Expenses;