import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

export default {
    _authUser: {
        userName: NAME,
        password: PASSWORD
    },
    _dynamicUser: {
        userName: faker.internet.userName().substring(5),
        password: faker.internet.password().substring(7) + 'M@123'
    }
};
