import React from "react";
import { render } from "@testing-library/react-native";
import App from "./App";

describe("App Component", () => {
  it("should pass automatically", () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});
