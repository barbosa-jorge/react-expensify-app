import { removeExpense, addExpense, editExpense } from '../../actions/expenses'

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
    const expenseData = {
        description: 'Rent',
        amount: 100,
        note: 'Rent',
        createdAt: 1000
    }

    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: 'Rent',
            amount: 100,
            note: 'Rent',
            createdAt: 1000
        }
    })
})


test('Should setup add expense with default values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        }
    })
})