const crypto = require('crypto')

function signHMAC(data, secret) {
    return crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
}

module.exports = signHMAC