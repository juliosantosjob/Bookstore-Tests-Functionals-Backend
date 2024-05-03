/// <reference types="cypress" />

import { users } from '../payloads/users.payloads';

describe('Authorization', () => {
    let authUser_;

    beforeEach(() => {
        cy.wrap(users()).then(({ authUser }) => {
            authUser_ = authUser;
        });
    });

    it('Log in successfully', () => {
        cy.loginUser(authUser_).then(({ status, body }) => {
            expect(status).to.equal(200);
        });
    });

    it('Cannot login with empty username', () => {
        authUser_.userName = '';

        cy.loginUser(authUser_).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Cannot login with empty password', () => {
        authUser_.password = '';

        cy.loginUser(authUser_).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Cannot login with empty username and password', () => {
        authUser_.userName = '';
        authUser_.password = '';

        cy.loginUser(authUser_).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Cannot login with invalid username', () => {
        authUser_.userName = 'Invalid_name';

        cy.loginUser(authUser_).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot login with invalid password', () => {
        authUser_.password = 'Invalid_password';

        cy.loginUser(authUser_).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot login with invalid username and password', () => {
        authUser_.userName = 'Invalid_name';
        authUser_.password = 'Invalid_password';

        cy.loginUser(authUser_).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });
});
