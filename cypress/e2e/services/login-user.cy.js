/// <reference types="cypress" />

import { _authUser } from '../../payloads/users.payloads';

describe('Authorization', () => {
    let authUser;
    
    beforeEach(() => authUser = Object.assign({}, _authUser));
    
    it('Log in successfully', () => {
        cy.loginUser(authUser).then(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
        });
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
    
    it('Cannot login with empty username', () => {
        authUser.userName = '';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
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
});
