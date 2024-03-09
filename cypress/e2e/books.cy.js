import { randomNumber } from '../support/randomData';
import { userAuth } from '../payloads/login';

describe('Books', () => {
    let token, numberIsbn, userId = Cypress.env('USER_ID');
    const rand = randomNumber();

    beforeEach(() => { cy.getBookList().as('getBookList'); });

    it('Access a list of available books', () => {
        cy.fixture('listBooks').then((list) => {
            cy.get('@getBookList').then(({ status, body }) => {
                expect(status).to.equal(200);
                expect(body.books[rand].isbn).to.equal(list.books[rand].isbn);
                expect(body.books[rand].title).to.equal(list.books[rand].title);
                expect(body.books[rand].author).to.equal(list.books[rand].author);
            });
        });
    });

    context('When authenticated', () => {
        before(() => {
            cy.loginUser(userAuth)
                .its('body.token')
                .then((resp) => { token = resp; });
        });

        it('Add and Remove a book from the favorites list', () => {
            cy.get('@getBookList')
                .its(`body.books[${rand}].isbn`)
                .then((isbn) => {
                    numberIsbn = isbn;

                    cy.addBooksFavorites(
                        userId,
                        token,
                        numberIsbn
                    );
                }).then(({ status, body }) => {
                    expect(status).to.equal(201);
                    expect(body.books[0].isbn).to.equal(numberIsbn);

                    cy.removeBooks(userId, token).then(() => {
                        cy.getProfile(userId, token)
                            .then(({ body }) => { expect(body.books).to.be.empty; });
                    });
                });
        });

        it('Add non-existent book', () => {
            numberIsbn = 'invalid_isbn';

            cy.addBooksFavorites(
                userId,
                token,
                numberIsbn
            ).then(({ status, body }) => {
                expect(status).to.equal(400);
                expect(body.code).to.equal('1205');
                expect(body.message).to.equal('ISBN supplied is not available in Books Collection!');
            });
        });

        it('Added a book to my list without authorization', () => {
            token = 'invalid_token';

            cy.addBooksFavorites(
                userId,
                token,
                numberIsbn
            ).then(({ status, body }) => {
                expect(status).to.equal(401);
                expect(body.code).to.equal('1200');
                expect(body.message).to.equal('User not authorized!');
            });
        });

        it('Added a book to my list with userid not correct', () => {
            userId = 'invalid_userId';

            cy.addBooksFavorites(
                userId,
                token,
                numberIsbn
            ).then(({ status, body }) => {
                expect(status).to.equal(401);
                expect(body.code).to.equal('1207');
                expect(body.message).to.equal('User Id not correct!');
            });
        });
    });
});