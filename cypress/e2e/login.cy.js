import { userAuth } from '../payloads/login';
import { StatusCodes } from 'http-status-codes';

describe('Authorization', () => {
    const { NAME, PASSWORD } = Cypress.env();
    const name = NAME,
        passwd = PASSWORD;

    it('Log in successfully', () => {
        cy.loginUser(userAuth).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body).to.have.property('token');
            expect(body).to.have.property('expires');
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
        });
    });

    it('Can\'t login with invalid username', () => {
        cy.loginUser({ userName: 'invalid_name', password: passwd })
            .then(({ body }) => {
                expect(body.status).to.equal('Failed');
                expect(body.result).to.equal('User authorization failed.');
            });
    });

    it('Can\'t login with invalid password', () => {
        cy.loginUser({ userName: name, password: 'invalid_password' })
            .then(({ body }) => {
                expect(body.status).to.equal('Failed');
                expect(body.result).to.equal('User authorization failed.');
            });
    });

    it('Cannot log in with invalid username and password ', () => {
        cy.loginUser({ userName: 'invalid_name', password: 'invalid_password' })
            .then(({ body }) => {
                expect(body.status).to.equal('Failed');
                expect(body.result).to.equal('User authorization failed.');
            });
    });
});
