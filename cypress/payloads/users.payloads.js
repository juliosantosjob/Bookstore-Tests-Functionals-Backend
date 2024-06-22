import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();

export default {
    
    authUser: function () {
        return {
            userName: NAME,
            password: PASSWORD
        };
    },
    
    dynamicUser: function () {
        return {
            userName: faker.internet.userName(),
            password: faker.internet.password() + 'Pw@321'
        };
    }
};