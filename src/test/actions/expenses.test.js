import {
    removeExpense, addExpense, editExpense, startAddExpense,
    setExpenses, startSetExpenses, startRemoveExpense, startEditExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, amount, createdAt, note }) => {
        expensesData[id] = { description, amount, createdAt, note }
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

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

test('should setup setExpenses action with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('shoudl fetch the expenses from firebase', (done) => {
    const store = createMockStore();
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expense from firebase', (done) => {
    const id = expenses[1].id;

    const store = createMockStore();
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`expenses/${id}`).once('value');

    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done();
    });
});

test('should edit expense from firebase', (done) => {

    const store = createMockStore({});

    const id = expenses[0].id;
    const updates = {
        description: 'updated description',
        amount: 1300,
        createdAt: 2000,
        note: 'updated note'
    }

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })

        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(updates);
        done();
    });
});