import { render, screen, waitFor } from "@testing-library/react-native";
import React from "react";

import App from "./App";

describe("App Component", () => {
  it("should pass automatically", () => {
    render(<App />);
    waitFor(() => {
      expect(screen.getByText("Groups")).toBeTruthy();
    });
  });
});
