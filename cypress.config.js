require('dotenv').config();
const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
const usersPayloads = require('./cypress/payloads/user.payloads');

module.exports = defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        setupNodeEvents(on, config) {
            on('task', { usersPayloads() { return usersPayloads(config); } });
            
            config.baseUrl = process.env.BASE_URL;
            config.env.NAME = process.env.NAME;
            config.env.PASSWORD = process.env.PASSWORD;
            config.env.USER_ID = process.env.USER_ID;

            allureCypress(on);
            return config;
        }
    }
});