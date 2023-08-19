import { faker } from '@faker-js/faker';

export const dynamicData = {
    userName: faker.internet.userName().substring(5),
    password: faker.internet.password().substring(7) + 'M@123',
};

export function radomNumber() {
    const number = [1, 2, 3, 4, 5, 6, 7];
    const random = Math.floor(Math.random() * number.length);

    return number[random];
};