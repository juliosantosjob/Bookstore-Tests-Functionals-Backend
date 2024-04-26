const { HOST, LOCAL, STAGING, PROD } = process.env;

function getBaseUrl() {
    const version = HOST || 'staging';
    const urls = {
        local: LOCAL,
        staging: STAGING,
        prod: PROD
    };
    return urls[version];
}

module.exports = { getBaseUrl };