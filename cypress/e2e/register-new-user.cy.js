/// <reference types="cypress" />

import { users } from '../payloads/users.payloads';

describe('User registration', () => {
    let randUser, validUser;

    beforeEach(() => {
        cy.wrap(users()).then(({ dynamicUser, authUser }) => {
            randUser = dynamicUser;
            validUser = authUser;
        });
    });

    it('Must register a new user successfully', () => {
        cy.createUser(randUser).then(({ status, body }) => {
            expect(status).to.equal(201);
            expect(body.userID).to.not.be.empty;
            expect(body.books).to.have.length(0);
            expect(body.username).to.equal(randUser.userName);

            cy.loginUser(randUser)
                .its('body.token')
                .then((token) =>
                    cy.deleteAccount(token, body.userID));
        });
    });

    it('Do not register a user with a password that does not contain special characters', () => {
        randUser.password = 'invalid_password';

        cy.createUser(randUser).then(({ body, status }) => {
            expect(status).to.equal(400);
            expect(body.message).to.equal(
                'Passwords must have at least one non alphanumeric character, ' +
                'one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), ' +
                'one lowercase (\'a\'-\'z\'), one special character and ' +
                'Password must be eight characters or longer.'
            );
        });
    });

    it('Does not register with a blank username', () => {
        randUser.userName = '';

        cy.createUser(randUser).then(({ body, status }) => {
            expect(status).to.equal(400);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Does not register with a blank password and username', () => {
        randUser.userName = '';
        randUser.password = '';

        cy.createUser(randUser).then(({ body, status }) => {
            expect(status).to.equal(400);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Does not create an account with the same data as an existing account', () => {
        cy.createUser(validUser).then(({ body, status }) => {
            expect(status).to.equal(406);
            expect(body.message).to.equal('User exists!');
        });
    });
});