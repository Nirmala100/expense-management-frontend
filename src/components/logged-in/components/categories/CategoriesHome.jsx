import React, { Component } from "react";
import CategoryApi from "../../../../client-code/categories";
import { EditableTextBox } from "../../../editable-textbox/EditableTextBox";

export default class CategoriesHome extends Component {
  constructor(props) {
    super(props);
    this.api = new CategoryApi();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.api.getCategories().then((data) => {
      this.setState({
        categories: data,
      });
      console.log("Data", data);
    });
  }

  handleCategoryEdit(category) {
    console.log("Editing category", category);
  }

  render() {
    return (
      <div>
        <div>Akash Shrestha</div>
        <ul class="collection">
        {this.state.categories.map((category) => 
          <li className="collection-item" key={category.id}>
            <EditableTextBox value={category.name} onEdit={this.handleCategoryEdit}>{category.name}</EditableTextBox>
          </li>
        )}
        </ul>
      </div>
    );
  }
}
