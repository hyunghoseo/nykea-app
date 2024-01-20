import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react-native";
import Header from "./Header";
import { NavigationContainer } from "@react-navigation/native";

describe("Header - Mobile", () => {
  beforeEach(() => {
    jest.mock("../../utils/useResponsiveLayout", () => ({
      useResponsiveLayout: () => ({ isMobile: true }),
    }));
    render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>
    );
  });

  afterEach(cleanup);

  it("renders mobile header", () => {
    expect(screen.getByTestId("mobile-header")).toBeTruthy();
  });
});

describe("Header - Desktop", () => {
  beforeEach(() => {
    jest.mock("../../utils/useResponsiveLayout", () => ({
      useResponsiveLayout: () => ({ isMobile: false }),
    }));
    render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>
    );
  });

  afterEach(cleanup);

  it("renders desktop header", () => {
    waitFor(() => {
      expect(screen.getByTestId("desktop-header")).toBeTruthy();
    });
  });
});
