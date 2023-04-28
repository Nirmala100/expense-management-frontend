import { Link } from "react-router-dom";
import M from "materialize-css";
import { useEffect } from "react";

export function FloatingActionButton() {
  useEffect(() => {
    var elems = document.querySelectorAll(".fixed-action-btn");
    var instances = M.FloatingActionButton.init(elems);
  }, []);

  return (
    <div className="fixed-action-btn">
      <a className="btn-floating btn-large red modal-trigger" href="#new-expense-model">
        <i className="large material-icons">add</i>
      </a>
      <ul>
        {/* <li>
          <Link to="#" className="btn-floating red">
            <i className="material-icons">mode_edit</i>
          </Link>
        </li> */}
        <li>
          <Link to="categories" className="btn-floating green darken-1">
            <i className="material-icons">apps</i>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="btn-floating blue">
            <i className="material-icons">insert_chart</i>
          </Link>
        </li>
      </ul>
    </div>
  );
}
