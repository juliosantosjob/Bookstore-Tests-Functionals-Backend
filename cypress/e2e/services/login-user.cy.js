import { authUser } from '../../payloads/users.payload';
import { StatusCodes } from 'http-status-codes';
import {
    loginUserSchema,
    invalidLoginSchema,
    emptyLoginSchema
} from '../../schemas/login-user.schema';
chai.use(require('chai-json-schema'));

describe('Authorization', () => {
    it('Log in successfully', () => {
        cy.loginUser(authUser).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
            expect(body).to.be.jsonSchema(loginUserSchema);
        });
    });

    it('Cannot login with invalid username', () => {
        authUser.userName = 'Invalid-name';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.result).to.equal('User authorization failed.');
            expect(body).to.be.jsonSchema(invalidLoginSchema);
        });
    });

    it('Cannot login with invalid password', () => {
        authUser.password = 'Invalid-password';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.result).to.equal('User authorization failed.');
            expect(body).to.be.jsonSchema(invalidLoginSchema);
        });
    });

    it('Cannot login with invalid username and password', () => {
        authUser.userName = 'Invalid-name';
        authUser.password = 'Invalid-password';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.result).to.equal('User authorization failed.');
            expect(body).to.be.jsonSchema(invalidLoginSchema);
        });
    });

    it('Cannot login with empty username', () => {
        authUser.userName = '';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.message).to.equal('UserName and Password required.');
            expect(body).to.be.jsonSchema(emptyLoginSchema);
        });
    });

    it('Cannot login with empty password', () => {
        authUser.password = '';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.message).to.equal('UserName and Password required.');
            expect(body).to.be.jsonSchema(emptyLoginSchema);
        });
    });

    it('Cannot login with empty username and password', () => {
        authUser.userName = '';
        authUser.password = '';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.message).to.equal('UserName and Password required.');
            expect(body).to.be.jsonSchema(emptyLoginSchema);
        });
    });
});