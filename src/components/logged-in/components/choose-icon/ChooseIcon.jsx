import React from "react";
import './ChooseIcon.css';

export default class ChooseIcon extends React.Component {
    constructor(props) {
        super(props);
        this.icons = props.icons ?? [];
        this.evalateIconIdx();
    }

    evalateIconIdx() {
        var propIdx = this.props.value ? this.icons.findIndex(ele => ele === this.props.value) : undefined;
        if (propIdx == -1) {
            // found new value that isn't available in icons.
            this.icons.unshift(this.props.value);
            propIdx = this.icons.findIndex(ele => ele === this.props.value);
        }
        this.state = {
            currentIdx: propIdx,
        };
    }

    onNavigateUp = () => {
        this.changeIcon(-1);
    }

    onNavigateDown = () => {
        this.changeIcon(1);
    }

    changeIcon = (delta) => {
        const n = this.icons.length;
        this.setState((state, props) => {
            const idx = state.currentIdx ?? -1;
            return {
                currentIdx: (n + (idx + delta) % n) % n
            }
        }, () => {
            this.props.onChange && this.props.onChange(this.getChoosenIcon());
        });
    }

    getChoosenIcon() {
        return this.state.currentIdx !== undefined ? this.icons[this.state.currentIdx] : undefined;
    }

    render() {
        return (
            <div className="icon-container">
                <i className="material-icons icon-navigate" onClick={this.onNavigateUp}>expand_less</i>
                <div className="icon-show">
                    <i className="material-icons">{this.props.value}</i>
                </div>
                <i className="material-icons icon-navigate" onClick={this.onNavigateDown}>expand_more</i>
            </div>
        );
    }
}