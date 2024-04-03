export default {
    deleteUserSchema: {
        type: 'object',
        required: ['code', 'message'],
        properties: {
            code: { 'type': 'string' },
            message: { 'type': 'string' }
        }
    }
};