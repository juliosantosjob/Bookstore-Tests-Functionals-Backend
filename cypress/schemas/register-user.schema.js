export default {
    newRegisterSchema: {
        type: 'object',
        required: ['userID', 'username', 'books'],
        properties: {
            userID: { 'type': 'string' },
            username: { 'type': 'string' },
            books: { 'type': 'array', empty: true }
        }
    }
};