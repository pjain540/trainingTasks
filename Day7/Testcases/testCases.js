const signJWT = require("../jwtWithHMAC/jwtSign");

//1.Valid Token Should Pass
it("should validate a valid token", () => {
    const token = signJWT({ userId: 1 }, secret, { expiresIn: 60 })
    const result = verifyJWT(token, secret);
    expect(result.userId).toBe(1)
});

//2. Invalid Signature Should Fail
it("should fail if signature is invalid", () => {
    const token = signJWT({ userId: 1 }, "wrong-secret")
    expect(() => {
        verifyJWT(token, "correct-secret")
    }).toThrow("invalid signature");

});

//3.Tampered Payload Should Fail
it("should fail if payload is tampered", () => {
    const token = signJWT({ userId: 1 }, secret);
    const parts = token.split(".");
    const fakePayload = base64UrlEncode(JSON.stringify({ userId: 999 }));

    const tamperedToken = `${parts[0]}.${fakePayload}.${parts[2]}`;

    expect(() => verifyJWT(tamperedToken, secret))
        .toThrow("Invalid signature");
});

//4.Expired Token Should Fail
it("should fail if token is expired", () => {
    const token = signJWT({ userId: 1 }, secret, { expiresIn: -10 })
    expect(() => verifyJWT(token, secret)).toThrow("Token expired")
});

//5.Missing Token Parts Should Fail
it("should fail for malformed token", () => {
    const token = "invalid.token";

    expect(() => verifyJWT(token, secret))
        .toThrow("Invalid token format");
});

//6.Refresh Token Success Flow
it("should generate new tokens with valid refresh token", () => {
    const { refreshtoken } = login(1)
    const newTokens = refresh(refreshtoken)
    expect(newTokens.accessToken).toBeDefined();
    expect(newTokens.refreshToken).toBeDefined();
})

//7.Expired Refresh Token Should Fail
it("should fail if refresh token is expired", () => {
  const token = generateRefreshToken();

  refreshDB.set(token, {
    userId: 1,
    expiresAt: Date.now() - 1000,
  });

  expect(() => refresh(token))
    .toThrow("Refresh token expired");
});

//8.Invalid Refresh Token Should Fail
it("should fail for invalid refresh token", () => {
  expect(() => refresh("fake-token"))
    .toThrow("Invalid refresh token");
});

//9.Refresh Token Rotation
it("should invalidate old refresh token after rotation", () => {
  const { refreshToken } = login(1);

  const { refreshToken: newRT } = refresh(refreshToken);

  expect(() => refresh(refreshToken))
    .toThrow("Invalid refresh token");

  expect(newRT).toBeDefined();
});

//10.Access Token Expired → Refresh Works
it("should issue new access token after expiry using refresh token", () => {
  const { accessToken, refreshToken } = login(1);

  // simulate expired access token
  const expiredToken = signAccessToken({ userId: 1 }, -10);

  expect(() => verifyAccessToken(expiredToken))
    .toThrow("Access token expired");

  const newTokens = refresh(refreshToken);

  expect(newTokens.accessToken).toBeDefined();
});