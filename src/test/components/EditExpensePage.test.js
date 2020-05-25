import React from 'react';
import { EditExpensePage } from '../../components/EditExpensePage';
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper, expense;

beforeEach(() => {
    expense = expenses[1];
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            expense={expense}
            editExpense={editExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
        />)
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle onRemove', () => {
    wrapper.find('button').simulate('click')
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id })
    expect(history.push).toHaveBeenLastCalledWith('/')
});