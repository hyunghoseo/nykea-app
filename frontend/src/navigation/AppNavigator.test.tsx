import { render, screen } from "@test-utils";

import { AppNavigator } from "./AppNavigator";

describe("<AppNavigator />", () => {
  it("should render the navigation stack with all screens", () => {
    render(<AppNavigator />);

    // Test if the initial screen (HomeScreen) is rendered
    expect(screen.getByText("Home Screen")).toBeTruthy();
  });
});
