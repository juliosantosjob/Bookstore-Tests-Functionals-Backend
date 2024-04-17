Cypress.Commands.add('getBookList', () => {
    cy.api({
        method: 'GET',
        url: '/BookStore/v1/Books',
        failOnStatusCode: false
    });
});

Cypress.Commands.add('getProfile', (token, userId) => {
    cy.api({
        method: 'GET',
        url: `/Account/v1/User/${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});

Cypress.Commands.add('loginUser', (credentials) => {
    cy.api({
        method: 'POST',
        url: '/Account/v1/GenerateToken',
        headers: { 'Content-Type': 'application/json ' },
        failOnStatusCode: false,
        body: credentials
    });
});

Cypress.Commands.add('createUser', (userData) => {
    cy.api({
        method: 'POST',
        url: '/Account/v1/User',
        headers: { 'Content-Type': 'application/json ' },
        failOnStatusCode: false,
        body: userData
    });
});

Cypress.Commands.add('addBooksFavorites', (token, userId, numberIsbn) => {
    cy.api({
        method: 'POST',
        url: '/BookStore/v1/Books',
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` },
        body: { userId: userId, collectionOfIsbns: [{ isbn: numberIsbn }] }
    });
});

Cypress.Commands.add('removeBooks', (token, userId) => {
    cy.api({
        method: 'DELETE',
        url: `/BookStore/v1/Books?UserId=${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});

Cypress.Commands.add('deleteAccount', (token, userId) => {
    cy.api({
        method: 'DELETE',
        url: `/Account/v1/User/${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});