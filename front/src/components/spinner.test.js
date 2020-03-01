// eslint-disable-next-line no-unused-vars
import { WaitOverlayContainer } from '../components/spinner';
import React from 'react';
import { mount } from 'enzyme';

import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test('WaitOverlayContainer is not waiting by default', () => {
    const wrapper = mount( <WaitOverlayContainer><div><p>Some overlaid content</p></div></WaitOverlayContainer> );
    const overlay = wrapper.find('.wait-overlay-container');
    expect(overlay.hasClass('is-waiting')).toBe(false);
});
test('WaitOverlayContainer is waiting by property', () => {
    const wrapper = mount(
        <WaitOverlayContainer waiting={true}><div><p>Some overlaid content</p></div></WaitOverlayContainer>
    );
    const overlay = wrapper.find('.wait-overlay-container');
    expect(overlay.hasClass('is-waiting')).toBe(true);
});

test('WaitOverlayContainer is waiting by setting property', async () => {
    const woc =
        <WaitOverlayContainer>
            <div>
                <p className="wait-on-click">Some overlaid content</p>
            </div>
        </WaitOverlayContainer>;
    const wrapper = mount( woc );
    const clk = wrapper.find('.wait-on-click');
    clk.simulate('click');
    const overlay = wrapper.find('.wait-overlay-container');
    expect(overlay.hasClass('is-waiting')).toBe(true);
});
