import { registerRootComponent } from "expo";
import { Platform } from "react-native";

import App from "./src/App";

// Initialize web-specific fixes for mobile browser compatibility
if (Platform.OS === "web") {
  require("./src/web");
}

registerRootComponent(App);
