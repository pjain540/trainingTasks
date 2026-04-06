const createSignature = require("./createSignature")
const { base64UrlEncode } = require("./urlEncodeDecode")

function sign(payload, secret,expiresInSeconds) {
    //1.header
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }

    //expiration time
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const fullPayload = {...payload,exp}

    //2.encode
    const encodedHeader = base64UrlEncode(JSON.stringify(header))
    const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload))

    //3.create signature
    const data = `${encodedHeader}.${encodedPayload}`
    const signature = createSignature(data,secret)

    //final token
    return `${data}.${signature}`
}

module.exports = sign