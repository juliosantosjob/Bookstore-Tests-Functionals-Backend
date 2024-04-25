require('dotenv').config();
const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
const { getBaseUrl } = require('./cypress/support/environments');

module.exports = defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        setupNodeEvents(on, config) {
            const version = config.env.version;
            const urls = {
                local: process.env.LOCAL,
                staging: process.env.STAGING,
                prod: process.env.PROD
            };

            config.env.setBase = urls[version];

            config.baseUrl = config.env.setBase;
            config.env.NAME = process.env.NAME;
            config.env.PASSWORD = process.env.PASSWORD;
            config.env.USER_ID = process.env.USER_ID;

            allureCypress(on);
            return config;
        }
    }
});