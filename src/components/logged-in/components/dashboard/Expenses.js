import React from "react";
import EachExpense from "../../../Expenses/EachExpense";


class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //categories: [],
      expenseOnEdit: undefined,
      // categoryOnDelete: undefined,
    };
  }

  editClicked = (expense) => {
    console.log(expense);
    this.setState({
      expenseOnEdit: expense
    });
  }


  render() {
    const hasExpenses = this.props.expenses && this.props.expenses.length > 0;

    let htmlElement;
    if (hasExpenses) {
      htmlElement = (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.expenses.map(expense => (
              <EachExpense key={expense.id} expense={expense} onEditClicked={this.editClicked} />
            ))}
          </tbody>
        </table>
      );
    } else {
      htmlElement = (
        <div className="highlight centered">
          No expenses found
        </div>
      );
    }
    return (
      <div>
        {htmlElement}
      </div>
    );
  }
}
export default Expenses;