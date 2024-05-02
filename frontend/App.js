import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './components/login';
import MyTabs from './components/tabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <Login />
      {/* <MyTabs /> */}
    </SafeAreaProvider>
  );
}
