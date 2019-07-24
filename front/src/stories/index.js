import React from 'react';
import '../styles/fonts.css';
import 'react-mdl/extra/css/material.light_blue-indigo.min.css';
import 'react-mdl/extra/material';
import '../styles/toolkit.css';
import './storybook-containers.css';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {action} from "@storybook/addon-actions";
// import { linkTo } from '@storybook/addon-links';


const colorStories = storiesOf('Color', module)
    .addDecorator(withInfo);

[   { cl: 'Default Background', useCl: ' ', notes: 'no class needed' },
    'mdl-color--primary', { cl: 'mdl-color--primary-contrast', ex: 'dark' }, 'mdl-color--primary-dark',
    'mdl-color--accent', 'mdl-color--accent-contrast',
    { cl: 'Default Text', useCl: ' ', notes: 'no class needed' },
    'mdl-color-text--primary', 'mdl-color-text--primary-contrast', 'mdl-color-text--primary-dark',
    'mdl-color-text--accent', { cl: 'mdl-color-text--accent-contrast', ex: 'dark' }
].forEach((colorClass) => {
    if (typeof colorClass === 'string') { colorClass = { cl: colorClass }; }
    const notes = (colorClass.notes || '');
    const extraClass = (colorClass.ex || '') + (colorClass.cl.indexOf('text') >= 0 ? ' text' : '');
    const fullClass = ('color-span ' + (extraClass)+ ' ' + (colorClass.useCl || colorClass.cl)).trim().replace(/ +/, ' ');
    colorStories.add(colorClass.cl, () => <span className={fullClass}>{colorClass.cl}</span>, { info: { text: notes } });
});

storiesOf('Button', module)
    .add('add fab', () => <button
        onClick={action('clicked')}
        className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
    >
        <i className="material-icons">add</i>
    </button>);
