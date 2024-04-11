import { usersPayloads } from '../../payloads/users.payload';
import { StatusCodes } from 'http-status-codes';
import {
    loginUserSchema,
    invalidLoginSchema,
    emptyLoginSchema
} from '../../schemas/login-user.schema';
chai.use(require('chai-json-schema'));

describe('Authorization', () => {
    let authUser;

    beforeEach(() => {
        authUser = usersPayloads().authUser;
    });

    it('Log in successfully', () => {
        cy.loginUser(authUser).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
        });
    });

    it('Ensures successful login contract', () => {
        cy.loginUser(authUser).then(({ body }) =>
            expect(body).to.be.jsonSchema(loginUserSchema));
    });

    it('Cannot login with invalid username', () => {
        authUser.userName = 'Invalid_name';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot login with invalid password', () => {
        authUser.password = 'Invalid_password';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot login with invalid username and password', () => {
        authUser.userName = 'Invalid_name';
        authUser.password = 'Invalid_password';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Ensure the contract for login errors with invalid arguments', () => {
        authUser.userName = 'Invalid_name';
        authUser.password = 'Invalid_password';

        cy.loginUser(authUser).then(({ body }) =>
            expect(body).to.be.jsonSchema(invalidLoginSchema));
    });

    it('Cannot login with empty username', () => {
        authUser.userName = '';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Cannot login with empty password', () => {
        authUser.password = '';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Cannot login with empty username and password', () => {
        authUser.userName = '';
        authUser.password = '';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Ensure the contract for login errors with empty arguments', () => {
        authUser.userName = '';
        authUser.password = '';

        cy.loginUser(authUser).then(({ body }) =>
            expect(body).to.be.jsonSchema(emptyLoginSchema));
    });
});