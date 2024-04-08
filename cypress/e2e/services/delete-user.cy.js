import { dynamicUser } from '../../payloads/users.payload';
import { StatusCodes } from 'http-status-codes';
import { deleteUserSchema } from '../../schemas/delete-user.schema';
chai.use(require('chai-json-schema'));

describe('Finalize account', () => {
    let userId, token;

    beforeEach(() => {
        cy.createUser(dynamicUser).then(({ body }) => {
            userId = body.userID;
            cy.loginUser(dynamicUser).then(({ body }) =>  
                token = body.token);
        });
    });

    it('Deletes a user', () => {
        cy.deleteAccount(userId, token).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.NO_CONTENT);
            expect(body).to.be.empty;
        });
    });

    afterEach(() => { 
        cy.deleteAccount(userId, token);
    });

    it.only('Do not delete a user without authorization', () => {
        token = 'invalid_token';

        cy.deleteAccount(userId, token).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.UNAUTHORIZED);
            expect(body.message).to.equal('User not authorized!');
            expect(body).to.be.jsonSchema(deleteUserSchema);
        });
    });

    it('Does not delete a user that does not exist', () => {
        userId = 'invalid_userId';

        cy.deleteAccount('invalid_userId', token).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.message).to.equal('User Id not correct!');
            expect(body).to.be.jsonSchema(deleteUserSchema);
        });
    });
});
