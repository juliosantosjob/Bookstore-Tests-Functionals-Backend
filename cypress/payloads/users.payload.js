import { faker } from '@faker-js/faker';
const { NAME, PASSWORD } = Cypress.env();


export default {
    usersPayloads: function() {
        return {
            authUser: {
                userName: NAME,
                password: PASSWORD
            },
            dynamicUser: {
                userName: faker.internet.userName(),
                password: faker.internet.password().substring(7) + 'M@123'
            }
        };
    }
};

