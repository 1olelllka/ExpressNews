import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './components/screens/login';
import MyTabs from './components/tabs';
import AppNavigation from './components/appNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <Login /> */}
      {/* <MyTabs /> */}
      <AppNavigation />
    </SafeAreaProvider>
  );
}
