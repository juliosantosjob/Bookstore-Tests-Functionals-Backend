import { dynamicData } from '../payloads/login';
import { StatusCodes } from 'http-status-codes';

describe('User registration', () => {
    let userId, accesstoken;
    const { NAME, PASSWORD } = Cypress.env();
    
    const name = NAME,
        passwd = PASSWORD;

    it('Must register a new user', () => {
        cy.createUser(dynamicData).then(({ status, body }) => {
            expect(status).to.equal(StatusCodes.CREATED);
            expect(body).to.have.property('userID');
            expect(body.books).to.have.length(0);
            expect(body.username).to.equal(dynamicData.userName);
        }).then(({ body }) => {

            /* Call to delete account created to not mess up the bank. */
            userId = body.userID;
            cy.loginUser(dynamicData)
                .its('body.token')
                .then((resp) => {
                    accesstoken = resp;
                    cy.deleteAccount({ userId: userId, token: accesstoken });
                });
        });
    });

    it('Does not register with a blank username', () => {
        cy.createUser({
            userName: '',
            password: dynamicData.password
        }).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Does not register with a blank password and username', () => {
        cy.createUser({
            userName: '',
            password: dynamicData.password
        }).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Do not register a user with a password that does not contain special characters', () => {
        cy.createUser({
            userName: dynamicData.userName,
            password: 'test123'
        }).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.BAD_REQUEST);
            expect(body.message).to.equal(
                'Passwords must have at least one non alphanumeric character, ' +
                'one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), ' +
                'one lowercase (\'a\'-\'z\'), one special character and ' +
                'Password must be eight characters or longer.'
            );
        });
    });

    it('Does not create an account with the same data as an existing account', () => {
        cy.createUser({
            userName: name,
            password: passwd
        }).then(({ body, status }) => {
            expect(status).to.equal(StatusCodes.NOT_ACCEPTABLE);
            expect(body.message).to.equal('User exists!');
        });
    });
});
