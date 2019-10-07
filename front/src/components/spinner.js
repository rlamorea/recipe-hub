import React from 'react';
import ReactDOM from 'react-dom';
import 'react-mdl/extra/material';

class Spinner extends React.Component {
    componentDidUpdate() {
        window.componentHandler.upgradeElement(this.root);
    }
    componentDidMount() {
        window.componentHandler.upgradeElement(this.root);
    }
    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root);
    }
    render() {
        // NOTE: something wonky with is-upgraded on the spinner, so inserting manually to hide the "Loading..." message
        return(
            <div
                ref={node => { this.root = node; }}
                className={`mdl-spinner mdl-js-spinner ${this.props.active ? 'is-active is-upgraded' : ''} ${this.props.singleColor ? 'mdl-spinner--single-color' : ''} ${this.props.extraClass || ''}`}
            />
        );
    }
}

class WaitOverlay extends React.Component {
    componentDidUpdate() {
        window.componentHandler.upgradeElement(this.root);
    }
    componentDidMount() {
        window.componentHandler.upgradeElement(this.root);

        this.setState({
            containerId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id")
        });
    }
    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root);
    }
    render() {
        return(
            <div
                ref={node => { this.root = node }}
                className={`wait-overlay ${this.props.waiting ? 'is-waiting' : ''}`}
            >
                <Spinner active={this.props.waiting} singleColor={this.props.singleColor} extraClass="wait-overlay-spinner"/>
            </div>
        )
    }
}

class WaitOverlayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { waiting: (props.waiting === true) };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        if (event.target.className.indexOf('wait-on-click') >= 0) {
            this.setState({ waiting: true });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.waiting != this.state.waiting) {
            this.setState({ waiting: nextProps.waiting });
        }
    }
    render() {
        return(
            <div
                className={`wait-overlay-container ${this.state.waiting ? 'is-waiting' : ''} ${this.props.extraClass || ''}`}
                onClick={this.handleClick}
            >
                <WaitOverlay waiting={this.state.waiting} singleColor={this.props.singleColor}/>
                {this.props.children}
            </div>
        )
    }
}

export { Spinner, WaitOverlay, WaitOverlayContainer };