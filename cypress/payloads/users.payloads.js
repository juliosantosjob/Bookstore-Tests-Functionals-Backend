import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

module.exports = {
    authUser: {
        userName: NAME,
        password: PASSWORD
    },
    dynamicUser: {
        userName: faker.internet.userName(),
        password: faker.internet.password() + 'Pw@321'
    }
};