function getBaseUrl(config) {
    const version = config.env.version || 'staging';
    const urls = {
        local: process.env.LOCAL,
        staging: process.env.STAGING,
        prod: process.env.PROD
    };

    if (!urls[version]) {
        throw new Error(`Invalid version: ${version}`);
    }

    return urls[version];
}

module.exports = { getBaseUrl };