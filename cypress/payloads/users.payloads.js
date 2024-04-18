import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

export function users() {
    return {
        authUser: {
            userName: NAME,
            password: PASSWORD
        },
        dynamicUser: {
            userName: faker.internet.userName().substring(5),
            password: faker.internet.password().substring(7) + 'M@123'
        }
    };
};