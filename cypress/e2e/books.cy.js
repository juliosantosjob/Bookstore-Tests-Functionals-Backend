import { randomNumber } from '../support/randomData';

describe('Books', () => {
    const { USER_ID, NAME, PASSWORD } = Cypress.env();

    let token;
    let numberIsbn;
    let userId = USER_ID;
    
    const randomBooks = randomNumber();
    const name = NAME;
    const passwd = PASSWORD;

    beforeEach(() => {
        cy.getBookList().as('getBookList');
    });

    it('Access a list of available books', () => {
        cy.fixture('listBooks').then((list) => {
            cy.get('@getBookList').then(({ status, body }) => {
                expect(status).to.equal(200);
                expect(body.books[randomBooks].isbn).to.equal(list.books[randomBooks].isbn);
                expect(body.books[randomBooks].title).to.equal(list.books[randomBooks].title);
                expect(body.books[randomBooks].author).to.equal(list.books[randomBooks].author);
            });
        });
    });

    context('When authenticated', () => {
        before(() => {
            cy.loginUser({ userName: name, password: passwd })
                .then(({ body }) => { token = body.token; });
        });

        it('Add and Remove a book from the favorites list', () => {
            cy.get('@getBookList').its(`body.books[${randomBooks}].isbn`)
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