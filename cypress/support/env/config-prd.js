const { defineConfig } = require('cypress');
const baseConfig = require('../../../cypress.config');

const e2e = {
    baseUrl: 'https://example.com',
    env: {
        NAME: 'username_on_prod',
        PASSWORD: 'password_on_prod',
        USER_ID: 'user_id_on_prod'
    }
};

module.exports = defineConfig({
    ...
    baseConfig, 
    e2e
});