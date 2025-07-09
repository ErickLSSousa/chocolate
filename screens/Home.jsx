import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';

export default function HomeScreen({ navigation }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 10) {
      Alert.alert('Parabéns!', 'Você atingiu 10 cliques!');
    }
    else if(count === 0) {
      Alert.alert ('Resetado', 'O contador foi zerado')
    }
  }, [count]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Contador: {count}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCount((prev) => prev + 1)}
        >
          <Text style={styles.buttonText}>Incrementar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: '#dc3545' }]}
          onPress={() => setCount(0)}
        >
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: '#28a745' }]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Ir para Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ffc107' }]}
          onPress={() => setCount((prev) => Math.max(0, prev - 1))}
        >
          <Text style={styles.buttonText}>Decrementar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  counterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
