import { NavigationContainer } from "@react-navigation/native";
import { render, screen } from "@testing-library/react-native";

import AppNavigator from "./AppNavigator";

describe("<AppNavigator />", () => {
  it("should render the navigation stack with all screens", () => {
    render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Test if the initial screen (HomeScreen) is rendered
    expect(screen.getByText("Home Screen")).toBeTruthy();
  });
});
