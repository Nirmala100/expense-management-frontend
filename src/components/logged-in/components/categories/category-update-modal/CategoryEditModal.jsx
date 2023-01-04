import React from "react";
import ChooseIcon from "../../choose-icon/ChooseIcon";
import M from "materialize-css";
import './CategoryEditModal.css';
import CategoryApi from "../../../../../client-code/categories";

export default class CategoryUpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.modalElement = React.createRef();
    this.api = new CategoryApi();
    const category = props.value;
    this.categoryId = category.id;
    this.state = {
      isOpen: true,
      categoryName: category.name,
      categoryIcon: category.icon
    };
    this.icons = [
      "shopping_cart",
      "queue_music",
      "card_travel",
      "all_inclusive",
      "assistant_photo",
      "audiotrack",
      "beach_access",
      "build",
      "cake",
      "camera",
      "camera_alt",
      "card_membership",
      "child_friendly",
      "class",
      "cloud",
      "contacts",
      "favorite",
      "filter",
      "filter_1",
      "filter_2",
      "filter_3",
      "filter_4",
      "filter_5",
      "filter_6",
      "filter_7",
      "filter_8",
      "filter_9",
      "fitness_center",
      "golf_course",
      "flight",
      "flash_on",
      "format_paint",
      "hotel",
      "laptop",
      "layers",
      "live_tv",
      "local_cafe",
      "local_florist",
      "local_gas_station",
      "local_parking",
      "local_hospital",
      "local_taxi",
      "local_shipping",
      "directions_car",
      "directions_subway",
      "motorcycle",
      "spa",
    ];
  }

  componentDidMount() {
    this.modal = M.Modal.init(this.modalElement.current, {
      onCloseEnd: this.modalClosed,
      preventScrolling: false,
    });
    this.state.isOpen ? this.modal.open() : this.modal.close();
  }

  modalClosed = () => {
    console.log("Propagating modal closed");
    this.setState({
      isOpen: false,
    });
    this.modal.destroy();
    this.props.onModalClosed && this.props.onModalClosed();
  }

  componentDidUpdate() {
    console.log("COmponent did updated", this.state.isOpen);
    this.state.isOpen ? this.modal.open() : this.modal.close();
  }

  categoryNameChanged = (e) => {
    this.setState((state, props) => ({
      categoryName: this.toTitleCase(e.target.value),
    }));
  }

  categoryIconChanged = (iconValue) => {
    console.log("Category icon change", iconValue);
    this.setState((state, props) => ({
      categoryIcon: iconValue,
    }));
  }

  categorySaveButtonClicked = (e) => {
    e.preventDefault();
    console.log("Need to save", this.state);
    var apiResponse = undefined;
    if (this.categoryId) {
      apiResponse = this.api.updateCategory({
        id: this.categoryId,
        name: this.state.categoryName,
        icon: this.state.categoryIcon
      });
    } else {
      apiResponse = this.api.createCategory({
        name: this.state.categoryName,
        icon: this.state.categoryIcon
      });
    }
    apiResponse.then((resp) => {
      console.log("Category update saved", resp);
      this.modalClosed();
    })
  }

  /**
   * Convert input string to Title case. First char capital for each word.
   */
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  render() {
    return (
      <div id="editCategoryModal" class="modal" ref={this.modalElement}>
        <div class="modal-content model-container">
          <ChooseIcon icons={this.icons} value={this.state.categoryIcon} onChange={this.categoryIconChanged} />
          <input placeholder="Name" type="text" value={this.state.categoryName} onChange={this.categoryNameChanged}></input>
          <p></p>
        </div>
        <div class="modal-footer">
          <button class="waves-effect waves-green btn-flat" onClick={this.categorySaveButtonClicked}>Save</button>
        </div>
      </div>
    );
  }
}