import { randomNumber } from '../support/randomData';

describe('Books', () => {
    let token, numberIsbn;
    const randomBooks = randomNumber();
    const name = Cypress.env('NAME');
    const passwd = Cypress.env('PASSWORD');
    const userId = Cypress.env('USER_ID');

    beforeEach(() => {
        cy.loginUser({
            userName: name,
            password: passwd
        }).then(({ body }) => { token = body.token; });
        cy.getBookList().as('getBookList');
    });

    it('Access a list of available books', () => {
        cy.fixture('listBooks').then(async (list) => {
            cy.get('@getBookList').then(async ({ status, body }) => {
                await expect(status).to.equal(200);
                await expect(body.books[randomBooks].isbn).to.equal(list.books[randomBooks].isbn);
                await expect(body.books[randomBooks].title).to.equal(list.books[randomBooks].title);
                await expect(body.books[randomBooks].author).to.equal(list.books[randomBooks].author);
                await expect(body.books[randomBooks].publisher).to.equal(list.books[randomBooks].publisher);
            });
        });
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
            }).then(async ({ status, body }) => {
                await expect(status).to.equal(201);
                await expect(body).to.have.property('books');
                await expect(body.books[0].isbn).to.equal(numberIsbn);

                cy.removeBooks(userId, token).then(() => {
                    cy.getProfile(userId, token).then(async ({ body }) => {
                        await expect(body.books).to.be.an('array');
                        await expect(body.books).to.have.length(0);
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
        ).then(async ({ status, body }) => {
            await expect(status).to.equal(400);
            await expect(body.code).to.equal('1205');
            await expect(body.message).to.equal('ISBN supplied is not available in Books Collection!');
        });
    });
});