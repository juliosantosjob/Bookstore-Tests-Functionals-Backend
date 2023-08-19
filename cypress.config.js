const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;
            require('cypress-mochawesome-reporter/plugin')(on);
            return config;
        },
        responseTimeout: 3000,
        reporter: 'cypress-mochawesome-reporter',
        video: false,
        screenshotOnRunFailure: false
    }
});