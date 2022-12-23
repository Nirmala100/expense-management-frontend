import React from "react";
import "./EditableTextBox.css";

export class EditableTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      value: props.value,
    };
    this.inputRef = React.createRef(null);
  }

  editTriggerClicked = (event) => {
    event.stopPropagation();
    this.setState((state, props) => ({
        editable: !state.editable
    }));
    this.inputRef.current.focus();
}

  render() {
    return (
      <div className="editable-container">
        <input type="text" className="editable-text" ref={this.inputRef} value={this.state.value} disabled={!this.state.editable}/>
        <div className="editable-button" onClick={this.editTriggerClicked}>
            { this.state.editable ? '✓' : '✎' }
        </div>
      </div>
    );
  }
}
