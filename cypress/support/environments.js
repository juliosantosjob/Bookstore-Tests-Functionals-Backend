function getBaseUrl(config) {
    const version = config.env.version || 'local';
    const urls = {
        local: process.env.LOCAL,
        staging: process.env.STAGING,
        prod: process.env.PROD
    };

    if (!urls.hasOwnProperty(version)) {
        throw new Error(`Invalid version: ${version}`);
    }

    return urls[version];
}

module.exports = { getBaseUrl };