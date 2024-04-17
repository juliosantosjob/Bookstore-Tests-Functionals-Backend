import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

export default {
    authUser_: {
        userName: NAME,
        password: PASSWORD
    },
    dynamicUser_: {
        userName: faker.internet.userName().substring(5),
        password: faker.internet.password().substring(7) + 'M@123'
    }
};
