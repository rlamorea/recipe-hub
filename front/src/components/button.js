import React from 'react';
import 'react-mdl/extra/material';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.baseClass = 'mdl-button mdl-button--raised mdl-js-button';
        this.colorMap = { primary: 'mdl-button--colored', accent: 'mdl-button--accent' };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidUpdate() {
        window.componentHandler.upgradeElement(this.root);
    }
    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root);
    }
    handleClick(event) {
        if (!this.props.onClick) return;
        return this.props.onClick(event);
    }
    render() {
        return(
            <button
                ref={node => { this.root = node; }}
                onClick={this.handleClick}
                className={`${this.baseClass} ${this.colorMap[this.props.color] || ''} ${this.props.ripple ? 'mdl-js-ripple-effect' : ''}`}
                disabled={this.props.disabled}
            >
                {this.props.icon && this.props.icon !== '(none)' &&
                    <i className="material-icons">{this.props.icon || ''}</i>
                }
                {this.props.text || ''}
            </button>
        );
    }
}

class FabButton extends Button {
    constructor(props) {
        super(props);
        this.baseClass = this.baseClass + ' mdl-button--fab';
    }
}

export { Button, FabButton };