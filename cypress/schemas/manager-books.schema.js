/* eslint-disable camelcase */

export default {
    getBooksSchema: {
        type: 'object',
        required: ['isbn', 'title', 'subTitle', 'author', 'publish_date', 'publisher', 'pages', 'description', 'website'],
        properties: {
            isbn: { type: 'string' },
            title: { type: 'string' },
            subTitle: { type: 'string' },
            author: { type: 'string' },
            publish_date: { type: 'string', format: 'date-time' },
            publisher: { type: 'string' },
            pages: { type: 'integer' },
            description: { type: 'string' },
            website: { type: 'string', format: 'uri' }
        }
    },
    addBooksSchema: {
        type: 'object',
        required: ['books'],
        properties: {
            books: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        isbn: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    invalidAddBooksSchema: {
        type: 'object',
        required: ['code', 'message'],
        properties: {
            code: { type: 'string' },
            message: { type: 'string' }
        }
    }
};