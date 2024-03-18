import { dynamicUser } from '../payloads/login';
import { StatusCodes } from 'http-status-codes';

describe('Finalize account', () => {
    let userId, accesstoken;

    before(() => {
        cy.createUser(dynamicUser).then(({ body }) => userId = body.userID );
        cy.loginUser(dynamicUser).then(({ body }) => accesstoken = body.token);
    });

    it('Deletes a user', () => {
        cy.deleteAccount({
            userId: userId,
            token: accesstoken
        }).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.NO_CONTENT);
            expect(body).to.be.empty;
        });
    });

    it('Deletes a user that does not exist', () => {
        cy.deleteAccount({
            userId: 'invalid_user_id',
            token: accesstoken
        }).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.message).to.equal('User Id not correct!');
        });
    });
});