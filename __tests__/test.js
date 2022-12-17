/**
 * @jest-environment jsdom
 */
const registerValidation = require("../js/register.js")
test("Valid input", () => {
  document.body.innerHTML =
  `<input id="registerEmail" value="abcdef@abcdef.com"></input>`+
  `<input id="registerPassword" value="abcdef"></input>`;
  expect(registerValidation()).toBeTruthy()
});

test("Password too short", () => {
  document.body.innerHTML =
  `<input id="registerEmail" value="abcdef@abcdef.com"></input>`+
  `<input id="registerPassword" value="abc"></input>`;
  expect(registerValidation()).toBeFalsy()
});

test("Email format invalid", () => {
  document.body.innerHTML =
  `<input id="registerEmail" value="abcdef"></input>`+
  `<input id="registerPassword" value="abcdef"></input>`;
  expect(registerValidation()).toBeFalsy()
});

test("Both inputs invalid", () => {
  document.body.innerHTML =
  `<input id="registerEmail" value="abc"></input>`+
  `<input id="registerPassword" value="abc"></input>`;
  expect(registerValidation()).toBeFalsy()
});