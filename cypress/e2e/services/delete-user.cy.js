import { dynamicUser } from '../../payloads/users.payload';
import { StatusCodes } from 'http-status-codes';
import { deleteUserSchema } from '../../schemas/delete-user.schema';
chai.use(require('chai-json-schema'));

describe('Finalize account', () => {
    let userId, token;

    beforeEach(() => {
        cy.createUser(dynamicUser).then(({ body }) => { 
            userId = body.userID;
            cy.loginUser(dynamicUser).then(({ body }) => { 
                token = body.token; 
            });
        });
    });

    it('Deletes a user', () => {
        cy.deleteAccount(token, userId).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.NO_CONTENT);
            expect(body).to.be.empty;
        });
    });

    afterEach(() => { 
        cy.deleteAccount(token, userId);
    });

    it('Do not delete a user without authorization', () => {
        token = 'invalid_token';

        cy.deleteAccount(token, userId).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.UNAUTHORIZED);
            expect(body.message).to.equal('User not authorized!');
        });
    });

    it('Does not delete a user that does not exist', () => {
        userId = 'invalid_userId';

        cy.deleteAccount(token, userId).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.message).to.equal('User Id not correct!');
        });
    });

    it('Ensure the contract for calls to delete user with invalid arguments', () => {
        token = 'invalid_token';
        userId = 'invalid_userId';

        cy.deleteAccount(token, userId).then(({ body }) => 
            expect(body).to.be.jsonSchema(deleteUserSchema));
    });
});