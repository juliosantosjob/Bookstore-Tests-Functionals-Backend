describe('Login', () => {
    const { NAME, PASSWORD } = Cypress.env();
    const name = NAME;
    const passwd = PASSWORD;

    it('Login successfully', () => {
        cy.loginUser({ userName: name, password: passwd }).then(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body).to.have.property('token');
            expect(body).to.have.property('expires');
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
        });
    });

    it('Login with invalid username', () => {
        cy.loginUser({ userName: 'invalid_name', password: passwd }).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Login with invalid password', () => {
        cy.loginUser({ userName: name, password: 'invalid_password' }).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Login with invalid username and password ', () => {
        cy.loginUser({ userName: 'invalid_name', password: 'invalid_password' }).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });
});
