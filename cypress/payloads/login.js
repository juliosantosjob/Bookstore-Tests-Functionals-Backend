import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

module.exports = {
    userAuth: {
        userName: NAME,
        password: PASSWORD
    },
    dynamicData: {
        userName: faker.internet.userName().substring(5),
        password: faker.internet.password().substring(7) + 'M@123',
    }
};
