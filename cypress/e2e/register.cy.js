/// <reference types='cypress' />

import { dynamicData } from '../support/fakerUser'

describe('Create new account', () => {

  it('New registration successfully', () => {
    cy.createUser(dynamicData)
      .then((resp) => {
        expect(resp.status).to.equal(201)
        expect(resp.body).to.have.property('userID')
        expect(resp.body).to.have.property('books')
        expect(resp.body.username).to.equal(dynamicData.userName)
      })
  })

  it('Registration with blank username', () => {
    cy.createUser({
      userName: '',
      password: dynamicData.password
    })
      .then((resp) => {
        expect(resp.status).to.equal(400)
        expect(resp.body.code).to.equal('1200')
        expect(resp.body.message).to.equal('UserName and Password required.')
      })
  })

  it('Registration with blank username and password', () => {
    cy.createUser({
      userName: '',
      password: dynamicData.password
    })
      .then((resp) => {
        expect(resp.status).to.equal(400)
        expect(resp.body.code).to.equal('1200')
        expect(resp.body.message).to.equal('UserName and Password required.')
      })
  })

  it('Registration with a password that does not contain special characters', () => {
    cy.createUser({
      userName: dynamicData.userName,
      password: 'test123'
    })
      .then((resp) => {
        expect(resp.status).to.equal(400)
        expect(resp.body.code).to.equal('1300')
        expect(resp.body.message).to.equal(
          `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one ` +
          `uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must ` +
          `be eight characters or longer.`
        )
      })
  })

  it('Registration an account with the same data as an existing account', () => {
    cy.createUser(dynamicData)
      .then((resp) => {
        expect(resp.status).to.equal(406)
        expect(resp.body.code).to.equal('1204')
        expect(resp.body.message).to.equal('User exists!')
      })
  })
})