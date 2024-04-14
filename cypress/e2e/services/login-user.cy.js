/// <reference types="cypress" />

describe('Authorization', () => {
    it('Log in successfully', () => {
        cy.task('usersPayloads').then(({ authUser }) => {
            cy.loginUser(authUser).then(({ status, body }) => {
                expect(status).to.equal(200);
                expect(body.status).to.equal('Success');
                expect(body.result).to.equal('User authorized successfully.');
            });
        });
    });

    it('Cannot login with invalid username', () => {
        cy.task('usersPayloads').then(({ authUser }) => {
            authUser.userName = 'Invalid_name';

            cy.loginUser(authUser).then(({ body }) => {
                expect(body.status).to.equal('Failed');
                expect(body.result).to.equal('User authorization failed.');
            });
        });
    });

    it('Cannot login with invalid password', () => {
        cy.task('usersPayloads').then(({ authUser }) => {
            authUser.password = 'Invalid_password';

            cy.loginUser(authUser).then(({ body }) => {
                expect(body.status).to.equal('Failed');
                expect(body.result).to.equal('User authorization failed.');
            });
        });
    });

    it('Cannot login with invalid username and password', () => {
        cy.task('usersPayloads').then(({ authUser }) => {
            authUser.userName = 'Invalid_name';
            authUser.password = 'Invalid_password';

            cy.loginUser(authUser).then(({ body }) => {
                expect(body.status).to.equal('Failed');
                expect(body.result).to.equal('User authorization failed.');
            });
        });
    });

    it('Cannot login with empty username', () => {
        cy.task('usersPayloads').then(({ authUser }) => {
            authUser.userName = '';

            cy.loginUser(authUser).then(({ body }) => {
                expect(body.code).to.equal('1200');
                expect(body.message).to.equal('UserName and Password required.');
            }); 
        });
    });

    it('Cannot login with empty password', () => {
        cy.task('usersPayloads').then(({ authUser }) => {
            authUser.password = '';

            cy.loginUser(authUser).then(({ body }) => {
                expect(body.code).to.equal('1200');
                expect(body.message).to.equal('UserName and Password required.');
            });
        });
    });

    it('Cannot login with empty username and password', () => {
        cy.task('usersPayloads').then(({ authUser }) => {
            authUser.userName = '';
            authUser.password = '';
    
            cy.loginUser(authUser).then(({ body }) => {
                expect(body.code).to.equal('1200');
                expect(body.message).to.equal('UserName and Password required.');
            });
        });
    });
});