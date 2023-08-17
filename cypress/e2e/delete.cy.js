/// <reference types='cypress' />

import { dynamicData } from '../support/randomData'

describe('Delete', () => {
    let userId, accesstoken

    beforeEach(() => {
        cy.createUser(dynamicData).then((r) => { userId = r.body.userID })
        cy.loginUser(dynamicData).then((r) => { accesstoken = r.body.token })
    })

    afterEach(() => { cy.deleteAccount({ userId: userId, token: accesstoken }) })

    it('Delete user', () => {
        cy.deleteAccount({
            userId: userId,
            token: accesstoken
        }).then((resp) => {
            expect(resp.body).to.be.empty
            expect(resp.status).to.equal(204)
        })
    })

    it('Delet non-existent user', () => {
        cy.deleteAccount({
            userId: 'invalid_user_id',
            token: accesstoken
        })
            .then((resp) => {
                expect(resp.status).to.equal(200)
                expect(resp.body.code).to.equal('1207')
                expect(resp.body.message).to.equal('User Id not correct!')
            })
    })
})