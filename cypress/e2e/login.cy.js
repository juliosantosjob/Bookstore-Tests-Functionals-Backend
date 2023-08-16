/// <reference types='cypress' />

describe('Login', () => {
    const usrName = Cypress.env('name')
    const passwd = Cypress.env('password')

    it('login successfully', () => {
        cy.login({
            userName: usrName,
            password: passwd
        })
            .then((resp) => {
                expect(resp.status).to.equal(200)
                expect(resp.body).to.have.property('token')
                expect(resp.body).to.have.property('expires')
                expect(resp.body.status).to.equal('Success')
                expect(resp.body.result).to.equal('User authorized successfully.')
            })
    })

    it('Login with invalid username', () => {
        cy.login({
            userName: 'invalid_name',
            password: passwd
        })
            .then((resp) => {
                expect(resp.body.status).to.equal('Failed')
                expect(resp.body.result).to.equal('User authorization failed.')
            })
    })

    it('Login with invalid password', () => {
        cy.login({
            userName: usrName,
            password: 'invalid_password'
        })
            .then((resp) => {
                expect(resp.body.status).to.equal('Failed')
                expect(resp.body.result).to.equal('User authorization failed.')
            })
    })

    it('Login with invalid username and password ', () => {
        cy.login({
            userName: 'invalid_name',
            password: 'invalid_password'
        })
            .then((resp) => {
                expect(resp.body.status).to.equal('Failed')
                expect(resp.body.result).to.equal('User authorization failed.')
            })
    })
})