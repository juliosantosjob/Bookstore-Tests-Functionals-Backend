import { dynamicUser, authUser } from '../../payloads/users.payload';
import { StatusCodes } from 'http-status-codes';
import {
    newRegisterSchema,
    invalidRegisterSchema
} from '../../schemas/register-user.schema';
chai.use(require('chai-json-schema'));

describe('User registration', () => {
    it('Must register a new user', () => {
        cy.createUser(dynamicUser).then(({ status, body }) => {
            const userId = body.userID;

            expect(status).to.equal(StatusCodes.CREATED);
            expect(body.userID).to.not.be.empty;
            expect(body.books).to.have.length(0);
            expect(body.username).to.equal(dynamicUser.userName);
            expect(body).to.be.jsonSchema(newRegisterSchema);

            /**
             * Deletes the account created at the end of the 
             * process to avoid filling the database.
             */

            cy.loginUser(dynamicUser)
                .its('body.token')
                .then((token) => cy.deleteAccount(userId, token));
        });
    });

    it('Do not register a user with a password that does not contain special characters', () => {
        dynamicUser.password = 'invalid_password';
        const invalidChars =
            'Passwords must have at least one non alphanumeric character, ' +
            'one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), ' +
            'one lowercase (\'a\'-\'z\'), one special character and ' +
            'Password must be eight characters or longer.';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal(invalidChars);
            expect(body).to.be.jsonSchema(invalidRegisterSchema);
        });
    });

    it('Does not register with a blank username', () => {
        dynamicUser.userName = '';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
            expect(body).to.be.jsonSchema(invalidRegisterSchema);
        });
    });

    it('Does not register with a blank password and username', () => {
        dynamicUser.userName = '';
        dynamicUser.password = '';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
            expect(body).to.be.jsonSchema(invalidRegisterSchema);
        });
    });

    it('Does not create an account with the same data as an existing account', () => {
        cy.createUser(authUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.NOT_ACCEPTABLE);
            expect(body.message).to.equal('User exists!');
            expect(body).to.be.jsonSchema(invalidRegisterSchema);
        });
    });
});
