const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        setupNodeEvents(on, config) {
            config.baseUrl = config.env.BASE_URL;

            allureCypress(on);
            return config;
        }
    }
});