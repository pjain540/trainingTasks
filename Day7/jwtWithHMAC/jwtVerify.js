function verifyJWT(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  const data = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = signHMAC(data, secret);

  // Prevent timing attacks
  if (!safeCompare(signature, expectedSignature)) {
    throw new Error("Invalid signature");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  // Expiration check
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return payload;
}