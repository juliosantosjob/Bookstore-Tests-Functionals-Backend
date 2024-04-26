require('dotenv').config();
const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
const { getBaseUrl } = require('./cypress/support/environments');

module.exports = defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        setupNodeEvents(on, config) {

            config.baseUrl = getBaseUrl(config);
            config.env.NAME = process.env.NAME;
            config.env.PASSWORD = process.env.PASSWORD;
            config.env.USER_ID = process.env.USER_ID;

            allureCypress(on);
            return config;
        }
    }
});