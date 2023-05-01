import ExpenseAdd from "../../../Expenses/ExpenseAdd";

export function NewExpenseModal() {
  return (
    <div id="new-expense-model" className="modal">
      <div className="modal-content">
        <ExpenseAdd />
      </div>
    </div>
  );
}
