import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    const wapper = shallow(<Header startLogout={() => { }} />);
    expect(wapper).toMatchSnapshot();
});

test('should call startLogout on click button', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />)
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});