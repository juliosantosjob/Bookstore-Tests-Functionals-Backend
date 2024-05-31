/**
 * Fetches a list of books from the Bookstore API.
 *
 * @return {Object} The response object from the API call.
 */

Cypress.Commands.add('getBookList', () => {
    cy.request({
        method: 'GET',
        url: '/BookStore/v1/Books',
        failOnStatusCode: false
    });
});

/**
 * Adds a book to the favorites list.
 *
 * @param {string} token - The token of the user.
 * @param {string} userId - The user ID of the user.
 */


Cypress.Commands.add('getProfile', (token, userId) => {
    cy.request({
        method: 'GET',
        url: `/Account/v1/User/${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});

/**
 * Logs in a user and returns the token.
 * 
 * @param {Object} user - The user object with the username and password.
 */

Cypress.Commands.add('loginUser', ({ userName, password }) => {
    cy.request({
        method: 'POST',
        url: '/Account/v1/GenerateToken',
        headers: { 'Content-Type': 'application/json ' },
        failOnStatusCode: false,
        body: {
            userName: userName,
            password: password
        }
    });
});

/**
 * Creates a new user.
 * 
 * @param {Object} user - The user object with the username and password.
 */

Cypress.Commands.add('createUser', ({ userName, password }) => {
    cy.request({
        method: 'POST',
        url: '/Account/v1/User',
        headers: { 'Content-Type': 'application/json ' },
        failOnStatusCode: false,
        body: {
            userName: userName,
            password: password
        }
    });
});

/**
 * Adds a book to the favorites list.
 *
 * @param {string} token - The token of the user.
 * @param {string} userId - The user ID of the user.
 * @param {string} numberIsbn - The ISBN number of the book.
 */

Cypress.Commands.add('addBooksFavorites', (token, userId, numberIsbn) => {
    cy.request({
        method: 'POST',
        url: '/BookStore/v1/Books',
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` },
        body: {
            userId: userId,
            collectionOfIsbns: [{ isbn: numberIsbn }]
        }
    });
});

/**
 * Removes a book from the favorites list.
 *
 * @param {string} token - The token of the user.
 * @param {string} userId - The user ID of the user.
 */

Cypress.Commands.add('removeBooks', (token, userId) => {
    cy.request({
        method: 'DELETE',
        url: `/BookStore/v1/Books?UserId=${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});

/**
 * Deletes a user.
 *
 * @param {string} token - The token of the user.
 * @param {string} userId - The user ID of the user.
 */

Cypress.Commands.add('deleteAccount', (token, userId) => {
    cy.request({
        method: 'DELETE',
        url: `/Account/v1/User/${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});