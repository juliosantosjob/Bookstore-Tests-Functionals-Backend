const { HOST, STAGING, DEV } = process.env;

function getBaseUrl() {
    const version = HOST || 'staging';
    const urls = {
        dev: DEV,
        staging: STAGING
    };
    return urls[version];
}

module.exports = { getBaseUrl };