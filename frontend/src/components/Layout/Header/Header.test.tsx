import { cleanup, render, screen, waitFor } from "@test-utils";

import { Header } from "./Header";

describe("Header - Mobile", () => {
  beforeEach(() => {
    render(<Header variant="mobile" />);
  });

  afterEach(cleanup);

  it("renders mobile header", () => {
    expect(screen.getByTestId("mobile-header")).toBeTruthy();
  });
});

describe("Header - Desktop", () => {
  beforeEach(() => {
    jest.mock("@/hooks/useResponsiveLayout", () => ({
      useResponsiveLayout: () => ({ isMobile: false }),
    }));
    render(<Header variant="desktop" />);
  });

  afterEach(cleanup);

  it("renders desktop header", () => {
    waitFor(() => {
      expect(screen.getByTestId("desktop-header")).toBeTruthy();
    });
  });
});
