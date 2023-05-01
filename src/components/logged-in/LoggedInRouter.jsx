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
import SingleCategoryExpenses from "./components/dashboard/SingleCategoryExpenses";
import ProfileSettingsHome from "./components/profile-settings/ProfileSettingsHome";

export function LoggedInRouter() {
  useEffect(() => {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
  }, []);

  return (
    <>
      <HeaderBar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="categories" element={<CategoriesHome />} />
          <Route path="categories/add" element={<CategoryAdd />} />
          <Route path="expenses" element={<SingleCategoryExpenses />} />
          <Route path="profile" element={<ProfileSettingsHome />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
      <FloatingActionButton />
      <NewExpenseModal />
    </>
  );
}
