import { authUser } from '../payloads/users';
import { StatusCodes } from 'http-status-codes';

describe('Authorization', () => {
    let authorizedUser;

    beforeEach(() => authorizedUser = authUser());

    it('Log in successfully', () => {
        cy.login(authorizedUser).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.OK);
            expect(body.status).to.equal('Success');
            expect(body.result).to.equal('User authorized successfully.');
        });
    });

    it('Can\'t login with invalid username', () => {
        authorizedUser.userName = 'Invalid-name';

        cy.login(authorizedUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Can\'t login with invalid password', () => {
        authorizedUser.password = 'Invalid-password';

        cy.login(authorizedUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });

    it('Cannot log in with invalid username and password ', () => {
        authorizedUser.userName = 'Invalid-name';
        authorizedUser.password = 'Invalid-password';

        cy.login(authorizedUser).then(({ body }) => {
            expect(body.status).to.equal('Failed');
            expect(body.result).to.equal('User authorization failed.');
        });
    });
});
