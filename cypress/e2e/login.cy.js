describe('Login', () => {
    const name = Cypress.env('NAME');
    const passwd = Cypress.env('PASSWORD');

    it('login successfully', () => {
        cy.loginUser({ userName: name, password: passwd }).then(async ({ status, body }) => {
            await expect(status).to.equal(200);
            await expect(body).to.have.property('token');
            await expect(body).to.have.property('expires');
            await expect(body.status).to.equal('Success');
            await expect(body.result).to.equal('User authorized successfully.');
        });
    });

    it('Login with invalid username', () => {
        cy.loginUser({ userName: 'invalid_name', password: passwd }).then(async ({ body }) => {
            await expect(body.status).to.equal('Failed');
            await expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Login with invalid password', () => {
        cy.loginUser({ userName: name, password: 'invalid_password' }).then(async ({ body }) => {
            await expect(body.status).to.equal('Failed');
            await expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Login with invalid username and password ', () => {
        cy.loginUser({ userName: 'invalid_name', password: 'invalid_password' }).then(async ({ body }) => {
            await expect(body.status).to.equal('Failed');
            await expect(body.result).to.equal('User authorization failed.');
        });
    });
});