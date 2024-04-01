import { dynamicUser, authUser } from '../payloads/users';
import { StatusCodes } from 'http-status-codes';

describe('User registration', () => {
    let userId, token;

    it('Deve registrar um novo usuário', () => {
        cy.createUser(dynamicUser).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.CREATED);
            expect(body.userID).to.not.be.empty;
            expect(body.books).to.have.length(0);
            expect(body.username).to.equal(dynamicUser.userName);
            userId = body.userID;
    
            cy.loginUser(dynamicUser)
                .its('body.token')
                .then((response) => {
                    token = response; // Call to delete the created account so as not to mess up the database.
                    cy.deleteAccount({ userId, token }); 
                });
        });
    });

    it('Do not register a user with a password that does not contain special characters', () => {   
        dynamicUser.password = 'invalid_password';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal(
                'Passwords must have at least one non alphanumeric character, ' +
                'one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), ' +
                'one lowercase (\'a\'-\'z\'), one special character and ' +
                'Password must be eight characters or longer.'
            );
        });
    });

    it('Does not register with a blank username', () => {
        dynamicUser.userName = '';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Does not register with a blank password and username', () => {
        dynamicUser.userName = '';
        dynamicUser.password = '';

        cy.createUser(dynamicUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Does not create an account with the same data as an existing account', () => {
        cy.createUser(authUser).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.NOT_ACCEPTABLE);
            expect(body.message).to.equal('User exists!');
        });
    });
});
