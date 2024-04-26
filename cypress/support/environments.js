function getBaseUrl() {
    const version = process.env.HOST;
    const urls = {
        local: process.env.LOCAL,
        staging: process.env.STAGING,
        prod: process.env.PROD
    };
    return urls[version];
}

module.exports = { getBaseUrl };