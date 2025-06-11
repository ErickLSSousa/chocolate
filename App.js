import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Meu Primeiro App com Expo!</Text>
      <Saudacao></Saudacao>
    </View>
  );
}

function Saudacao(){
  return <Text> Olá,é meu primeiro componente!</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
