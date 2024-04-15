import { faker } from '@faker-js/faker';

export function usersPayloads(config) {
    return {
        authUser: {
            userName: config.env.NAME,
            password: config.env.PASSWORD
        },
        dynamicUser: {
            userName: faker.internet.userName().substring(5),
            password: faker.internet.password().substring(7) + 'M@123'
        }
    };
}