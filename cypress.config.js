const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {

            require('cypress-mochawesome-reporter/plugin')(on);
            return config;
        },
        baseUrl: 'https://demoqa.com/',
        responseTimeout: 3000,
        reporter: 'cypress-mochawesome-reporter',
        video: false,
        screenshotOnRunFailure: false
    }
}); 