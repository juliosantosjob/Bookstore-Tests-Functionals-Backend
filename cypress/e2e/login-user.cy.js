/// <reference types="cypress" />

import { authUser } from '../payloads/users.payloads';

describe('Authorization', () => {
    let user = authUser();
    
    it('Log in successfully', () => {
        cy.loginUser(user).then(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
        });
    });

    it('Cannot login with invalid username', () => {
        user.userName = 'Invalid_name';

        cy.loginUser(user).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot login with invalid password', () => {
        user.password = 'Invalid_password';
        
        cy.loginUser(user).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot login with invalid username and password', () => {
        user.userName = 'Invalid_name';
        user.password = 'Invalid_password';

        cy.loginUser(user).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot login with empty username', () => {
        user.userName = '';

        cy.loginUser(user).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Cannot login with empty password', () => {
        user.password = '';

        cy.loginUser(user).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Cannot login with empty username and password', () => {
        user.userName = '';
        user.password = '';

        cy.loginUser(user).then(({ body }) => {
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });
});