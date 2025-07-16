import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios'
import { useTasks } from '../contexts/TaskContext';

export default function AddTaskScreen({ navigation}) {
  const { addTask } = useTasks()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (title.trim()) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
          title,
          completed: false,
        });
        addTask({ title, description, id: response.data.id.toString() });
        navigation.goBack();
      } catch (err) {
        Alert.alert('Erro', 'Falha ao salvar na API');

      }
    } else {
      Alert.alert('Erro', 'Por favor, insira o título da tarefa.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título da Tarefa</Text>
      <CustomInput
        value={title}
        onChangeText={(text) => setTitle(text.slice(0, 50))}
        placeholder="Digite o título da tarefa (máx. 50 caracteres)"
      />
      <CustomInput
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição (opcional)"
        multiline
      />
      <CustomButton title="Salvar Tarefa" onPress={handleAddTask} color="#007bff" />
      <CustomButton
        title="Cancelar"
        onPress={() => navigation.goBack()}
        color="#dc3545"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
  },
  label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10,
  },
  input: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      borderColor: '#ccc',
      borderWidth: 1,
      marginTop: 5,
  },
  multiline: {
      height: 100,
      textAlignVertical: 'top',
  },
  button: {
      backgroundColor: '#28a745',
      padding: 15,
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center',
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
});