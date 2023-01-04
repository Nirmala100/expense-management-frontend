import { Routes, Route, Link } from "react-router-dom";
import M from "materialize-css";
import { HeaderBar } from "./components/general/HeaderBar";
import Dashboard from "./components/dashboard/Dashboard";
import CategoryAdd from "./components/categories/CategoryAdd";
import About from "../About";
import { FloatingActionButton } from "./components/general/FloatingActionButton";
import CategoriesHome from "./components/categories/CategoriesHome";
import { NewExpenseModal } from "./components/general/NewExpenseModal";
import { useEffect } from "react";

export function LoggedInRouter() {
  useEffect(() => {
    var modals = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(modals);
   // console.log("Model initialized");
  }, []);

  return (
    <>
      <HeaderBar />
      <div class="content-wrapper">
        {/* <div class="container"> */}
          <div class="row">
            {/* <div class="col s12 m8 l9"> */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="categories" element={<CategoriesHome />} />
                <Route path="categories/add" element={<CategoryAdd />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
              </Routes>
            {/* </div> */}
          </div>
        {/* </div> */}
      </div>
      <FloatingActionButton />
      <NewExpenseModal />
    </>
  );
}
