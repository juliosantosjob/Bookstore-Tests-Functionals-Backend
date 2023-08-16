/// <reference types='cypress' />

import { radomNumber } from '../support/radomValue'

describe('Books', () => {
    let accessToken, numberIsbn
    const numbers = radomNumber()
    const user = Cypress.env('name')
    const passwd = Cypress.env('password')
    const userId = Cypress.env('userId')
    
    it('Access a list of available books', () => {
        cy.getBooks()
            .then((resp) => {
                expect(resp.status).to.equal(200)
                expect(resp.body).to.have.property('books')
                expect(resp.body.books[0].isbn).to.equal('9781449325862')
                expect(resp.body.books[0].title).to.equal('Git Pocket Guide')
                expect(resp.body.books[0].subTitle).to.equal('A Working Introduction')
                expect(resp.body.books[0].author).to.equal('Richard E. Silverman')
            })
    })

    it('Add and Remove a book from the favorites list', () => {
        cy.login({
            userName: user,
            password: passwd
        })
            .then((resp) => {
                accessToken = resp.body.token
                cy.getBooks()
            })
            .then((resp) => {
                numberIsbn = resp.body.books[numbers].isbn
                cy.addBooksFavorites(
                    userId,
                    accessToken,
                    numberIsbn
                )
            })
            .then((resp) => {
                expect(resp.status).to.equal(201)
                expect(resp.body).to.have.property('books')
                expect(resp.body.books[0].isbn).to.equal(numberIsbn)

                cy.removeBooks(userId, accessToken).then(() => {
                    cy.getProfile(userId, accessToken).then((resp) => {
                        expect(resp.status).to.equal(200)
                        expect(resp.body.books).to.be.an('array')
                        expect(resp.body.books).to.have.length(0)
                    })
                })
            })
    })

    it('add non-existent book', () => {
        numberIsbn = 'invalid_isbn'

        cy.login({
            userName: user,
            password: passwd
        })
            .then((resp) => {
                accessToken = resp.body.token
            }).then(() => {
                cy.addBooksFavorites(
                    userId,
                    accessToken,
                    numberIsbn
                )
            }).then((resp) => {
                expect(resp.status).to.equal(400)
                expect(resp.body.code).to.equal('1205')
                expect(resp.body.message).to.equal('ISBN supplied is not available in Books Collection!')
            })
    })
})