import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            filters={filters}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt filters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
});


test('should handle onDatesChange', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate: moment(0), endDate: moment(0)
    });
    expect(setStartDate).toHaveBeenLastCalledWith(moment(0))
    expect(setEndDate).toHaveBeenLastCalledWith(moment(0))
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find('select').simulate('change', {
        target: { 
            value 
        }
    })
    expect(sortByDate).toHaveBeenCalled()
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { 
            value 
        }
    })
    expect(sortByAmount).toHaveBeenCalled()
});

test('should handle onSetFilterTextChange', () => {
    const value = 'filter value';
    wrapper.find('input').at(0).simulate('change', {
        target: { 
            value 
        }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
});

test('should handle onFocusChange', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
});
