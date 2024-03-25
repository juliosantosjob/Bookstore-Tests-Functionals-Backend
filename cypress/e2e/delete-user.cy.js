import { dynamicUser } from '../payloads/users';
import { StatusCodes } from 'http-status-codes';

describe('Finalize account', () => {
    let userId, token;

    beforeEach(() => {
        cy.createUser(dynamicUser).then(({ body }) => {
            userId = body.userID;
            return cy.loginUser(dynamicUser);
        }).then(({ body }) => {
            token = body.token;
        });
    });

    it('Deletes a user', () => {
        cy.deleteAccount(userId, token).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.NO_CONTENT);
            expect(body).to.be.empty;
        });
    });

    afterEach(() => cy.deleteAccount(userId, token)); // Delete each account created to avoid filling the database.

    it('Deletes a user without authorization', () => {
        token = 'invalid_token';

        cy.deleteAccount(userId, token).then(({ status }) =>
            expect(status).to.equal(StatusCodes.UNAUTHORIZED));
    });

    it('Deletes a user that does not exist', () => {
        userId = 'invalid_userId';

        cy.deleteAccount(userId, token).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.message).to.equal('User Id not correct!');
        });
    });
});