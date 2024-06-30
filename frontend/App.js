import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./components/appNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}
