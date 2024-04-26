const {
    HOST,
    LOCAL,
    STAGING,
    PROD
} = process.env;

function getBaseUrl() {
    const version = HOST;
    const urls = {
        local: LOCAL,
        staging: STAGING,
        prod: PROD
    };

    if (!urls[version]) {
        throw new Error(`Invalid version: ${version}`);
    }
    return urls[version];
}

module.exports = { getBaseUrl };