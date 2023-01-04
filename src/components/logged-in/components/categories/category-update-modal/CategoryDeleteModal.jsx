import React from "react";
import M from "materialize-css";
// import './CategoryEditModal.css';
import CategoryApi from "../../../../../client-code/categories";

export default class CategoryDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.modalElement = React.createRef();
    this.api = new CategoryApi();
    this.category = props.value;
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    this.modal = M.Modal.init(this.modalElement.current, {
      onCloseEnd: this.modalClosed,
      preventScrolling: false,
    });
    this.state.isOpen ? this.modal.open() : this.modal.close();
  }

  modalClosed = () => {
    this.setState({
      isOpen: false,
    });
    this.modal.destroy();
    this.props.onModalClosed && this.props.onModalClosed();
  }

  deleteConfirmed = () => {
    console.log("Delete ", this.category);
    this.api.deleteCategory(this.category).then(res => this.modalClosed());
  }

  render() {
    return (
      <div id="deleteCategoryModal" class="modal" ref={this.modalElement}>
        <div class="modal-content">
          Are you sure you want to delete category: <b>{this.category.name}</b> ?
        </div>
        <div class="modal-footer">
          <button class="waves-effect waves-red btn-flat" onClick={this.deleteConfirmed}>Yes</button>
          <button class="waves-effect waves-green btn-flat" onClick={this.modalClosed}>No</button>
        </div>
      </div>
    );
  }
}