import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0)
});

test('should correctly add up a single expense', () => {
    const total = getExpensesTotal([expenses[1]]);
    expect(total).toBe(20)
});

test('should correctly add up multiple expense', () => {
    const total = getExpensesTotal(expenses);
    expect(total).toBe(130)
});

