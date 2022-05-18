

module.exports = function evalApiError(responseBody, { expectedMessage, expectedCode, expectedLink } = null) {
  expect(responseBody).toHaveProperty("error");

  const { error } = responseBody;
  expect(error).toHaveProperty("message");
  expect(error).toHaveProperty("code");
  expect(error).toHaveProperty("link");

  const { message, code, link } = error;

  if (expectedMessage) {
    expect(message).toBe(expectedMessage);
  }

  if (expectedCode) {
    expect(code).toBe(expectedCode);
  }

  if (expectedLink) {
    expect(link).toBe(expectedLink);
  }
}