import { authUser } from '../payloads/users';
import { StatusCodes } from 'http-status-codes';

describe('Authorization', () => {
    it('Log in successfully', () => {
        cy.loginUser(authUser).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
        });
    });

    it('Can\'t login with invalid username', () => {
        authUser.userName = 'Invalid-name';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Can\'t login with invalid password', () => {
        authUser.password = 'Invalid-password';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot log in with invalid username and password ', () => {
        authUser.userName = 'Invalid-name';
        authUser.password = 'Invalid-password';

        cy.loginUser(authUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });
});
