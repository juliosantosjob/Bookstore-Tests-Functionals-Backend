const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        setupNodeEvents(on, config) {          
            on('task', {
                usersPayloads() {
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
            });

            allureCypress(on);
            return config;
        }
    }
});