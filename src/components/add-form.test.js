import React from 'react';
import {shallow, mount} from 'enzyme';

import AddForm from './add-form';

describe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<AddForm />);
    });

    it('Renders the add button initially', () => {
        const wrapper = shallow(<AddForm />);
        expect(wrapper.hasClass('add-button')).toEqual(true);   //add button is added by checking className
    });

    it('Should render the add form when editing', () => {   //form displays thru boolean value
        const wrapper = shallow(<AddForm />);
        wrapper.instance().setEditing(true);    //make an instance of component AddForm to apply method to
        wrapper.update();                       //since Enzyme won't auto. rerender component
        expect(wrapper.hasClass('add-form')).toEqual(true);
    });

    it('Should switch to editing when the add button is clicked', () => {   //check thru user interaction (click)
        const wrapper = shallow(<AddForm />);       //no update() needed for simulate method
        wrapper.simulate('click');      //simulates DOM events to ensure component responds correctly to user interaction
        expect(wrapper.state('editing')).toEqual(true); //when add button clicked, editing property in state is now true
    });

    it('Should fire the onAdd callback when the form is submitted', () => {
        const callback = jest.fn();
        const wrapper = mount(<AddForm onAdd={callback} />);
        const value = 'Foobar';
        wrapper.instance().setEditing(true);    
        wrapper.update();   //to render form
        wrapper.find('input[type="text"]').instance().value = value;
        wrapper.simulate('submit');
        expect(callback).toHaveBeenCalledWith(value);
    });

    it('Should not fire onAdd if the input is empty', () => {
        const callback = jest.fn();
        const wrapper = mount(<AddForm onAdd={callback} />);
        wrapper.instance().setEditing(true);
        wrapper.simulate('submit');
        expect(callback).not.toHaveBeenCalled();
    });
});
