Cypress.Commands.add('getProfile', (userId, token) => {
    cy.api({
        method: 'GET',
        url: `/Account/v1/User/${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});

Cypress.Commands.add('createUser', ({ userName, password }) => {
    cy.api({
        method: 'POST',
        url: '/Account/v1/User',
        headers: { 'Content-Type': 'application/json ' },
        failOnStatusCode: false,
        body: { userName: userName, password: password }
    });
});

Cypress.Commands.add('loginUser', ({ userName, password }) => {
    cy.api({
        method: 'POST',
        url: '/Account/v1/GenerateToken',
        headers: { 'Content-Type': 'application/json ' },
        failOnStatusCode: false,
        body: { userName: userName, password: password }
    });
});

Cypress.Commands.add('getBookList', () => {
    cy.api({
        method: 'GET',
        url: '/BookStore/v1/Books',
        failOnStatusCode: false
    });
});

Cypress.Commands.add('addBooksFavorites', (userId, token, numberIsbn) => {
    cy.api({
        method: 'POST',
        url: '/BookStore/v1/Books',
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` },
        body: { userId: userId, collectionOfIsbns: [{ isbn: numberIsbn }] }
    });
});

Cypress.Commands.add('removeBooks', (userId, token) => {
    cy.api({
        method: 'DELETE',
        url: `/BookStore/v1/Books?UserId=${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});

Cypress.Commands.add('deleteAccount', (userId, token ) => {
    cy.api({
        method: 'DELETE',
        url: `https://bookstore.toolsqa.com/Account/v1/User/${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: `Bearer ${token}` }
    });
});