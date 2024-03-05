import { render, screen, waitFor } from "@testing-library/react-native";

import App from "./App";

describe("App Component", () => {
  it("should pass automatically", () => {
    render(<App />);
    waitFor(() => {
      expect(screen.getByText("Groups")).toBeTruthy();
    });
  });
});
