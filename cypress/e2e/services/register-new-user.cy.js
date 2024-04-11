import { usersPayloads } from '../../payloads/users.payload';
import { StatusCodes } from 'http-status-codes';
import {
    newRegisterSchema,
    invalidRegisterSchema
} from '../../schemas/register-user.schema';
chai.use(require('chai-json-schema'));

describe('User registration', function () {
    let authUser, dynamicUser;

    beforeEach(() => {
        authUser = usersPayloads().authUser;
        dynamicUser = usersPayloads().dynamicUser;

        cy.createUser(dynamicUser)
            .as('createUser')
            .then(({ body }) => this.userId = body.userID);
    });

    it('Must register a new user successfully', () => {
        cy.get('@createUser').then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.CREATED);
            expect(body.userID).to.not.be.empty;
            expect(body.books).to.have.length(0);
            expect(body.username).to.equal(dynamicUser.userName);
        });

        cy.loginUser(dynamicUser)
            .its('body.token')
            .then((token) => cy.deleteAccount(token, this.userId));
    });

    it('Ensure the contract for successful account registration', () => {
        cy.get('@createUser').then(({ body }) => {
            expect(body).to.be.jsonSchema(newRegisterSchema);

            cy.loginUser(dynamicUser)
                .its('body.token')
                .then((token) => cy.deleteAccount(token, this.userId));
        });
    });

    it('Do not register a user with a password that does not contain special characters', () => {
        dynamicUser.password = 'invalid_password';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal(
                'Passwords must have at least one non alphanumeric character, ' +
                'one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), ' +
                'one lowercase (\'a\'-\'z\'), one special character and ' +
                'Password must be eight characters or longer.'
            );
        });
    });

    it('Does not register with a blank username', () => {
        dynamicUser.userName = '';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Does not register with a blank password and username', () => {
        dynamicUser.userName = '';
        dynamicUser.password = '';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Does not create an account with the same data as an existing account', () => {
        cy.createUser(authUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.NOT_ACCEPTABLE);
            expect(body.message).to.equal('User exists!');
        });
    });

    it('Ensure the contract for registration errors with invalid arguments', () => {
        dynamicUser.userName = '';
        dynamicUser.password = '';

        cy.createUser(dynamicUser).then(({ body }) =>
            expect(body).to.be.jsonSchema(invalidRegisterSchema));
    });
});