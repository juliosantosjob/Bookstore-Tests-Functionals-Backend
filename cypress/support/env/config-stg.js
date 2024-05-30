const { defineConfig } = require('cypress');
const baseConfig = require('../../../cypress.config');

const e2e = {
    baseUrl: 'https://bookstore.toolsqa.com',
    env: {
        NAME: 'Leonard.Marquardt',
        PASSWORD: 'Mudar@123',
        USER_ID: '14b6a296-31bd-4aef-9478-ca9f02ebc1a4'
    },
};

module.exports = defineConfig({ 
    ...
    baseConfig, 
    e2e,
});