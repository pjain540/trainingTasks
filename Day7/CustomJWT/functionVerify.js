const createSignature = require("./createSignature")
const { base64UrlDecode } = require("./urlEncodeDecode")

function verify(token, secret) {
    const [encodedHeader, encodedPayload, signature] = token.split(".")
    const data = `${encodedHeader}.${encodedPayload}`
    const expectedSignature = createSignature(data, secret)
    if (signature !== expectedSignature) {
        throw new Error("Invalid signature")
    }
    const decoded = JSON.parse(base64UrlDecode(encodedPayload));

    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        throw new Error("Token expired");
    }

    return decoded;
}
module.exports = verify