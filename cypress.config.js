const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

require('dotenv').config();

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;
            config.env.NAME = process.env.NAME;
            config.env.PASSWORD = process.env.PASSWORD;
            config.env.USER_ID = process.env.USER_ID,

            allureCypress(on);
            return config;
        },
        video: false,
        screenshotOnRunFailure: false
    }
});