import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

function authUser() {
    return {
        userName: NAME,
        password: PASSWORD
    };
};

function dynamicUser() {
    return {
        userName: faker.internet.userName(),
        password: faker.internet.password().substring(7) + 'M@123'
    };
};

module.exports = {
    authUser,
    dynamicUser
};