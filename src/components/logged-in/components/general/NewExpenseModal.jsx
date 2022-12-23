import ExpenseAdd from "../../../Expenses/ExpenseAdd";

export function NewExpenseModal() {
  return (
    <div id="new-expense-model" class="modal">
      <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
        <ExpenseAdd />
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">
          Agree
        </a>
      </div>
    </div>
  );
}
