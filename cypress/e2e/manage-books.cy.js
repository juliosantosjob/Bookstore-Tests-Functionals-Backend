/// <reference types="cypress" />

import { books } from '../fixtures/listBooks.json';
import { dynamicUser } from '../payloads/users.payloads';

const rand = Math.floor(Math.random() * books.length);

describe('Manage books', () => {
    let token, isbn_, userId = Cypress.env('USER_ID');

    it('Check information of a book', () => {
        cy.fixture('listBooks').then((list) => {
            cy.getBookList().then(({ status, body }) => {
                expect(status).to.equal(200);
                expect(body.books[rand].isbn).to.equal(list.books[rand].isbn);
                expect(body.books[rand].title).to.equal(list.books[rand].title);
                expect(body.books[rand].subTitle).to.equal(list.books[rand].subTitle);
            });
        });
    });

    before(() => {
        cy.createUser(dynamicUser).then(({ body }) => {
            userId = body.userID;
            cy.loginUser(dynamicUser).then(({ body }) => {
                token = body.token;
            });
        });
    });

    it('Add and remove a book from the favorites list', () => {
        cy.getBookList()
            .its(`body.books[${rand}].isbn`)
            .then((isbn) => {
                isbn_ = isbn;

                cy.addBooksFavorites(
                    token,
                    userId,
                    isbn_
                ).then(({ status, body }) => {
                    expect(status).to.equal(201);
                    expect(body.books[0].isbn).to.equal(isbn_);

                    cy.removeBooks(token, userId).then(() => {
                        cy.getProfile(token, userId).then(({ body }) => {
                            expect(body.books).to.be.empty;
                        });
                    });
                });
            });
    });

    it('Don\'t add a book that doesn\'t exist', () => {
        isbn_ = 'invalid_isbn';

        cy.addBooksFavorites(token, userId, isbn_).then(({ status, body }) => {
            expect(status).to.equal(400);
            expect(body.message).to.equal('ISBN supplied is not available in Books Collection!');
        });
    });

    it('Do not add a book to the favorites list without authorization', () => {
        token = 'invalid_token';

        cy.addBooksFavorites(token, userId, isbn_).then(({ status, body }) => {
            expect(status).to.equal(401);
            expect(body.message).to.equal('User not authorized!');
        });
    });

    it('Didn\'t add a book to the favorites list with an incorrect user ID.', () => {
        userId = 'invalid_user_id';

        cy.addBooksFavorites(token, userId, isbn_).then(({ status, body }) => {
            expect(status).to.equal(401);
            expect(body.message).to.equal('User Id not correct!');
        });
    });
});