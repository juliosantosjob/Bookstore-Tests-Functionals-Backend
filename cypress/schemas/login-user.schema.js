export default {
    loginUserSchema: {
        type: 'object',
        required: ['token', 'expires', 'status', 'result'],
        properties: {
            token: { 'type': 'string' },
            expires: { 'type': 'string'},
            status: { 'type': 'string'},
            result: { 'type': 'string' }
        }
    },
    invalidLoginSchema: {
        type: 'object',
        required: ['token', 'expires', 'status', 'result'],
        properties: {
            token: { 'type': 'null' },
            expires: { 'type': 'null' },
            status: { 'type': 'string' },
            result: { 'type': 'string' }
        }
    },
    emptyLoginSchema: {
        type: 'object',
        required: ['code', 'message'],
        properties: {
            code: { 'type': 'string' },
            message: { 'type': 'string' }
        }
    }
};