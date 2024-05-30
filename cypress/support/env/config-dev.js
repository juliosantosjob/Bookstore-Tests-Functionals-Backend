const { defineConfig } = require('cypress');
const baseConfig = require('../../../cypress.config');

const e2e = {
    baseUrl: 'http://localhost:3000',
    env: {
        NAME: 'username_on_dev',
        PASSWORD: 'password_on_dev',
        USER_ID: 'user_id_on_dev'
    }
};

module.exports = defineConfig({
    ...
    baseConfig, 
    e2e 
});