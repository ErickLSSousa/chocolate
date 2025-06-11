import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

function Card({ texto }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{texto}</Text>
    </View>
  );
}

export default function App() {
  const handleCardPress = () => {
    Alert.alert('Card Clicado', 'Você tocou no card!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Minha Tela Estilizada</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://reactnative.dev/img/logo-og.png' }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>Explorando Estilos no React Native</Text>
      </View>
      <View style={styles.cardSection}>
        <CustomCard
          titulo={"Card 1:Estilização"}
        corFundo="#ffebcd"
        onPress={() => Alert.alert('Custom Card', 'Card 1 clicado!')}
        />
      <CustomCard
      titulo={"Card 2:Layout"}
      corFundo="#e6e6fa"
      onPress={() => Alert.alert('Custom Card', 'Card 2 clicado!')}
      />
    </View >
    </View>
  );
}

function CustomCard({ titulo, corFundo, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: corFundo }]}>
      <Text style={styles.cardText}>{titulo}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});