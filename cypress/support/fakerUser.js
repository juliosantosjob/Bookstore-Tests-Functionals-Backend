import { faker } from '@faker-js/faker';

export const dynamicData = {
    userName: faker.internet.userName(),
    password: faker.internet.password() + 'M@123',
}