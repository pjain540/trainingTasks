const { base64UrlEncode } = require("./base64Url")
const signHMAC = require("./hmac-sha256")

function signJWT(payload, secret, options = {}) {
    //1.header
    const header = {
        alg: "HS256",
        typ: "JWT"
    }

    //add exp if provided
    if(options.expiresIn){
        payload.exp = Math.floor(Date.now()/1000) + options.expiresIn
    }

    const encodedHeader = base64UrlEncode(JSON.stringify(header))
    const encodedPayload = base64UrlEncode(JSON.stringify(payload))

    const data = `${encodedHeader}.${encodedPayload}`
    const signature = signHMAC(data,secret)

    return `${data}.${signature}`

}

module.exports = signJWT