import React from "react";

class Expenses extends React.Component {
  constructor(props) {
    super(props);
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
            </tr>
          </thead>
          <tbody>
            {this.props.expenses.map(expense => (
              <tr key={expense.id}>
                <td>{(new Date(expense.date * 1000)).toLocaleString('default', { day: 'numeric', month: 'short' })}</td>
                <td>{expense.categoryName}</td>
                <td>{expense.name}</td>
                <td>{Math.round(expense.price * 100) / 100}</td>
              </tr>
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