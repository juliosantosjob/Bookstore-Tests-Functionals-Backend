/// <reference types="cypress" />

describe('Finalize account', () => {
    let userId, token;

    beforeEach(() => {
        cy.task('usersPayloads').then(({ dynamicUser }) => {
            cy.createUser(dynamicUser).then(({ body }) => {
                userId = body.userID;
                cy.loginUser(dynamicUser).then(({ body }) => {
                    token = body.token;
                });
            });
        });
    });

    it('Deletes a user', () => {
        cy.deleteAccount(token, userId).then(({ status, body }) => {
            expect(status).to.equal(204);
            expect(body).to.be.empty;
        });
    });

    afterEach(() => {
        cy.deleteAccount(token, userId);
    });

    it('Do not delete a user without authorization', () => {
        token = 'invalid_token';

        cy.deleteAccount(token, userId).then(({ status, body }) => {
            expect(status).to.equal(401);
            expect(body.message).to.equal('User not authorized!');
        });
    });

    it('Does not delete a user that does not exist', () => {
        userId = 'invalid_userId';

        cy.deleteAccount(token, userId).then(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body.message).to.equal('User Id not correct!');
        });
    });
});