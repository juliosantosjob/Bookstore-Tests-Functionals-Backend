import { dynamicData } from '../support/randomData';

describe('Delete', () => {
    let userId, accesstoken;

    before(() => {
        cy.createUser(dynamicData).then(({ body }) => { userId = body.userID; });
        cy.loginUser(dynamicData).then(({ body }) => { accesstoken = body.token; });
    });

    it('Delete user', () => {
        cy.deleteAccount({
            userId: userId,
            token: accesstoken
        }).then(async ({ status, body }) => {
            await expect(status).to.equal(204);
            await expect(body).to.be.empty;
        });
    });

    it('Delet non-existent user', () => {
        cy.deleteAccount({
            userId: 'invalid_user_id',
            token: accesstoken
        }).then(async ({ status, body }) => {
            await expect(status).to.equal(200);
            await expect(body.code).to.equal('1207');
            await expect(body.message).to.equal('User Id not correct!');
        });
    });
});