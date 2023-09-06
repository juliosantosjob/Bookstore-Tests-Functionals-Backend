import { dynamicData } from '../support/randomData';

describe('Create new account', () => {
    let userId, accesstoken;
    const name = Cypress.env('NAME');
    const passwd = Cypress.env('PASSWORD');

    it('New registration', () => {
        cy.createUser(dynamicData).then(async ({ status, body }) => {
            await expect(status).to.equal(201);
            await expect(body).to.have.property('userID');
            await expect(body).to.have.property('books');
            await expect(body.books).to.have.length(0);
            await expect(body.username).to.equal(dynamicData.userName);
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
        }).then(async ({ body, status }) => {
            await expect(status).to.equal(400);
            await expect(body.code).to.equal('1200');
            await expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Registration with blank username and password', () => {
        cy.createUser({
            userName: '',
            password: dynamicData.password
        }).then(async ({ body, status }) => {
            await expect(status).to.equal(400);
            await expect(body.code).to.equal('1200');
            await expect(body.message).to.equal('UserName and Password required.');
        });
    });

    it('Registration with a password that does not contain special characters', () => {
        cy.createUser({
            userName: dynamicData.userName,
            password: 'test123'
        }).then(async ({ body, status }) => {
            await expect(status).to.equal(400);
            await expect(body.code).to.equal('1300');
            await expect(body.message).to.equal(
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
        }).then(async ({ body, status }) => {
            await expect(status).to.equal(406);
            await expect(body.code).to.equal('1204');
            await expect(body.message).to.equal('User exists!');
        });
    });
});