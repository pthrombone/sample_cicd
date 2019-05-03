import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from "react-testing-library";
import { Simulate } from "react-dom/test-utils";
import axios from "axios";
import "jest-dom/extend-expect";
import LoginContainer from "./LoginContainer";

jest.mock("axios");
afterEach(cleanup);

const errorEmail = "Email needs a value";
const loginSuccessful = "Login Successful";
const loginFailed = "Login Failed";

describe("testing login component", async () => {
  it("sign in button leads to re-render with inputs", async () => {
    const { getByTestId, container, getByLabelText } = render(
      <LoginContainer />
    );
    const signIn = getByTestId("signIn");
    // console.log(container.innerHTML);
    // console.log("------------------------------------");
    fireEvent.click(signIn);
    await waitForElement(() => signIn, { container });
    // console.log(container.innerHTML);
    expect(getByLabelText("Email")).toBeDefined();
  });

  it("error message - email", async () => {
    const { getByTestId, getByLabelText, container } = render(
      <LoginContainer />
    );
    const signIn = getByTestId("signIn");
    fireEvent.click(signIn);
    await waitForElement(() => signIn, { container });
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    const loginButton = getByTestId("loginButton");
    fireEvent.click(loginButton);
    const message = getByTestId("message");
    expect(message.innerHTML).toBe(errorEmail);
  });

  it("return button", async () => {
    const { getByTestId, getByLabelText, container } = render(
      <LoginContainer />
    );
    const signIn = getByTestId("signIn");
    fireEvent.click(signIn);
    await waitForElement(() => signIn, { container });
    const returnButton = getByTestId("returnButton");
    fireEvent.click(returnButton);
    await waitForElement(() => returnButton, { container });
    expect(signIn).toBeDefined();
  });

  it("test api call - successful", async () => {
    const { getByTestId, getByLabelText, container } = render(
      <LoginContainer />
    );
    (axios.post as any) = jest.fn(() =>
      Promise.resolve({
        token: "sdfsdfasdf"
      })
    );
    const signIn = getByTestId("signIn");
    fireEvent.click(signIn);
    await waitForElement(() => signIn, { container });
    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "john@test.com" } });
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "test" } });
    const loginButton = getByTestId("loginButton");
    fireEvent.click(loginButton);
    const message = getByTestId("message");
    await waitForElement(() => message, { container });
    expect(message.innerHTML).toBe(loginSuccessful);
  });

  it("test api call - failed", async () => {
    const { getByTestId, getByLabelText, container } = render(
      <LoginContainer />
    );
    (axios.post as any) = jest.fn(() => Promise.reject({}));
    const signIn = getByTestId("signIn");
    fireEvent.click(signIn);
    await waitForElement(() => signIn, { container });
    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "john@test.com" } });
    const loginButton = getByTestId("loginButton");
    fireEvent.click(loginButton);
    const message = getByTestId("message");
    await waitForElement(() => message, { container });
    expect(message.innerHTML).toBe(loginFailed);
  });
});
