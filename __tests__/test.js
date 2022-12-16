/**
 * @jest-environment jsdom
 */
const registerValidation = require("../js/register.js")
test("Client-side validation", () => {
  expect(registerValidation()).toBeTruthy()
})
