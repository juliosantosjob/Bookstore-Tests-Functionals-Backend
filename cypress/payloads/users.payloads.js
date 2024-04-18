import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

export let authUser = () => ({
    userName: NAME,
    password: PASSWORD
});

export let dynamicUser = () => ({
    userName: faker.internet.userName().substring(5),
    password: faker.internet.password().substring(7) + 'M@123'
});