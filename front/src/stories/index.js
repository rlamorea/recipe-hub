import React from 'react';
import '../styles/fonts.css';
import 'react-mdl/extra/css/material.light_blue-indigo.min.css';
import 'react-mdl/extra/material';
import '../styles/toolkit.css';
import '../styles/site.css';
import './storybook-containers.css';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {action} from "@storybook/addon-actions";
// import { linkTo } from '@storybook/addon-links';
// eslint-disable-next-line no-unused-vars
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs';

import { Button, FabButton } from '../components/button';
import { Spinner, WaitOverlayContainer } from '../components/spinner';

class ColorWrapper extends React.Component {
    componentDidUpdate() {
        window.componentHandler.upgradeAllRegistered();
    }
    render() {
        return(
            <span
                className={`color-span ${this.props.colorClass}`}
            >
                {this.props.text || 'Color'}
            </span>
        );
    }
}

storiesOf('Color', module)
    .addDecorator(withInfo)
    .addDecorator(withKnobs)
    .add('Background', () => <ColorWrapper
            colorClass={select('Color', {
                "default": '',
                "Primary": 'mdl-color--primary',
                "Primary Contrast": 'mdl-color--primary-contrast dark',
                "Primary Dark" : 'mdl-color--primary-dark',
                "Accent": 'mdl-color--accent',
                "Accent Contrast" : 'mdl-color--accent-contrast'
            }, 'default')}
            text="Background Color"
        />
    )
    .add('Text', () => <ColorWrapper
            colorClass={`text ${select('Color', {
                "default": '',
                "Primary": 'mdl-color-text--primary',
                "Primary Contrast": 'mdl-color-text--primary-contrast',
                "Primary Dark" : 'mdl-color-text--primary-dark',
                "Accent": 'mdl-color-text--accent',
                "Accent Contrast" : 'mdl-color-text--accent-contrast dark'
            }, 'default')}`}
            text="Text Color"
        />
    );

const buttonStories = storiesOf('Button', module);
buttonStories
    .addDecorator(withInfo)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div className="button-container">{storyFn()}</div>)
    .add('fab', () => <FabButton
            onClick={action('clicked')}
            color={select('Color', [ 'primary', 'accent', 'default' ], 'default')}
            disabled={boolean('Disabled', false)}
            ripple={boolean('Ripple Effect', false)}
            icon={select('Icon', ['(none)','add','clear','create','mail','redo','remove','reply','reply_all','save_alt','send','undo'], 'add')}
        />
    )
    .add('raised', () => <Button
            onClick={action('clicked')}
            color={select('Color', [ 'primary', 'accent', 'default' ], 'default')}
            disabled={boolean('Disabled', false)}
            ripple={boolean('Ripple Effect', false)}
            icon={select('Icon', ['(none)','add','clear','create','mail','redo','remove','reply','reply_all','save_alt','send','undo'], 'add')}
            text={text('Label', 'Button')}
        />
    );

const spinnerStories = storiesOf('Progress', module);
spinnerStories
    .addDecorator(withInfo)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div className="button-container">{storyFn()}</div>)
    .add('spinner', () => <Spinner
            active={boolean('Active', true)}
            singleColor={boolean('Single Color', false)}
        />
    )
    .add('wait-overlay', () => {
        return(
            <WaitOverlayContainer
                waiting={boolean('waiting', false)}
                singleColor={boolean('Single Color', false)}
            >
                <div>
                    <p>Some overlaid content and a</p>
                    <Button className="wait-on-click" color="primary" text="Button" onClick={action('button clicked')}/>
                </div>
            </WaitOverlayContainer>
        );
    });
