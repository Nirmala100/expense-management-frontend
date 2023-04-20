import ExpenseAdd from "../../../Expenses/ExpenseAdd";

export function NewExpenseModal() {
  return (
    <div id="new-expense-model" class="modal">
      <div class="modal-content">
        <ExpenseAdd />
      </div>
    </div>
  );
}
