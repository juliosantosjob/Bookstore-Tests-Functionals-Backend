import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

export function users() {
    return {
        authUser: {
            userName: NAME,
            password: PASSWORD
        },
        dynamicUser: {
            userName: faker.internet.userName(),
            password: faker.internet.password() + 'Pw@321'
        }
    };
};