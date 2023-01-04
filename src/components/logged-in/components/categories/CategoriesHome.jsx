import React, { Component } from "react";
import CategoryApi from "../../../../client-code/categories";
import EachCategory from "./each-category/EachCategory";
import './CategoriesHome.css';
import CategoryEditModal from "./category-update-modal/CategoryEditModal";
import NewCategory from "./each-category/NewCategory";
import CategoryDeleteModal from "./category-update-modal/CategoryDeleteModal";

export default class CategoriesHome extends Component {
  constructor(props) {
    super(props);
    this.api = new CategoryApi();
    this.state = {
      categories: [],
      categoryOnEdit: undefined,
      categoryOnDelete: undefined,
    };
  }

  componentDidMount() {
    this.fetchCategoryData();
  }

  fetchCategoryData = () => {
    console.log("Fetching categories")
    this.api.getCategories().then((data) => {
      this.setState({
        categories: data,
      });
    });
  }

  editClicked = (category) => {
    this.setState({
      categoryOnEdit: category
    });
  }

  deleteClicked = (category) => {
    console.log("Delete clicked", category);
    this.setState({
      categoryOnDelete: category
    });
  }

  newCategoryClicked = () => {
    const emptyNewCategory = {
      name: "",
      icon: ""
    };
    this.setState({
      categoryOnEdit: emptyNewCategory,
    });
  }

  editModalClosed = () => {
    this.setState({
      categoryOnEdit: undefined
    }, this.fetchCategoryData);
  }

  deleteModalClosed = () => {
    this.setState({
      categoryOnDelete: undefined
    }, this.fetchCategoryData);
  }

  render() {
    const categoryUpdateModal = this.state.categoryOnEdit ? (
      <CategoryEditModal value={this.state.categoryOnEdit} onModalClosed={this.editModalClosed} />
    ) : null;
    const categoryDeleteModal = this.state.categoryOnDelete ? (
      <CategoryDeleteModal value={this.state.categoryOnDelete} onModalClosed={this.deleteModalClosed} />
    ) : null;

    return (
      <div className="container">
        <div>Categories:</div>
        <ul className="collection category-list">
          {this.state.categories.map((category) =>
            <EachCategory key={category.id} category={category} onEditClicked={this.editClicked} onDeleteClicked={this.deleteClicked} />
          )}
          <NewCategory onNewClicked={this.newCategoryClicked} />
        </ul>
        { categoryUpdateModal }
        { categoryDeleteModal }
      </div>
    );
  }
}
