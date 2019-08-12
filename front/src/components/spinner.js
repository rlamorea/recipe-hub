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
        this.root.parentElement

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

const WaitOverlayContainer = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return(
                <div
                    className={`wait-overlay-container ${this.props.waiting ? 'is-waiting' : ''} ${this.props.extraClass || ''}`}
                >
                    <WaitOverlay waiting={this.props.waiting} singleColor={this.props.singleColor}/>
                    <WrappedComponent/>
                </div>
            )
        }
    }
}

export { Spinner, WaitOverlay, WaitOverlayContainer };