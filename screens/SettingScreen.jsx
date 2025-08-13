import { StyleSheet, View, Text } from 'react-native';
import { use, useState } from 'react';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
import { useTasks } from '../contexts/TaskContext';
import { useNavigation } from '@react-navigation/native';
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleTheme,clearTasks, exportTasks, restoreTasks }  from '../contexts/taskslice';
import { useSelector } from 'react-redux';


export default function SettingsScreen() {
  const {theme } = useSelector((state) => state.tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigation();
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleClearTasks = async () => {
    try {
      await dispatch(clearTasks());
      await dispatch(saveTasks([]));
      setModalVisible(false);
      setSuccessMessage('Tarefas limpas com sucesso!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setModalVisible(false);
      setSuccessMessage('');
      alert('Erro ao limpar tarefas');
    }
  };

  const handleExport = async () => {
    try {
      const result = await dispatch(exportTasks()).unwrap();
      setSuccessMessage(result);
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setSuccessMessage('');
      alert(err.message);
    }
  };

  const handleRestore = async () => {
    try {
      const result= await dispatch(restoreTasks()).unwrap(); 
      setSuccessMessage('backup restaurado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setSuccessMessage('');
      alert(err.message);
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.title, theme === 'dark' && styles.darkText]}>Configurações</Text>
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <Text style={[styles.text, theme === 'dark' && styles.darkText]}>
        Contador: {counter}
      </Text>

      <CustomButton
        title="Incrementar"
        onPress={() => dispatch(increment())}
        color="#007bff"
      />

      <CustomButton
        title="Decrementar"
        onPress={() => dispatch(decrement())}
        color="#007bff"
      />

      <CustomButton
        title="Resetar Contador"
        onPress={() => dispatch(reset())}
        color="#007bff"
      />  

      
      <CustomButton
        title={`Mudar para tema ${theme === 'light' ? 'dark' : 'light'}`}
        onPress={() => dispatch(toggleTheme())}
        color="#007bff"
      />
    </View>
  );
} 
   const styles = StyleSheet.create({
        container: {
        flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
      darkContainer: {
        backgroundColor: '#333',
  },
      title: {
        fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
  },
      successText: {
        fontSize: 16,
      color: '#28a745',
      textAlign: 'center',
      marginBottom: 10,
  },
      darkText: {
        color: '#fff',
  },
});
   