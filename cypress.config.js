const { defineConfig } = require('cypress');

module.exports = defineConfig({
    modifyObstructiveCode: true,
    responseTimeout: 3000,
    fixturesFolder: false,
    reporter: 'cypress-mochawesome-reporter',
    ignoreVideos: true,
    e2e: {
        setupNodeEvents(on, config) {
            
            require('cypress-mochawesome-reporter/plugin')(on);
            return config;
        }
    }
}); 