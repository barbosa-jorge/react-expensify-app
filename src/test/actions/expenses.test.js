import { removeExpense, addExpense, editExpense, startAddExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup removeExpense action', () => {
    const action = removeExpense({ id: '123' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    })
})

test('should setup editExpense action', () => {
    const action = editExpense('123', { description: 'Another description', amount: 10 })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            description: 'Another description',
            amount: 10
        }

    })
})

test('Should setup add expense with provided values', () => {

    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database with provided values', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 1000,
        note: 'Bought a new mouse',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }   
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense to database with default values', (done) => {
    const store = createMockStore({});
    const expenseDefaultValues = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaultValues
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaultValues);
        done();
    });
});