import { dynamicUser } from '../payloads/users';
import { StatusCodes } from 'http-status-codes';

describe('Finalize account', () => {
    let userId, token;

    before(() => {
        cy.createUser(dynamicUser).then(({ body }) => userId = body.userID);
        cy.loginUser(dynamicUser).then(({ body }) => token = body.token);
    });

    it('Deletes a user', () => {
        cy.deleteAccount({ userId, token }).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.NO_CONTENT);
            expect(body).to.be.empty;
        });
    });

    it('Deletes a user that does not exist', () => {
        userId = 'invalid_userId';

        cy.deleteAccount({ userId, token }).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.message).to.equal('User Id not correct!');
        });
    });
});