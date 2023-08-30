const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;
            config.env.NAME = process.env.NAME;
            config.env.PASSWORD = process.env.PASSWORD;
            config.env.USER_ID = process.env.USER_ID,
    
            require('cypress-mochawesome-reporter/plugin')(on);
            return config;
        },
        responseTimeout: 4000,
        reporter: 'cypress-mochawesome-reporter',
        video: false,
        screenshotOnRunFailure: false
    }
});