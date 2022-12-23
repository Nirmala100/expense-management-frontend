import { Link } from "react-router-dom";
import M from "materialize-css";
import { useEffect } from "react";

export function FloatingActionButton() {
  useEffect(() => {
    var elems = document.querySelectorAll(".fixed-action-btn");
    var instances = M.FloatingActionButton.init(elems);
  }, []);

  return (
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red modal-trigger" href="#new-expense-model">
        <i class="large material-icons">add</i>
      </a>
      <ul>
        <li>
          <Link to="dashboard" class="btn-floating red">
            <i class="material-icons">mode_edit</i>
          </Link>
        </li>
        <li>
          <Link to="categories" class="btn-floating green darken-1">
            <i class="material-icons">apps</i>
          </Link>
        </li>
        <li>
          <Link to="categories/akash" class="btn-floating green">
            <i class="material-icons">add_to_photos</i>
          </Link>
        </li>
        <li>
          <Link to="expenses/add" class="btn-floating blue">
            <i class="material-icons">insert_chart</i>
          </Link>
        </li>
      </ul>
    </div>
  );
}
