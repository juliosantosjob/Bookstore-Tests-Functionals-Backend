import { dynamicData } from '../support/randomData';

describe('Create new account', () => {    
    const { NAME, PASSWORD } = Cypress.env();
    const name = NAME;
    const passwd = PASSWORD;

    let userId;
    let accesstoken;

    it('New registration', () => {
        cy.createUser(dynamicData).then(({ status, body }) => {
            expect(status).to.equal(201);
            expect(body).to.have.property('userID');
            expect(body).to.have.property('books');
            expect(body.books).to.have.length(0);
            expect(body.username).to.equal(dynamicData.userName);
        }).then(({ body }) => {

            /* Call to delete account created to not mess up the bank. */
            userId = body.userID;
            cy.loginUser(dynamicData).then((r) => {
                accesstoken = r.body.token;
                cy.deleteAccount({ userId: userId, token: accesstoken });
            });
        });
    });

    it('Registration with blank username', () => {
        cy.createUser({
            userName: '',
            password: dynamicData.password
        }).then(({ body, status }) => {
            expect(status).to.equal(400);
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Registration with blank username and password', () => {
        cy.createUser({
            userName: '',
            password: dynamicData.password
        }).then(({ body, status }) => {
            expect(status).to.equal(400);
            expect(body.code).to.equal('1200');
            expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Registration with a password that does not contain special characters', () => {
        cy.createUser({
            userName: dynamicData.userName,
            password: 'test123'
        }).then(({ body, status }) => {
            expect(status).to.equal(400);
            expect(body.code).to.equal('1300');
            expect(body.message).to.equal(
                'Passwords must have at least one non alphanumeric character, ' +
                'one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), ' +
                'one lowercase (\'a\'-\'z\'), one special character and ' +
                'Password must be eight characters or longer.'
            );
        });
    });

    it('Create an account with the same data as an existing account', () => {
        cy.createUser({
            userName: name,
            password: passwd
        }).then(({ body, status }) => {
            expect(status).to.equal(406);
            expect(body.code).to.equal('1204');
            expect(body.message).to.equal('User exists!');
        });
    });
});
