// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("moti/skeleton", () => ({
  Skeleton: () => "Skeleton",
}));
