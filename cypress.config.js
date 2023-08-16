const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) { },
    baseUrl: 'https://bookstore.toolsqa.com',
    env: {
      hideCredentials: true,
      hideCredentialsOptions: {
        headers: ['user-key'],
      }
    }
  },
  video: false,
})