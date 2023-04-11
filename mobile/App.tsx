import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SignIn from './src/pages/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';




export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#212121' barStyle='light-content' translucent={false} />
      <Routes />
    </NavigationContainer>
  );
}
