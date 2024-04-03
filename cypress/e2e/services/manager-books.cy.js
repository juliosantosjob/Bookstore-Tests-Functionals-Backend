import { rand } from '../../support/dynamics';
import { authUser } from '../../payloads/users.payload';
import { StatusCodes } from 'http-status-codes';
chai.use(require('chai-json-schema'));

describe('Manage books', () => {
    let token,
        numberIsbn,
        userId = Cypress.env('USER_ID');

    beforeEach(() => cy.getBookList().as('getBookList'));

    it('Check information of a book', () => {
        cy.fixture('listBooks').then((list) => {
            cy.get('@getBookList').then(({ status, body }) => {
                expect(status).to.equal(StatusCodes.OK);
                expect(body.books[rand].isbn).to.equal(list.books[rand].isbn);
                expect(body.books[rand].title).to.equal(list.books[rand].title);
            });
        });
    });

    context('When authenticated', () => {
        before(() =>
            cy.loginUser(authUser)
                .its('body.token')
                .then(resp => token = resp));

        it('Add and remove a book from the favorites list', () => {
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
                    expect(status).to.equal(StatusCodes.CREATED);
                    expect(body.books[0].isbn).to.equal(numberIsbn);

                    cy.removeBooks(userId, token).then(() => {
                        cy.getProfile(userId, token)
                            .then(({
                                body
                            }) => expect(body.books).to.be.empty);
                    });
                });
        });

        it('Don\'t add a book that doesn\'t exist', () => {
            numberIsbn = 'invalid_isbn';

            cy.addBooksFavorites(
                userId,
                token,
                numberIsbn
            ).then(({ status, body }) => {
                expect(status).to.equal(StatusCodes.BAD_REQUEST);
                expect(body.message).to.equal('ISBN supplied is not available in Books Collection!');
            });
        });

        it('Do not add a book to the favorites list without authorization', () => {
            token = 'invalid_token';

            cy.addBooksFavorites(
                userId,
                token,
                numberIsbn
            ).then(({ status, body }) => {
                expect(status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(body.message).to.equal('User not authorized!');
            });
        });

        it('Didn\'t add a book to the favorites list with an incorrect user ID.', () => {
            userId = 'invalid_userId';

            cy.addBooksFavorites(
                userId,
                token,
                numberIsbn
            ).then(({ status, body }) => {
                expect(status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(body.message).to.equal('User Id not correct!');
            });
        });
    });
});
