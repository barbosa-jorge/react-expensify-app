import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render summary expenses with no expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />)
    expect(wrapper).toMatchSnapshot()
})

test('should correctly render summary expenses with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={1000} />)
    expect(wrapper).toMatchSnapshot()
})

test('should correctly render summary expenses with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={10} expensesTotal={23226} />)
    expect(wrapper).toMatchSnapshot()
})