import { randomNumber } from '../support/randomData';

describe('Books', () => {
    let token, numberIsbn;
    const randomBooks = randomNumber();
    const name = Cypress.env('NAME');
    const passwd = Cypress.env('PASSWORD');
    const userId = Cypress.env('USER_ID');

    it('Access a list of available books', () => {
        cy.fixture('listBooks').then((list) => {
            cy.get('@getBookList').then(({ status, body }) => {
                expect(status).to.equal(200);
                expect(body.books[randomBooks].isbn).to.equal(list.books[randomBooks].isbn);
                expect(body.books[randomBooks].title).to.equal(list.books[randomBooks].title);
                expect(body.books[randomBooks].author).to.equal(list.books[randomBooks].author);
                expect(body.books[randomBooks].publisher).to.equal(list.books[randomBooks].publisher);
            });
        });
    });

    beforeEach(() => {
        cy.loginUser({ 
            userName: name,
            password: passwd 
        }).its('body.token').then((resp) => { token = resp; });
        cy.getBookList().as('getBookList');
    });

    it('Add and Remove a book from the favorites list', () => {
        cy.get('@getBookList').its(`body.books[${5}].isbn`)
            .then((isbn) => {
                numberIsbn = isbn;
                cy.addBooksFavorites(
                    userId,
                    token,
                    numberIsbn
                );
            }).then(({ status, body }) => {
                expect(status).to.equal(201);
                expect(body).to.have.property('books');
                expect(body.books[0].isbn).to.equal(numberIsbn);

                cy.removeBooks(userId, token).then(() => {
                    cy.getProfile(userId, token).then(({ body }) => {
                        expect(body.books).to.be.an('array');
                        expect(body.books).to.have.length(0);
                    });
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
});